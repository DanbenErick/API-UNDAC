
import { EstudianteCompleto } from '../../../interfaces/administrador/EstudianteCompleto.interface';
import { EstudianteInterface } from '../../../interfaces/administrador/estudiantes.interface';
import { logger } from '../../../resources/manager-log.resource';
import { generarConsulta } from '../../../util/util'

export class EstudianteRepository {
    public obtenerEstudiantes = async(connection: any) => {
        try {
            const query = `SELECT *, CONCAT(AP_PATERNO, ' ', AP_MATERNO, ' ', NOMBRES) as NOMBRE_COMPLETO FROM registros`;
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error("EstudianteRepository.obtenerEstudiantes =>", (error))
            throw error
        }
    }
    public buscarEstudiante= async(connection: any, params: EstudianteInterface) => {
      try {
        const query = `SELECT *, CONCAT(AP_PATERNO, ' ', AP_MATERNO, ' ', NOMBRES) as NOMBRE_COMPLETO FROM registros WHERE DNI LIKE '%${params.DNI}%' AND CORREO LIKE '%${params.CORREO}%' AND CELULAR LIKE '%${params.CELULAR}%'`
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('EstudianteRepository.buscarEstudiantes =>', error)
        throw error
      }
    }
    public modificarEstudiante = async(connection: any, params: EstudianteInterface) => {
      try {
        const { ID } = params;
        delete params.ID;
        const query = await generarConsulta("registros",params,`ID = ${ID}`);
        const data = Object.values(params);
        const resp = await connection.promise().execute(query, data);
        return resp
      }catch(error) {
      logger.error('EstudianteRepository.modificarEstudiante =>', (error))
      throw error
    }
  }
  public registrarEInscribirEstudiante = async(connection: any, params: EstudianteCompleto) => {
    try {
      const query = `CALL RegistrarEstudianteComoAdministrador (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)`
      console.log('Query ejecutado:', connection.format(query, params));
      const resp = await connection.promise().execute(query, params);
      return resp
    }catch(error) {
      logger.error('EstudianteRepository.registrarEInscribirEstudiante', error)
    }
  }
}
