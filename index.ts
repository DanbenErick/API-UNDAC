/**
 * 
 * Modulos de Extenos
 * 
 */
require('dotenv').config();


/**
 * 
 * Modulos Propios
 * 
 */
import ServerConfig from './src/config/server';

class Index {
  public constructor() {
    
    new ServerConfig();
  }
}

new Index();
