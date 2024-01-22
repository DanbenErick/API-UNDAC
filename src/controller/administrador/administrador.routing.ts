import { Router } from 'express';
import { ProcesosController } from './procesos.rest.api'
import VacantesController from './vacantes.rest.api';
import CarrerasController from './carrera.routing';
import VoucherController from './voucher.rest.api';
import EstudianteController from './estudiantes.rest.api';
import InscritosController from './inscritos.routing';
import AulasController from './aulas.rest.api';
import jwt from 'jsonwebtoken'
class AdministradorRouting {

  public router: Router;
    public procesos: ProcesosController;
    public vacantes: VacantesController
    public carreras: CarrerasController
    public vouchers: VoucherController
    public estudiantes: EstudianteController
    public inscritos: InscritosController
    public aulas: AulasController

  public constructor() {
    this.procesos = new ProcesosController()
    this.vacantes = new VacantesController()
    this.carreras = new CarrerasController()
    this.vouchers = new VoucherController()
    this.estudiantes = new EstudianteController()
    this.inscritos = new InscritosController()
    this.aulas = new AulasController()

    this.router = Router();
    this.routes();
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
      req.locals = verified
      if(verified.rol === 'ADMINISTRADOR'){ next() }
      else {res.status(403).json({message: 'No tienes los permisos nesesarios'})}
    } catch (err) {
      res.status(401).send({ok: 'error', message: 'Se vencio tu token'});
    }
  }
  public routes() {
    this.router.use(this.authenticateToken)
    this.router.use('/procesos', this.procesos.router)
    this.router.use('/vacantes', this.vacantes.router)
    this.router.use('/carreras', this.carreras.router)
    this.router.use('/vouchers', this.vouchers.router)
    this.router.use('/estudiantes', this.estudiantes.router)
    this.router.use('/inscritos', this.inscritos.router)
    this.router.use('/aulas', this.aulas.router)
  }
}

export default new AdministradorRouting().router;