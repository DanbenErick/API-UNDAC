
import { EstudianteInterface } from '../../../interfaces/administrador/estudiantes.interface';
import { logger } from '../../../resources/manager-log.resource';
import { generarConsulta } from '../../../util/util'

export class EstudianteGeneralRepository {
    public verificarInscripcionEstudiante = async(connection: any, params: any) => {
      try {
        const query = `SELECT 
            ID 
          FROM inscritos 
          WHERE DNI = '${params.DNI}' 
          AND PROCESO = (SELECT ID FROM procesos WHERE ESTADO = 1 AND TIPO_PROCESO = '${params.TIPO_PROCESO}')`
        const [rows]: any = await connection.promise().query(query)
        console.log(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRepository.verificarInscripcionEstudiante =>', error)
      }
    }
    public verificarDatosCompletamerioEstudiante = async(connection: any, params: any ) => {
      try {
        const query = `SELECT ID FROM dat_complementarios WHERE DNI = '${params.DNI}'`
        const [rows]: any = await connection.promise().query(query)
        console.log(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRepository.verificarDatosCompletamerioEstudiante =>', error)
      }
    }
    public verificarPagoRequisitos = async(connection: any, params: any ) => {
      try {
        const query = `SELECT * FROM pagos WHERE DNI = '${params.DNI}' AND ID_PROCESO = (SELECT ID FROM procesos WHERE ESTADO = 1);`
        const [rows]: any = await connection.promise().query(query)
        console.log(query)
        return rows
      } catch(error) {
        logger.error('EstudianteGeneralRepository.verificarPagoRequisitos =>', error)
      }
    }
    public obtenerDatosEstudianteCarnet = async(connection: any, params: any) => {
      try {
        const query = `SELECT * FROM vista_datos_generales_estudiante_qr WHERE UUID = '${params.UUID}';`
        const [rows]: any = await connection.promise().query(query)
        console.log(query)
        return rows
      } catch(error) {
        logger.error('EstudianteGeneralRepository.obtenerDatosEstudianteCarnet =>', error)
      }
    }
    public consultarDatosDNIPorProceso = async(connection: any, params: any) => {
      try {
        const query = await `
        SELECT
          inscritos.DNI,
          registros.AP_PATERNO,
          registros.AP_MATERNO,
          registros.NOMBRES,
          procesos.NOMBRE AS NOMBRE_PROCESO,
          carreras.ESCUELA_COMPLETA AS CARRERA	
        FROM inscritos
        LEFT JOIN procesos ON procesos.ID = inscritos.PROCESO
        LEFT JOIN registros ON registros.DNI = inscritos.DNI
        LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = inscritos.COD_CARRERA
        WHERE inscritos.DNI = ${params.DNI} AND inscritos.PROCESO = ${params.ID_PROCESO}
        `
        const [rows] = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRepository.consultarDatosDNIPorProceso =>', error)
      }
    }
    public verificarTestpsicologicoInscrito = async(connection: any, params: any) => {
      try {
        const query = `SELECT ID FROM actitudes WHERE DNI = '${params.DNI}'`
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRepository.verificarTestpsicologicoInscrito =>', error)
      }
    }
    public consultarEstudianteExiste = async(connection: any, params: EstudianteInterface) => {
      try {
        const query = `SELECT DNI FROM registros WHERE DNI = ${params.DNI}`
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRepository.consultarEstudianteExiste =>', error)
        throw error
      }
    }
    public inscribirEstudianteConProcedimientoAlmacenado = async(connection: any, params: any) => {
      try {
        const query = `CALL InscribirEstudianteRolEstudiante (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        console.log('Query ejecutado:', connection.format(query, params));
        const resp = await connection.promise().execute(query, params);
        return resp
      }catch (error) {
        logger.error('EstudianteGeneralRepository.inscribirEstudianteConProcedimeintoAlmacenado', error);
        throw error
      }
    }
    public obtenerUUIDEstudiante = async(connection: any, params: any) => {
      try {
        const query = `SELECT UUID FROM registros WHERE DNI = '${params.DNI}'`
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRepository.obtenerUUIDEstudiante =>', error)
        throw error
      }
    }
    public registrarEstudiante = async(connection: any, params: EstudianteInterface) => {
      try {
        const query = await generarConsulta('registros', params, null)
        const data = Object.values(params)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(error) {
        logger.error('EstudianteGeneralRepository.registrarEstudiante => ', error)
        throw error
      }
    }
    public registrarPago = async(connection: any, params: any) => {
      try {
        const query = await generarConsulta('pagos', params, null)
        const data = Object.values(params)
        console.log(query, data)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(error) {
        logger.error('EstudianteGeneralRepository.registrarPago => ', error)
        throw error
      }
    }
    public obtenerMisPagos = async(connection: any, params: any) => {
      try {
        const query  = `
        SELECT 
          pagos.*,
          procesos.NOMBRE AS NOMBRE_PROCESO	
        FROM pagos 
        LEFT JOIN procesos ON procesos.ID = pagos.ID_PROCESO
        WHERE DNI = ${params.DNI}
        ORDER BY pagos.ID DESC
        `
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRepository.obtenerMisPagos => ', error)
        throw error
      }
    }
    public registrarDatosComplementariosEstudiante = async(connection: any, params: any) => {
      try {
        const query = await generarConsulta('dat_complementarios', params, null)
        const data = Object.values(params)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(error) {
        logger.error('EstudianteGeneralRepository.registrarDatosComplementariosEstudiante => ', error)
        throw error
      }
    }
    public registrarInscripcionEstudiante = async(connection: any, params: any) => {
      try {
        const query = await generarConsulta('inscritos', params, null)
        const data = Object.values(params)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(error) {
        logger.error('EstudianteGeneralRepository.registrarInscripcionEstudiante => ', error)
      }
    }
    public cantidadDeVacantesAula = async(connection: any, params: any) => {
      try {
        const query = `SELECT CAPACIDAD FROM aulas WHERE ID = ${params.ID_AULA}`
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRespository.cantidadDeVacantesAula => ', error)
      }
    }
    public cantidadDeInscritosPorAula = async(connection: any, params: any) => {
      try {
        const query = `SELECT COUNT(*) AS CANTIDAD FROM inscritos WHERE ID_AULA = ${params.ID_AULA}`
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRespository.cantidadDeInscritosPorAula => ', error)
      }
    }
    public establecerPorOcupadaAula = async(connection: any, params: any) => {
      try {
        const query = `UPDATE aulas SET OCUPADO = 1 WHERE ID = ${params.ID_AULA}`
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRespository.establecerPorOcupadaAula => ', error)
      }
    }
    public registrarTestPsicologicoEstudiante = async(connection: any, params: any) => {
      try {
        const query = await generarConsulta('actitudes', params, null)
        const data = Object.values(params)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(error) {
        logger.error('EstudianteGeneralRepository.registrarTestPsicologicoEstudiante => ', error)
      }
    }
    public consultarSiSeRegistroEstudiante = async(connection: any, params: any) => {
      try {

      }catch(error) {
        logger.error('EstudianteGeneralRepository.consultarSiSeRegistroEstudiante => ', error)
      }
    }
    public consultarSiSeInscribioEstudiante = async(connection: any, params: any) => {
      try {

      }catch(error) {
        logger.error('EstudianteGeneralRepository.consultarSiSeRegistroEstudiante => ', error)
      } 
    }
    public consultarSiSeSubioFotoEstudiante = async(connection: any, params: any) => {
      try {

      }catch(error) {
        logger.error('EstudianteGeneralRepository.consultarSiSeRegistroEstudiante => ', error)
      } 
    }
    public consultarSiSeConfirmoPagoEstudiante = async(connection: any, params: any) => {
      try {

      }catch(error) {
        logger.error('EstudianteGeneralRepository.consultarSiSeRegistroEstudiante => ', error)
      } 
    }
    public consultarSiSePresentoDocumentacionEstudiante = async(connection: any, params: any) => {
      try {

      }catch(error) {
        logger.error('EstudianteGeneralRepository.consultarSiSeRegistroEstudiante => ', error)
      } 
    }
    public consultarSiRegistroDatosComplementarios  = async(connection: any, params: any) => {
      try {

      }catch(error) {
        logger.error('EstudianteGeneralRepository.consultarSiSeRegistroEstudiante => ', error)
      } 
    }
}
