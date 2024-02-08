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
Object.defineProperty(exports, "__esModule", { value: true });
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
const util_1 = require("../../../util/util");
class VoucherRepository {
    constructor() {
        this.obtenerVouchers = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
                SELECT 
                    pagos.*,
                    CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO
                FROM pagos
                LEFT JOIN registros ON pagos.dni = registros.dni
                ORDER BY ID DESC
            `;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('VoucherRepository.obtenerVouchers => ', error);
                throw error;
            }
        });
        this.buscarEstudianteParaVoucher = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT CONCAT(AP_PATERNO, ' ', AP_MATERNO, ' ', NOMBRES) AS NOMBRE_COMPLETO FROM registros WHERE DNI LIKE '%${params.DNI}%'`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('VoucherRepository.buscarEstudianteParaVoucher => ', error);
                throw error;
            }
        });
        this.buscarVoucher = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM pagos WHERE ID_PROCESO LIKE '%${params.ID_PROCESO}%' AND CODIGO LIKE '%${params.CODIGO}%' AND DNI LIKE '%${params.DNI}%'`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('VoucherRepository.buscarVoucher => ', error);
                throw error;
            }
        });
        this.crearVoucher = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('pagos', params, null);
                const data = Object.values(params);
                console.log(query, data);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('VoucherRepository.crearVoucher => ', error);
                throw error;
            }
        });
    }
}
exports.default = VoucherRepository;
