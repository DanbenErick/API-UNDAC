// Modulos externos
import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

// Modulos Propios

// Rutas
import { ApiRoutes } from '../app-routing.module';

class AppConfiguration {
  public app: Application;
  private ApiRoutes = new ApiRoutes();

  public constructor() {
    this.app = express();
    this.initApp();
  }

  public initApp() {
    this.app.use(express.static(path.join(__dirname, './../public')));
    this.app.use(express.json()) 
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(
      cors({
        origin: '*',
        exposedHeaders: 'Content-Disposition',
      })
    );

    this.app.use(
      morgan(
        'HTTP=:method RUTA=:url CODIDO_RESPUESTA=:status RES=:res[content-length] - TIEMPO_RESPUESTA=:response-time ms ORIGEN=:remote-addr'
      )
    );
    this.app.use(this.ApiRoutes.app);
  }
}

export default AppConfiguration;
