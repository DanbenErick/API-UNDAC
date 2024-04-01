import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { CordinadorService } from '../../services/administrador/cordinador/cordinador.service'


class CordinadorController {
    public router: Router
    public cordinadorService: CordinadorService
    
    public constructor() {
        this.cordinadorService = new CordinadorService()
        this.router = Router()
        this.routes()
    }
    public obtenerCordinadores = async(req: Request, res: Response) => {
        try {
            const result = await this.cordinadorService.obtenerCordinadores()
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public buscarCordinador = async(req: Request, res: Response) => {
        try {
            const params = req.body
            const result = await this.cordinadorService.buscarCordinador(params)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public crearCordinador = async(req: Request, res: Response) => {
        try {
            const params = req.body
            const result = await this.cordinadorService.crearCordinador(params)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }

    public modificarCordinador = async(req: Request, res: Response) => {
        try {
            const params = req.body
            const result = await this.cordinadorService.modificarCordinador(params)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    
    public modifcarEstadoCordinador = async(req: Request, res: Response) => {
        try {
            const params = req.query
            const result = await this.cordinadorService.modifcarEstadoCordinador(params)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public obtenerIngresantes = async(req: Request, res: Response) => {
        try {
            const params = req.query
            const result = await this.cordinadorService.obtenerIngresantes(params)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public obtenerIngresantesParaContanciaProDNIyProceso = async(req: Request, res: Response) => {
        try {
            const params = req.query
            const result = await this.cordinadorService.obtenerIngresantesParaContanciaProDNIyProceso(params)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
   
    public routes() {
        this.router.get('/obtener-ingresantes', asyncHandler(this.obtenerIngresantes))
        this.router.get('/obtener-ingresantes-para-contancia-pro-dni-y-proceso', asyncHandler(this.obtenerIngresantesParaContanciaProDNIyProceso))
        this.router.get('/modificar-estado-cordinador', asyncHandler(this.modifcarEstadoCordinador))
        this.router.get('/obtener-cordinadores', asyncHandler(this.obtenerCordinadores))
        this.router.post('/buscar-cordinador', asyncHandler(this.buscarCordinador))
        this.router.post('/crear-cordinador', asyncHandler(this.crearCordinador))
        this.router.put('/modificar-cordinador', asyncHandler(this.modificarCordinador))
        // this.router.post('/buscar-voucher', asyncHandler(this.buscarVoucher))
        
        
    
    }
}
export default CordinadorController

