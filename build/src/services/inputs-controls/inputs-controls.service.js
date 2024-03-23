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
exports.InputsControlsService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../config/connection.mysqldb"));
const inputs_controls_repository_1 = require("../../repository/inputs-controls/inputs-controls.repository");
class InputsControlsService {
    constructor() {
        this.obtenerLugarAutocomplete = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.inputsControlsRepo.obtenerLugarAutocomplete(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.obtenerPadronEstudiantes = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConexion = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.inputsControlsRepo.obtenerPadronEstudiantes(dbConexion, params);
                return result;
            }
            catch (error) {
                yield dbConexion.rollback();
            }
            finally {
                yield dbConexion.close();
            }
        });
        this.obtenerSedes = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConexion = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.inputsControlsRepo.obtenerSedes(dbConexion, params);
                return result;
            }
            catch (error) {
                yield dbConexion.rollback();
            }
            finally {
                yield dbConexion.close();
            }
        });
        this.obtenerDeclaracioneJuradas = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConexion = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.inputsControlsRepo.obtenerDeclaracioneJuradas(dbConexion, params);
                return result;
            }
            catch (error) {
                yield dbConexion.rollback();
            }
            finally {
                yield dbConexion.close();
            }
        });
        this.validarCordinador = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConexion = yield connection_mysqldb_1.default.connectMysql();
            try {
                params = {
                    USUARIO: params.CODIGO || params.DNI || '',
                };
                console.log(params, "patams");
                const resp = yield this.inputsControlsRepo.validarCordinador(dbConexion, params);
                if (resp.length > 0) {
                    return {
                        ok: true,
                        message: 'Bienvenido ' + resp[0].NOMBRES,
                        result: Object.assign({}, resp[0])
                    };
                }
                else {
                    return {
                        ok: false,
                        message: 'Cordinador desconocido'
                    };
                }
            }
            catch (error) {
                yield dbConexion.rollback();
            }
            finally {
                yield dbConexion.close();
            }
        });
        this.obtenerResultadosModalidades = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConexion = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.inputsControlsRepo.obtenerResultadosModalidades(dbConexion, params);
                return result;
            }
            catch (error) {
                yield dbConexion.rollback();
            }
            finally {
                yield dbConexion.close();
            }
        });
        this.obtenerResultadosOrdinario = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConexion = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.inputsControlsRepo.obtenerResultadosOrdinario(dbConexion, params);
                return result;
            }
            catch (error) {
                yield dbConexion.rollback();
            }
            finally {
                yield dbConexion.close();
            }
        });
        this.obtenerProcesos = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.inputsControlsRepo.obtenerProcesos(dbConex, params);
                return result;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerCarreras = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.inputsControlsRepo.obtenerCarreras(dbConex, params);
                return result;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerCarrerasPorCodigo = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.inputsControlsRepo.obtenerCarrerasPorCodigoCarrera(dbConex, params);
                return result;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerFacultades = () => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.obtenerFacultades(dbConex);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerDicapacidades = () => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.obtenerDiscapadidades(dbConex);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerRazasEtnicas = () => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.obtenerRazasEtnicas(dbConex);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerProcesoActivo = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.obtenerProcesoActivo(dbConex, params);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerTodosLosProcesosActivos = () => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.obtenerTodosLosProcesosActivos(dbConex);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerUbicacionesAutocomplete = () => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.obtenerUbicacionAutocomplete(dbConex);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerDepartamentos = () => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.obtenerDepartamentos(dbConex);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerProvincias = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.obtenerProvincias(dbConex, params);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerDistritos = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.obtenerDistritos(dbConex, params);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.buscarAulaPorTurno = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.buscarAulaPorTurno(dbConex, params);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerProcesosAbiertos = () => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.obtenerProcesosAbiertos(dbConex);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerModalidades = () => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.obtenerModalidades(dbConex);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.obtenerCarrerasPorModalidades = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.inputsControlsRepo.obtenerCarrerasPorModalidades(dbConex, params);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.inputsControlsRepo = new inputs_controls_repository_1.InputsControlsRepository();
    }
}
exports.InputsControlsService = InputsControlsService;
