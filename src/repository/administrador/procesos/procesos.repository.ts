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
    public generarReporte = async(connection: any, params: any) => {
        try {
            console.log(params)
            const query = `
            SELECT
                procesos.NOMBRE AS PROCESO,
                registros.DNI,
                registros.AP_PATERNO AS 'APELLIDO PATERNO',
                registros.AP_MATERNO AS 'APELLIDO MATERNO',
                registros.NOMBRES AS 'NOMBRES',
                registros.CELULAR,
                registros.CORREO,
                carreras.ESCUELA_COMPLETA AS 'CARRERA'
            FROM inscritos 
            LEFT JOIN procesos  ON procesos.ID = inscritos.PROCESO
            LEFT JOIN registros ON registros.DNI = inscritos.DNI
            LEFT JOIN carreras  ON carreras.CODIGO_ESCUELA = inscritos.COD_CARRERA
            WHERE PROCESO = ${params.ID_PROCESO}
            ${params.COD_CARRERA != ''?  `AND COD_CARRERA = ${params.COD_CARRERA}` : ''}
            ORDER BY carreras.ESCUELA_COMPLETA ASC
            `
            console.log(query)
            const [resp] = await connection.promise().query(query)
            return resp
        }catch(error) {
            logger.error('ProcesosRepo.generarReporte', error)
            throw error
        }
    }
    public obtenerReporteIngresantesPorProceso = async(connection: any, params: any) => {
        try {
            const query = `
            SELECT
                procesos.YEAR AS AÑO,
                procesos.NOMBRE AS PROCESO,
                opc_modalidades.NOMBRE AS MODALIDAD,
                '' AS COD_ALUMNO,
                registros.AP_PATERNO AS AP_PAT,
                registros.AP_MATERNO AS AP_MAT,
                registros.NOMBRES,
                carreras.ESCID,
                dat_complementarios.SEXO,
                '' AS ESCUELA,
                carreras.ESCUELA_COMPLETA AS PRIMERA_OPCION,
                resultados.PUNT_T AS PROMEDIO_FINAL,
                'PRIMERA OPCION' AS OPCION_DE_INGRESO,
                resultados.ORDEN_MERITO_1 AS ORDEN_MERITO,
                resultados.DNI,
                registros.CORREO,
                dat_complementarios.NOMBRE_COLEGIO AS NOMBRE_DE_LA_ESCUELA,
                inscritos.YEAR_CONCLU
            FROM resultados
            LEFT JOIN procesos ON procesos.ID = resultados.PROCESO
            LEFT JOIN opc_modalidades ON opc_modalidades.ID = resultados.MODALIDAD
            LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = resultados.COD_CARRERA OR carreras.OLD_COD_CARRERA = resultados.COD_CARRERA
            LEFT JOIN dat_complementarios ON dat_complementarios.DNI = resultados.DNI
            LEFT JOIN inscritos ON inscritos.DNI = resultados.DNI
            LEFT JOIN registros ON registros.DNI = resultados.DNI
            WHERE inscritos.PROCESO = ${params.PROCESO} AND resultados.PROCESO = ${params.PROCESO} and resultados.EST_OPCION = 'INGRESO';
            `
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('ObtenerReporteIngresantesPorProceso => ', error)
            throw error
        }
    }
}