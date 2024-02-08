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
const Carreras_service_1 = require("../../services/administrador/carreras/Carreras.service");
class CarrerasController {
    constructor() {
        this.obtenerCarreras = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.carrerasService.obtenerCarreras();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.buscarCarreraPorFacultad = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.carrerasService.buscarCarreraPorFacultad(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.crearCarrera = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.carrerasService.crearCarrera(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.modificarCarrera = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const result = yield this.carrerasService.modificarCarrera(params);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.carrerasService = new Carreras_service_1.CarrerasService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/obtener-carreras', (0, express_async_handler_1.default)(this.obtenerCarreras));
        this.router.post('/buscar-por-facultad', (0, express_async_handler_1.default)(this.buscarCarreraPorFacultad));
        this.router.post('/crear-carrera', (0, express_async_handler_1.default)(this.crearCarrera));
        this.router.put('/modificar-carrera', (0, express_async_handler_1.default)(this.modificarCarrera));
    }
}
exports.default = CarrerasController;
