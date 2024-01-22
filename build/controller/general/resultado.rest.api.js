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
const resultados_service_1 = require("../../services/general/resultados/resultados.service");
class ResultadoController {
    constructor() {
        this.obtenerResultadosPorCarreraYProceso = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = { P_OPCION: req.params.carrera };
                const result = yield this.resultadoService.obtenerResultadosPorCarreraYProceso(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.resultadoService = new resultados_service_1.ResultadosService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/obtener-resultados-carrera/:carrera', (0, express_async_handler_1.default)(this.obtenerResultadosPorCarreraYProceso));
    }
}
exports.default = ResultadoController;
