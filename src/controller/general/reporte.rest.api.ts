import asyncHandler from "express-async-handler";
import { Router, Request, Response } from "express";
import { ReporteService } from "../../services/general/reportes/reportes.service";

class ReporteController {
    public router: Router;
    public reporteService: ReporteService;

    public constructor() {
        this.reporteService = new ReporteService();
        this.router = Router();
        this.routes();
    }

    public obtenerPrimerosPuestos = async (req: Request,res: Response) => {
        try {
            const params = req.query;
            const result =await this.reporteService.obtenerPrimerosPuestos(params)
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    };
    public obtenerPagos = async (req: Request,res: Response) => {
      try {
        const params = req.query;
        const result =await this.reporteService.obtenerPagos(params)
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    public obtenerEstudiatesPorAula = async (req: Request,res: Response) => {
      try {
        const params = req.query;
        const result =await this.reporteService.obtenerEstudiatesPorAula(params)
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    public obtenerInscritosPorProceso = async(req: Request, res: Response) => {
      try {
        const params = req.query;
        const result =await this.reporteService.obtenerInscritosPorProceso(params)
        res.status(200).json(result);
      }catch(err) {
        res.status(500).json(err);
      }
    }
    public obtenerReporteInscritosPorCarreras = async(req: Request, res: Response) => {
      try {
        const params = req.query
        const result =await this.reporteService.obtenerReporteInscritosPorCarreras(params)
        res.status(200).json(result);
      }catch(err) {
        res.status(500).json(err);
      }
    }
    public obtenerReporteInscritosPorSede = async(req: Request, res: Response) => {
      try {
        const params = req.query;
        const result =await this.reporteService.obtenerReporteInscritosPorSede(params)
        res.status(200).json(result);
      }catch(err) {
        res.status(500).json(err);
      }
    }

    /**
       * Este método establece las rutas para el ReporteController.
       * Mapea las solicitudes HTTP GET a las funciones de generación de informes correspondientes.
       *
       * @remarks
       * Las rutas se definen de la siguiente manera:
       * - GET /reporte-primeros-puestos: Llama a la función `obtenerPrimerosPuestos`.
       * - GET /reporte-pagos: Llama a la función `obtenerPagos`.
       * - GET /reporte-estudiantes-por-aula: Llama a la función `obtenerEstudiatesPorAula`.
       * - GET /reporte-inscritos-por-proceso: Llama a la función `obtenerInscritosPorProceso`.
       *
       * Cada función se envuelve en un `asyncHandler` para manejar operaciones asíncronas y errores.
       *
       * @returns {void}
       */
    public routes() {

      
        this.router.get("/reporte-primeros-puestos",asyncHandler(this.obtenerPrimerosPuestos));
        this.router.get('/reporte-pagos', asyncHandler(this.obtenerPagos));
        this.router.get('/reporte-estudiantes-por-aula', asyncHandler(this.obtenerEstudiatesPorAula));
        this.router.get('/reporte-inscritos-por-proceso', asyncHandler(this.obtenerInscritosPorProceso));
        this.router.get('/reporte-inscritos-por-carrera', asyncHandler(this.obtenerReporteInscritosPorCarreras));
        this.router.get('/reporte-inscritos-por-sede', asyncHandler(this.obtenerReporteInscritosPorSede));
    }
}
export default ReporteController;
