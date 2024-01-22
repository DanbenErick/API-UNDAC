import { Router } from 'express';
// import { MantenimientoOpcionesController } from './mantenimiento-opciones/mantenimiento-opciones.rest.api';
// import { MantenimientoOpcionesRolController } from './mantenimiento-opciones-rol/MantenimientoOpcionesRol.rest.api';
// import { MantenimientoRolesController } from './mantenimiento-roles/mantenimiento-roles.rest.api';
// import { MantenimientoTipoGraficosController } from './mantenimiento-tipo-graficos/mantenimiento-tipo-graficos.rest.api';
// import { MantenimientoUsuarioController } from './mantenimiento-usuario/MantenimientoUsuario.rest.api';

class SeguridadRouting {

  public router: Router;
//   public mantenimientoRoles: MantenimientoRolesController;
//   public mantenimientoUsuarios: MantenimientoUsuarioController;
//   public mantenimientoTipoGraficos: MantenimientoTipoGraficosController;
//   public mantenimientoOpcionesRol: MantenimientoOpcionesRolController;
//   public mantenimientoOpciones: MantenimientoOpcionesController;


  public constructor() {
//     this.mantenimientoRoles = new MantenimientoRolesController();
//     this.mantenimientoTipoGraficos = new MantenimientoTipoGraficosController();
//     this.mantenimientoUsuarios = new MantenimientoUsuarioController();
//     this.mantenimientoOpcionesRol = new MantenimientoOpcionesRolController();
//     this.mantenimientoOpciones = new MantenimientoOpcionesController();
    this.router = Router();
//     this.routes();
  }

//   public routes() {
//     this.router.use('/', this.mantenimientoRoles.router);
//     this.router.use('/mantenimiento-tipo-graficos', this.mantenimientoTipoGraficos.router);
//     this.router.use('/mantenimiento-opciones', this.mantenimientoOpciones.router);
//     this.router.use('/mantenimiento-usuarios', this.mantenimientoUsuarios.router);
//     this.router.use('/asignar-opciones-rol', this.mantenimientoOpcionesRol.router);

//   }
}

export default new SeguridadRouting().router;