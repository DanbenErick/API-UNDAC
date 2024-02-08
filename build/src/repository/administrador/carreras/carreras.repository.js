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
exports.CarrerasRepository = void 0;
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
const util_1 = require("../../../util/util");
class CarrerasRepository {
    constructor() {
        this.obtenerCarreras = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM carreras`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error("CarrerasRepository.obtenerCarreras =>", (error));
                throw error;
            }
        });
        this.buscarCarreraPorFacultad = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM carreras WHERE FACULTAD = '${params.FACULTAD}'`;
                //Editar carrera
                // const query = await generarConsulta('carreras', params, `ID = ${params.ID}`)
                // const result = await connection.promise().execute(query, params)
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('CarrerasRepository.CarrerasRepository => ', error);
            }
        });
        this.modificarCarrera = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { ID } = params;
                delete params.ID;
                const query = yield (0, util_1.generarConsulta)('carreras', params, `ID = ${ID}`);
                const data = Object.values(params);
                const result = yield connection.promise().execute(query, data);
                return result;
            }
            catch (error) {
                manager_log_resource_1.logger.error('CarreraRepository.modificarCarrera => ', error);
            }
        });
        this.crearCarrera = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('carreras', params, null);
                const data = Object.values(params);
                const result = yield connection.promise().execute(query, data);
                return result;
            }
            catch (error) {
                manager_log_resource_1.logger.error('CarrerasRepository.crearCarrera => ', error);
                throw error;
            }
        });
    }
}
exports.CarrerasRepository = CarrerasRepository;
