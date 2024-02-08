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
exports.EstudianteRepository = void 0;
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
const util_1 = require("../../../util/util");
class EstudianteRepository {
    constructor() {
        this.obtenerEstudiantes = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT *, CONCAT(AP_PATERNO, ' ', AP_MATERNO, ' ', NOMBRES) as NOMBRE_COMPLETO FROM registros`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error("EstudianteRepository.obtenerEstudiantes =>", (error));
                throw error;
            }
        });
        this.buscarEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT *, CONCAT(AP_PATERNO, ' ', AP_MATERNO, ' ', NOMBRES) as NOMBRE_COMPLETO FROM registros WHERE DNI LIKE '%${params.DNI}%' AND CORREO LIKE '%${params.CORREO}%' AND CELULAR LIKE '%${params.CELULAR}%'`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteRepository.buscarEstudiantes =>', error);
                throw error;
            }
        });
        this.modificarEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { ID } = params;
                delete params.ID;
                const query = yield (0, util_1.generarConsulta)("registros", params, `ID = ${ID}`);
                const data = Object.values(params);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteRepository.modificarEstudiante =>', (error));
                throw error;
            }
        });
        this.registrarEInscribirEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `CALL RegistrarEstudianteComoAdministrador (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)`;
                console.log('Query ejecutado:', connection.format(query, params));
                const resp = yield connection.promise().execute(query, params);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteRepository.registrarEInscribirEstudiante', error);
            }
        });
    }
}
exports.EstudianteRepository = EstudianteRepository;
