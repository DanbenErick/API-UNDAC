"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Modulos de Extenos
 *
 */
require('dotenv').config();
/**
 *
 * Modulos Propios
 *
 */
const server_1 = __importDefault(require("./config/server"));
class Index {
    constructor() {
        new server_1.default();
    }
}
new Index();
