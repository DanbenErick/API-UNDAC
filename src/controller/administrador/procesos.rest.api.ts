import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { ProcesosService } from '../../services/administrador/procesos/Procesos.service'

class ProcesosController {
    public router: Router;
    public procesosService: ProcesosService
    constructor() {    
        this.procesosService = new ProcesosService();
        this.router = Router();
        this.routes();
    }

    public obtenerProcesos = async(req: Request, res: Response) => {
        try {
          const params: any[] = []
          const result = await this.procesosService.obtenerProcesos(params);
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }

    public obtenerUsuarios = async (req: Request, res: Response) =>  {
      try {
        const { usuario } = req.query;
        let result;
        if(usuario != null) {
          // result = await this.mantenimientoUsuarioService.obtenerUsuarios(usuario);
        }else {
        //   result = await this.mantenimientoUsuarioService.obtenerUsuarios();
        }
        res.status(200).json(result)
      }catch(error) {
        // logger.error("obtenerusuarios => ruta ", error)
        res.status(500).json(error)
      }
    }

    public crearProceso = async (req: Request, res: Response) => {
      try {
        const datosMiddleware = (req as any).locals;
        const params = req.body
        params.USUARIO_REGISTRO = datosMiddleware.id
        const result:any = await this.procesosService.crearProceso(params)
        if(result.ok) {
          res.status(200).json(result)
          
        }else {
          res.status(500).json(result)
        }
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public cerrarProceso = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const result: any = await this.procesosService.cerrarProceso(params)
        res.status(200).json(result)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public obtenerInscritosPorSede = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const result: any = await this.procesosService.obtenerInscritosPorSede(params)
        res.status(200).json(result)
      }catch(error) {
        res.status(500).json(error)
      }
    }

    routes() {
      this.router.get('/obtener-procesos', asyncHandler(this.obtenerProcesos))
      this.router.post('/crear-proceso', asyncHandler(this.crearProceso))
      this.router.post('/cerrar-proceso', asyncHandler(this.cerrarProceso))
      this.router.post('/obtener-inscritos-por-sede', asyncHandler(this.obtenerInscritosPorSede))
    }
}

export { ProcesosController };