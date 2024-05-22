import { Router } from 'express';
import EstudianteController from './estudiantes.rest.api';
import ResultadoController from './resultado.rest.api';
import ReporteController from './reporte.rest.api'



class generalRouting {

  public router: Router;
    public estudiante: EstudianteController;
    public resultado: ResultadoController
    public reporte: ReporteController;


  public constructor() {
    this.estudiante = new EstudianteController()
    this.resultado = new ResultadoController()
    this.reporte = new ReporteController()

    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.use('/estudiantes', this.estudiante.router)
    this.router.use('/resultados', this.resultado.router)
    this.router.use('/reportes', this.reporte.router)
  }
}

export default new generalRouting().router;