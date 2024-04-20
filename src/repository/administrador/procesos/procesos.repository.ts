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
    public obtenerInscritosPorCarrera = async(connection: any, params: ProcesosInterface) => {
        try {
            const query = `SELECT
                inscritos.COD_CARRERA,
                carreras.ESCUELA_COMPLETA AS NOMBRE_CARRERA,
                COUNT(*) AS CANTIDAD
            FROM
                inscritos
            LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = inscritos.COD_CARRERA
            WHERE PROCESO = ${params.ID_PROCESO}
            GROUP BY
                inscritos.COD_CARRERA,
                carreras.ESCUELA_COMPLETA
            ORDER BY
                carreras.ESCUELA_COMPLETA ASC`
            const [rows] = await connection.promise().query(query)
            return rows            
        }catch(error) {
            logger.error(`ProcesosRepo.obtenerInscritosPorSede =>`, error)
            throw error
        }
    }
    public obtenerInscritosEstudianteDatos = async (connection: any, params: any) => {
        try {
            const query = `SELECT * FROM view_csv_inscritos WHERE PROCESO = ${params.ID_PROCESO}`;
            console.log("CONSULTA =>", query)
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error(`ProcesosRepo.obtenerInscritosPorSede =>`, error)
            throw error
        }
    }
    public obtenerInscritosPorArea = async(connection: any, params: ProcesosInterface) => {
        try {
            const query = `SELECT
                carreras.AREA,
                COUNT(*) AS CANTIDAD
            FROM
                inscritos
            LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = inscritos.COD_CARRERA
            WHERE PROCESO = ${params.ID_PROCESO}
            GROUP BY
                carreras.AREA
            ORDER BY
                carreras.AREA ASC`
            const [rows] = await connection.promise().query(query)
            return rows            
        }catch(error) {
            logger.error(`ProcesosRepo.obtenerInscritosPorSede =>`, error)
            throw error
        }
    }
    public obtenerInscritosPorModalidad = async(connection: any, params: ProcesosInterface) => {
        try {
            const query = `
                SELECT
                    ID_TIPO_MODALIDAD,
                    opc_modalidades.NOMBRE AS NOMBRE_MODALIDAD,
                    COUNT(*) AS CANTIDAD
                FROM
                    inscritos
                LEFT JOIN opc_modalidades ON opc_modalidades.ID = inscritos.ID_TIPO_MODALIDAD
                WHERE PROCESO = ${params.ID_PROCESO}
                GROUP BY
                inscritos.ID_TIPO_MODALIDAD
                `
            const [rows] = await connection.promise().query(query)
            return rows            
        }catch(error) {
            logger.error(`ProcesosRepo.obtenerInscritosPorSede =>`, error)
            throw error
        }
    }
    public actualizarProceso = async(connection: any, params: ProcesosInterface) => {
        try {
            const query = `UPDATE procesos SET NOMBRE = '${params.NOMBRE}', TIPO_PROCESO = '${params.TIPO_PROCESO}', IMAGEN_PROCESO = '${params.IMAGEN_PROCESO}', FECHA_REGISTRO = '${params.FECHA_REGISTRO}' WHERE ID = '${params.ID_PROCESO}'`
            console.log("query", query)
            const resp = await connection.promise().query(query)
            return resp
        }catch(error) {
            logger.error('ProcesosRepo.actualizarProceso', error)
            throw error
        }
    } 
    public abrirProceso = async(connection: any, params: ProcesosInterface) => {
        try {
            const query = `UPDATE procesos SET ESTADO = 1 WHERE ID = '${params.ID_PROCESO}'`
            const resp = await connection.promise().query(query)
            return resp
        }catch(error) {
            logger.error('ProcesosRepo.abrirProceso', error)
            throw error
        }
    }
}