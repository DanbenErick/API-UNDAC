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
exports.ResultadoGeneralRepository = void 0;
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
class ResultadoGeneralRepository {
    constructor() {
        this.obtenerResultadosPorCarreraYProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        SELECT *,
          CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
          carreras.ESCUELA_COMPLETA
        FROM resultados_example 
        LEFT JOIN registros ON registros.DNI = resultados_example.PROCESO
        LEFT JOIN carreras ON carreras.CODIGO_ESCUELA = resultados_example.P_OPCION
        WHERE P_OPCION = ${params.P_OPCION} ORDER BY PUNT_T DESC;
      `;
                const [rows] = yield connection.promise().query(query);
                console.log(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.verificarInscripcionEstudiante =>', error);
            }
        });
        this.obtenerResultadoEstudiante = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
        SELECT
          procesos.NOMBRE AS NOMBRE_PROCESO,
          CONCAT(registros.AP_PATERNO, ' ', registros.AP_MATERNO, ' ', registros.NOMBRES) AS NOMBRE_COMPLETO,
          registros.DNI,
          registros.CELULAR,
          registros.CORREO,
          resultados.PUNT_T,
          carreras.ESCUELA_COMPLETA,
          dat_complementarios.SEXO,
          dat_complementarios.FECHA_NACIMIENTO,
          CONCAT(ubicaciones.DEPARTAMENTO, ' - ', ubicaciones.PROVINCIA, ' - ', ubicaciones.DISTRITO) AS RESIDENCIA,
          dat_complementarios.DIRECCION,
          dat_complementarios.DISCAPACIDAD,
          dat_complementarios.TIPO_COLEGIO,
          dat_complementarios.NOMBRE_COLEGIO,
          resultados.EST_OPCION
        FROM resultados 
        LEFT JOIN registros ON registros.DNI = resultados.DNI
        LEFT JOIN dat_complementarios ON dat_complementarios.DNI = resultados.DNI
        LEFT JOIN ubicaciones ON ubicaciones.UBIGEO = dat_complementarios.LUGAR_RESIDENCIA
        LEFT JOIN etnicas ON etnicas.ID = dat_complementarios.ETNICA
        LEFT JOIN carreras ON
          carreras.CODIGO_ESCUELA = resultados.COD_CARRERA
          OR
          carreras.OLD_COD_CARRERA = resultados.COD_CARRERA
        LEFT JOIN procesos ON procesos.ID = resultados.PROCESO
        WHERE resultados.DNI = ${params.DNI} AND resultados.PROCESO = ${params.PROCESO};
        `;
                console.log('Query: ', query);
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('EstudianteGeneralRepository.obtenerResultadoEstudiante =>', error);
            }
        });
    }
}
exports.ResultadoGeneralRepository = ResultadoGeneralRepository;
