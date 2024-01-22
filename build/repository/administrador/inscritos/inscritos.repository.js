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
exports.InscritosRepository = void 0;
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
const util_1 = require("../../../util/util");
class InscritosRepository {
    constructor() {
        this.obtenerInscritos = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM vista_obtener_inscritos_admin ORDER BY ID DESC`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error("InscritosRepository.obtenerInscritos =>", error);
                throw error;
            }
        });
        this.buscarInscritos = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM vista_obtener_inscritos_admin WHERE PROCESO LIKE '%${params.PROCESO}%' AND DNI LIKE '%${params.DNI}%' AND COD_CARRERA LIKE '%${params.COD_CARRERA}%' AND SEDE_EXAM LIKE '%${params.SEDE_EXAM}%' ORDER BY ID DESC`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error("InscritosRepository.buscarInscritos =>", error);
                throw error;
            }
        });
        this.modificarInscritos = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { ID } = params;
                delete params.ID;
                const query = yield (0, util_1.generarConsulta)("inscritos", params, ` ID = ${ID}`);
                const data = Object.values(params);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error("InscritosRepository.modificarInscritos =>", error);
                throw error;
            }
        });
        this.inscribirEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)("inscritos", params, null);
                const data = Object.values(params);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error("InscritosRepository.inscribirEstudiante =>", error);
                throw error;
            }
        });
    }
}
exports.InscritosRepository = InscritosRepository;
