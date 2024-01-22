"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modulos Externos
const http = __importStar(require("http"));
// Propios
const app_configuration_1 = __importDefault(require("./app.configuration"));
class ServerConfig {
    constructor() {
        this.appConfig = new app_configuration_1.default();
        this.config();
    }
    config() {
        this.port = this.normalizePort(process.env.PORT || '3001');
        this.server = http.createServer(this.appConfig.app);
        this.createServer();
    }
    createServer() {
        this.appConfig.app.set('port', this.port);
        this.server.listen(this.port, () => {
            console.log(`****   SERVER INICIADO EN EL PUERTO ${this.port}   ****`);
        });
    }
    normalizePort(puerto) {
        var port = parseInt(puerto, 10);
        if (isNaN(port)) {
            return puerto;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    }
}
exports.default = ServerConfig;
