import { Router } from 'express';
import SistemaController from '../../services/sistema/sistema.service';
import UsuarioADminController from './adminUsuario.rest.api';

class AdministradorRouting {
    public router: Router;
    public usuarioAdmin: UsuarioADminController;
    public constructor() {
        this.usuarioAdmin = new UsuarioADminController()
        this.router = Router();
        this.routes();
    }
    public routes() {
        this.router.use('/admin', this.usuarioAdmin.router)
    }
}
export default new AdministradorRouting().router;