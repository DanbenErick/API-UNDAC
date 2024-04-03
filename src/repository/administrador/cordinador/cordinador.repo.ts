import { CarreraInterface } from '../../../interfaces/administrador/carreras.interface';
import { logger } from '../../../resources/manager-log.resource';
import { generarConsulta } from '../../../util/util'

export class CordinadorRepository {
    public obtenerCordinadores = async(connection: any) => {
      try {
        const query = "SELECT * FROM usuarios WHERE ROL = 3"
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(err) {
        logger.error("CordinadorRepository.obtenerCordinadores =>", (err))
        throw err
      }
    }
    public buscarCordinadorPorUsuario = async(connection: any, params: any) => {
      try {
        const query = `SELECT * FROM usuarios WHERE USUARIO LIKE '%${params.USUARIO}%' && DNI LIKE '%${params.DNI}%' && ROL = 3`
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(err) {
        logger.error("CordinadorRepository.buscarCordinadorPorUsuario =>", (err))
        throw err
      }
    }
    public modificarCordinador = async(connection: any, params: any) => {
      try {
        const query = await generarConsulta('usuarios', params, `USUARIO = '${params.USUARIO}'`)
        const data = Object.values(params)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(err) {
        logger.error("CordinadorRepository.modificarCordinador =>", (err))
        throw err
      }
    }
    public modifcarEstadoCordinador = async(connection: any, params: any) => {
      try {
        const query = await `UPDATE usuarios SET ESTADO = ${params.estado} WHERE DNI = ${params.dni}`
        const resp = await connection.promise().execute(query)
        return resp
      }catch(err) {
        logger.error("CordinadorRepository.modifcarEstadoCordinador =>", (err))
        throw err
      }
    }
    public crearCordinador = async(connection: any, params: any) => {
      try {
        const query = await generarConsulta('usuarios', params, null)
        const data = Object.values(params)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(err) {
        logger.error("CordinadorRepository.crearCordinador =>", (err))
        throw err
      }
    }
    public obtenerIngresantes = async(connection: any, params: any) => {
      try {
        const query = `
        SELECT
          CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
          resultados.PROCESO,
          resultados.DNI,
          procesos.NOMBRE AS NOMBRE_PROCESO,
          resultados.PUNT_T,
          resultados.ORDEN_MERITO_1 AS ORDEN_MERITO,
          resultados.CODIGO_MATRICULA,
          resultados.EST_OPCION,
          carreras.ESCUELA_COMPLETA AS CARRERA
        FROM resultados
        LEFT JOIN procesos ON procesos.ID = resultados.PROCESO
        LEFT JOIN registros ON registros.DNI = resultados.DNI
        LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = resultados.COD_CARRERA OR carreras.OLD_COD_CARRERA = resultados.COD_CARRERA
        WHERE resultados.EST_OPCION = 'INGRESO'
        ORDER BY resultados.ID DESC
        LIMIT 30
        `
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(err) {
        logger.error("CordinadorRepository.obtenerIngresantes =>", (err))
        throw err
      }
    }
    public obtenerIngresantesParaContanciaProDNIyProceso = async(connection: any, params: any) => {
      try {
        const query = `
        SELECT
          CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
          resultados.PROCESO,
          resultados.DNI,
          procesos.NOMBRE AS NOMBRE_PROCESO,
          resultados.PUNT_T,
          resultados.ORDEN_MERITO_1 AS ORDEN_MERITO,
          resultados.CODIGO_MATRICULA,
          resultados.EST_OPCION,
          carreras.ESCUELA_COMPLETA AS CARRERA
        FROM resultados
        LEFT JOIN procesos ON procesos.ID = resultados.PROCESO
        LEFT JOIN registros ON registros.DNI = resultados.DNI
        LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = resultados.COD_CARRERA OR carreras.OLD_COD_CARRERA = resultados.COD_CARRERA
        WHERE resultados.EST_OPCION = 'INGRESO' AND resultados.DNI LIKE '%${params.dni}%' AND resultados.PROCESO = ${params.proceso}`
        const [rows]: any = await connection.promise().query(query)
        return rows
    }
    catch (error) {
      logger.error("CordinadorRepository.obtenerIngresantesParaContanciaProDNIyProceso =>", (error))
      throw error
    }
  }
}
