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
exports.EstudiantesGeneralService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const estudianteGeneral_repo_1 = require("../../../repository/general/estudiante/estudianteGeneral.repo");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class EstudiantesGeneralService {
    constructor() {
        this.verificarInscripcionEstudiante = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.estudianteRepo.verificarInscripcionEstudiante(dbConex, params);
                if (result.length > 0)
                    return { ok: true, message: 'Se encontro la inscripcion del estudiante' };
                return { ok: false, message: 'No se encontro la inscripcion del estudiante' };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.verificarDatosCompletamerioEstudiante = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.estudianteRepo.verificarDatosCompletamerioEstudiante(dbConex, params);
                if (result.length > 0)
                    return { ok: true, message: 'Se encontro los datos complementarios' };
                return { ok: false, message: 'No se encontro los datos complementarios' };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerMisPagos = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.estudianteRepo.obtenerMisPagos(dbConex, params);
                return result;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.verificarTestpsicologicoInscrito = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.estudianteRepo.verificarTestpsicologicoInscrito(dbConex, params);
                if (result.length > 0)
                    return { ok: true, message: 'Se encontro su test psicologico' };
                return { ok: false, message: 'No se encontro su test psicologico' };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.consultarEstudianteExiste = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.estudianteRepo.consultarEstudianteExiste(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.inscribirEstudianteProcedimientoAlmacenado = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            const data = [
                params.DNI || '',
                params.COD_CARRERA || '',
                params.PROCESO || '',
                params.SEDE_EXAM || '',
                params.PAGO_1 || '',
                params.PAGO_2 || '',
                params.PREPARATORIA || '',
                params.ID_AULA || '',
                params.ID_TIPO_MODALIDAD || null,
                params.YEAR_CONCLU || '',
                params.SEXO || '',
                params.FECHA_NACIMIENTO || '',
                params.LUGAR_RESIDENCIA || '',
                params.DIRECCION || '',
                params.DISCAPACIDAD || '',
                params.TIPO_DISCAPACIDAD || '',
                params.ETNICA || '',
                params.CELULAR || '',
                params.TELEFONO || '',
                params.RUTA_FOTO || '',
                params.NOMBRE_COLEGIO || '',
                params.TIPO_COLEGIO || '',
                params.NOMBRE_COMPLETO_APO || '',
                params.CELULAR_APO || '',
                params.DNI_APO || '',
                params.DEPARTAMENTO || '',
                params.PROVINCIA || '',
                params.DISTRITO || '',
            ];
            try {
                const [result] = yield this.estudianteRepo.inscribirEstudianteConProcedimientoAlmacenado(dbConex, data);
                console.log(result);
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
        this.registrarEstudiante = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const password = params.PASSWORD;
                const salt = yield bcrypt_1.default.genSalt(10);
                const password_encript = yield bcrypt_1.default.hash(password, salt);
                params.PASSWORD = password_encript;
                const [result] = yield this.estudianteRepo.registrarEstudiante(dbConex, params);
                console.log(result);
                if (result.affectedRows > 0) {
                    if (!process.env.JWT_TOKEN_SECRET) {
                        throw new Error('JWT_TOKEN_SECRET must be defined');
                    }
                    const token = jsonwebtoken_1.default.sign({ id: result.insertId, usuario: params.DNI, rol: 'ESTUDIANTE', dni: params.DNI, }, process.env.JWT_TOKEN_SECRET, {
                        expiresIn: 1800
                    });
                    const decoded = jsonwebtoken_1.default.decode(token);
                    return {
                        ok: true,
                        message: 'Se autentico correctamente',
                        user: params.DNI,
                        name: params.NOMBRES || 'USUARIO',
                        rol: 'ESTUDIANTE',
                        token,
                        expiresAt: decoded.exp * 1000
                    };
                }
                else {
                    return { ok: false, message: "Ocurrio un error al registrar" };
                }
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.registrarDatosComplementarios = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const data = {
                    DNI: params.DNI,
                    SEXO: params.SEXO,
                    FECHA_NACIMIENTO: params.FECHA_NACIMIENTO,
                    LUGAR_NACIMIENTO: params.LUGAR_NACIMIENTO,
                    DIRECCION: params.DIRECCION,
                    DISCAPACIDAD: params.DISCAPACIDAD,
                    TIPO_DISCAPACIDAD: params.TIPO_DISCAPACIDAD,
                    ETNICA: params.ETNICA,
                    CELULAR: params.CELULAR,
                    TELEFONO: params.TELEFONO,
                    RUTA_FOTO: params.RUTA_FOTO,
                    NOMBRE_COLEGIO: params.NOMBRE_COLEGIO,
                    TIPO_COLEGIO: params.TIPO_COLEGIO,
                    NOMBRE_COMPLETO_APO: params.NOMBRE_COMPLETO_APO,
                    CELULAR_APO: params.CELULAR_APO,
                    DNI_APO: params.DNI_APO,
                    FECHA_REGISTRO: new Date(),
                };
                const [result] = yield this.estudianteRepo.registrarDatosComplementariosEstudiante(dbConex, data);
                if (result.affectedRows > 0)
                    return { ok: true, message: "Se modifico correctamente" };
                return { ok: false, message: "Ocurrio un error al registrar" };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.registrarInscripcionEstudiante = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const data = {
                    DNI: params.DNI,
                    COD_CARRERA: params.COD_CARRERA,
                    PROCESO: params.PROCESO,
                    MODALIDAD: params.PROCESO,
                    SEDE_EXAM: params.SEDE_EXAM,
                    PAGO_1: params.PAGO_1 || 0,
                    PAGO_2: params.PAGO_2 || 0,
                    PREPARATORIA: 0,
                    YEAR_CONCLU: params.YEAR_CONCLU,
                    ID_AULA: params.ID_AULA,
                    FECHA_REGISTRO: new Date(),
                };
                const [resp_vacantes_aula] = yield this.estudianteRepo.cantidadDeVacantesAula(dbConex, params);
                const [resp_inscritos_por_aula] = yield this.estudianteRepo.cantidadDeInscritosPorAula(dbConex, params);
                let vacantes_aula = Number(resp_vacantes_aula.CAPACIDAD);
                let inscritos_por_aula = Number(resp_inscritos_por_aula.CANTIDAD);
                if (vacantes_aula > inscritos_por_aula) {
                    const [result] = yield this.estudianteRepo.registrarInscripcionEstudiante(dbConex, data);
                    if (vacantes_aula > inscritos_por_aula++) {
                        this.estudianteRepo.establecerPorOcupadaAula(dbConex, params);
                    }
                    if (result.affectedRows > 0) {
                        return { ok: true, message: "Se registro correctamente" };
                    }
                    return { ok: false, message: "Ocurrio un error al registrar" };
                }
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.registrarTestPsicologicoEstudiante = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            const { DNI, TEST_1_PREG_1, TEST_1_PREG_2, TEST_1_PREG_3, TEST_1_PREG_4, TEST_1_PREG_5, TEST_1_PREG_6, TEST_1_PREG_7, TEST_1_PREG_8, TEST_1_PREG_9, TEST_1_PREG_10, TEST_1_PREG_11, TEST_1_PREG_12, TEST_1_PREG_13, TEST_1_PREG_14, TEST_1_PREG_15, TEST_2_PREG_1, TEST_2_PREG_2, TEST_2_PREG_3, TEST_2_PREG_4, TEST_2_PREG_5, TEST_2_PREG_6, TEST_2_PREG_7, TEST_2_PREG_8, TEST_2_PREG_9, TEST_2_PREG_10, TEST_2_PREG_11, TEST_2_PREG_12, TEST_2_PREG_13, TEST_2_PREG_14, TEST_2_PREG_15, } = params;
            try {
                const data = {
                    DNI,
                    RESP_1: `${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}${TEST_1_PREG_1}`,
                    RESP_2: `${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}${TEST_2_PREG_1}`,
                    TOTAL_1: Number(TEST_1_PREG_1) +
                        Number(TEST_1_PREG_2) +
                        Number(TEST_1_PREG_3) +
                        Number(TEST_1_PREG_4) +
                        Number(TEST_1_PREG_5) +
                        Number(TEST_1_PREG_6) +
                        Number(TEST_1_PREG_7) +
                        Number(TEST_1_PREG_8) +
                        Number(TEST_1_PREG_9) +
                        Number(TEST_1_PREG_10) +
                        Number(TEST_1_PREG_11) +
                        Number(TEST_1_PREG_12) +
                        Number(TEST_1_PREG_13) +
                        Number(TEST_1_PREG_14) +
                        Number(TEST_1_PREG_15),
                    TOTAL_2: Number(TEST_2_PREG_1) +
                        Number(TEST_2_PREG_2) +
                        Number(TEST_2_PREG_3) +
                        Number(TEST_2_PREG_4) +
                        Number(TEST_2_PREG_5) +
                        Number(TEST_2_PREG_6) +
                        Number(TEST_2_PREG_7) +
                        Number(TEST_2_PREG_8) +
                        Number(TEST_2_PREG_9) +
                        Number(TEST_2_PREG_10) +
                        Number(TEST_2_PREG_11) +
                        Number(TEST_2_PREG_12) +
                        Number(TEST_2_PREG_13) +
                        Number(TEST_2_PREG_14) +
                        Number(TEST_2_PREG_15),
                    FECHA_REGISTRO: new Date(),
                };
                const [result] = yield this.estudianteRepo.registrarTestPsicologicoEstudiante(dbConex, data);
                if (result.affectedRows > 0) {
                    return { ok: true, message: "Se registro correctamente correctamente" };
                }
                return { ok: false, message: "Ocurrio un error al registrar" };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.estudianteRepo = new estudianteGeneral_repo_1.EstudianteGeneralRepository();
    }
}
exports.EstudiantesGeneralService = EstudiantesGeneralService;
