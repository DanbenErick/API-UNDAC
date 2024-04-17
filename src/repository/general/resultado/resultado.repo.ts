
import { EstudianteInterface } from '../../../interfaces/administrador/estudiantes.interface';
import { logger } from '../../../resources/manager-log.resource';
import { generarConsulta } from '../../../util/util'

export class ResultadoGeneralRepository {
    public obtenerResultadosPorCarreraYProceso = async(connection: any, params: any) => {
      try {
        const query = `
        SELECT *,
          CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
          carreras.ESCUELA_COMPLETA
        FROM resultados_example 
        LEFT JOIN registros ON registros.DNI = resultados_example.PROCESO
        LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = resultados_example.P_OPCION
        WHERE P_OPCION = ${params.P_OPCION} ORDER BY PUNT_T DESC;
      `
        const [rows]: any = await connection.promise().query(query)
        console.log(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRepository.verificarInscripcionEstudiante =>', error)
      }
    }
    public obtenerResultadoEstudiante = async(connection: any, params: any) => {
      try {
        const query  = `
        SELECT
          procesos.NOMBRE AS NOMBRE_PROCESO,
          CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
          registros.DNI,
          registros.CELULAR,
          registros.CORREO,
          resultados.PUNT_T,
          carreras.ESCUELA_COMPLETA,
          dat_complementarios.SEXO,
          dat_complementarios.FECHA_NACIMIENTO,
          CONCAT(ubicaciones.DEPARTAMENTO, ' - ', ubicaciones.PROVINCIA, ' - ', ubicaciones.DISTRITO) AS RESIDENCIA,
          dat_complementarios.DIRECCION,
          dat_complementarios.DISCAPACIDAD,
          dat_complementarios.TIPO_COLEGIO,
          dat_complementarios.NOMBRE_COLEGIO,
          resultados.EST_OPCION
        FROM resultados 
        LEFT JOIN registros ON registros.DNI = resultados.DNI
        LEFT JOIN dat_complementarios ON dat_complementarios.DNI = resultados.DNI
        LEFT JOIN ubicaciones ON ubicaciones.UBIGEO = dat_complementarios.LUGAR_RESIDENCIA
        LEFT JOIN etnicas ON etnicas.ID = dat_complementarios.ETNICA
        LEFT JOIN carreras ON
          carreras.CODIGO_ESCUELA = resultados.COD_CARRERA
          OR
          carreras.OLD_COD_CARRERA = resultados.COD_CARRERA
        LEFT JOIN procesos ON procesos.ID = resultados.PROCESO
        WHERE resultados.DNI = ${params.DNI} AND resultados.PROCESO = ${params.PROCESO};
        `
        console.log('Query: ', query)
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRepository.obtenerResultadoEstudiante =>', error)
      }
    }
}
