"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estudiantes_rest_api_1 = __importDefault(require("./estudiantes.rest.api"));
const resultado_rest_api_1 = __importDefault(require("./resultado.rest.api"));
class generalRouting {
    constructor() {
        this.estudiante = new estudiantes_rest_api_1.default();
        this.resultado = new resultado_rest_api_1.default;
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.use('/estudiantes', this.estudiante.router);
        this.router.use('/resultados', this.resultado.router);
    }
}
exports.default = new generalRouting().router;
