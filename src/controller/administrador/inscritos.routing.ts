import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { InscritosService } from '../../services/administrador/inscritos/inscritos.service'
import { InscritosInterface } from '../../interfaces/administrador/inscritos.interface'

class InscritosController {
    public router: Router
    public inscritosService: InscritosService
    
    public constructor() {
        this.inscritosService = new InscritosService()
        this.router = Router()
        this.routes()
    }
    public obtenerInscritos = async(req: Request, res: Response) => {
        try {
            const result = await this.inscritosService.obtenerInscritos()
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public buscarInscrito = async(req: Request, res: Response) => {
        try {
            const params: InscritosInterface = req.body
            const result = await this.inscritosService.buscarInscrito(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }

    public modificarInscrito = async(req: Request, res: Response) => {
        try {
            const params: InscritosInterface = req.body
            const result = await this.inscritosService.modificarInscrito(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public inscribirEstudiante = async(req: Request, res: Response) => {
        try {
            const params: InscritosInterface = req.body
            const result = await this.inscritosService.inscribirEstudiante(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    
    
    public routes() {
        this.router.get('/obtener-inscritos', asyncHandler(this.obtenerInscritos))
        this.router.post('/buscar-inscrito', asyncHandler(this.buscarInscrito))
        this.router.put('/modificar-inscrito', asyncHandler(this.modificarInscrito))
        this.router.post('/incribir-estudiante', asyncHandler(this.inscribirEstudiante))
        
    
    }
}
export default InscritosController