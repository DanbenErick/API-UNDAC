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
}
