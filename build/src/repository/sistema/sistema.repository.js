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
const manager_log_resource_1 = require("../../resources/manager-log.resource");
const util_1 = require("../../util/util");
class SistemaRepository {
    constructor() {
        this.encontrarDuplidoUsuario = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `select * from usuarios WHERE USUARIO = '${params.USUARIO}' OR DNI ='${params.USUARIO}'`;
                const [rows, fields] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('SistemaRepository.encontrarDuplicado => ', error);
                throw error;
            }
        });
        this.crearUsuarioAdmin = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = Object.values(params);
                const query = yield (0, util_1.generarConsulta)('usuarios', params, null);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('SistemaRepository.crearUsuario => ', error);
                throw error;
            }
        });
        this.loginUsuarioAdmin = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `select * from usuarios WHERE USUARIO = '${params.USUARIO}' OR DNI = '${params.USUARIO}'`;
                const [rows, fields] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('SistemaRepository.loginUsuario => ', error);
                throw error;
            }
        });
        this.loginUsuarioEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM registros WHERE DNI = '${params.USUARIO}'`;
                const [rows] = yield connection.promise().execute(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('SistemaRepository.loginUsuarioEstudiante => ', error);
                throw error;
            }
        });
    }
}
exports.default = SistemaRepository;
