import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { EstudiantesGeneralService } from '../../services/general/estudiantes/EstudianteGeneral.service'
import { EstudianteInterface } from '../../interfaces/administrador/estudiantes.interface'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { EstudianteCompleto } from '../../interfaces/administrador/EstudianteCompleto.interface'



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const nombreSinExtension = file.originalname.split('.')[0];
        const directorioDestino = `./uploads/${nombreSinExtension}`;

        // Verificar si el directorio existe, y si no, crearlo
        if (!fs.existsSync(directorioDestino)) {
        fs.mkdirSync(directorioDestino, { recursive: true });
        }
        cb(null, `./uploads/${nombreSinExtension}`);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

class EstudianteController {
    public router: Router
    public estudianteService: EstudiantesGeneralService
    
    public constructor() {
        this.estudianteService = new EstudiantesGeneralService()
        this.router = Router()
        this.routes()
    }
    public consultarEstudianteExiste = async(req: Request, res: Response) => {
        try {
            const params: EstudianteInterface = req.body
            const result = await this.estudianteService.consultarEstudianteExiste(params)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public registrarEstudiante = async(req: Request, res: Response) => {
        try {
            const params: EstudianteInterface = req.body
            params.IP_DIRECCION = req.ip
            console.log(req.ip)
            const resp = await this.estudianteService.registrarEstudiante(params)
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public inscribirEstudiante = async(req: Request, res: Response) => {
        try {
            const params: EstudianteCompleto = req.body
            
            console.table(params)
            const resp: any = await this.estudianteService.inscribirEstudianteProcedimientoAlmacenado(params)

            // const resp_1: any = await this.estudianteService.registrarDatosComplementarios(params)
            // const resp_2: any = await this.estudianteService.registrarInscripcionEstudiante(params)
            
            if(!resp.ok) {
                res.status(200).json({ok: false, message: 'No se llego a registrar'})
                return
            }
            res.status(200).json({ok: true, message: 'Se guardo los cambios correctamente' })
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public subirFotoEstudiante = async(req: any, res: Response) => {
        try {
            if (!req.file) { 
                res.status(200).json({ error: 'No se proporcionó ningún archivo.' });
            }
            res.status(200).json({ok: true, message: 'Foto subido correctamente'})
            
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public subirDocumentacionEstudiante = async(req: any, res: Response) => {
        try {
            if(!req.file) {
                res.status(200).json({ error: 'No se proporcionó ningún archivo.' });
            }
            res.status(200).json({ok: true, message: 'Documento subido correctamente'})
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public registrarTestPsicologico = async(req: Request, res:Response) => {
        try {
            const params: any = req.body
            const resp = await this.estudianteService.registrarTestPsicologicoEstudiante(params);
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public verificarTestpsicologicoInscrito = async(req: Request, res: Response) => {
        try {
            const params: any = req.body
            const resp = await this.estudianteService.verificarTestpsicologicoInscrito(params);
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public verificarInscripcionEstudiante = async(req: Request, res: Response) => {
        try {
            const params: any = req.body
            const resp = await this.estudianteService.verificarInscripcionEstudiante(params);
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public verificarDatosCompletamerioEstudiante = async(req: Request, res: Response) => {
        try {
            const params: any = req.body
            const resp = await this.estudianteService.verificarDatosCompletamerioEstudiante(params);
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public authenticateToken = (req: any, res: any, next: any) => {
        try {
          // const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
          const token = req.token
          console.log(token)
          if (!token) {
            throw new Error('Authentication failed!');
          }
          // const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
          if(!process.env.JWT_TOKEN_SECRET) {
            throw new Error('JWT_TOKEN_SECRET must be defined');
          }
          const verified: any = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
          if(verified.rol === 'ESTUDIANTE'){ next() }
          else {res.status(401).json({message: 'No tienes los permisos nesesarios'})}
        } catch (err) {
          res.status(401).send({ok: false, message: 'Tu token ya se vencio'});
        }
      }

      public obtenerMisPagos = async(req: Request, res: Response) => {
        try {
            const params: any = req.body
            const resp = await this.estudianteService.obtenerMisPagos(params);
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
      }
    public routes() {
        this.router.post('/consultar-dni', asyncHandler(this.consultarEstudianteExiste))
        this.router.post('/registrar-estudiante', asyncHandler(this.registrarEstudiante))
        this.router.post('/inscribir-estudiante', this.authenticateToken, asyncHandler(this.inscribirEstudiante))
        this.router.post('/subir-foto-estudiante', this.authenticateToken, upload.single('foto'), asyncHandler(this.subirFotoEstudiante))
        this.router.post('/subir-documentos-estudiante', this.authenticateToken, upload.single('documento'), asyncHandler(this.subirDocumentacionEstudiante))
        this.router.post('/registrar-test-psicologico', this.authenticateToken, asyncHandler(this.registrarTestPsicologico))
        this.router.post('/verificar-test-psicologico-inscrito', this.authenticateToken,  asyncHandler(this.verificarTestpsicologicoInscrito))
        this.router.post('/verificar-inscripcion-estudiante', this.authenticateToken, asyncHandler(this.verificarInscripcionEstudiante))
        this.router.post('/verificar-registro-complementario-estudiante', this.authenticateToken, asyncHandler(this.verificarDatosCompletamerioEstudiante))
        
        this.router.post('/obtener-mis-pagos', this.authenticateToken, asyncHandler(this.obtenerMisPagos))
    }
}
export default EstudianteController