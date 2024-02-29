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
exports.ResultadosAdministradorService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const resultados_repo_1 = require("../../../repository/administrador/resultados/resultados.repo");
// import { AulasInterface } from '../../../interfaces/administrador/aulas.interface'
// import { AulasRepository } from '../../../repository/administrador/aulas/aulas.repository'
class ResultadosAdministradorService {
    constructor() {
        this.procesarCSVSolapas = () => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                // const result = await this.aulasRepo.obtenerAulas(dbConnect)
                // return result
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.duplicarDNIInscritosAResultados = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.resultadosRepo.duplicarDNIInscritosAResultados(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.establecerNotasPorDaraCode = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConexion = yield connection_mysqldb_1.default.connectMysql();
            try {
                const total_params = params.length;
                let i = 0;
                for (const element of params) {
                    const result = yield this.resultadosRepo.establecerNotasPorDaraCode(dbConexion, element);
                    if (result && result[0].affectedRows === 1) {
                        i++;
                    }
                }
                console.log("contenido de indices", total_params, i);
                if (total_params === i) {
                    return { ok: true, message: 'Se registro las notas de los estudiantes' };
                }
                return { ok: false, message: 'No se registro completamente las notas de los estudiantes' };
            }
            catch (error) {
                yield dbConexion.rollback();
            }
            finally {
                yield dbConexion.close();
            }
        });
        this.actualizarDaraCodePorDNI = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const total_params = params.length;
                let i = 0;
                for (const element of params) {
                    const result = yield this.resultadosRepo.actualizarDaraCodePorDNI(dbConnect, element);
                    if (result && result[0].affectedRows === 1) {
                        i++;
                    }
                }
                if (total_params === i) {
                    return { ok: true, message: 'Se registro correctamente todos los daracodes' };
                }
                return { ok: false, message: 'Ocurrio un error al registrar los daracodes' };
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.asignarIngresantesPorCarreraOrdinario = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp_vacantes_por_carrera = yield this.resultadosRepo.obtenerVacantesPorCarreraOrdinario(dbConnect, { ID_PROCESO: 26 });
                let i = 0;
                for (const vacante of resp_vacantes_por_carrera) {
                    const params_ingresantes = {
                        COD_CARRERA: vacante.CODIGO_ESCUELA,
                        PROCESO: vacante.ID_PROCESO,
                        LIMIT: vacante.CANTIDAD
                    };
                    const resp_asignar_ingresante_por_carrera = yield this.resultadosRepo.establecerIngresantesPorCarreraOrdinario(dbConnect, params_ingresantes);
                    if (resp_asignar_ingresante_por_carrera[0].affectedRows) {
                        i++;
                    }
                }
                for (const vacante of resp_vacantes_por_carrera) {
                    const params_ingresantes = {
                        ID_PROCESO: vacante.ID_PROCESO,
                        COD_CARRERA: vacante.CODIGO_ESCUELA,
                        PROCESO: vacante.ID_PROCESO,
                        LIMIT: vacante.CANTIDAD
                    };
                    console.log("Actualizando orden de merito");
                    const resp_orden_merito_ingresantes_ordinario = yield this.resultadosRepo.establecerOrdenMeritoIngresantesOrdinario(dbConnect, params_ingresantes);
                    const resp_orden_merito_no_ingresantes_ordinario = yield this.resultadosRepo.establecerOrdenMeritoDiferentesAIngresantes(dbConnect, params_ingresantes);
                    console.log(resp_orden_merito_ingresantes_ordinario, resp_orden_merito_no_ingresantes_ordinario);
                }
                if (resp_vacantes_por_carrera.length === i) {
                    return { ok: true, data: 'Se registraron los ingresantes' };
                }
                return { ok: false, data: 'No se registraron los ingresantes' };
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.resultadosRepo = new resultados_repo_1.ResultadosAdministradorRepository();
    }
}
exports.ResultadosAdministradorService = ResultadosAdministradorService;
