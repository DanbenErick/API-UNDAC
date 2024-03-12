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
    }
}
exports.CordinadorRepository = CordinadorRepository;
