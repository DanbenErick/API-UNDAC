import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer'
import fs from 'fs'
import { ResultadosAdministradorService } from '../../services/administrador/resultados/resultados.service';

const storage = multer.diskStorage({
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
const upload = multer({ storage: storage });

class ResultadosAdministradorController {
  public router: Router;
  public resultadosService: ResultadosAdministradorService
  constructor() {    
      this.resultadosService = new ResultadosAdministradorService();
      this.router = Router();
      this.routes();
  }
  public procesarSolapasCSV = async(req: any, res: any) => {
    try {
      // Leer el contenido del archivo como una cadena
      console.log("Path archivo",req.file.path)
      const fileContent = fs.readFileSync(req.file.path, 'utf-8');
      console.log(JSON.parse(fileContent))
      // Validar el archivo
      // if (!/\.csv$/.test(req.file.originalname) || !/\.txt$/.test(req.file.originalname) ) {
      //   return res.status(400).send('El archivo debe ser un archivo CSV o TXT');
      // }

      console.log("Contenido del archivo", fileContent)
      // Almacenar el archivo en la base de datos
      // ...

      // Procesar el contenido del archivo
      // ...

      res.send('El archivo se ha subido correctamente');
    }catch(error) {
      console.error(error);
    }
  }
  routes() {
    this.router.post('/procesar-solapas-csv', upload.single('solapa'), asyncHandler(this.procesarSolapasCSV))
  }
}

export default ResultadosAdministradorController