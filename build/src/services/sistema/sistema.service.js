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
const connection_mysqldb_1 = __importDefault(require("../../config/connection.mysqldb"));
const sistema_repository_1 = __importDefault(require("../../repository/sistema/sistema.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SistemaService {
    constructor() {
        this.crearUsuarioAdmin = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                params.ROL = 1;
                params.FECHA_REGISTRO = new Date();
                const password = params.PASSWORD;
                const salt = yield bcrypt_1.default.genSalt(10);
                const password_encript = yield bcrypt_1.default.hash(password, salt);
                params.PASSWORD = password_encript;
                const existenteUsuario = yield this.sistemaRepo.encontrarDuplidoUsuario(dbConex, params);
                if (existenteUsuario.length > 0) {
                    return { ok: true, duplicateUser: true, message: 'Hay otro usuario con dni con este usuario registrado' };
                }
                const result = yield this.sistemaRepo.crearUsuarioAdmin(dbConex, params);
                if (result[0].affectedRows > 0) {
                    if (!process.env.JWT_TOKEN_SECRET) {
                        throw new Error('JWT_TOKEN_SECRET must be defined');
                    }
                    const token = jsonwebtoken_1.default.sign({ id: result[0].insertId, usuario: params.USUARIO, rol: 'ADMINISTRADOR', dni: params.DNI, }, process.env.JWT_TOKEN_SECRET, {
                        expiresIn: 3600 * 3
                    });
                    const decoded = jsonwebtoken_1.default.decode(token);
                    return {
                        ok: true,
                        duplicateUser: false,
                        message: 'Se registro usuario correctamente',
                        user: params.USUARIO,
                        name: params.NOMBRES || 'USUARIO',
                        rol: 'ADMINISTRADOR',
                        token,
                        expiresAt: decoded.exp * 1000
                    };
                }
                return { ok: false, duplicateUser: false, message: 'Ocurrio un error al resitrar usuario  omn ' };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.loginUsuarioAdmin = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.sistemaRepo.loginUsuarioAdmin(dbConex, params);
                if (result.length == 0)
                    return { ok: false, message: 'No se encontro usuario' };
                const validarPassword = yield bcrypt_1.default.compare(params.PASSWORD, result[0].PASSWORD);
                if (!validarPassword)
                    return { ok: false, message: 'Usuario o contraseña incorrecta' };
                if (!process.env.JWT_TOKEN_SECRET) {
                    throw new Error('JWT_TOKEN_SECRET must be defined');
                }
                const token = jsonwebtoken_1.default.sign({ id: result[0].ID, usuario: result[0].USUARIO, rol: 'ADMINISTRADOR', dni: result[0].DNI, }, process.env.JWT_TOKEN_SECRET, {
                    expiresIn: 3600 * 3
                });
                // send response with token 
                const decoded = jsonwebtoken_1.default.decode(token);
                return {
                    ok: true,
                    message: 'Se autentico correctamente',
                    user: result[0].USUARIO,
                    name: result[0].NOMBRES || 'USUARIO',
                    rol: result[0].ROL,
                    token,
                    expiresAt: decoded.exp * 1000
                };
                // return result
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.cerrarSesionAdmin = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const tokenBlacklist = new Set();
                const { TOKEN } = params;
                tokenBlacklist.add(TOKEN);
                // TODO: Añadido a la lista negra el token
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.loginUsuarioEstudiante = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.sistemaRepo.loginUsuarioEstudiante(dbConex, params);
                if (result.length == 0)
                    return { ok: false, message: 'No se encontro usuario' };
                console.log(params.PASSWORD, result[0].PASSWORD);
                const validarPassword = yield bcrypt_1.default.compare(params.PASSWORD, result[0].PASSWORD);
                if (!validarPassword)
                    return { ok: false, message: 'Usuario o contraseña incorrecta' };
                if (!process.env.JWT_TOKEN_SECRET) {
                    throw new Error('JWT_TOKEN_SECRET must be defined');
                }
                const token = jsonwebtoken_1.default.sign({ id: result[0].ID, rol: 'ESTUDIANTE', dni: result[0].DNI, usuario: result[0].USUARIO }, process.env.JWT_TOKEN_SECRET, {
                    expiresIn: 3600 * 3
                });
                const decoded = jsonwebtoken_1.default.decode(token);
                return {
                    ok: true,
                    message: 'Se autentico correctamente',
                    name: result[0].NOMBRES || 'USUARIO',
                    dni: result[0].DNI,
                    rol: result[0].ROL,
                    token,
                    expiresAt: decoded.exp * 1000
                };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.sistemaRepo = new sistema_repository_1.default();
    }
}
exports.default = SistemaService;
