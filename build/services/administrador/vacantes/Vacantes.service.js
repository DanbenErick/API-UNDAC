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
exports.VacantesService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const vacantes_repository_1 = __importDefault(require("../../../repository/administrador/vacantes/vacantes.repository"));
class VacantesService {
    constructor() {
        this.obtenerVacantes = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.vacantesRepo.obtenerVacantes(dbConnect);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.obtenerVacantesPorProceso = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.vacantesRepo.obtenerVacantesPorProceso(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.obtenerCarrerasPorProcesoInput = () => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.vacantesRepo.obtenerCarrerasPorProcesoInput(dbConnect);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.verificarDisponibilidadProceso = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.vacantesRepo.verificarDisponibilidadProceso(dbConnect, params);
                if (result.length > 0) {
                    return { ok: true, message: 'El proceso esta abierto' };
                }
                return { ok: false, message: 'El proceso esta cerrado' };
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.crearVacante = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.vacantesRepo.crearVacante(dbConnect, params);
                if (result[0].affectedRows > 0) {
                    return { ok: true, procesoAbiertoExistente: false, message: 'Se creo correctamente la vacante' };
                }
                else {
                    return { ok: false, procesoAbiertoExistente: false, message: 'No se llego a regsitrar la vacante' };
                }
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.vacantesRepo = new vacantes_repository_1.default();
    }
}
exports.VacantesService = VacantesService;
