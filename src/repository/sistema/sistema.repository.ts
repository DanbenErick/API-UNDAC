import { UsuarioInteface } from '../../interfaces/administrador/usuario.interface'
import { logger } from '../../resources/manager-log.resource'
import { generarConsulta } from '../../util/util'

class SistemaRepository {
    public encontrarDuplidoUsuario = async (connection: any, params: UsuarioInteface) => {
        try {
            
            const query = `select * from usuarios WHERE USUARIO = '${params.USUARIO}' OR DNI ='${params.USUARIO}'`
            const [rows, fields] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('SistemaRepository.encontrarDuplicado => ', error)
            throw error
        }
    }
    public crearUsuarioAdmin = async (connection: any, params: UsuarioInteface) => {
        try {
            const data = Object.values(params)
            const query = await generarConsulta('usuarios', params, null)
            const resp = await connection.promise().execute(query, data)
            return resp
        } catch (error) {
            logger.error('SistemaRepository.crearUsuario => ', error)
            throw error
        }
    }
    public loginUsuarioAdmin = async (connection: any, params: UsuarioInteface) => {
        try {
            const query = `select * from usuarios WHERE USUARIO = '${params.USUARIO}' OR DNI = '${params.USUARIO}'`
            const [rows, fields] = await connection.promise().query(query)
            return rows 
        } catch (error) {
            logger.error('SistemaRepository.loginUsuario => ', error)
            throw error
        }
    }
    public loginUsuarioEstudiante = async(connection: any, params:any) => {
        try {
            const query = `SELECT * FROM registros WHERE DNI = '${params.USUARIO}'`
            const [rows] = await connection.promise().execute(query)
            return rows
        }catch(error) {
            logger.error('SistemaRepository.loginUsuarioEstudiante => ', error)
            throw error
        }
    }
}
export default SistemaRepository