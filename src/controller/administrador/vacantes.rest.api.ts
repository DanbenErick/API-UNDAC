import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { VacantesService } from '../../services/administrador/vacantes/Vacantes.service'
import { VacantesInterface } from '../../interfaces/administrador/vacantes.interface'

class VacantesController {
    public router: Router
    public vacantesService: VacantesService
    
    public constructor() {
        this.vacantesService = new VacantesService()
        this.router = Router()
        this.routes()
    }
    public obtenerVacantes = async(req: Request, res: Response) => {
        try {
            const params = {}
            const result = await this.vacantesService.obtenerVacantes(params)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public obtenerVacantesPorProceso = async(req: Request, res:Response) => {
        try {
            const params = {ID_PROCESO: Number(req.query.ID_PROCESO)}
            const result = await this.vacantesService.obtenerVacantesPorProceso(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public verificarDisponibilidadProceso = async(req: Request, res:Response) => {
        try {
            const params: VacantesInterface = {ID_PROCESO: Number(req.query.ID_PROCESO)}
            const result = await this.vacantesService.verificarDisponibilidadProceso(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public crearVacante = async(req: Request, res: Response) => {
        try {
            const datosMiddleware = (req as any).locals;
            const params: VacantesInterface = req.body
            params.USUARIO_REGISTRO = datosMiddleware.id
            const result = await this.vacantesService.crearVacante(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public oobtenerCarrerasPorProcesoInput = async(req: Request, res: Response) => {
        try {
            const result = await this.vacantesService.obtenerCarrerasPorProcesoInput()
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public routes() {
        this.router.get('/obtener-vacantes', asyncHandler(this.obtenerVacantes))
        this.router.get('/obtener-vacantes-proceso', asyncHandler(this.obtenerVacantesPorProceso))
        this.router.get('/verificar-proceso-id', asyncHandler(this.verificarDisponibilidadProceso))
        this.router.get('/obtener-carreras-inputs', asyncHandler(this.oobtenerCarrerasPorProcesoInput))
        
        this.router.post('/crear-vacante', asyncHandler(this.crearVacante))
    
    }
}
export default VacantesController