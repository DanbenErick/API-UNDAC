import { VacantesInterface } from '../../../interfaces/administrador/vacantes.interface'
import { logger } from '../../../resources/manager-log.resource'
import { generarConsulta } from '../../../util/util'

class VacantesRepository {
    public obtenerVacantes = async(connection:any) => {
        try {
            const query = `select * from vista_obtener_vacantes_proceso_ult_activo where ESTADO = 1 `
            const [rows, fields]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('VacantesRepository.obtenerVacantes => ', error)
            throw error
        }
    }
    public obtenerCarrerasPorProcesoInput = async(connection: any) => {
        try {
            const query = `SELECT ID as value, ESCUELA_COMPLETA as label FROM carreras`
            // const query = `SELECT ID as value, ESCUELA_COMPLETA as label
            // FROM carreras
            // WHERE id NOT IN (SELECT ID_CARRERA FROM vacantes WHERE ID_PROCESO = (SELECT ID FROM procesos WHERE estado = 1))`
            const [rows, fields]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('VacantesRepository.obtenerCarreraPorProcesoInput => ', error)
        }
    }
    public obtenerVacantesPorProceso = async(connection: any, params: VacantesInterface) => {
        try { 
            const query = `select * from vista_obtener_vacantes_proceso_ult_activo where ID_PROCESO = ${params.ID_PROCESO}`
            const [rows, fields]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('VacantesRepository.obtenerVacantesPorId => ', error)
            throw error
        }
    }
    public verificarDisponibilidadProceso = async(connection: any, params: VacantesInterface ) => {
        try {
            const query = `SELECT ID FROM procesos WHERE ESTADO = 1 AND ID = ${params.ID_PROCESO}`
            const [rows, fields]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('VacantesRepository.verificarDisponibilidadProceso => ', error)
            throw error
        }
    }
    public crearVacante = async(connection: any, params: VacantesInterface) => {
        try {
            const query = await generarConsulta('vacantes', params, null)
            const data = Object.values(params)
            const result = await connection.promise().execute(query, data)
            return result
        }catch(error) {
            logger.error('VacantesRepo.crearVacante => ', error)
            throw error
        }
    }
}

export default VacantesRepository