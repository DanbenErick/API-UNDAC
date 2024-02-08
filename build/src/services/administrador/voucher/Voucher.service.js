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
exports.VoucherService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const voucher_repository_1 = __importDefault(require("../../../repository/administrador/voucher/voucher.repository"));
class VoucherService {
    constructor() {
        this.obtenerVouchers = () => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.voucherRepo.obtenerVouchers(dbConex);
                return result;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.buscarVoucher = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.voucherRepo.buscarVoucher(dbConex, params);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.buscarEstudianteParaVoucher = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.voucherRepo.buscarEstudianteParaVoucher(dbConex, params);
                return resp;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                dbConex.close();
            }
        });
        this.crearVoucher = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const resp = yield this.voucherRepo.crearVoucher(dbConex, params);
                if (resp[0].affectedRows > 0) {
                    return { ok: true, message: "Guardado correctamente" };
                }
                return { ok: false, message: "Ocurrio un error al guardar" };
            }
            catch (error) {
                if (error.code && error.code === 'ER_DUP_ENTRY') {
                    return { ok: false, message: "El estudiante ya registro este pago" };
                }
                yield dbConex.rollback();
            }
            finally {
                dbConex.close();
            }
        });
        this.voucherRepo = new voucher_repository_1.default();
    }
}
exports.VoucherService = VoucherService;
