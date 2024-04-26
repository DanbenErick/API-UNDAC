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
exports.ProcesosService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const procesos_repository_1 = require("../../../repository/administrador/procesos/procesos.repository");
// import { EstadosHttp } from '../../../constantes/mensajes/mensajes.constant';
class ProcesosService {
    constructor() {
        this.obtenerProcesos = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.procesosRepo.obtenerProcesos(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.crearProceso = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                //TODO: Se desabilito la verificacion si hay un proceso abierto
                // const consultaProcesoAbierto: any[] = await this.procesosRepo.verificarSiHayProcesoAbierto(dbConnect, "")
                // if(consultaProcesoAbierto.length > 0) {
                //     return {ok: true, procesoAbiertoExistente: true, message: 'Ya hay un proceso abierto ahora'}
                // }
                const result = yield this.procesosRepo.crearProceso(dbConnect, params);
                if (result[0].affectedRows > 0) {
                    return { ok: true, procesoAbiertoExistente: false, message: 'Proceso llevado exitosamente' };
                }
                else {
                    return { ok: false, procesoAbiertoExistente: false, message: 'Proceso no llevado correctamente' };
                }
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.cerrarProceso = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                params.ESTADO = 0;
                const resp = yield this.procesosRepo.cerrarProceso(dbConnect, params);
                if (resp[0].affectedRows > 0) {
                    return { ok: true, message: 'Proceso llevado exitosamente' };
                }
                else {
                    return { ok: false, message: 'Proceso no llevado correctamente' };
                }
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.obtenerInscritosPorSede = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.procesosRepo.obtenerInscritosPorSede(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.obtenerInscritosPorCarrera = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.procesosRepo.obtenerInscritosPorCarrera(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.obtenerInscritosPorArea = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.procesosRepo.obtenerInscritosPorArea(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.obtenerInscritosEstudianteDatos = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.procesosRepo.obtenerInscritosEstudianteDatos(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.obtenerInscritosPorModalidad = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.procesosRepo.obtenerInscritosPorModalidad(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.abrirProceso = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.procesosRepo.abrirProceso(dbConnect, params);
                if (resp[0].affectedRows > 0) {
                    return { ok: true, message: 'Proceso abierto exitosamente' };
                }
                else {
                    return { ok: false, message: 'Proceso no abierto correctamente' };
                }
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.actualizarProceso = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.procesosRepo.actualizarProceso(dbConnect, params);
                if (resp[0].affectedRows > 0) {
                    return { ok: true, message: 'Proceso abierto exitosamente' };
                }
                else {
                    return { ok: false, message: 'Proceso no abierto correctamente' };
                }
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.generarReporte = ({ ID_PROCESO, COD_CARRERA }) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const params = {
                    ID_PROCESO: ID_PROCESO || '',
                    COD_CARRERA: COD_CARRERA || ''
                };
                const resp = yield this.procesosRepo.generarReporte(dbConnect, params);
                return resp;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.procesosRepo = new procesos_repository_1.ProcesosRepository();
        // this.asignarOpcionesRolRepository = new MantenimientoOpcionesRolRepository();
    }
}
exports.ProcesosService = ProcesosService;
