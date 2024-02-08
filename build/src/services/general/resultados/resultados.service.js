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
exports.ResultadosService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const resultado_repo_1 = require("../../../repository/general/resultado/resultado.repo");
class ResultadosService {
    constructor() {
        this.obtenerResultadosPorCarreraYProceso = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.resultadosRepo.obtenerResultadosPorCarreraYProceso(dbConex, params);
                return result;
                // if(result.length > 0) return { ok: true, message: 'Se encontro la inscripcion del estudiante' }
                // return { ok: false, message: 'No se encontro la inscripcion del estudiante' }
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.resultadosRepo = new resultado_repo_1.ResultadoGeneralRepository();
    }
}
exports.ResultadosService = ResultadosService;
