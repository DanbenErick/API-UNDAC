"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inputs_controls_rest_api_1 = require("./inputs-controls.rest.api");
class InputControlsRouting {
    constructor() {
        this.inputsControls = new inputs_controls_rest_api_1.InputsControlsController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.use('', this.inputsControls.router);
    }
}
exports.default = new InputControlsRouting().router;
