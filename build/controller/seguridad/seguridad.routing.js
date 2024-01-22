"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { MantenimientoOpcionesController } from './mantenimiento-opciones/mantenimiento-opciones.rest.api';
// import { MantenimientoOpcionesRolController } from './mantenimiento-opciones-rol/MantenimientoOpcionesRol.rest.api';
// import { MantenimientoRolesController } from './mantenimiento-roles/mantenimiento-roles.rest.api';
// import { MantenimientoTipoGraficosController } from './mantenimiento-tipo-graficos/mantenimiento-tipo-graficos.rest.api';
// import { MantenimientoUsuarioController } from './mantenimiento-usuario/MantenimientoUsuario.rest.api';
class SeguridadRouting {
    //   public mantenimientoRoles: MantenimientoRolesController;
    //   public mantenimientoUsuarios: MantenimientoUsuarioController;
    //   public mantenimientoTipoGraficos: MantenimientoTipoGraficosController;
    //   public mantenimientoOpcionesRol: MantenimientoOpcionesRolController;
    //   public mantenimientoOpciones: MantenimientoOpcionesController;
    constructor() {
        //     this.mantenimientoRoles = new MantenimientoRolesController();
        //     this.mantenimientoTipoGraficos = new MantenimientoTipoGraficosController();
        //     this.mantenimientoUsuarios = new MantenimientoUsuarioController();
        //     this.mantenimientoOpcionesRol = new MantenimientoOpcionesRolController();
        //     this.mantenimientoOpciones = new MantenimientoOpcionesController();
        this.router = (0, express_1.Router)();
        //     this.routes();
    }
}
exports.default = new SeguridadRouting().router;
