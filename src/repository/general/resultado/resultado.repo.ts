
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
}
