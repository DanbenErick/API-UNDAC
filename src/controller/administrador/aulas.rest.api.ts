import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { AulasService } from '../../services/administrador/aulas/aulas.service'
import { AulasInterface } from '../../interfaces/administrador/aulas.interface'
import { construirPdfAula } from '../../util/util'


class AulasController {
    public router: Router
    public aulasService: AulasService
    
    public constructor() {
        this.aulasService = new AulasService()
        this.router = Router()
        this.routes()
    }
    public obtenerAulas = async(req: Request, res: Response) => {
        try {
            const result = await this.aulasService.obtenerAulas()
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public crearAula = async(req: Request, res:Response) => {
        try {
            const params: AulasInterface = req.body
            const result = await this.aulasService.registrarNuevoAula(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public modificarAula = async(req: Request, res: Response) => {
        try {
            const params: AulasInterface = req.body
            const result = await this.aulasService.modificarAula(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public buscarAula = async(req: Request, res: Response) => {
      try {
        const params: AulasInterface = req.body
        const result = await this.aulasService.buscarAula(params)
        res.status(200).json(result)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public generarPdf = async(req: Request, res: Response) => {
        // const params = {ID_AULA: 14}
        const params = req.body
        const resp = await this.aulasService.generarPdf(params)
        console.log(resp)
        const stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "content-Disposition": "attachment; filename=invoice.pdf"
        })
        await construirPdfAula(
            (data: any) => stream.write(data), 
            () =>  stream.end(),
            resp,
            {AULA: '4 A', TURNO: 'MAÑANA', PROCESO: 'CEPRE III 2024'}
        )

        // const pdfBuffer = await this.aulasService.generarPdf()
        // res.status(200).set({
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Credentials": true,
        //     "Content-Type": "application/pdf"
        // }).end(pdfBuffer)
    }
    public cerrarAula = async(req: Request, res: Response) => {
        try {
            const params: AulasInterface = req.body
            const result = await this.aulasService.cerrarAula(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public abrirAula = async(req: Request, res: Response) => {
        try {
            const params: AulasInterface = req.body
            const result = await this.aulasService.abrirAula(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public routes() {
        this.router.put('/cerrar-aula', asyncHandler(this.cerrarAula))
        this.router.put('/abrir-aula', asyncHandler(this.abrirAula))
        this.router.get('/obtener-aulas', asyncHandler(this.obtenerAulas))
        this.router.post('/generar-pdf', asyncHandler(this.generarPdf))
        this.router.post('/buscar-aula', asyncHandler(this.buscarAula))
        this.router.post('/crear-aula', asyncHandler(this.crearAula))
        this.router.put('/modificar-aula', asyncHandler(this.modificarAula))
        
    
    }
}
export default AulasController