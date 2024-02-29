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
exports.ResultadosAdministradorRepository = void 0;
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
// import { generarConsulta } from '../../../util/util'
class ResultadosAdministradorRepository {
    constructor() {
        this.resultados = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM resultados";
                const [rows] = yield connection.promise().query(query);
                console.log(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.verificarInscripcionEstudiante =>', error);
            }
        });
        this.duplicarDNIInscritosAResultados = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        INSERT resultados(DNI, PROCESO, COD_CARRERA, SEDE)
        SELECT inscritos.DNI, inscritos.PROCESO, inscritos.COD_CARRERA, inscritos.SEDE_EXAM
        FROM inscritos  
        WHERE inscritos.PROCESO = ${params.ID_PROCESO};
      `;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.duplicarDNIInscritosAResultados =>', error);
            }
        });
        this.actualizarDaraCodePorDNI = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        UPDATE resultados
        SET
        DARACOD = ${params.DARACOD},
        ASISTENCIA = 'SE PRESENTO',
        AULA = ${params.AULA}
        WHERE DNI = ${params.DNI};
      `;
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.actualizarDaraCodePorDNI =>', error);
            }
        });
        this.establecerNotasPorDaraCode = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        UPDATE resultados
        SET
        PUNT_T = ${params['Nota directa'].substring(0, 6).replace(',', '.')},
        EST_OPCION = 'NO INGRESO'
        WHERE DARACOD = ${params.DARACOD};
      `;
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.establecerNotasPorDaraCode =>', error);
            }
        });
        this.obtenerVacantesPorCarreraOrdinario = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
      SELECT 
        vacantes.ID_CARRERA,
        vacantes.CANTIDAD,
        vacantes.ID_PROCESO,
        carreras.CODIGO_ESCUELA
      FROM vacantes
      LEFT JOIN carreras ON carreras.ID = vacantes.ID_CARRERA
      WHERE ID_PROCESO = ${params.ID_PROCESO} AND ID_MODALIDAD = 4
      ORDER BY ID_CARRERA ASC
      `;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.obtenerVacantesPorCarrera', error);
            }
        });
        this.establecerIngresantesPorCarreraOrdinario = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        UPDATE resultados 
        SET EST_OPCION = 'INGRESO' 
        WHERE 
          COD_CARRERA = '${params.COD_CARRERA}' AND
          PROCESO = '${params.PROCESO}'
        ORDER BY PUNT_T DESC
        LIMIT ${params.LIMIT}
      `;
                console.log("Consulta0. ", query);
                const resp = yield connection.promise().query(query);
                return resp;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.establecerIngresantesPorCarreraOrdinario =>', error);
            }
        });
    }
}
exports.ResultadosAdministradorRepository = ResultadosAdministradorRepository;
