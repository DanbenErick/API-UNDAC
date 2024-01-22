import { logger } from '../../resources/manager-log.resource'

export class InputsControlsRepository {
    public obtenerProcesos = async(connection: any, params: any) => {
        try {
            const query = `SELECT ID as value, NOMBRE as label FROM procesos ORDER BY id DESC`;
            // const query = `SELECT ID, NOMBRE, FECHA_REGISTRO, ESTADO FROM procesos ORDER BY id DESC`;
            const [rows, fields]: any = await connection.promise().query(query)
            return rows
        }
        catch(error) {
            logger.error(`InputsControlsRepository.obtenerProcesos => ${error}`)
            throw error
        }
    }
    public obtenerCarreras = async(connection: any, params: any) => {
        try {
            const query = `SELECT ID as value, ESCUELA_COMPLETA as label FROM carreras`
            const [rows]: any = await connection.promise().query(query)
            return rows
        }
        catch(error) {
            logger.error(`InputsControlsRepository.obtenerCarreras => ${error}`)
            throw error
        }
    }
    public obtenerCarrerasPorCodigoCarrera = async(connection: any, params: any) => {
        try {
            const query = `SELECT CODIGO_ESCUELA as value, ESCUELA_COMPLETA as label FROM carreras`
            const [rows]: any = await connection.promise().query(query)
            return rows
        }
        catch(error) {
            logger.error(`InputsControlsRepository.obtenerCarreras => ${error}`)
            throw error
        }
    }
    public obtenerFacultades = async(connection: any) => {
        try {
            const query = `select DISTINCT(FACULTAD), FACULTAD as value, FACULTAD as label from carreras`
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerFacultades => ', error)
            throw error
        }
    }
    public obtenerDiscapadidades = async(connection: any) => {
        try {
            const query  = `SELECT ID AS value, DISCAPACIDAD AS label FROM discapacidades`
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerDiscapacidades => ', error)
            throw error
        }
    }
    public obtenerRazasEtnicas = async(connection: any) => {
        try {
            const query  = `SELECT ID AS value, ETNICA AS label FROM etnicas`
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerDiscapacidades => ', error)
            throw error
        }
    }
    public obtenerProcesoActivo = async(connection: any, params: any) => {
        try {
            const query  = `SELECT ID as value, NOMBRE as label FROM procesos WHERE ESTADO = 1 AND TIPO_PROCESO = '${params.TIPO_PROCESO}'`
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerDiscapacidades => ', error)
            throw error
        }
    }
    public obtenerTodosLosProcesosActivos = async(connection: any) => {
        try {
            const query = `SELECT ID as value, NOMBRE as label, TIPO_PROCESO FROM procesos WHERE ESTADO = 1`
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerTodosLosProcesoActivos => ', error)
            throw error
        }
    }

    public obtenerUbicacionAutocomplete = async(connection: any) => {
        try {
            const query = `SELECT * FROM ubicaciones`;
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputControlRepository.obtenerUbicacionAutocomplete => ', error)
            throw error
        }
    }
    public obtenerDepartamentos = async(connection: any) => {
        try {
            const query = `SELECT DISTINCT(DEPARTAMENTO), DEPARTAMENTO AS label , DEPARTAMENTO AS value  FROM ubicaciones;`
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputControlRepository.obtenerUbicacionAutocomplete => ', error)
            throw error
        }
    }
    public obtenerProvincias = async(connection: any, params: any) => {
        try {
            const query = `SELECT DISTINCT(PROVINCIA), PROVINCIA AS label , PROVINCIA AS value FROM ubicaciones WHERE DEPARTAMENTO = '${params.DEPARTAMENTO}';`
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputControlRepository.obtenerUbicacionAutocomplete => ', error)
            throw error
        }
    }
    public obtenerDistritos = async(connection: any, params: any) => {
        try {
            const query = `SELECT DISTINCT(DISTRITO), DISTRITO AS label , DISTRITO AS value FROM ubicaciones WHERE PROVINCIA = '${params.PROVINCIA}';`
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputControlRepository.obtenerUbicacionAutocomplete => ', error)
            throw error
        }
    }
    public buscarAulaPorTurno = async(connection: any, params: any) => {
        try {
            const query = `SELECT ID AS value, NOMBRE_AULA AS label FROM aulas WHERE ID_PROCESO = (SELECT ID FROM procesos WHERE ESTADO = 1 AND TIPO_PROCESO = 'C' ) AND OCUPADO = 0 AND TURNO = '${params.TURNO}'`
            console.log(query)
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputControlRepository.buscarAulaPorTurno => ', error)
            throw error
        }
    }
    public obtenerProcesosAbiertos = async(connection: any) => {
        try {
            const query = `SELECT ID, TIPO_PROCESO, ESTADO   FROM procesos WHERE ESTADO = 1`
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputControlRepository.obtenerProcesosAbiertos => ', error)
            throw error
        }
    }

    public obtenerModalidades = async(connection: any) => {
        try {
            const query = `SELECT ID AS value, NOMBRE as label from opc_modalidades`
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputControlRepository.obtenerModalidades => ', error)
            throw error
        }
    }

    public obtenerCarrerasPorModalidades = async(connection: any, params: any) => {
        try {
            const query = `SELECT
                carreras.ESCUELA_COMPLETA AS label,
                carreras.CODIGO_ESCUELA AS value	
            FROM vacantes
            LEFT JOIN carreras ON carreras.ID = vacantes.ID_CARRERA
            WHERE ID_PROCESO = ${params.ID_PROCESO} AND ID_MODALIDAD = ${params.ID_TIPO_MODALIDAD}`
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputControlRepostiry.obtenerCarrerasPorModalidades => ', error)
            throw error
        }
    }

}