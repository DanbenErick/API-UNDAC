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
exports.InscritosService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const inscritos_repository_1 = require("../../../repository/administrador/inscritos/inscritos.repository");
class InscritosService {
    constructor() {
        this.obtenerInscritos = () => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.inscritosRepo.obtenerInscritos(dbConnect);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.buscarInscrito = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                params = {
                    PROCESO: params.PROCESO || '',
                    COD_CARRERA: params.COD_CARRERA || '',
                    DNI: params.DNI || '',
                    SEDE_EXAM: params.SEDE_EXAM || ''
                };
                const result = yield this.inscritosRepo.buscarInscritos(dbConex, params);
                return result;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.modificarInscrito = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const [result] = yield this.inscritosRepo.modificarInscritos(dbConex, params);
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
        this.inscribirEstudiante = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                delete params.TURNO;
                const [result] = yield this.inscritosRepo.inscribirEstudiante(dbConex, params);
                if (result.affectedRows > 0)
                    return { ok: true, message: 'Se inscrito correctamente' };
                return { ok: false, message: 'No se pudo inscribir' };
            }
            catch (error) {
                if (error.code && error.code === 'ER_DUP_ENTRY') {
                    return { ok: false, message: "El estudiante ya esta inscrito en este proceso" };
                }
                else {
                    yield dbConex.rollback();
                }
            }
            finally {
                yield dbConex.close();
            }
        });
        this.inscritosRepo = new inscritos_repository_1.InscritosRepository();
    }
}
exports.InscritosService = InscritosService;
