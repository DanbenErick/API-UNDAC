import { NextFunction, Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { EstudiantesService } from '../../services/administrador/estudiantes/Estudiante.service'
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';

const storageEst = multer.diskStorage({
  destination: (req, file, cb) => {
      const nombreSinExtension = file.originalname.split('.')[0];
      const directorioDestino = `./build/uploads/${nombreSinExtension}`;

      // Verificar si el directorio existe, y si no, crearlo
      if (!fs.existsSync(directorioDestino)) {
        fs.mkdirSync(directorioDestino, { recursive: true });
      }
      cb(null, `./build/uploads/${nombreSinExtension}`);
  },
  filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storageEst });

// Middleware para procesar imágenes con Sharp
const processImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
      if (!req.file) {
          throw new Error('No file uploaded');
      }

      // Ruta del archivo original
      const originalFilePath = req.file.path;
      // Ruta de la imagen procesada
      const processedFilePath = `${originalFilePath.split('.')[0]}.jpeg`;

      await sharp(originalFilePath)
          .jpeg() // Convertir a JPEG
          .toFile(processedFilePath); // Guardar la imagen procesada como JPEG

      // Eliminar el archivo original
      fs.unlinkSync(originalFilePath);

      // Actualizar la información del archivo en req.file
      req.file.filename = req.file.filename.split('.')[0] + '.jpeg';
      req.file.path = processedFilePath;

      next();
  } catch (error) {
      next(error);
  }
};

class EstudianteController {
    public router: Router
    public estudianteService: EstudiantesService
    
    public constructor() {
        this.estudianteService = new EstudiantesService()
        this.router = Router()
        this.routes()
    }
    public obtenerEstudiantes = async(req: Request, res: Response) => {
        try {
            const result = await this.estudianteService.obtenerEstudiantes()
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public buscarEstudiante = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const resp = await this.estudianteService.buscarCarreraPorFacultad(params)
        res.status(200).json(resp)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public buscarEstudiantePorNombre = async(req: Request, res: Response) => {
      try {
        const { DNI, NOMBRE, CELULAR } = req.query
        const params = {
          DNI: DNI || '',
          NOMBRE: NOMBRE || '',
          CELULAR: CELULAR || '',
        }
        console.log(params)
        const resp = await this.estudianteService.buscarEstudiantePorNombre(params)
        res.status(200).json(resp)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public modificarEstudiante = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const resp = await this.estudianteService.modificarEstudiante(params)
        res.status(200).json(resp)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public registrarEInscribirEstudiante = async(req: Request, res: Response) => {
      try {
        const params = req.body
        // console.log("PARAMETROS", params)
        const resp = await this.estudianteService.registrarEInscribirEstudiante(params)
        res.status(200).json(resp)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public resetearPassword = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const resp = await this.estudianteService.resetearPassword(params)
        res.status(200).json(resp)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public modificarDatosComplementariosEstudiante = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const resp = await this.estudianteService.modificarDatosComplementariosEstudiante(params)
        res.status(200).json(resp)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public editarFotoEstudiante = async(req: any, res: Response) => {
      console.log("NUEVOS MENSAJES", req.body); // contenido texto del form   
      console.log(req.file); // archivo subido procesado por Multer

      try {
          if (!req.file) { 
              res.status(400).json({ error: 'No se proporcionó ningún archivo.' });
          }
          res.status(200).json({ok: true, message: 'Foto subido correctamente'})
          
      } catch (error) {
          res.status(500).json(error);
      }
  }

  public obtenerDatosComplementariosEstudiante = async(req: Request, res: Response) => {
    try {
      const params = req.body
      const resp = await this.estudianteService.obtenerDatosComplementariosEstudiante(params)
      res.status(200).json(resp)
    }catch(error) {
      res.status(500).json(error)
    }
  }

  public editarDocumentacionEstudiante = async(req: any, res: Response) => {
      try {
        console.log(req.body); // contenido texto del form   
        console.log(req.file); // archivo subido procesado por Multer

          if(!req.file) {
              res.status(400).json({ error: 'No se proporcionó ningún archivo.' });
          }
          res.status(200).json({ok: true, message: 'Documento subido correctamente'})
      }catch(error) {
          res.status(500).json(error)
      }
  }
    
    public routes() {
        this.router.get('/obtener-estudiantes', asyncHandler(this.obtenerEstudiantes))
        this.router.post('/obtener-datos-complementarios-estudiante', asyncHandler(this.obtenerDatosComplementariosEstudiante))
        this.router.post('/buscar-estudiante', asyncHandler(this.buscarEstudiante))
        this.router.put('/modificar-estudiante', asyncHandler(this.modificarEstudiante))
        this.router.post('/registrar-inscribir-estudiante', asyncHandler(this.registrarEInscribirEstudiante))
        this.router.post('/resetear-password', asyncHandler(this.resetearPassword))
        this.router.post('/modificar-datos-complementarios-estudiante', asyncHandler(this.modificarDatosComplementariosEstudiante))
        // this.router.post('/editar-documento-estudiante', asyncHandler(this.editarDocumentacionEstudiante))
        this.router.post('/editar-documento-estudiante', upload.single('archivo'), asyncHandler(this.editarDocumentacionEstudiante))
        this.router.post('/editar-foto-estudiante', upload.single('fotoEstudiante'), processImage, asyncHandler(this.editarFotoEstudiante))
        this.router.get('/buscar-estudiante-por-nombre', asyncHandler(this.buscarEstudiantePorNombre))
        // this.router.post('/editar-foto-estudiante',  asyncHandler(this.editarFotoEstudiante))
    }
}
export default EstudianteController