"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminUsuario_rest_api_1 = __importDefault(require("./adminUsuario.rest.api"));
class AdministradorRouting {
    constructor() {
        this.usuarioAdmin = new adminUsuario_rest_api_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.use('/admin', this.usuarioAdmin.router);
    }
}
exports.default = new AdministradorRouting().router;
