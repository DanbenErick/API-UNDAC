import { ProcesosInterface } from '../../../interfaces/administrador/procesos.interface';
import { logger } from '../../../resources/manager-log.resource';
import { generarConsulta } from '../../../util/util'

export class ProcesosRepository {
    public obtenerProcesos = async(connection: any, params: ProcesosInterface) => {
        try {
            const query = `SELECT
                                procesos.*,
                                COUNT(inscritos.PROCESO) AS TOTAL_INSCRITOS
                            FROM
                                procesos
                            LEFT JOIN
                                inscritos ON inscritos.PROCESO = procesos.ID
                            GROUP BY
                                procesos.ID
                            ORDER BY
                                procesos.ID DESC`;
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error("ProcesosRepo.obtenerProcesos =>", (error))
            throw error
        }
    }
    public crearProceso = async(connection: any, params: ProcesosInterface) => {
        try {
            const query =  await generarConsulta('procesos', params, null)
            const data = Object.values(params)
            const result = await connection.promise().execute(query, data)
            return result
        }catch(error) {
            logger.error('ProcesosRepo.crearProceso => ', error)
            throw error
        }
    }
    public verificarSiHayProcesoAbierto = async(connection: any, params: any) => {
        try {
            const query = `SELECT ID, NOMBRE FROM procesos WHERE ESTADO = 1`
            const [rows, fields] = await connection.promise().query(query)
            return rows
        }catch(error){
            logger.error('ProcesosRepo.verificarSiHayProcesoAbierto => ', error)
        }
    }
    public cerrarProceso = async(connection: any, params: ProcesosInterface) => {
        try {
            const query = await generarConsulta('procesos', params, `ID = ${params.ID}`)
            const data = Object.values(params)
            const result = await connection.promise().execute(query, data)
            return result
        }catch(error) {
            logger.error(`ProcesosRepo.cerrarProceso =>`, error)
            throw error
        }
    }

    public obtenerInscritosPorSede = async(connection: any, params: ProcesosInterface) => {
        try {
            const query = `SELECT
                                SEDE_EXAM AS SEDE,
                                COUNT(*) AS CANTIDAD
                            FROM
                                inscritos
                            WHERE PROCESO = ${params.ID_PROCESO}
                            GROUP BY
                                SEDE_EXAM`
            const [rows] = await connection.promise().query(query)
            return rows            
        }catch(error) {
            logger.error(`ProcesosRepo.obtenerInscritosPorSede =>`, error)
            throw error
        }
    }
}