import asyncHandler from "express-async-handler";
import { Router, Request, Response } from "express";
import { EstudiantesGeneralService } from "../../services/general/estudiantes/EstudianteGeneral.service";
import { ResultadosGeneralService } from "../../services/general/resultados/resultados.service";

class ResultadoGeneralController {
    public router: Router;
    public resultadoService: ResultadosGeneralService;

    public constructor() {
        this.resultadoService = new ResultadosGeneralService();
        this.router = Router();
        this.routes();
    }

    public obtenerResultadosPorCarreraYProceso = async (req: Request,res: Response) => {
        try {
            const params = { P_OPCION: req.params.carrera };
            const result =await this.resultadoService.obtenerResultadosPorCarreraYProceso(params);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    public obtenerResultadoEstudiante = async(req: Request, res:Response) => {
        try {
            const { query } = req
            const result = await this.resultadoService.obtenerResultadoEstudiante(query)
            res.status(200).json(result);
        }catch(error) {
            res.status(500).json(error);
        }
    }

    public routes() {
        this.router.get("/obtener-resultados-carrera/:carrera",asyncHandler(this.obtenerResultadosPorCarreraYProceso));
        this.router.get('/obtener-resultado-estudiante', asyncHandler(this.obtenerResultadoEstudiante));
    }
}
export default ResultadoGeneralController;
