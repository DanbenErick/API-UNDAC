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
exports.ProcesosRepository = void 0;
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
const util_1 = require("../../../util/util");
class ProcesosRepository {
    constructor() {
        this.obtenerProcesos = (connection, params) => __awaiter(this, void 0, void 0, function* () {
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
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error("ProcesosRepo.obtenerProcesos =>", (error));
                throw error;
            }
        });
        this.crearProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('procesos', params, null);
                const data = Object.values(params);
                const result = yield connection.promise().execute(query, data);
                return result;
            }
            catch (error) {
                manager_log_resource_1.logger.error('ProcesosRepo.crearProceso => ', error);
                throw error;
            }
        });
        this.verificarSiHayProcesoAbierto = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID, NOMBRE FROM procesos WHERE ESTADO = 1`;
                const [rows, fields] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('ProcesosRepo.verificarSiHayProcesoAbierto => ', error);
            }
        });
        this.cerrarProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('procesos', params, `ID = ${params.ID}`);
                const data = Object.values(params);
                const result = yield connection.promise().execute(query, data);
                return result;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`ProcesosRepo.cerrarProceso =>`, error);
                throw error;
            }
        });
        this.obtenerInscritosPorSede = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT
                                SEDE_EXAM AS SEDE,
                                COUNT(*) AS CANTIDAD
                            FROM
                                inscritos
                            WHERE PROCESO = ${params.ID_PROCESO}
                            GROUP BY
                                SEDE_EXAM`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`ProcesosRepo.obtenerInscritosPorSede =>`, error);
                throw error;
            }
        });
        this.obtenerInscritosPorCarrera = (connection, params) => __awaiter(this, void 0, void 0, function* () {
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
                carreras.ESCUELA_COMPLETA ASC`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`ProcesosRepo.obtenerInscritosPorSede =>`, error);
                throw error;
            }
        });
        this.obtenerInscritosEstudianteDatos = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM view_csv_inscritos WHERE PROCESO = ${params.ID_PROCESO}`;
                console.log("CONSULTA =>", query);
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`ProcesosRepo.obtenerInscritosPorSede =>`, error);
                throw error;
            }
        });
        this.obtenerInscritosPorArea = (connection, params) => __awaiter(this, void 0, void 0, function* () {
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
                carreras.AREA ASC`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`ProcesosRepo.obtenerInscritosPorSede =>`, error);
                throw error;
            }
        });
        this.obtenerInscritosPorModalidad = (connection, params) => __awaiter(this, void 0, void 0, function* () {
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
                `;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`ProcesosRepo.obtenerInscritosPorSede =>`, error);
                throw error;
            }
        });
        this.actualizarProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `UPDATE procesos SET NOMBRE = '${params.NOMBRE}', TIPO_PROCESO = '${params.TIPO_PROCESO}', IMAGEN_PROCESO = '${params.IMAGEN_PROCESO}', FECHA_REGISTRO = '${params.FECHA_REGISTRO}' WHERE ID = '${params.ID_PROCESO}'`;
                console.log("query", query);
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('ProcesosRepo.actualizarProceso', error);
                throw error;
            }
        });
        this.abrirProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `UPDATE procesos SET ESTADO = 1 WHERE ID = '${params.ID_PROCESO}'`;
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('ProcesosRepo.abrirProceso', error);
                throw error;
            }
        });
    }
}
exports.ProcesosRepository = ProcesosRepository;
