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
exports.CarrerasService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const carreras_repository_1 = require("../../../repository/administrador/carreras/carreras.repository");
class CarrerasService {
    constructor() {
        this.obtenerCarreras = () => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.carrerasRepo.obtenerCarreras(dbConnect);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.buscarCarreraPorFacultad = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.carrerasRepo.buscarCarreraPorFacultad(dbConex, params);
                return result;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.modificarCarrera = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.carrerasRepo.modificarCarrera(dbConex, params);
                if (result[0].affectedRows > 0) {
                    return { ok: true, message: 'Guardado correctamente' };
                }
                return { ok: false, message: 'Ocurrio un error al guardar' };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.crearCarrera = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.carrerasRepo.crearCarrera(dbConnect, params);
                if (resp[0].affectedRows > 0) {
                    return { ok: true, message: 'Guardado correctamente' };
                }
                return { ok: false, message: 'Ocurrio un error al guardar' };
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.carrerasRepo = new carreras_repository_1.CarrerasRepository();
    }
}
exports.CarrerasService = CarrerasService;
