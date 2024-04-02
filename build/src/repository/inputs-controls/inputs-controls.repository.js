"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputsControlsRepository = void 0;
const manager_log_resource_1 = require("../../resources/manager-log.resource");
class InputsControlsRepository {
    constructor() {
        this.obtenerLugarAutocomplete = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT DISTRITO, UBIGEO as value, CONCAT(DEPARTAMENTO, ', ', PROVINCIA, ' ,', DISTRITO) AS label FROM ubicaciones WHERE DISTRITO LIKE '%${params.DISTRITO}%' LIMIT 5`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerLugarAutocomplete =>', error);
                throw error;
            }
        });
        this.obtenerResultadosModalidades = (connection, params) => __awaiter(this, void 0, void 0, function* () {
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
            ORDER BY resultados.ORDEN_MERITO_1 ASC, carreras.ESCUELA_COMPLETA ASC, resultados.PUNT_T DESC`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerResultadosModalidades =>', error);
                throw error;
            }
        });
        this.obtenerResultadosOrdinario = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
            SELECT 
            inscritos.DNI AS DNI,
            registros.AP_PATERNO AS AP_PATERNO,
            registros.AP_MATERNO AS AP_MATERNO,
            registros.NOMBRES AS NOMBRES,
            inscritos.COD_CARRERA AS COD_CARRERA,
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
            left join inscritos on inscritos.DNI = resultados.DNI
            left join registros on registros.DNI = resultados.DNI
            left join procesos  on procesos.ID = resultados.PROCESO
            left join carreras  on carreras.CODIGO_ESCUELA = inscritos.COD_CARRERA
          WHERE inscritos.PROCESO = 27
            order by inscritos.COD_CARRERA ASC, resultados.ORDEN_MERITO_1 ASC
            `;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerResultadosOrdinario =>', error);
                throw error;
            }
        });
        this.obtenerSedes = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT NOMBRE, NOMBRE as value, NOMBRE as label FROM sedes WHERE TIPO = '${params.TIPO_PROCESO}'  LIMIT 30`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerSedes =>', error);
                throw error;
            }
        });
        this.validarCordinador = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM usuarios WHERE DNI LIKE '%${params.USUARIO}%' OR USUARIO LIKE '%${params.USUARIO}%' AND ROL = 3 AND ESTADO = 1`;
                console.log(query);
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.validarCordinador =>', error);
                throw error;
            }
        });
        this.obtenerDeclaracioneJuradas = (connection, params) => __awaiter(this, void 0, void 0, function* () {
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
          LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = inscritos.COD_CARRERA
          LEFT JOIN ubicaciones ON ubicaciones.UBIGEO = dat_complementarios.LUGAR_RESIDENCIA
          LEFT JOIN procesos ON procesos.ID = inscritos.PROCESO
          WHERE inscritos.PROCESO = ${params.proceso} AND inscritos.SEDE_EXAM = '${params.sede}'
          ORDER BY inscritos.DNI ASC
            `;
                console.log('Query', query);
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerDeclaracioneJuradas =>', error);
                throw error;
            }
        });
        this.obtenerIngresanteParaContanciaProDNIyProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
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
            WHERE resultados.PROCESO = ${params.proceso} AND inscritos.PROCESO = ${params.proceso} AND resultados.EST_OPCION = 'INGRESO' AND resultados.DNI = ${params.dnicd}
            `;
                console.log("Ejecutado esto", query);
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerIngresanteParaContanciaProDNIyProceso =>', error);
                throw error;
            }
        });
        this.obtenerIngresantesParaConstancia = (connection, params) => __awaiter(this, void 0, void 0, function* () {
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
                procesos.NOMBRE AS MODALIDAD,
                carreras.ESCUELA_COMPLETA AS CARRERA,
                resultados.ORDEN_MERITO_1,
                resultados.CODIGO_MATRICULA,
                carreras.DIRECCION AS DIRECCION_CARRERA,
                carreras.SEDE_FACULTAD,
                resultados.ID
            FROM resultados
            LEFT JOIN registros ON registros.DNI = resultados.DNI
            LEFT JOIN inscritos ON inscritos.DNI = resultados.DNI
            LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = resultados.COD_CARRERA OR carreras.OLD_COD_CARRERA = resultados.COD_CARRERA
            LEFT JOIN procesos ON procesos.ID = resultados.PROCESO
            WHERE resultados.PROCESO = ${params.proceso} AND inscritos.PROCESO = ${params.proceso} AND resultados.EST_OPCION = 'INGRESO'
            `;
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
                console.log("Ejecutado esto", query);
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerIngresantesParaConstancia =>', error);
                throw error;
            }
        });
        this.obtenerPadronEstudiantes = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM view_padron_estudiantes WHERE ID_PROCESO = ${params.id_proceso} AND AREA = ${params.area} AND SEDE_EXAM = '${params.sede}' ORDER BY DNI ASC LIMIT ${params.inicio}, ${params.fin}`;
                console.log("Consulta para padron de estudiantes => ", query);
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerPadronEstudiantes =>', error);
                throw error;
            }
        });
        this.obtenerProcesos = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID as value, NOMBRE as label FROM procesos ORDER BY id DESC`;
                // const query = `SELECT ID, NOMBRE, FECHA_REGISTRO, ESTADO FROM procesos ORDER BY id DESC`;
                const [rows, fields] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`InputsControlsRepository.obtenerProcesos => ${error}`);
                throw error;
            }
        });
        this.obtenerCarreras = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID as value, ESCUELA_COMPLETA as label FROM carreras`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`InputsControlsRepository.obtenerCarreras => ${error}`);
                throw error;
            }
        });
        this.obtenerCarrerasPorCodigoCarrera = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT CODIGO_ESCUELA as value, ESCUELA_COMPLETA as label FROM carreras`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`InputsControlsRepository.obtenerCarreras => ${error}`);
                throw error;
            }
        });
        this.obtenerFacultades = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `select DISTINCT(FACULTAD), FACULTAD as value, FACULTAD as label from carreras`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerFacultades => ', error);
                throw error;
            }
        });
        this.obtenerDiscapadidades = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID AS value, DISCAPACIDAD AS label FROM discapacidades`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerDiscapacidades => ', error);
                throw error;
            }
        });
        this.obtenerRazasEtnicas = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID AS value, ETNICA AS label FROM etnicas`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerDiscapacidades => ', error);
                throw error;
            }
        });
        this.obtenerMencion = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT CODIGO_ESCUELA AS value, ESCUELA_COMPLETA AS label FROM carreras_postgrado`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerDiscapacidades => ', error);
                throw error;
            }
        });
        this.obtenerProcesoActivo = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID as value, NOMBRE as label FROM procesos WHERE ESTADO = 1 AND TIPO_PROCESO = '${params.TIPO_PROCESO}'`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerDiscapacidades => ', error);
                throw error;
            }
        });
        this.obtenerTodosLosProcesosActivos = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID as value, NOMBRE as label, TIPO_PROCESO FROM procesos WHERE ESTADO = 1`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerTodosLosProcesoActivos => ', error);
                throw error;
            }
        });
        this.obtenerUbicacionAutocomplete = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM ubicaciones`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.obtenerUbicacionAutocomplete => ', error);
                throw error;
            }
        });
        this.obtenerDepartamentos = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT DISTINCT(DEPARTAMENTO), DEPARTAMENTO AS label , DEPARTAMENTO AS value  FROM ubicaciones;`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.obtenerUbicacionAutocomplete => ', error);
                throw error;
            }
        });
        this.obtenerProvincias = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT DISTINCT(PROVINCIA), PROVINCIA AS label , PROVINCIA AS value FROM ubicaciones WHERE DEPARTAMENTO = '${params.DEPARTAMENTO}';`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.obtenerUbicacionAutocomplete => ', error);
                throw error;
            }
        });
        this.obtenerDistritos = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT DISTINCT(DISTRITO), DISTRITO AS label , DISTRITO AS value FROM ubicaciones WHERE PROVINCIA = '${params.PROVINCIA}';`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.obtenerUbicacionAutocomplete => ', error);
                throw error;
            }
        });
        this.buscarAulaPorTurno = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID AS value, NOMBRE_AULA AS label FROM aulas WHERE ID_PROCESO = (SELECT ID FROM procesos WHERE ESTADO = 1 AND TIPO_PROCESO = 'C' ) AND OCUPADO = 0 AND TURNO = '${params.TURNO}'`;
                console.log(query);
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.buscarAulaPorTurno => ', error);
                throw error;
            }
        });
        this.obtenerProcesosAbiertos = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID, TIPO_PROCESO, ESTADO   FROM procesos WHERE ESTADO = 1`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.obtenerProcesosAbiertos => ', error);
                throw error;
            }
        });
        this.obtenerModalidades = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID AS value, NOMBRE as label from opc_modalidades`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.obtenerModalidades => ', error);
                throw error;
            }
        });
        this.obtenerCarrerasPorModalidades = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT
                carreras.ESCUELA_COMPLETA AS label,
                carreras.CODIGO_ESCUELA AS value	
            FROM vacantes
            LEFT JOIN carreras ON carreras.ID = vacantes.ID_CARRERA
            WHERE ID_PROCESO = ${params.ID_PROCESO} AND ID_MODALIDAD = ${params.ID_TIPO_MODALIDAD}`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepostiry.obtenerCarrerasPorModalidades => ', error);
                throw error;
            }
        });
    }
}
exports.InputsControlsRepository = InputsControlsRepository;
