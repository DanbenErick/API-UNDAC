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
exports.ReporteService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const reportesGeneral_repo_1 = require("../../../repository/general/reportes/reportesGeneral.repo");
class ReporteService {
    constructor() {
        this.obtenerPrimerosPuestos = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                params = {
                    PROCESO: params.PROCESO || '',
                    COD_CARRERA: params.COD_CARRERA || '',
                };
                const result = yield this.reporteRepo.obtenerPrimerosPuestos(dbConex, params);
                return result;
                // if(result.length > 0) return { ok: true, message: 'Se encontro los datos complementarios' }
                // return { ok: false, message: 'No se encontro los datos complementarios' }
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerPagos = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.reporteRepo.obtenerPagos(dbConex, params);
                return result;
                // if(result.length > 0) return { ok: true, message: 'Se encontro los datos complementarios' }
                // return { ok: false, message: 'No se encontro los datos complementarios' }
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerEstudiatesPorAula = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.reporteRepo.obtenerEstudiatesPorAula(dbConex, params);
                return result;
                // if(result.length > 0) return { ok: true, message: 'Se encontro los datos complementarios' }
                // return { ok: false, message: 'No se encontro los datos complementarios' }
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerInscritosPorProceso = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                params = {
                    PROCESO: params.PROCESO || '',
                    COD_CARRERA: params.COD_CARRERA || '',
                };
                const result = yield this.reporteRepo.obtenerInscritosPorProceso(dbConex, params);
                return result;
            }
            catch (err) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerReporteInscritosPorCarreras = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                params = {
                    PROCESO: params.PROCESO || '',
                    COD_CARRERA: params.COD_CARRERA || '',
                };
                const result = yield this.reporteRepo.obtenerReporteInscritosPorCarreras(dbConex, params);
                return result;
            }
            catch (err) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerReporteInscritosPorSede = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                params = {
                    PROCESO: params.PROCESO || '',
                    COD_CARRERA: params.COD_CARRERA || '',
                };
                const result = yield this.reporteRepo.obtenerReporteInscritosPorSede(dbConex, params);
                return result;
            }
            catch (err) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.reporteRepo = new reportesGeneral_repo_1.ReportesGeneralRepository();
    }
}
exports.ReporteService = ReporteService;
