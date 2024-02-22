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
        this.resultadosRepo = new resultados_repo_1.ResultadosAdministradorRepository();
    }
}
exports.ResultadosAdministradorService = ResultadosAdministradorService;
