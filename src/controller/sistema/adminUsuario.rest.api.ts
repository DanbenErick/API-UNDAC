import { Request, Response, Router } from 'express';
import SistemaService from '../../services/sistema/sistema.service'
import asyncHandler from 'express-async-handler';
import { UsuarioInteface } from '../../interfaces/administrador/usuario.interface';
import jwt from 'jsonwebtoken'


class UsuarioADminController {
    public router: Router;
    public sistemaService: SistemaService
    constructor() {
        this.sistemaService = new SistemaService();
        this.router = Router();
        this.routes();
    }

    public crearUsuaroAdmin = async (req: Request, res: Response) => {
        try {
            const params: UsuarioInteface = req.body
            console.log(params.CODIGO)
            if(params.CODIGO_ACCESO === '4c72a78b-61d8-41a8-867c-3ea7f3a4210c') {
                delete params.CODIGO_ACCESO
                const result = await this.sistemaService.crearUsuarioAdmin(params)
                res.status(200).json(result)
            }else {
                res.status(403).json({message: 'No tienes los permisos nesesarios'})
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

    public loginUsuarioAdmin = async (req: Request, res: Response) => {
        try {
            const params: UsuarioInteface = req.body
            const resp: any = await this.sistemaService.loginUsuarioAdmin(params)
            res.status(200).header('auth-token', resp.token).json(resp)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    public cerrarSesionAdmin = async(req: Request, res: Response) => {
        try {
            const params = req.body
            const resp: any = await this.sistemaService.cerrarSesionAdmin(params)
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public loginUsuarioEstudiante = async(req: Request, res: Response) => {
        try {
            const params = req.body
            const resp = await this.sistemaService.loginUsuarioEstudiante(params)
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    routes() {
        this.router.post('/crear-usuario', asyncHandler(this.crearUsuaroAdmin))
        this.router.post('/login-usuario', asyncHandler(this.loginUsuarioAdmin))
        this.router.post('/cerrar-sesion', asyncHandler(this.cerrarSesionAdmin))
        this.router.post('/login-estudiante', asyncHandler(this.loginUsuarioEstudiante))
    }
}

export default UsuarioADminController 