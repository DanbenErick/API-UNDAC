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
    }
}
exports.ResultadoGeneralRepository = ResultadoGeneralRepository;
