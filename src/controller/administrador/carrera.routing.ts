import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { CarrerasService } from '../../services/administrador/carreras/Carreras.service'
import { CarreraInterface } from '../../interfaces/administrador/carreras.interface'

class CarrerasController {
    public router: Router
    public carrerasService: CarrerasService
    
    public constructor() {
        this.carrerasService = new CarrerasService()
        this.router = Router()
        this.routes()
    }
    public obtenerCarreras = async(req: Request, res: Response) => {
        try {
            const result = await this.carrerasService.obtenerCarreras()
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public buscarCarreraPorFacultad = async(req: Request, res: Response) => {
        try {
            const params: CarreraInterface = req.body
            const result = await this.carrerasService.buscarCarreraPorFacultad(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public crearCarrera = async(req: Request, res:Response) => {
        try {
            const params: CarreraInterface = req.body
            const result = await this.carrerasService.crearCarrera(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public modificarCarrera = async(req: Request, res: Response) => {
        try {
            const params: CarreraInterface = req.body
            const result = await this.carrerasService.modificarCarrera(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    
    public routes() {
        this.router.get('/obtener-carreras', asyncHandler(this.obtenerCarreras))
        this.router.post('/buscar-por-facultad', asyncHandler(this.buscarCarreraPorFacultad))
        this.router.post('/crear-carrera', asyncHandler(this.crearCarrera))
        this.router.put('/modificar-carrera', asyncHandler(this.modificarCarrera))
        
    
    }
}
export default CarrerasController