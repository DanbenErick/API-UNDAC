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
exports.CordinadorRepository = void 0;
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
const util_1 = require("../../../util/util");
class CordinadorRepository {
    constructor() {
        this.obtenerCordinadores = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM usuarios WHERE ROL = 3";
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (err) {
                manager_log_resource_1.logger.error("CordinadorRepository.obtenerCordinadores =>", (err));
                throw err;
            }
        });
        this.buscarCordinadorPorUsuario = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM usuarios WHERE USUARIO LIKE '%${params.USUARIO}%' && DNI LIKE '%${params.DNI}%' && ROL = 3`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (err) {
                manager_log_resource_1.logger.error("CordinadorRepository.buscarCordinadorPorUsuario =>", (err));
                throw err;
            }
        });
        this.modificarCordinador = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('usuarios', params, `USUARIO = '${params.USUARIO}'`);
                const data = Object.values(params);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (err) {
                manager_log_resource_1.logger.error("CordinadorRepository.modificarCordinador =>", (err));
                throw err;
            }
        });
        this.modifcarEstadoCordinador = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield `UPDATE usuarios SET ESTADO = ${params.estado} WHERE DNI = ${params.dni}`;
                const resp = yield connection.promise().execute(query);
                return resp;
            }
            catch (err) {
                manager_log_resource_1.logger.error("CordinadorRepository.modifcarEstadoCordinador =>", (err));
                throw err;
            }
        });
        this.crearCordinador = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('usuarios', params, null);
                const data = Object.values(params);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (err) {
                manager_log_resource_1.logger.error("CordinadorRepository.crearCordinador =>", (err));
                throw err;
            }
        });
        this.obtenerIngresantes = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        SELECT
          CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
          resultados.PROCESO,
          resultados.DNI,
          procesos.NOMBRE AS NOMBRE_PROCESO,
          resultados.PUNT_T,
          resultados.ORDEN_MERITO_1 AS ORDEN_MERITO,
          resultados.CODIGO_MATRICULA,
          resultados.EST_OPCION,
          carreras.ESCUELA_COMPLETA AS CARRERA
        FROM resultados
        LEFT JOIN procesos ON procesos.ID = resultados.PROCESO
        LEFT JOIN registros ON registros.DNI = resultados.DNI
        LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = resultados.COD_CARRERA
        WHERE resultados.EST_OPCION = 'INGRESO'
        ORDER BY resultados.ID DESC
        LIMIT 30
        `;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (err) {
                manager_log_resource_1.logger.error("CordinadorRepository.obtenerIngresantes =>", (err));
                throw err;
            }
        });
        this.obtenerIngresantesParaContanciaProDNIyProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        SELECT
          CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
          resultados.PROCESO,
          resultados.DNI,
          procesos.NOMBRE AS NOMBRE_PROCESO,
          resultados.PUNT_T,
          resultados.ORDEN_MERITO_1 AS ORDEN_MERITO,
          resultados.CODIGO_MATRICULA,
          resultados.EST_OPCION,
          carreras.ESCUELA_COMPLETA AS CARRERA
        FROM resultados
        LEFT JOIN procesos ON procesos.ID = resultados.PROCESO
        LEFT JOIN registros ON registros.DNI = resultados.DNI
        LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = resultados.COD_CARRERA
        WHERE resultados.EST_OPCION = 'INGRESO' AND resultados.DNI = ${params.dni} AND resultados.PROCESO = ${params.proceso}`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error("CordinadorRepository.obtenerIngresantesParaContanciaProDNIyProceso =>", (error));
                throw error;
            }
        });
    }
}
exports.CordinadorRepository = CordinadorRepository;
