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
exports.AulasService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const aulas_repository_1 = require("../../../repository/administrador/aulas/aulas.repository");
class AulasService {
    constructor() {
        this.obtenerAulas = () => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.aulasRepo.obtenerAulas(dbConnect);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.registrarNuevoAula = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const [resp] = yield this.aulasRepo.registarNuevaAula(dbConex, params);
                if (resp.affectedRows > 0)
                    return { ok: true, message: 'Guardado correctamente' };
                return { ok: false, message: 'No se llego a guardar' };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.modificarAula = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const [resp] = yield this.aulasRepo.modificarAula(dbConex, params);
                if (resp.affectedRows > 0)
                    return { ok: true, message: 'Guardado correctamente' };
                return { ok: false, message: 'No se llego a guardar' };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.buscarAula = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                params.ID_PROCESO = params.ID_PROCESO || '';
                params.NOMBRE_AULA = params.NOMBRE_AULA || '';
                params.CAPACIDAD = params.CAPACIDAD || '';
                params.TURNO = params.TURNO || '';
                const resp = yield this.aulasRepo.buscarAulas(dbConex, params);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.cerrarAula = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const [resp] = yield this.aulasRepo.cerrarAula(dbConex, params);
                if (resp.affectedRows > 0)
                    return { ok: true, message: 'Aula cerrada correctamente' };
                return { ok: false, message: 'No se llego a guardar' };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.abrirAula = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const [resp] = yield this.aulasRepo.abrirAula(dbConex, params);
                if (resp.affectedRows > 0)
                    return { ok: true, message: 'Aula abierta correctamente' };
                return { ok: false, message: 'No se llego a guardar' };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.generarPdf = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.aulasRepo.obtenerEstudiantesPorAula(dbConex, params);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
            // construirPdfAula((data: any) => {
            // }, () => {
            // })
            // const pdfBuffer = await generarPdfAula('http://google.com')
            // return pdfBuffer
        });
        this.aulasRepo = new aulas_repository_1.AulasRepository();
    }
}
exports.AulasService = AulasService;
