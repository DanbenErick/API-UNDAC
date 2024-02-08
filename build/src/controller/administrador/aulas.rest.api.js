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
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const aulas_service_1 = require("../../services/administrador/aulas/aulas.service");
const util_1 = require("../../util/util");
class AulasController {
    constructor() {
        this.obtenerAulas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.aulasService.obtenerAulas();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.crearAula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.aulasService.registrarNuevoAula(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.modificarAula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.aulasService.modificarAula(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.buscarAula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.aulasService.buscarAula(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.generarPdf = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // const params = {ID_AULA: 14}
            const params = req.body;
            const resp = yield this.aulasService.generarPdf(params);
            console.log(resp);
            const stream = res.writeHead(200, {
                "Content-Type": "application/pdf",
                "content-Disposition": "attachment; filename=invoice.pdf"
            });
            yield (0, util_1.construirPdfAula)((data) => stream.write(data), () => stream.end(), resp, { AULA: '4 A', TURNO: 'MAÑANA', PROCESO: 'CEPRE III 2024' });
            // const pdfBuffer = await this.aulasService.generarPdf()
            // res.status(200).set({
            //     "Access-Control-Allow-Origin": "*",
            //     "Access-Control-Allow-Credentials": true,
            //     "Content-Type": "application/pdf"
            // }).end(pdfBuffer)
        });
        this.cerrarAula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.aulasService.cerrarAula(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.abrirAula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.aulasService.abrirAula(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.aulasService = new aulas_service_1.AulasService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.put('/cerrar-aula', (0, express_async_handler_1.default)(this.cerrarAula));
        this.router.put('/abrir-aula', (0, express_async_handler_1.default)(this.abrirAula));
        this.router.get('/obtener-aulas', (0, express_async_handler_1.default)(this.obtenerAulas));
        this.router.post('/generar-pdf', (0, express_async_handler_1.default)(this.generarPdf));
        this.router.post('/buscar-aula', (0, express_async_handler_1.default)(this.buscarAula));
        this.router.post('/crear-aula', (0, express_async_handler_1.default)(this.crearAula));
        this.router.put('/modificar-aula', (0, express_async_handler_1.default)(this.modificarAula));
    }
}
exports.default = AulasController;
