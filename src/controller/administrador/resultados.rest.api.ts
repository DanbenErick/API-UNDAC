import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer'
import fs from 'fs'
import csv from 'csv-parser'
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
      const fileContent = fs.createReadStream(req.file.path, 'utf-8');
      const jsonArray: any = []
      fileContent.pipe(csv({ separator: ';' }))
      .on('data', (row) => {
          console.log("row: ", row)
          const jsonObject: any = {}
          Object.keys(row).forEach(key => {
            if(key !== 'APELLIDOS Y NOMBRES' && key !== ''){
              jsonObject[key.trim()] = row[key].trim();
            }
          });
          jsonArray.push(jsonObject);
        })
        .on('end', async() => {
          console.log(req.query)
          const proceso = req.query.ID_PROCESO
          const resp_duplicado_dni = await this.resultadosService.duplicarDNIInscritosAResultados({ID_PROCESO: req.query.ID_PROCESO})
          if(resp_duplicado_dni.affectedRows >= jsonArray.length) {
            const resp_actualiza_daracod_dni = await this.resultadosService.actualizarDaraCodePorDNI(jsonArray, proceso)
            res.status(200).json(resp_actualiza_daracod_dni)
          }else {
            res.status(200).json({ok: false, message: 'Hay mas estudiantes en la solapa que la cantidad de inscritos para este proceso'})
          }
        })
        .on('error', (error) => {
          console.log('Error al procesar el csv', error)
        })
    }catch(error) {
      res.status(500).json(error)
    }
  }
  public procesarSolapasSECSV = async(req: any, res: any) => {
    try {
      const fileContent = fs.createReadStream(req.file.path, 'utf-8');
      const jsonArray: any = []
      fileContent.pipe(csv({ separator: ';' }))
      .on('data', (row) => {
          console.log("row: ", row)
          const jsonObject: any = {}
          Object.keys(row).forEach(key => {
            if(key !== 'APELLIDOS Y NOMBRES' && key !== ''){
              jsonObject[key.trim()] = row[key].trim();
            }
          });
          jsonArray.push(jsonObject);
        })
        .on('end', async() => {
          const proceso = req.query.ID_PROCESO
          const resp_actualiza_daracod_dni: any = await this.resultadosService.actualizarDaraCodePorDNISE(jsonArray, proceso)
          res.status(200).json(resp_actualiza_daracod_dni)
          // if(resp_actualiza_daracod_dni.affectedRows === jsonArray.length) {
          // }else {
          //   res.status(200).json({ok: false, message: 'Hay mas estudiantes en la solapa que la cantidad de inscritos para este proceso'})
          // }
          // res.status(200).json(resp_actualiza_daracod_dni)
        })
        .on('error', (error) => {
          console.log('Error al procesar el csv', error)
        })
    }catch(error) {
      res.status(500).json(error)
    }
  }
  public procesarMultiPCSV = async(req: any, res: any) => {
    try {
      const fileContent = fs.createReadStream(req.file.path, 'utf-8');
      const jsonArray: any = []
      fileContent.pipe(csv({ separator: ';' }))
        .on('data', (row) => {
          const jsonObject: any = {}
          Object.keys(row).forEach(key => {
            if(key !== 'APELLIDOS Y NOMBRES' && key !== ''){
              jsonObject[key.trim()] = row[key].trim();
            }
          });

          jsonArray.push(jsonObject);
        })
        .on('end', async() => {
          // console.log(jsonArray)
          // req.query.ID_PROCESO = 26
          

          const resp_notas_daras: any = await this.resultadosService.establecerNotasPorDaraCode(jsonArray)
          const params = {}
          const resp_asignarIngresantes: any = await this.resultadosService.asignarIngresantesPorCarreraOrdinario(req.query)
          res.status(200).json({...resp_notas_daras, ...resp_asignarIngresantes})

        })
        .on('error', (error) => {
          console.log('Error al procesar el csv', error)
        })
    }
    catch(error) {
      res.status(500).json(error)
    }
  }
  public procesarMultiPCSVPE = async(req: any, res: any) => {
    try {
      const fileContent = fs.createReadStream(req.file.path, 'utf-8');
      const jsonArray: any = []
      fileContent.pipe(csv({ separator: ';' }))
        .on('data', (row) => {
          const jsonObject: any = {}
          Object.keys(row).forEach(key => {
            if(key !== 'APELLIDOS Y NOMBRES' && key !== ''){
              jsonObject[key.trim()] = row[key].trim();
            }
          });

          jsonArray.push(jsonObject);
        })
        .on('end', async() => {
          // console.log(jsonArray)
          // req.query.ID_PROCESO = 26
          

          const resp_notas_daras: any = await this.resultadosService.establecerNotasPorDaraCodePE(jsonArray, req.query)
          const params = {}
          // const resp_asignarIngresantes: any = await this.resultadosService.asignarIngresantesPorCarreraOrdinario(req.query)
          res.status(200).json(resp_notas_daras)

        })
        .on('error', (error) => {
          console.log('Error al procesar el csv', error)
        })
    }
    catch(error) {
      res.status(500).json(error)
    }
  }
  public procesarMultiPCSVEF = async(req: any, res: any) => {
    try {
      const fileContent = fs.createReadStream(req.file.path, 'utf-8');
      const jsonArray: any = []
      fileContent.pipe(csv({ separator: ';' }))
        .on('data', (row) => {
          const jsonObject: any = {}
          Object.keys(row).forEach(key => {
            if(key !== 'APELLIDOS Y NOMBRES' && key !== ''){
              jsonObject[key.trim()] = row[key].trim();
            }
          });

          jsonArray.push(jsonObject);
        })
        .on('end', async() => {
          // console.log(jsonArray)
          // req.query.ID_PROCESO = 26
          

          const resp_notas_daras: any = await this.resultadosService.establecerNotasPorDaraCodeEF(jsonArray, req.query)
          const resp_asignarIngresantes: any = await this.resultadosService.asignarIngresantesPorCarreraOrdinario(req.query)
          res.status(200).json({...resp_notas_daras, ...resp_asignarIngresantes})
          // const params = {}
          // const resp_asignarIngresantes: any = await this.resultadosService.asignarIngresantesPorCarreraOrdinario(req.query)
          // res.status(200).json({...resp_notas_daras, ...resp_asignarIngresantes})
          res.status(200).json(resp_notas_daras)

        })
        .on('error', (error) => {
          console.log('Error al procesar el csv', error)
        })
    }
    catch(error) {
      res.status(500).json(error)
    }
  }
  routes() {
    this.router.post('/procesar-solapas-csv', upload.single('solapa'), asyncHandler(this.procesarSolapasCSV))
    this.router.post('/procesar-multip-csv', upload.single('multip'), asyncHandler(this.procesarMultiPCSV))
    
    this.router.post('/procesar-solapas-segundo-examen', upload.single('solapa'), asyncHandler(this.procesarSolapasSECSV))
    this.router.post('/procesar-multip-primer-examen-csv', upload.single('multip'), asyncHandler(this.procesarMultiPCSVPE))
    this.router.post('/procesar-multip-ultimo-examen-csv', upload.single('multip'), asyncHandler(this.procesarMultiPCSVEF))
  }
}

export default ResultadosAdministradorController