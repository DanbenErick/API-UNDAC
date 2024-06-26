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
exports.ResultadosAdministradorRepository = void 0;
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
// import { generarConsulta } from '../../../util/util'
class ResultadosAdministradorRepository {
    constructor() {
        this.resultados = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM resultados";
                const [rows] = yield connection.promise().query(query);
                console.log(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.verificarInscripcionEstudiante =>', error);
            }
        });
        this.verificarSiHayResultadosDelProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT COUNT(*) AS CANTIDAD FROM resultados WHERE PROCESO = '${params.ID_PROCESO}'`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.verificarSiHayResultadosDelProceso =>', error);
            }
        });
        this.eliminarRegistroDeUnProcesoResultados = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `DELETE FROM resultados WHERE PROCESO = '${params.ID_PROCESO}'`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.eliminarRegistroDeUnProcesoResultados =>', error);
            }
        });
        this.duplicarDNIInscritosAResultados = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        INSERT resultados(DNI, PROCESO, COD_CARRERA, SEDE, EST_OPCION)
        SELECT inscritos.DNI, inscritos.PROCESO, inscritos.COD_CARRERA, inscritos.SEDE_EXAM, 
          CASE
            WHEN PREPARATORIA = 1 THEN 'PREPARATORIA'
            ELSE 'NO INGRESO'
          END AS TIPO
        FROM inscritos  
        WHERE inscritos.PROCESO = ${params.ID_PROCESO};
      `;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.duplicarDNIInscritosAResultados =>', error);
            }
        });
        this.actualizarDaraCodePorDNI = (connection, params, proceso) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        UPDATE resultados
        SET
        DARACOD = '${params.DARACOD}',
        ASISTENCIA = 'SE PRESENTO',
        AULA = ${params.AULA}
        WHERE DNI = ${params.DNI} AND PROCESO = ${proceso};
      `;
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.actualizarDaraCodePorDNI =>', error);
            }
        });
        this.establecerNoPresentoSegundoExamen = (connection, params, proceso) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        UPDATE resultados SET ASISTENCIA_2 = 'NSP' WHERE PROCESO = ${proceso}
      `;
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.establecerNoPresentoSegundoExamen =>', error);
            }
        });
        this.actualizarDaraCodePorDNISE = (connection, params, proceso) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        UPDATE resultados
        SET
        DARACOD_2 = '${params.DARACOD}',
        ASISTENCIA_2 = 'SE PRESENTO',
        AULA = ${params.AULA}
        WHERE DNI = ${params.DNI} AND PROCESO = ${proceso};
      `;
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.actualizarDaraCodePorDNI =>', error);
            }
        });
        this.establecerNotasPorDaraCode = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        UPDATE resultados
        SET
        ACIERTOS = ${params['Aciertos']},
        ERRORES = ${params['Errores']},
        PUNT_T = ${params['Nota D'].substring(0, 6).replace(',', '.')},
        EST_OPCION = CASE WHEN EST_OPCION != 'PREPARATORIA' THEN 'NO INGRESO' ELSE EST_OPCION END
        WHERE DARACOD = '${params.DARACOD}';
      `;
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.establecerNotasPorDaraCode =>', error);
            }
        });
        this.establecerNotasPorDaraCodePE = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        UPDATE resultados
        SET
        ACIERTOS = ${params['Aciertos']},
        ERRORES = ${params['Errores']},
        PUNT_1 = ${params['Nota D'].substring(0, 6).replace(',', '.')},
        EST_OPCION = CASE WHEN EST_OPCION != 'PREPARATORIA' THEN 'NO INGRESO' ELSE EST_OPCION END
        WHERE DARACOD = '${params.DARACOD}';
      `;
                console.log(query);
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.establecerNotasPorDaraCode =>', error);
            }
        });
        this.establecerNotasPorDaraCodeEF = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        UPDATE resultados
        SET
        ACIERTOS = ${params['Aciertos']},
        ERRORES = ${params['Errores']},
        PUNT_2 = ${params['Nota D'].substring(0, 6).replace(',', '.')},
        EST_OPCION = CASE WHEN EST_OPCION != 'PREPARATORIA' THEN 'NO INGRESO' ELSE EST_OPCION END
        WHERE DARACOD_2 = '${params.DARACOD}';
      `;
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.establecerNotasPorDaraCode =>', error);
            }
        });
        this.establecerOrdenMeritoIngresantesOrdinario = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
      UPDATE resultados r
      INNER JOIN 
      (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY COD_CARRERA ORDER BY PUNT_T DESC) AS nuevo_orden
        FROM resultados 
        WHERE EST_OPCION = 'INGRESO'
      ) x ON x.id = r.id
      SET r.ORDEN_MERITO_1 = x.nuevo_orden
      WHERE r.EST_OPCION = 'INGRESO' AND r.PROCESO = ${params.ID_PROCESO};
      `;
                console.log("establecerOrdenMeritoIngresantesOrdinario", query);
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.establecerOrdenMeritoIngresantesOrdinario =>', error);
            }
        });
        this.establecerOrdenMeritoDiferentesAIngresantes = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
      UPDATE resultados r 
      INNER JOIN
      (
        SELECT 
          id, 
          ROW_NUMBER() OVER (PARTITION BY COD_CARRERA ORDER BY PUNT_T DESC) + ${params.LIMIT} AS nuevo_orden  
        FROM resultados
        WHERE EST_OPCION <> 'INGRESO' AND COD_CARRERA = '${params.COD_CARRERA}'
      ) x ON x.id = r.id
      SET r.ORDEN_MERITO_1 = x.nuevo_orden 
      WHERE r.EST_OPCION <> 'INGRESO' AND r.PROCESO = ${params.ID_PROCESO} AND COD_CARRERA = '${params.COD_CARRERA}'
      `;
                console.log("establecerOrdenMeritoDiferentesAIngresantes", query);
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.establecerOrdenMeritoDiferentesAIngresantes =>', error);
            }
        });
        this.obtenerVacantesPorCarreraOrdinario = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            //TODO: Actualizar este codigo para jalar las vacantes de ordinario
            try {
                const query = `
      SELECT
        vacantes.ID_CARRERA,
        vacantes.CANTIDAD,
        vacantes.ID_PROCESO,
        carreras.CODIGO_ESCUELA
      FROM vacantes
      LEFT JOIN carreras ON carreras.ID = vacantes.ID_CARRERA
      WHERE ID_PROCESO = ${params.ID_PROCESO}
      ORDER BY ID_CARRERA ASC
      `;
                console.log("AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIi");
                console.log("Consulta, ", query);
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.obtenerVacantesPorCarrera', error);
            }
        });
        this.establecerIngresantesPorCarreraOrdinario = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        UPDATE resultados 
        SET EST_OPCION = 'INGRESO' 
        WHERE 
          COD_CARRERA = '${params.COD_CARRERA}' AND
          PROCESO = '${params.PROCESO}' AND
          EST_OPCION != 'PREPARATORIA' AND
          ASISTENCIA != 'NSP'
        ORDER BY PUNT_T DESC
        LIMIT ${params.LIMIT}
      `;
                console.log("Asignando ingresante: ", query);
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.establecerIngresantesPorCarreraOrdinario =>', error);
            }
        });
        this.obtenerNotasParaSacarPromedio = (connection, params, params_2) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT DNI, PROCESO, PUNT_1, PUNT_2 FROM resultados WHERE PROCESO = ${params_2.ID_PROCESO};`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.obtenerNotasParaSacarPromedio =>', error);
            }
        });
        this.establecerNotaFinalCepre = (connection, params, params_2) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `UPDATE resultados SET PUNT_T = ${params.PUNT_T} WHERE PROCESO = ${params_2.ID_PROCESO} AND DNI = ${params.DNI};`;
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.establecerNotaFinalCepre =>', error);
            }
        });
    }
}
exports.ResultadosAdministradorRepository = ResultadosAdministradorRepository;
