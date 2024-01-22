// Modulos Externos
import * as http from 'http';

// Propios
import appConfiguracion from './app.configuration';

class ServerConfig {
  public server: any;
  public serverSeguro: any;
  public port: any;
  public portSeguro: any;
  public appConfig: appConfiguracion = new appConfiguracion();

  public constructor() {
    this.config();
  }

  public config(): void {
    this.port = this.normalizePort(process.env.PORT || '3001');
    this.server = http.createServer(this.appConfig.app);
    this.createServer();
  }

  private createServer(): void {
    this.appConfig.app.set('port', this.port);
    this.server.listen(this.port, () => {
      console.log(`****   SERVER INICIADO EN EL PUERTO ${this.port}   ****`);
    });
  }

  public normalizePort(puerto: any): any {
    var port = parseInt(puerto, 10);
    if (isNaN(port)) {
      return puerto;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }
}
export default ServerConfig;
