import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { InputsControlsService } from "../../services/inputs-controls/inputs-controls.service";
import jwt from "jsonwebtoken";
import ip from 'ip'

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
  public obtenerMencion = async(req: Request, res: Response) => {
    try {
      const params = req.body
      const resp = await this.inputsControlsService.obtenerMencion(params);
      res.status(200).json(resp);
    }catch(error) {
      res.status(500).json(error);
    }
  }
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
    res.json({
      ip: ip.address(),
    })
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
  public obtenerLugarAutocomplete = async (req: Request, res: Response) => {
    try {
      const params = req.body
      const resp = await this.inputsControlsService.obtenerLugarAutocomplete(params)
      res.status(200).json(resp)
    }catch(error) {
      res.status(500).json(error);
    }
  }
  public obtenerPadronEstudiantes = async(req: Request, res: Response) => {
    try {
      const params = {
        id_proceso: req.query.id_proceso,
        inicio: req.query.inicio,
        fin: req.query.fin,
        area: req.query.area,
        aula: req.query.aula,
        fecha: req.query.fecha,
        sede: req.query.sede,
      }
      const resp = await this.inputsControlsService.obtenerPadronEstudiantes(params)
      res.status(200).json(resp)
    }catch(error) {
      res.status(500).json(error);
    }
  }
  public obtenerDeclaracioneJuradas = async(req: Request, res: Response) => {
    try {
      const params = {
        proceso: req.query.proceso,
        sede: req.query.sede,
      }
      console.log('params recividos', params)
      const resp = await this.inputsControlsService.obtenerDeclaracioneJuradas(params)
      res.status(200).json(resp)
    }catch(error) {
      res.status(500).json(error);
    }
  }

  public obtenerResultadosModalidades = async(req: Request, res: Response) => {
    try {
      const params = {
        modalidad: req.params.modalidad
      }
      const resp = await this.inputsControlsService.obtenerResultadosModalidades(params)
      res.status(200).json(resp)
    }catch (err) {
      res.status(500).json(err);
    }
  }
  public obtenerResultadosCeprePrimerExamen = async(req: Request, res: Response) => {
    try {
      const { params } = req
      const resp = await this.inputsControlsService.obtenerResultadosCeprePrimerExamen(params)
      res.status(200).json(resp)
    }catch(error) {
      res.status(500).json(error)
    }
  }
  public obtenerResultadosOrdinario = async(req: Request, res: Response) => {
    try {
      const resp = await this.inputsControlsService.obtenerResultadosOrdinario(req.params)
      res.status(200).json(resp)
    }catch (err) {
      res.status(500).json(err);
    }
  }
  public obtenerIngresantesParaConstancia = async(req: Request, res: Response) => {
    try {
      const params = req.query
      const resp = await this.inputsControlsService.obtenerIngresantesParaConstancia(params)
      res.status(200).json(resp)
    }catch (err) {
      res.status(500).json(err);
    }
  }
  public obtenerSedes = async(req: Request, res: Response) => {
    try {
      const params = req.params
      const resp = await this.inputsControlsService.obtenerSedes(params)
      res.status(200).json(resp)
    }catch(error) {
      res.status(500).json(error);
    }
  }
  public validarCordinador = async(req: Request, res: Response) => {
    try {
      const params = req.body
      const resp = await this.inputsControlsService.validarCordinador(params)
      res.status(200).json(resp)
    }catch(error) {
      res.status(500).json(error);
    }
  }

  public obtenerInscritosPorCordinador = async(req: Request, res: Response) => {
    try {
      const params = req.query
      const resp = await this.inputsControlsService.obtenerInscritosPorCordinador(params)
      res.status(200).json(resp)

    }catch(error) {
      res.status(500).json(error);
    }
  }
  public obtenerReporteAulaCepre = async(req: Request, res: Response) => {
    try {
      const params = req.query
      const resp = await this.inputsControlsService.obtenerReporteAulaCepre(params)
      res.status(200).json(resp)
    }catch(error) {
      res.status(500).json(error);
    }
  }
  
  public routes() {
    //TODO: Revisar cuales son los endpoints que nesesitan permisos
    
    this.router.get('/obtener-reporte-aulas', asyncHandler(this.obtenerReporteAulaCepre))
    this.router.get('/obtener-resultados-cepre-primer-examen/:id_proceso', asyncHandler(this.obtenerResultadosCeprePrimerExamen))
    this.router.get('/obtener-inscritos-por-cordinador', asyncHandler(this.obtenerInscritosPorCordinador))
    this.router.get('/obtener-constancias-ingreso', asyncHandler(this.obtenerIngresantesParaConstancia))
    this.router.get('/obtener-menciones', asyncHandler(this.obtenerMencion))
    this.router.post('/validar-cordinador', asyncHandler(this.validarCordinador))
    this.router.get('/obtener-declaraciones-juradas', asyncHandler(this.obtenerDeclaracioneJuradas))
    this.router.post('/obtener-ubicacion-autocomplete', asyncHandler(this.obtenerLugarAutocomplete))
    this.router.post('/obtener-carreras-por-modalidades', asyncHandler(this.obtenerCarrerasPorModalidades))
    this.router.get('/obtener-modalidades', asyncHandler(this.obtenerModalidades))
    this.router.get('/obtener-todos-procesos-activo', asyncHandler(this.obtenerTodosLosProcesosActivos))
    this.router.get("/obtener-procesos-abiertos", this.authenticateToken, asyncHandler(this.obtenerProcesosAbiertos));
    this.router.get("/obtener-procesos", asyncHandler(this.obtenerProcesos));
    this.router.get("/obtener-carreras", asyncHandler(this.obtenerCarreras));
    this.router.post('/buscar-aula-por-turno', asyncHandler(this.buscarAulaPorTurno))
    this.router.get('/obtener-ips', asyncHandler(this.obtenerIp))
    this.router.get('/obtener-sedes/:TIPO_PROCESO', asyncHandler(this.obtenerSedes))

    this.router.get('/obtener-resultados-modalidades/:modalidad', asyncHandler(this.obtenerResultadosModalidades))
    this.router.get('/obtener-resultados-ordinario/:id_proceso', asyncHandler(this.obtenerResultadosOrdinario))


    this.router.get('/obtener-padron-estudiantes', asyncHandler(this.obtenerPadronEstudiantes))

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
