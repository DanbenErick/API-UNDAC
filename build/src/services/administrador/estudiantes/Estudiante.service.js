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
exports.EstudiantesService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const estudiantes_repository_1 = require("../../../repository/administrador/estudiantes/estudiantes.repository");
class EstudiantesService {
    constructor() {
        this.obtenerEstudiantes = () => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.estudianteRepo.obtenerEstudiantes(dbConnect);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.buscarCarreraPorFacultad = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.estudianteRepo.buscarEstudiante(dbConex, params);
                return result;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.modificarEstudiante = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const [result] = yield this.estudianteRepo.modificarEstudiante(dbConex, params);
                if (result.affectedRows > 0)
                    return { ok: true, message: 'Se modifico correctamente' };
                return { ok: false, message: 'No se pudo modificar' };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.registrarEInscribirEstudiante = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                const password_encript = yield bcrypt_1.default.hash(params.DNI || '', salt);
                console.log("Contrrasela", password_encript);
                params.PASSWORD = password_encript;
                const data = [
                    params.DNI || '',
                    params.AP_PATERNO || '',
                    params.AP_MATERNO || '',
                    params.NOMBRES || '',
                    params.CELULAR_EST || '',
                    params.CORREO || '',
                    params.PASSWORD || '',
                    params.SEXO || '',
                    params.FECHA_NACIMIENTO || '',
                    params.LUGAR_RESIDENCIA || '',
                    params.DIRECCION || '',
                    params.DISCAPACIDAD || '',
                    params.TIPO_DISCAPACIDAD || '',
                    params.ETNICA || '',
                    params.TELEFONO || '',
                    params.RUTA_FOTO || '',
                    params.NOMBRE_COLEGIO || '',
                    params.TIPO_COLEGIO || '',
                    params.NOMBRE_COMPLETO_APO || '',
                    params.CELULAR_APO || '',
                    params.DNI_APO || '',
                    params.COD_CARRERA || '',
                    params.PROCESO || '',
                    params.SEDE_EXAM || '',
                    params.PAGO_1 || '0',
                    params.PAGO_2 || '0',
                    params.PREPARATORIA || '',
                    params.ID_AULA || null,
                    params.YEAR_CONCLU || '',
                ];
                console.log("DATA => ", data);
                const [result] = yield this.estudianteRepo.registrarEInscribirEstudiante(dbConex, data);
                console.log(result);
                // Función para generar número aleatorio entre min (incluido) y max (excluido)
                const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;
                // Generar números aleatorios entre 3 y 5, y almacenarlos en un arra
                let numerosAleatorios = [];
                for (let i = 0; i < 30; i++) {
                    numerosAleatorios.push(getRandomNumber(3, 6));
                }
                let sumaPrimeros15 = 0;
                let sumaUltimos15 = 0;
                for (let i = 0; i < 15; i++) {
                    sumaPrimeros15 += numerosAleatorios[i];
                }
                for (let i = 15; i < 30; i++) {
                    sumaUltimos15 += numerosAleatorios[i];
                }
                const primeros15 = numerosAleatorios.slice(0, 15);
                const ultimos15 = numerosAleatorios.slice(-15);
                const params2 = {
                    DNI: '',
                    RESP_1: primeros15.join(""),
                    RESP_2: ultimos15.join(""),
                    TOTAL_1: sumaPrimeros15,
                    TOTAL_2: sumaUltimos15,
                };
                const resp_2 = yield this.estudianteRepo.registrarActitudEstudianteComoAdmin(dbConex, params2);
                console.log(resp_2);
                if (result.affectedRows > 0)
                    return { ok: true, message: 'Se registró correctamente' };
                return { ok: false, message: 'No se pudo registrar' };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.estudianteRepo = new estudiantes_repository_1.EstudianteRepository();
    }
}
exports.EstudiantesService = EstudiantesService;
