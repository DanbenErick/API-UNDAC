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
    public obtenerInscritosPorArea = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const result: any = await this.procesosService.obtenerInscritosPorArea(params)
        res.status(200).json(result)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public obtenerInscritosPorCarrera = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const result: any = await this.procesosService.obtenerInscritosPorCarrera(params)
        res.status(200).json(result)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public obtenerInscritosPorModalidad = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const result: any = await this.procesosService.obtenerInscritosPorModalidad(params)
        res.status(200).json(result)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public obtenerInscritosEstudianteDatos = async (req: Request, res: Response) => {
      try {
        const params = req.body
        // ID_PROCESO
        const result: any = await this.procesosService.obtenerInscritosEstudianteDatos(params)
        res.status(200).json(result)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public abrirProceso = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const result = await this.procesosService.abrirProceso(params)
        res.status(200).json(result)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public actualizarProceso = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const result = await this.procesosService.actualizarProceso(params)
        res.status(200).json(result)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    routes() {
      this.router.put('/actualizar-proceso', asyncHandler(this.actualizarProceso))
      this.router.get('/obtener-procesos', asyncHandler(this.obtenerProcesos))
      this.router.post('/crear-proceso', asyncHandler(this.crearProceso))
      this.router.post('/abrir-proceso', asyncHandler(this.abrirProceso))
      this.router.post('/cerrar-proceso', asyncHandler(this.cerrarProceso))
      this.router.post('/obtener-inscritos-por-sede', asyncHandler(this.obtenerInscritosPorSede))

      this.router.post('/obtener-inscritos-por-carrera', asyncHandler(this.obtenerInscritosPorCarrera))
      this.router.post('/obtener-inscritos-por-modalidad', asyncHandler(this.obtenerInscritosPorModalidad))
      this.router.post('/obtener-inscritos-por-area', asyncHandler(this.obtenerInscritosPorArea))
      
      this.router.post('/obtener-inscritos-datos-estudiante', asyncHandler(this.obtenerInscritosEstudianteDatos))
    }
}

export { ProcesosController };