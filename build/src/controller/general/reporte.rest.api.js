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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_1 = require("express");
const reportes_service_1 = require("../../services/general/reportes/reportes.service");
class ReporteController {
    constructor() {
        this.obtenerPrimerosPuestos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const result = yield this.reporteService.obtenerPrimerosPuestos(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerPagos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const result = yield this.reporteService.obtenerPagos(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerEstudiatesPorAula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const result = yield this.reporteService.obtenerEstudiatesPorAula(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerInscritosPorProceso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const result = yield this.reporteService.obtenerInscritosPorProceso(params);
                res.status(200).json(result);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        this.obtenerReporteInscritosPorCarreras = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const result = yield this.reporteService.obtenerReporteInscritosPorCarreras(params);
                res.status(200).json(result);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        this.obtenerReporteInscritosPorSede = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query;
                const result = yield this.reporteService.obtenerReporteInscritosPorSede(params);
                res.status(200).json(result);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
        this.reporteService = new reportes_service_1.ReporteService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    /**
       * Este método establece las rutas para el ReporteController.
       * Mapea las solicitudes HTTP GET a las funciones de generación de informes correspondientes.
       *
       * @remarks
       * Las rutas se definen de la siguiente manera:
       * - GET /reporte-primeros-puestos: Llama a la función `obtenerPrimerosPuestos`.
       * - GET /reporte-pagos: Llama a la función `obtenerPagos`.
       * - GET /reporte-estudiantes-por-aula: Llama a la función `obtenerEstudiatesPorAula`.
       * - GET /reporte-inscritos-por-proceso: Llama a la función `obtenerInscritosPorProceso`.
       *
       * Cada función se envuelve en un `asyncHandler` para manejar operaciones asíncronas y errores.
       *
       * @returns {void}
       */
    routes() {
        this.router.get("/reporte-primeros-puestos", (0, express_async_handler_1.default)(this.obtenerPrimerosPuestos));
        this.router.get('/reporte-pagos', (0, express_async_handler_1.default)(this.obtenerPagos));
        this.router.get('/reporte-estudiantes-por-aula', (0, express_async_handler_1.default)(this.obtenerEstudiatesPorAula));
        this.router.get('/reporte-inscritos-por-proceso', (0, express_async_handler_1.default)(this.obtenerInscritosPorProceso));
        this.router.get('/reporte-inscritos-por-carrera', (0, express_async_handler_1.default)(this.obtenerReporteInscritosPorCarreras));
        this.router.get('/reporte-inscritos-por-sede', (0, express_async_handler_1.default)(this.obtenerReporteInscritosPorSede));
    }
}
exports.default = ReporteController;
