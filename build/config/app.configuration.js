"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modulos externos
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
// Modulos Propios
// Rutas
const app_routing_module_1 = require("../app-routing.module");
class AppConfiguration {
    constructor() {
        this.ApiRoutes = new app_routing_module_1.ApiRoutes();
        this.app = (0, express_1.default)();
        this.initApp();
    }
    initApp() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, './../public')));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)({
            origin: '*',
            exposedHeaders: 'Content-Disposition',
        }));
        this.app.use((0, morgan_1.default)('HTTP=:method RUTA=:url CODIDO_RESPUESTA=:status RES=:res[content-length] - TIEMPO_RESPUESTA=:response-time ms ORIGEN=:remote-addr'));
        this.app.use(this.ApiRoutes.app);
    }
}
exports.default = AppConfiguration;
