import { logger } from '../../../resources/manager-log.resource';

export class ReportesGeneralRepository {
  public obtenerPrimerosPuestos = async(connection: any, params: any) => {
    try {
      const query = `
      SELECT
        pro.NOMBRE,
        reg.DNI,
        CONCAT(reg.AP_PATERNO, ' ', reg.AP_MATERNO, ' ', reg.NOMBRES) AS 'NOMBRE COMPLETO',
        res.PUNT_T AS 'PUNTAJE TOTAL',
        res.ORDEN_MERITO_1 AS 'ORDEN DE MERITO',
        ca.FACULTAD,
        ca.ESCUELA_COMPLETA
      FROM resultados res
      LEFT JOIN procesos pro ON pro.ID = res.PROCESO
      LEFT JOIN registros reg ON reg.DNI = res.DNI
      LEFT JOIN carreras ca ON ca.CODIGO_ESCUELA = res.COD_CARRERA OR ca.OLD_COD_CARRERA = res.COD_CARRERA
      WHERE 
        res.EST_OPCION = 'INGRESO' AND
        res.ORDEN_MERITO_1 IN (1,2,3,4,5)
        ${params.PROCESO != '' ? 'AND pro.ID = ' + params.PROCESO : ''}  
        ${params.COD_CARRERA != '' ? 'AND ca.CODIGO_ESCUELA = ' + params.COD_CARRERA : ''}
      ORDER BY
        pro.NOMBRE ASC,
        ca.FACULTAD ASC,
        ca.ESCUELA_COMPLETA ASC,
        res.ORDEN_MERITO_1 ASC;
      `;
      console.log(query)
      const [rows]: any = await connection.promise().query(query)
      return rows
    }catch(error) {
      logger.error("ReportesGeneralRepository.obtenerPrimerosPuestos =>", (error))
    }
  }
  public obtenerPagos = async(connection: any, params: any) => {
    try {
      const query = `
      SELECT
        pro.NOMBRE AS 'PROCESO',
        reg.DNI,
        CONCAT(reg.AP_PATERNO, ' ', reg.AP_MATERNO, ' ', reg.NOMBRES) AS 'NOMBRE COMPLETO',
        a.NOMBRE_AULA AS 'AULA',
        a.TURNO AS 'TURNO',
        CONCAT('S/'  ,SUM(pa.MONTO)) AS 'MONTO PAGADO'
      FROM pagos pa
      LEFT JOIN registros reg ON reg.DNI = pa.DNI
      LEFT JOIN inscritos i ON i.DNI = pa.DNI
      LEFT JOIN aulas a ON a.ID = i.ID_AULA
      LEFT JOIN procesos pro ON pro.ID = pa.ID_PROCESO
      WHERE 
        0 = 0
        ${params.PROCESO != '' ? 'AND pro.ID = ' + params.PROCESO + ' AND i.PROCESO = ' + params.PROCESO : ''}
      GROUP BY
        pro.NOMBRE,
        reg.AP_PATERNO,
        reg.AP_MATERNO,
        reg.NOMBRES,
        reg.DNI,
        a.NOMBRE_AULA,
        a.TURNO
      `
      const [rows]: any = await connection.promise().query(query)
      return rows
    }catch(err) {
      logger.error("ReportesGeneralRepository.obtenerPagos =>", (err))
    }
  }
  public obtenerEstudiatesPorAula = async(connection: any, params: any) => {
    try {
      const query = `
      SELECT
        CONCAT( registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES ) AS 'NOMBRE COMPLETO',
        aulas.NOMBRE_AULA AS 'AULA',
        CASE 
              WHEN aulas.TURNO = 'M' THEN 'Mañana'
              WHEN aulas.TURNO = 'T' THEN 'Tarde'
              ELSE aulas.TURNO
          END AS 'TURNO'
      FROM inscritos
      LEFT JOIN aulas ON aulas.ID = inscritos.ID_AULA
      LEFT JOIN registros ON registros.DNI = inscritos.DNI
      WHERE inscritos.PROCESO = ${params.PROCESO}
      ORDER BY aulas.TURNO ASC,  aulas.NOMBRE_AULA ASC
      `
      const [rows]: any = await connection.promise().query(query)
      return rows
    }catch(error) {
      logger.error("ReportesGeneralRepository.obtenerEstudiatesPorAula =>", (error))
    }
  }
  public obtenerInscritosPorProceso = async(connection: any, params: any) => {
    try {
      const query = `
      SELECT
        procesos.NOMBRE AS PROCESO,
        inscritos.DNI,
        CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS 'NOMBRE COMPLETO',
        carreras.FACULTAD,
        carreras.ESCUELA_COMPLETA AS 'CARRERA INSCRITA',
        carreras.AREA,
        inscritos.FECHA_REGISTRO AS 'FECHA INSCRITO'
      --	inscritos.FECHA_ACTUALIZACION AS 'FECHA MODIFICACION'
      FROM inscritos
      LEFT JOIN registros ON registros.DNI = inscritos.DNI
      LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = inscritos.COD_CARRERA OR carreras.OLD_COD_CARRERA = inscritos.COD_CARRERA
      LEFT JOIN procesos ON procesos.ID = inscritos.PROCESO
      
      WHERE 
        inscritos.PROCESO = ${params.PROCESO} AND inscritos.PROCESO = ${params.PROCESO}
        ${params.COD_CARRERA != '' ? 'AND inscritos.COD_CARRERA = ' + params.COD_CARRERA : ''}
      ORDER BY carreras.AREA ASC, carreras.ESCUELA_COMPLETA ASC
      `
      const [rows]: any = await connection.promise().query(query)
      return rows
    }catch(error) {
      logger.error("ReportesGeneralRepository.obtenerInscritosPorProceso =>", (error))
    }
  }
  public obtenerReporteInscritosPorCarreras = async(connection: any, params: any) => {
    try {
      const query = `
      SELECT
        procesos.NOMBRE AS 'PROCESO',
        carreras.ESCUELA_COMPLETA AS 'CARRERA',
        COUNT(inscritos.COD_CARRERA) AS 'INSCRITOS'
      FROM carreras
      LEFT JOIN inscritos ON inscritos.COD_CARRERA = carreras.CODIGO_ESCUELA OR inscritos.COD_CARRERA = carreras.OLD_COD_CARRERA
      LEFT JOIN procesos ON procesos.ID = inscritos.PROCESO
      WHERE inscritos.PROCESO = ${params.PROCESO}
      GROUP BY procesos.NOMBRE, carreras.ESCUELA_COMPLETA
      ORDER BY carreras.ESCUELA_COMPLETA
      `
      console.log(query)
      const [rows] = await connection.promise().query(query)
      return rows
    }catch(err) {
      logger.error("ReportesGeneralRepository.obtenerReporteInscritosPorCarreras =>", (err))
    }
  }
  public obtenerReporteInscritosPorSede = async(connection: any, params: any) => {
    try {
      const query = `
      SELECT
        inscritos.SEDE_EXAM AS 'SEDE',
        COUNT(*) AS 'INSCRITOS'
      FROM inscritos
      WHERE inscritos.PROCESO = ${params.PROCESO}
      GROUP BY inscritos.SEDE_EXAM
      `
      const [rows] = await connection.promise().query(query)
      return rows
    }catch(err) {
      logger.error("ReportesGeneralRepository.obtenerReporteInscritosPorSede =>", (err))
    }
  }
}