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
exports.AulasRepository = void 0;
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
const util_1 = require("../../../util/util");
class AulasRepository {
    constructor() {
        this.obtenerAulas = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
            SELECT 
                aulas.*, 
                procesos.NOMBRE AS NOMBRE_PROCESO,
                CONCAT(COUNT(inscritos.ID_AULA), ' / ', aulas.CAPACIDAD) AS INSCRITOS_CAPACIDAD
            FROM aulas 
            LEFT JOIN procesos ON aulas.ID_PROCESO = procesos.ID 
            LEFT JOIN inscritos ON aulas.ID = inscritos.ID_AULA
            GROUP BY aulas.ID
            ORDER BY aulas.ID DESC;
            `;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error("AulasRepository.obtenerAulas =>", (error));
                throw error;
            }
        });
        this.buscarAulas = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        SELECT 
            aulas.*, 
            aulas.ID AS AULA_ID, 
            procesos.NOMBRE AS NOMBRE_PROCESO, 
            CONCAT(COUNT(inscritos.ID_AULA), ' / ', aulas.CAPACIDAD) AS INSCRITOS_CAPACIDAD
        FROM 
            aulas
        LEFT JOIN 
            procesos ON aulas.ID_PROCESO = procesos.ID
        LEFT JOIN 
            inscritos ON aulas.ID = inscritos.ID_AULA
        WHERE 
            aulas.ID_PROCESO LIKE '%${params.ID_PROCESO}%'
            AND aulas.NOMBRE_AULA LIKE '%${params.NOMBRE_AULA}%' 
            AND aulas.CAPACIDAD LIKE '%${params.CAPACIDAD}%'
            AND aulas.TURNO LIKE '%${params.TURNO}%'
        GROUP BY 
            aulas.ID
        ORDER BY 
            aulas.ID DESC;
    
        `;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error("AulasRepository.buscarAulas =>", (error));
                throw error;
            }
        });
        this.registarNuevaAula = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('aulas', params, null);
                const data = Object.values(params);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('AulasRepository.registrarNuevaAula =>', error);
                throw error;
            }
        });
        this.cerrarAula = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `UPDATE aulas SET OCUPADO = 1 WHERE ID = ${params.ID}`;
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('AulasRepository.cerrarAula =>', error);
                throw error;
            }
        });
        this.abrirAula = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `UPDATE aulas SET OCUPADO = 0 WHERE ID = ${params.ID}`;
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('AulasRepository.abrirAula =>', error);
                throw error;
            }
        });
        this.modificarAula = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ID = params.ID;
                delete params.ID;
                const query = yield (0, util_1.generarConsulta)('aulas', params, `ID = ${ID}`);
                const data = Object.values(params);
                const resp = yield connection.promise().execute(query, data);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('AulasRepository.modificarAula => ', error);
                throw error;
            }
        });
        this.verificarSiHayAulaDisponible = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT aulas.id
        FROM aulas
        JOIN procesos ON aulas.ID_PROCESO = procesos.ID
        WHERE aulas.ocupado = false AND
          aulas.ID_PROCESO = '${params.ID_PROCESO}' AND
          procesos.estado = true
        ORDER BY aulas.id ASC
        LIMIT 1`;
                const [rows] = connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('AulasRepository.verificarSiHayAulaDisponible => ', error);
                throw error;
            }
        });
        this.obtenerEstudiantesPorAula = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
                SELECT
                  reg.DNI,
                  CONCAT(reg.AP_PATERNO ,' ' , reg.AP_MATERNO, ' ', reg.NOMBRES) AS NOMBRE_COMPLETO,
                  reg.CELULAR,
                  dat_c.CELULAR_APO AS CELULAR_APODERADO
                FROM inscritos ins
                LEFT JOIN registros reg ON reg.DNI = ins.DNI
                LEFT JOIN dat_complementarios dat_c ON dat_c.DNI = ins.DNI
                LEFT JOIN aulas au ON au.ID = ins.ID_AULA
                WHERE au.ID = ${params.ID_AULA}`;
                console.log('Query ejecutado:', connection.format(query, params));
                console.log('Query ejecutado 2:', query);
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('AulasRepository.obtenerEstudiantesPorAula => ', error);
                throw error;
            }
        });
    }
}
exports.AulasRepository = AulasRepository;
