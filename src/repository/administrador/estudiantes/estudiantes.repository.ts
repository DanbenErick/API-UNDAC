
import { EstudianteCompleto } from '../../../interfaces/administrador/EstudianteCompleto.interface';
import { EstudianteInterface } from '../../../interfaces/administrador/estudiantes.interface';
import { logger } from '../../../resources/manager-log.resource';
import { generarConsulta, obtenerQuery } from '../../../util/util'

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
    public obtenerDatosComplementariosEstudiante = async (connection: any, params: any) => {
      try {
        const query = `SELECT * FROM dat_complementarios WHERE DNI = '${params.DNI}'`
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('EstudianteRepository.obtenerDatosComplementariosEstudiante =>', error)
        throw error
      }
    }
    public modificarDatosComplementariosEstudiante = async(connection: any, params: any) => {
      try {
        const query = await generarConsulta('dat_complementarios', params, `DNI = ${params.DNI}`)
        const data = Object.values(params)
        const result = await connection.promise().execute(query, data)
        return result
      }catch(error) {
        logger.error('EstudianteRepository.modificarDatosComplementariosEstudiante =>', error)
        throw error
      }
    }
    public resetearPassword = async(connection: any, params: any) => {
      try {
        const query = `UPDATE registros SET PASSWORD = '${params.PASSWORD}' WHERE DNI = '${params.DNI}'`
        const result: any = await connection.promise().execute(query)
        return result
      }catch(error) {
        logger.error('EstudianteRepository.resetearPassword =>', error)
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
  public registrarActitudEstudianteComoAdmin = async(connection: any, params: any) => {
    try {
      const query = await generarConsulta('actitudes', params, null)
      const resp = await connection.promise().execute(query, params)
      return resp 
    }catch(error) {
      logger.error('EstudianteRepository.registrarActitudEstudianteComoAdmin', error)
    }
  }
}
