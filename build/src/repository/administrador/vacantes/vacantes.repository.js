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
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
const util_1 = require("../../../util/util");
class VacantesRepository {
    constructor() {
        this.obtenerVacantes = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `select * from vista_obtener_vacantes_proceso_ult_activo ORDER BY ID DESC LIMIT 10`;
                const [rows, fields] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('VacantesRepository.obtenerVacantes => ', error);
                throw error;
            }
        });
        this.obtenerCarrerasPorProcesoInput = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID as value, ESCUELA_COMPLETA as label FROM carreras`;
                // const query = `SELECT ID as value, ESCUELA_COMPLETA as label
                // FROM carreras
                // WHERE id NOT IN (SELECT ID_CARRERA FROM vacantes WHERE ID_PROCESO = (SELECT ID FROM procesos WHERE estado = 1))`
                const [rows, fields] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('VacantesRepository.obtenerCarreraPorProcesoInput => ', error);
            }
        });
        this.obtenerVacantesPorProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(params);
                const query = `select * from vista_obtener_vacantes_proceso_ult_activo where ID_PROCESO = ${params.ID_PROCESO}`;
                const [rows, fields] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('VacantesRepository.obtenerVacantesPorId => ', error);
                throw error;
            }
        });
        this.verificarDisponibilidadProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID FROM procesos WHERE ESTADO = 1 AND ID = ${params.ID_PROCESO}`;
                const [rows, fields] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('VacantesRepository.verificarDisponibilidadProceso => ', error);
                throw error;
            }
        });
        this.crearVacante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('vacantes', params, null);
                const data = Object.values(params);
                const result = yield connection.promise().execute(query, data);
                return result;
            }
            catch (error) {
                manager_log_resource_1.logger.error('VacantesRepo.crearVacante => ', error);
                throw error;
            }
        });
        this.modificarVacante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('vacantes', params, 'ID = ' + params.ID);
                console.log(query);
                const data = Object.values(params);
                const result = yield connection.promise().execute(query, data);
                return result;
            }
            catch (error) {
                manager_log_resource_1.logger.error('VacantesRepo.modificarVacante => ', error);
                throw error;
            }
        });
    }
}
exports.default = VacantesRepository;
