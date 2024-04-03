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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CordinadorService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cordinador_repo_1 = require("../../../repository/administrador/cordinador/cordinador.repo");
class CordinadorService {
    constructor() {
        this.obtenerCordinadores = () => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.cordinadorRepo.obtenerCordinadores(dbConnect);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.crearCordinador = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const password_encript = yield bcrypt_1.default.hash(params.PASSWORD || '', salt);
                params.PASSWORD = password_encript;
                const result = yield this.cordinadorRepo.crearCordinador(dbConnect, params);
                if (result[0].affectedRows > 0) {
                    return { ok: true, message: 'Cordinador registrado correctamente' };
                }
                return { ok: false, message: 'Cordinador no se registrado correctamente' };
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.buscarCordinador = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                params = {
                    USUARIO: params.USUARIO || '',
                    DNI: params.DNI || ''
                };
                const result = yield this.cordinadorRepo.buscarCordinadorPorUsuario(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.modificarCordinador = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.cordinadorRepo.modificarCordinador(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.modifcarEstadoCordinador = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.cordinadorRepo.modifcarEstadoCordinador(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.obtenerIngresantesParaContanciaProDNIyProceso = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                params = {
                    dni: params.dni || '',
                    proceso: params.proceso || ''
                };
                const result = yield this.cordinadorRepo.obtenerIngresantesParaContanciaProDNIyProceso(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.obtenerIngresantes = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.cordinadorRepo.obtenerIngresantes(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.cordinadorRepo = new cordinador_repo_1.CordinadorRepository();
    }
}
exports.CordinadorService = CordinadorService;
