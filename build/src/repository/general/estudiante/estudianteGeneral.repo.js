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
exports.EstudianteGeneralRepository = void 0;
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
const util_1 = require("../../../util/util");
class EstudianteGeneralRepository {
    constructor() {
        this.verificarInscripcionEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT 
            ID 
          FROM inscritos 
          WHERE DNI = '${params.DNI}' 
          AND PROCESO = (SELECT ID FROM procesos WHERE ESTADO = 1 AND TIPO_PROCESO = '${params.TIPO_PROCESO}')`;
                const [rows] = yield connection.promise().query(query);
                console.log(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.verificarInscripcionEstudiante =>', error);
            }
        });
        this.verificarDatosCompletamerioEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID FROM dat_complementarios WHERE DNI = '${params.DNI}'`;
                const [rows] = yield connection.promise().query(query);
                console.log(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.verificarDatosCompletamerioEstudiante =>', error);
            }
        });
        this.verificarPagoRequisitos = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM pagos WHERE DNI = '${params.DNI}' AND ID_PROCESO = (SELECT ID FROM procesos WHERE ESTADO = 1);`;
                const [rows] = yield connection.promise().query(query);
                console.log(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.verificarPagoRequisitos =>', error);
            }
        });
        this.obtenerDatosEstudianteCarnet = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM vista_datos_generales_estudiante_qr WHERE UUID = '${params.UUID}';`;
                const [rows] = yield connection.promise().query(query);
                console.log(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.obtenerDatosEstudianteCarnet =>', error);
            }
        });
        this.consultarDatosDNIPorProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield `
        SELECT
          inscritos.DNI,
          registros.AP_PATERNO,
          registros.AP_MATERNO,
          registros.NOMBRES,
          procesos.NOMBRE AS NOMBRE_PROCESO,
          carreras.ESCUELA_COMPLETA AS CARRERA	
        FROM inscritos
        LEFT JOIN procesos ON procesos.ID = inscritos.PROCESO
        LEFT JOIN registros ON registros.DNI = inscritos.DNI
        LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = inscritos.COD_CARRERA
        WHERE inscritos.DNI = ${params.DNI} AND inscritos.PROCESO = ${params.ID_PROCESO}
        `;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.consultarDatosDNIPorProceso =>', error);
            }
        });
        this.verificarTestpsicologicoInscrito = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID FROM actitudes WHERE DNI = '${params.DNI}'`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.verificarTestpsicologicoInscrito =>', error);
            }
        });
        this.consultarEstudianteExiste = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT DNI FROM registros WHERE DNI = ${params.DNI}`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.consultarEstudianteExiste =>', error);
                throw error;
            }
        });
        this.inscribirEstudianteConProcedimientoAlmacenado = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `CALL InscribirEstudianteRolEstudiante (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                console.log('Query ejecutado:', connection.format(query, params));
                const resp = yield connection.promise().execute(query, params);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.inscribirEstudianteConProcedimeintoAlmacenado', error);
                throw error;
            }
        });
        this.obtenerUUIDEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT UUID FROM registros WHERE DNI = '${params.DNI}'`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.obtenerUUIDEstudiante =>', error);
                throw error;
            }
        });
        this.registrarEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('registros', params, null);
                const data = Object.values(params);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.registrarEstudiante => ', error);
                throw error;
            }
        });
        this.registrarPago = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('pagos', params, null);
                const data = Object.values(params);
                console.log(query, data);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.registrarPago => ', error);
                throw error;
            }
        });
        this.obtenerMisPagos = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        SELECT 
          pagos.*,
          procesos.NOMBRE AS NOMBRE_PROCESO	
        FROM pagos 
        LEFT JOIN procesos ON procesos.ID = pagos.ID_PROCESO
        WHERE DNI = ${params.DNI}
        ORDER BY pagos.ID DESC
        `;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.obtenerMisPagos => ', error);
                throw error;
            }
        });
        this.registrarDatosComplementariosEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('dat_complementarios', params, null);
                const data = Object.values(params);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.registrarDatosComplementariosEstudiante => ', error);
                throw error;
            }
        });
        this.registrarInscripcionEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('inscritos', params, null);
                const data = Object.values(params);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.registrarInscripcionEstudiante => ', error);
            }
        });
        this.cantidadDeVacantesAula = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT CAPACIDAD FROM aulas WHERE ID = ${params.ID_AULA}`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRespository.cantidadDeVacantesAula => ', error);
            }
        });
        this.cantidadDeInscritosPorAula = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT COUNT(*) AS CANTIDAD FROM inscritos WHERE ID_AULA = ${params.ID_AULA}`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRespository.cantidadDeInscritosPorAula => ', error);
            }
        });
        this.establecerPorOcupadaAula = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `UPDATE aulas SET OCUPADO = 1 WHERE ID = ${params.ID_AULA}`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRespository.establecerPorOcupadaAula => ', error);
            }
        });
        this.registrarTestPsicologicoEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('actitudes', params, null);
                const data = Object.values(params);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.registrarTestPsicologicoEstudiante => ', error);
            }
        });
        this.consultarSiSeRegistroEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.consultarSiSeRegistroEstudiante => ', error);
            }
        });
        this.consultarSiSeInscribioEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.consultarSiSeRegistroEstudiante => ', error);
            }
        });
        this.consultarSiSeSubioFotoEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.consultarSiSeRegistroEstudiante => ', error);
            }
        });
        this.consultarSiSeConfirmoPagoEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.consultarSiSeRegistroEstudiante => ', error);
            }
        });
        this.consultarSiSePresentoDocumentacionEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.consultarSiSeRegistroEstudiante => ', error);
            }
        });
        this.consultarSiRegistroDatosComplementarios = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.consultarSiSeRegistroEstudiante => ', error);
            }
        });
    }
}
exports.EstudianteGeneralRepository = EstudianteGeneralRepository;
