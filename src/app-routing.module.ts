
// Modulos Externos
import express, { Request } from 'express';
import bearer from 'express-bearer-token'
// Routes
import administradorRouting from './controller/administrador/administrador.routing'
import inputControlsRouting from './controller/input-controls/inputs-controls.routing'
import sistemaRouting from './controller/sistema/sistema.routing';
import generalRouting from './controller/general/general.routing';
import auditMiddleware from './middleware/middleware';

class ApiRoutes {
  public app = express();

  public constructor() {
    this.app.use(express.static('build/uploads'));
    this.app.use(express.static('build/public'));
    this.app.use(bearer())
    this.routes();
  }

  public routes() {
    this.app.use(auditMiddleware)
    this.app.use('/administrador', this.trimRequest, administradorRouting)
    this.app.use('/input-controls', this.trimRequest, inputControlsRouting)
    this.app.use('/sistema', this.trimRequest, sistemaRouting)
    this.app.use('/general', this.trimRequest, generalRouting)
  }

  private trimRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
    // Realizar trim a los valores en el cuerpo de la solicitud
    if (req.body) {
      for (const key in req.body) {
        if (Object.prototype.hasOwnProperty.call(req.body, key)) {
          const value = req.body[key];
          if (typeof value === 'string') {
            req.body[key] = value.trim();
          }
        }
      }
    }
    next();
  }
}

export { ApiRoutes };

