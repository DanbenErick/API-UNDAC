import { logger } from '../../resources/manager-log.resource'


export class InputsControlsRepository {
    public obtenerLugarAutocomplete = async(connection: any, params: any) => {
        try {
            const query = `SELECT DISTRITO, UBIGEO as value, CONCAT(DEPARTAMENTO, ', ', PROVINCIA, ' ,', DISTRITO) AS label FROM ubicaciones WHERE DISTRITO LIKE '%${params.DISTRITO}%' LIMIT 5`
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerLugarAutocomplete =>', error)
            throw error
        }
    }
    public obtenerResultadosModalidades = async(connection: any, params: any) => {
        try {
            const query = `SELECT 
            inscritos.DNI, 
            CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
            carreras.ESCUELA_COMPLETA,
            resultados.PUNT_T AS PUNTAJE_TOTAL,
            resultados.EST_1OPCION AS ESTADO,
            resultados.ASISTENCIA1 AS ASISTENCIA
            FROM inscritos
            LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = inscritos.COD_CARRERA
            LEFT JOIN registros ON registros.DNI = inscritos.DNI
            LEFT JOIN resultados ON resultados.PROCESO = inscritos.DNI
            WHERE ID_TIPO_MODALIDAD = ${params.modalidad}
            AND
            OLD_COD_CARRERA = resultados.P_OPCION
            ORDER BY resultados.ORDEN_MERITO_1 ASC, carreras.ESCUELA_COMPLETA ASC, resultados.PUNT_T DESC`
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerResultadosModalidades =>', error)
            throw error
        }
    }
    public obtenerResultadosCeprePrimerExamen = async(connection: any, params: any) => {
        try {
            const query = `
            SELECT 
            inscritos.DNI AS DNI,
            registros.AP_PATERNO AS AP_PATERNO,
            registros.AP_MATERNO AS AP_MATERNO,
            registros.NOMBRES AS NOMBRES,
        --    inscritos.COD_CARRERA AS COD_CARRERA,
             carreras.AREA AS COD_CARRERA,
            carreras.AREA AS FACULTAD,
            carreras.AREA,
            procesos.NOMBRE AS ID_TIPO_MODALIDAD,
            procesos.NOMBRE AS NOMBRE_PROCESO,
            concat(registros.AP_PATERNO,' ', registros.AP_MATERNO,' ',registros.NOMBRES) AS NOMBRE_COMPLETO,
            carreras.AREA AS CARRERA,
            resultados.ORDEN_MERITO_1 AS ORDEN_MERITO,
            resultados.PUNT_1,
            resultados.ASISTENCIA,
            resultados.PUNT_T AS PUNTAJE_TOTAL,
        --    resultados.EST_OPCION AS ESTADO,
            'PRIMER EXAMEN' AS ESTADO,
            resultados.ERRORES AS ERRORES,
            resultados.PROCESO AS PROCESO
        from resultados
            left join inscritos on inscritos.DNI = resultados.DNI
            left join registros on registros.DNI = resultados.DNI
            left join procesos  on procesos.ID = resultados.PROCESO
            left join carreras  on carreras.CODIGO_ESCUELA = inscritos.COD_CARRERA OR carreras.OLD_COD_CARRERA = inscritos.COD_CARRERA
        WHERE inscritos.PROCESO = ${params.id_proceso} AND resultados.PROCESO = ${params.id_proceso}
            ORDER BY carreras.AREA ASC, CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) ASC
            `
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerResultadosCeprePrimerExamen =>', error)
            throw error
        }
    }
    public obtenerReporteAulaCepre = async(connection: any, params: any) => {
        try {
            const query = `
            SELECT
                ROW_NUMBER() OVER () AS N,
                aulas.NOMBRE_AULA,
                inscritos.DNI,
                CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
                carreras.ESCUELA_COMPLETA,
                aulas.TURNO,
                procesos.NOMBRE AS NOMBRE_PROCESO,
                SUM(pagos.MONTO) AS PAGO
            FROM inscritos 
            LEFT JOIN aulas ON aulas.ID = inscritos.ID_AULA
            LEFT JOIN registros ON registros.DNI = inscritos.DNI
            LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = inscritos.COD_CARRERA
            LEFT JOIN pagos ON pagos.DNI = inscritos.DNI
            LEFT JOIN procesos ON procesos.ID = inscritos.PROCESO
            WHERE inscritos.PROCESO = ${params.PROCESO} AND pagos.ID_PROCESO = ${params.PROCESO} AND aulas.ID = ${params.AULA}
            GROUP BY inscritos.DNI, registros.AP_PATERNO, registros.AP_MATERNO, registros.NOMBRES, carreras.ESCUELA_COMPLETA, aulas.TURNO, procesos.NOMBRE
            ORDER BY registros.AP_PATERNO ASC, registros.AP_MATERNO ASC, registros.NOMBRES ASC        
            `
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('ObtenerReporteAulaCepre =>', error)
            throw error
        }
    }
    public obtenerResultadosOrdinario = async(connection: any, params: any) => {
        try {
            const query = `
            SELECT 
                -- inscritos.DNI AS DNI,
                resultados.DNI,
                registros.AP_PATERNO AS AP_PATERNO,
                registros.AP_MATERNO AS AP_MATERNO,
                registros.NOMBRES AS NOMBRES,
                -- inscritos.COD_CARRERA AS COD_CARRERA,
                resultados.COD_CARRERA AS COD_CARRERA,
                carreras.FACULTAD AS FACULTAD,
                procesos.NOMBRE AS ID_TIPO_MODALIDAD,
                procesos.NOMBRE AS NOMBRE_PROCESO,
                concat(registros.AP_PATERNO,' ', registros.AP_MATERNO,' ',registros.NOMBRES) AS NOMBRE_COMPLETO,
                carreras.ESCUELA_COMPLETA AS CARRERA,
                resultados.ORDEN_MERITO_1 AS ORDEN_MERITO,
                resultados.PUNT_T AS PUNTAJE_TOTAL,
                resultados.EST_OPCION AS ESTADO,
                resultados.ERRORES AS ERRORES,
                resultados.PROCESO AS PROCESO
            from resultados
                -- left join inscritos on inscritos.DNI = resultados.DNI
                left join registros on registros.DNI = resultados.DNI
                left join procesos  on procesos.ID = resultados.PROCESO
                left join carreras  on carreras.CODIGO_ESCUELA = resultados.COD_CARRERA OR carreras.OLD_COD_CARRERA = resultados.COD_CARRERA
            WHERE 
            -- inscritos.PROCESO = ${params.id_proceso} AND 
            resultados.PROCESO = ${params.id_proceso} 
            AND resultados.EST_OPCION != 'PREPARATORIA'
            
                order by resultados.COD_CARRERA ASC, resultados.ORDEN_MERITO_1 ASC
                -- , resultados.PUNT_T DESC
            `
            console.log("Query", query)
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerResultadosOrdinario =>', error)
            throw error
        }
    }
    public obtenerSedes = async(connection: any, params: any) => {
        try {
            const query = `SELECT NOMBRE, NOMBRE as value, NOMBRE as label FROM sedes WHERE TIPO = '${params.TIPO_PROCESO}'  LIMIT 30`
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerSedes =>', error)
            throw error
        }
    }
    public validarCordinador = async(connection: any, params: any) => {
        try {
            const query = `SELECT * FROM usuarios WHERE DNI LIKE '%${params.USUARIO}%' OR USUARIO LIKE '%${params.USUARIO}%' AND ROL = 3 AND ESTADO = 1`
            console.log(query)
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.validarCordinador =>', error)
            throw error
        }
    }
    public obtenerDeclaracioneJuradas = async(connection: any, params: any) => {
        try {
            const query = `
            SELECT
            procesos.NOMBRE AS PROCESO,
            CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS 'APELLIDOS Y NOMBRES',
            registros.DNI AS 'CODIGO DE POSTULANTE',
            registros.DNI AS 'Nº DE DOCUMENTO',
            registros.TIPO_DOC AS 'TIPO DE DOCUMENTO',
            CASE dat_complementarios.SEXO
              WHEN 'M' THEN 'MASCULINO'
              ELSE 'FEMENINO'
            END AS GENERO,
            dat_complementarios.FECHA_NACIMIENTO AS 'FECHA DE NACIMIENTO',
            ubicaciones.DISTRITO AS 'DISTRITO NACIMIENTO',
            ubicaciones.PROVINCIA AS 'PROVINCIA NACIMIENTO',
            ubicaciones.DEPARTAMENTO AS 'DEPARTAMENTO NACIMIENTO',
            dat_complementarios.NOMBRE_COLEGIO AS 'COLEGIO PROCEDENCIA',
            CASE dat_complementarios.TIPO_COLEGIO
              WHEN 'E' THEN 'ESTATAL'
              ELSE 'PRIVADO'
            END AS 'TIPO DE COLEGIO',
            inscritos.SEDE_EXAM AS SEDE,
            carreras.FACULTAD,
            carreras.ESCUELA_COMPLETA AS ESCUELA,
            CASE inscritos.PREPARATORIA
              WHEN 0 THEN 'NO'
              ELSE 'SI'
            END AS PREPARATORIA
          FROM inscritos
          LEFT JOIN registros ON registros.DNI = inscritos.DNI
          LEFT JOIN dat_complementarios ON dat_complementarios.DNI = inscritos.DNI
          LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = inscritos.COD_CARRERA OR carreras.OLD_COD_CARRERA = inscritos.COD_CARRERA
          LEFT JOIN ubicaciones ON ubicaciones.UBIGEO = dat_complementarios.LUGAR_RESIDENCIA
          LEFT JOIN resultados ON resultados.DNI = inscritos.DNI
          LEFT JOIN procesos ON procesos.ID = inscritos.PROCESO
          WHERE inscritos.PROCESO = ${params.proceso} AND inscritos.SEDE_EXAM = '${params.sede}' AND resultados.EST_OPCION = 'INGRESO'
          ORDER BY inscritos.DNI ASC
            `
            console.log('Query', query)
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerDeclaracioneJuradas =>', error)
            throw error
        }
    }
    public obtenerIngresanteParaContanciaProDNIyProceso = async(connection: any, params: any) => {
        try {
            const query = `
            SELECT 
                registros.AP_PATERNO,
                registros.AP_MATERNO,
                registros.NOMBRES,
                registros.DNI,
                inscritos.SEDE_EXAM,
                carreras.FACULTAD,
                procesos.NOMBRE AS NOMBRE_PROCESO,
                resultados.PUNT_T AS PROMEDIO,
                procesos.NOMBRE AS MODALIDAD,
                carreras.ESCUELA_COMPLETA AS CARRERA,
                resultados.MODALIDAD,
                resultados.ORDEN_MERITO_1,
                resultados.CODIGO_MATRICULA,
                carreras.DIRECCION AS DIRECCION_CARRERA,
                carreras.SEDE_FACULTAD
            FROM resultados
            LEFT JOIN registros ON registros.DNI = resultados.DNI
            LEFT JOIN inscritos ON inscritos.DNI = resultados.DNI
            LEFT JOIN carreras ON carreras.OLD_COD_CARRERA = resultados.COD_CARRERA
            LEFT JOIN procesos ON procesos.ID = resultados.PROCESO
            WHERE resultados.PROCESO = '${params.proceso}' AND inscritos.PROCESO = '${params.proceso}' AND resultados.EST_OPCION = 'INGRESO' AND resultados.DNI = ${params.dnicd }
            `
            
            console.log("Ejecutado esto", query)
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerIngresanteParaContanciaProDNIyProceso =>', error)
            throw error
        }
    }
    public obtenerIngresantesParaConstancia = async(connection: any, params: any) => {
        try {
            const query = `
            SELECT 
                registros.AP_PATERNO,
                registros.AP_MATERNO,
                registros.NOMBRES,
                registros.DNI,
                inscritos.SEDE_EXAM,
                carreras.FACULTAD,
                procesos.NOMBRE AS NOMBRE_PROCESO,
                resultados.PUNT_T AS PROMEDIO,
                resultados.CODIGO_MATRICULA,
                opc_modalidades.NOMBRE AS MODALIDAD,
                carreras.ESCUELA_COMPLETA AS CARRERA,
                resultados.ORDEN_MERITO_1,
                resultados.CODIGO_MATRICULA,
                carreras.DIRECCION AS DIRECCION_CARRERA,
                resultados.NUM_CONSTANCIA,
                carreras.SEDE_FACULTAD,
                resultados.ID
            FROM resultados
            LEFT JOIN registros ON registros.DNI = resultados.DNI
            LEFT JOIN inscritos ON inscritos.DNI = resultados.DNI
            LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = resultados.COD_CARRERA OR carreras.OLD_COD_CARRERA = resultados.COD_CARRERA
            LEFT JOIN procesos ON procesos.ID = resultados.PROCESO
            LEFT JOIN opc_modalidades ON opc_modalidades.ID = inscritos.ID_TIPO_MODALIDAD
            WHERE resultados.PROCESO = ${params.proceso} AND inscritos.PROCESO = ${params.proceso} AND resultados.EST_OPCION = 'INGRESO'
            
            ORDER BY carreras.ESCUELA_COMPLETA ASC
            `
            // const query = `
            // SELECT 
            //     registros.AP_PATERNO,
            //     registros.AP_MATERNO,
            //     registros.NOMBRES,
            //     registros.DNI,
            //     inscritos.SEDE_EXAM,
            //     carreras.FACULTAD,
            //     procesos.NOMBRE AS NOMBRE_PROCESO,
            //     resultados_2.PUNT_T AS PROMEDIO,
            //     procesos.NOMBRE AS MODALIDAD,
            //     carreras.ESCUELA_COMPLETA AS CARRERA,
            //     resultados_2.MODALIDAD,
            //     resultados_2.ORDEN_MERITO_1,
            //     resultados_2.CODIGO_MATRICULA,
            //     carreras.DIRECCION AS DIRECCION_CARRERA,
            //     carreras.SEDE_FACULTAD
            // FROM resultados_2
            // LEFT JOIN registros ON registros.DNI = resultados_2.DNI
            // LEFT JOIN inscritos ON inscritos.DNI = resultados_2.DNI
            // LEFT JOIN carreras ON carreras.OLD_COD_CARRERA = resultados_2.COD_CARRERA
            // LEFT JOIN procesos ON procesos.ID = resultados_2.PROCESO
            // WHERE resultados_2.PROCESO = ${params.proceso} AND inscritos.PROCESO = ${params.proceso} AND resultados_2.EST_OPCION = 'INGRESO'
            // `
            console.log("Ejecutado esto", query)
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerIngresantesParaConstancia =>', error)
            throw error
        }
    }
    public obtenerPadronEstudiantes = async(connection: any, params: any) => {
        try {
            const query = `SELECT * FROM view_padron_estudiantes WHERE ID_PROCESO = ${params.id_proceso} AND AREA = ${params.area} AND SEDE_EXAM = '${params.sede}' ORDER BY DNI ASC LIMIT ${params.inicio}, ${params.fin}`
            console.log("Consulta para padron de estudiantes => ", query)
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerPadronEstudiantes =>', error)
            throw error
        }
    }
    public obtenerProcesos = async(connection: any, params: any) => {
        try {
            const query = `SELECT ID as value, NOMBRE as label, IMAGEN_PROCESO, TIPO_PROCESO FROM procesos ORDER BY id DESC`;
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
            const query = `SELECT CODIGO_ESCUELA as value, ESCUELA_COMPLETA as label FROM carreras ORDER BY TIPO DESC, ESCUELA_COMPLETA ASC`
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
    public obtenerMencion = async(connection: any, params: any) => {
        try {
            const query  = `SELECT CODIGO_ESCUELA AS value, ESCUELA_COMPLETA AS label FROM carreras_postgrado`
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







    public obtenerInscritosPorCordinador = async(connection: any, params: any) => {
        try {
            const query = `
            SELECT
                CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
                pagos.CODIGO,
                pagos.MONTO,
                pagos.FECHA_PAGO,
                procesos.NOMBRE AS NOMBRE_PROCESO,
                usuarios.NOMBRES AS CORDINADOR,
                usuarios.SEDE
            FROM registros 
            LEFT JOIN pagos ON pagos.DNI = registros.DNI
            LEFT JOIN procesos ON procesos.ID = pagos.ID_PROCESO
            LEFT JOIN usuarios ON usuarios.ID = registros.CORDINADOR
            WHERE usuarios.DNI = '${params.dni}' AND usuarios.ROL = 3 AND pagos.ID_PROCESO = '${params.proceso}'
            `
            const [rows] = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputControlRepostiry.obtenerInscritosPorCordinador => ', error)
            throw error
        }
    }
}