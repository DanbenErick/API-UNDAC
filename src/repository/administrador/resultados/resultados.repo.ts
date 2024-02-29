

import { logger } from '../../../resources/manager-log.resource';
// import { generarConsulta } from '../../../util/util'

export class ResultadosAdministradorRepository {
  public resultados = async(connection: any, params: any) => {
    try {
      const query = "SELECT * FROM resultados";
      const [rows]: any = await connection.promise().query(query)
      console.log(query)
      return rows
    }catch(error) {
      logger.error('EstudianteGeneralRepository.verificarInscripcionEstudiante =>', error)
    }
  }

  public duplicarDNIInscritosAResultados = async(connection: any, params: any) => {
    try {
      const query = `
        INSERT resultados(DNI, PROCESO, COD_CARRERA, SEDE, EST_OPCION)
        SELECT inscritos.DNI, inscritos.PROCESO, inscritos.COD_CARRERA, inscritos.SEDE_EXAM, 
          CASE
            WHEN PREPARATORIA = 1 THEN 'PREPARATORIA'
            ELSE ''
          END AS TIPO
        FROM inscritos  
        WHERE inscritos.PROCESO = ${params.ID_PROCESO};
      `
      const [rows]: any = await connection.promise().query(query)
      return rows
    }catch(error) {
      logger.error('EstudianteGeneralRepository.duplicarDNIInscritosAResultados =>', error)
    }
  }
  public actualizarDaraCodePorDNI = async(connection: any, params: any) => {
    try {
      const query = `
        UPDATE resultados
        SET
        DARACOD = ${params.DARACOD},
        ASISTENCIA = 'SE PRESENTO',
        AULA = ${params.AULA}
        WHERE DNI = ${params.DNI};
      `
      const resp : any = await connection.promise().query(query)
      return resp
    }catch(error) {
      logger.error('EstudianteGeneralRepository.actualizarDaraCodePorDNI =>', error)
    }
  }
  public establecerNotasPorDaraCode = async(connection: any, params: any) => {
    try {
      const query = `
        UPDATE resultados
        SET
        ACIERTOS = ${params['Aciertos']},
        ERRORES = ${params['Errores']},
        PUNT_T = ${params['Nota directa'].substring(0,6).replace(',','.')},
        EST_OPCION = CASE WHEN EST_OPCION != 'PREPARATORIA' THEN 'NO INGRESO' ELSE EST_OPCION END
        WHERE DARACOD = ${params.DARACOD};
      `
      const resp : any = await connection.promise().query(query)
      return resp
    }catch(error) {
      logger.error('EstudianteGeneralRepository.establecerNotasPorDaraCode =>', error)
    }
  }
  public establecerOrdenMeritoIngresantesOrdinario = async(connection: any, params: any) => {
    try {
      const query = `
      UPDATE resultados r
      INNER JOIN 
      (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY COD_CARRERA ORDER BY PUNT_T DESC) AS nuevo_orden
        FROM resultados 
        WHERE EST_OPCION = 'INGRESO'
      ) x ON x.id = r.id
      SET r.ORDEN_MERITO_1 = x.nuevo_orden
      WHERE r.EST_OPCION = 'INGRESO' AND r.PROCESO = ${params.ID_PROCESO};
      `
      console.log("establecerOrdenMeritoIngresantesOrdinario", query)
      const resp : any = await connection.promise().query(query)
      return resp
    }catch(error) {
      logger.error('EstudianteGeneralRepository.establecerOrdenMeritoIngresantesOrdinario =>', error)
    }
  }
  public establecerOrdenMeritoDiferentesAIngresantes = async(connection: any, params: any) => {
    try {
      const query = `
      UPDATE resultados r 
      INNER JOIN
      (
        SELECT 
          id, 
          ROW_NUMBER() OVER (PARTITION BY COD_CARRERA ORDER BY PUNT_T DESC) + ${params.LIMIT} AS nuevo_orden  
        FROM resultados
        WHERE EST_OPCION <> 'INGRESO' AND COD_CARRERA = '${params.COD_CARRERA}'
      ) x ON x.id = r.id
      SET r.ORDEN_MERITO_1 = x.nuevo_orden 
      WHERE r.EST_OPCION <> 'INGRESO' AND r.PROCESO = ${params.ID_PROCESO} AND COD_CARRERA = '${params.COD_CARRERA}'
      `
      console.log("establecerOrdenMeritoDiferentesAIngresantes", query)
      const resp : any = await connection.promise().query(query)
      return resp
    }catch(error) {
      logger.error('EstudianteGeneralRepository.establecerOrdenMeritoDiferentesAIngresantes =>', error)
    }
  }
  public obtenerVacantesPorCarreraOrdinario = async(connection: any, params: any) => {
    try {
      const query = `
      SELECT
        vacantes.ID_CARRERA,
        vacantes.CANTIDAD,
        vacantes.ID_PROCESO,
        carreras.CODIGO_ESCUELA
      FROM vacantes
      LEFT JOIN carreras ON carreras.ID = vacantes.ID_CARRERA
      WHERE ID_PROCESO = ${params.ID_PROCESO} AND ID_MODALIDAD = 4
      ORDER BY ID_CARRERA ASC
      `
      const [rows]: any = await connection.promise().query(query)
      return rows
    }catch(error) {
      logger.error('EstudianteGeneralRepository.obtenerVacantesPorCarrera', error)
    }
  }
  public establecerIngresantesPorCarreraOrdinario = async(connection: any, params: any) => {
    try {
      const query = `
        UPDATE resultados 
        SET EST_OPCION = 'INGRESO' 
        WHERE 
          COD_CARRERA = '${params.COD_CARRERA}' AND
          PROCESO = '${params.PROCESO}' AND
          EST_OPCION != 'PREPARATORIA'
        ORDER BY PUNT_T DESC
        LIMIT ${params.LIMIT}
      `
      console.log("Consulta0. ", query)
      const resp = await connection.promise().query(query)
      return resp
    }catch(error) {
      logger.error('EstudianteGeneralRepository.establecerIngresantesPorCarreraOrdinario =>', error)
    }
  }
}
