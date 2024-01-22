import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { InputsControlsService } from "../../services/inputs-controls/inputs-controls.service";
import jwt from "jsonwebtoken";

class InputsControlsController {
  public router: Router;
  public inputsControlsService: InputsControlsService;
  public constructor() {
    this.inputsControlsService = new InputsControlsService();
    this.router = Router();
    this.routes();
  }
  public obtenerProcesos = async (req: Request, res: Response) => {
    try {
      const result = await this.inputsControlsService.obtenerProcesos("");
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  public obtenerCarreras = async (req: Request, res: Response) => {
    try {
      const result = await this.inputsControlsService.obtenerCarreras("");
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  public obtenerCarrerasCodigo = async (req: Request, res: Response) => {
    try {
      const result = await this.inputsControlsService.obtenerCarrerasPorCodigo(
        ""
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  public obtenerFacultades = async (req: Request, res: Response) => {
    try {
      const resp = await this.inputsControlsService.obtenerFacultades();
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  public obtenerDiscapacidades = async (req: Request, res: Response) => {
    try {
      const resp = await this.inputsControlsService.obtenerDicapacidades();
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  public obtenerTodosLosProcesosActivos = async (req: Request, res:Response) => {
    try {
      const resp = await this.inputsControlsService.obtenerTodosLosProcesosActivos();
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  public obtenerRazasEtnicas = async (req: any, res: Response) => {
    try {
      const token = req.token;
      // Decodificar el token
      if(!process.env.JWT_TOKEN_SECRET) {
        throw new Error('JWT_TOKEN_SECRET must be defined');
      }
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

      // El objeto 'decodedToken' contiene la información decodificada
      console.log("Decoded Token:", decodedToken);
      console.log("TOKEN", token);
      const resp = await this.inputsControlsService.obtenerRazasEtnicas();
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  public obtenerProcesoActivo = async (req: Request, res: Response) => {
    try {
      const params = req.body
      const resp = await this.inputsControlsService.obtenerProcesoActivo(params);
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  public obtenerUbicaciones = async (req: Request, res: Response) => {
    try {
      const resp =
        await this.inputsControlsService.obtenerUbicacionesAutocomplete();
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  public obtenerDepartamentos = async (req: Request, res: Response) => {
    try {
      const resp = await this.inputsControlsService.obtenerDepartamentos();
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  public obtenerProvincias = async (req: Request, res: Response) => {
    try {
      const params = req.query;
      const resp = await this.inputsControlsService.obtenerProvincias(params);
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  public obtenerDistritos = async (req: Request, res: Response) => {
    try {
      const params = req.query;
      const resp = await this.inputsControlsService.obtenerDistritos(params);
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  public buscarAulaPorTurno = async (req: Request, res: Response) => {
    try {
      const params = req.body
      const resp = await this.inputsControlsService.buscarAulaPorTurno(params)
      res.status(200).json(resp)
    }catch(error) {
      res.status(500).json(error)
    }
  }
  public obtenerProcesosAbiertos = async(req: Request, res: Response) => {
    try {
      const resp = await this.inputsControlsService.obtenerProcesosAbiertos()
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
      if(verified != null){ next() }
      else {res.status(403).json({message: 'No tienes los permisos nesesarios'})}
    } catch (err) {
      res.status(401).send('Invalid token !');
    }
  }
  public obtenerIp = async (req: Request, res: Response) => {
    res.json(req.ip)
  }
  public obtenerModalidades = async (req: Request, res: Response) => {
    try {
      const resp = await this.inputsControlsService.obtenerModalidades();
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  public obtenerCarrerasPorModalidades = async(req: Request, res: Response) => {
    try {
      const params = req.body
      const resp = await this.inputsControlsService.obtenerCarrerasPorModalidades(params)
      res.status(200).json(resp)
    }catch(error) {
      res.status(500).json(error);
    }
  }
  public routes() {
    //TODO: Revisar cuales son los endpoints que nesesitan permisos
    this.router.post('/obtener-carreras-por-modalidades', asyncHandler(this.obtenerCarrerasPorModalidades))
    this.router.get('/obtener-modalidades', asyncHandler(this.obtenerModalidades))
    this.router.get('/obtener-todos-procesos-activo', asyncHandler(this.obtenerTodosLosProcesosActivos))
    this.router.get("/obtener-procesos-abiertos", this.authenticateToken, asyncHandler(this.obtenerProcesosAbiertos));
    this.router.get("/obtener-procesos", asyncHandler(this.obtenerProcesos));
    this.router.get("/obtener-carreras", asyncHandler(this.obtenerCarreras));
    this.router.post('/buscar-aula-por-turno', asyncHandler(this.buscarAulaPorTurno))
    this.router.get('/obtener-ips', asyncHandler(this.obtenerIp))
    this.router.get(
      "/obtener-carreras-codigo",
      asyncHandler(this.obtenerCarrerasCodigo)
    );
    this.router.get(
      "/obtener-facultades",
      asyncHandler(this.obtenerFacultades)
    );
    this.router.get(
      "/obtener-discapacidades",
      asyncHandler(this.obtenerDiscapacidades)
    );
    this.router.get(
      "/obtener-razas-etnicas",
      asyncHandler(this.obtenerRazasEtnicas)
    );
    this.router.post(
      "/obtener-proceso-activo",
      asyncHandler(this.obtenerProcesoActivo)
    );
    this.router.get(
      "/obtener-ubicaciones",
      asyncHandler(this.obtenerUbicaciones)
    );
    this.router.get(
      "/obtener-departamentos",
      asyncHandler(this.obtenerDepartamentos)
    );
    this.router.get(
      "/obtener-provincias",
      asyncHandler(this.obtenerProvincias)
    );
    this.router.get("/obtener-distritos", asyncHandler(this.obtenerDistritos));
  }
}

export { InputsControlsController };
