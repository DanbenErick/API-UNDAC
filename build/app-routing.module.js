"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRoutes = void 0;
// Modulos Externos
const express_1 = __importDefault(require("express"));
const express_bearer_token_1 = __importDefault(require("express-bearer-token"));
// Routes
const administrador_routing_1 = __importDefault(require("./controller/administrador/administrador.routing"));
const inputs_controls_routing_1 = __importDefault(require("./controller/input-controls/inputs-controls.routing"));
const sistema_routing_1 = __importDefault(require("./controller/sistema/sistema.routing"));
const general_routing_1 = __importDefault(require("./controller/general/general.routing"));
class ApiRoutes {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.static('uploads'));
        this.app.use(express_1.default.static('public'));
        this.app.use((0, express_bearer_token_1.default)());
        this.routes();
    }
    routes() {
        this.app.use('/administrador', this.trimRequest, administrador_routing_1.default);
        this.app.use('/input-controls', this.trimRequest, inputs_controls_routing_1.default);
        this.app.use('/sistema', this.trimRequest, sistema_routing_1.default);
        this.app.use('/general', this.trimRequest, general_routing_1.default);
    }
    trimRequest(req, res, next) {
        // Realizar trim a los valores en el cuerpo de la solicitud
        if (req.body) {
            for (const key in req.body) {
                if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                    const value = req.body[key];
                    if (typeof value === 'string') {
                        req.body[key] = value.trim();
                    }
                }
            }
        }
        next();
    }
}
exports.ApiRoutes = ApiRoutes;
