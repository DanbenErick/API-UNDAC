import jwt from 'jsonwebtoken'
import moment from 'moment-timezone';
import { ReporteService } from "../services/general/reportes/reportes.service";
import { NextFunction } from 'express';

const formatDateToMySQL = (date: Date) => {
  return moment(date).tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
};

const auditMiddleware = async (req: any, res: any, next: NextFunction) => {
  console.log('Ingreso a middleware')
  const token = req.token
  console.log( "Token", token)

  // if(req.originalUrl.contains('/general/reportes/')) {
  //   req
  // }

  if(!process.env.JWT_TOKEN_SECRET) {
    throw new Error('JWT_TOKEN_SECRET must be defined');
  }
  let verified: any
  if(token) {
    verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.locals = verified
    console.log(verified)
  }



  const reporteServi: any = new ReporteService()
  const originalSend = res.send;

  // res.send = async function(body) {
  try {
    const auditEntry = {
      USER: verified.id ? verified.id : 'Postulante', // Asume que el usuario está en req.user
      METHOD: req.method,
      ENDPOINT: req.originalUrl,
      REQUESTBODY: JSON.stringify(req.body),
      RESPONSESTATUS: res.statusCode,
      TIME: formatDateToMySQL(new Date()),
    };
    console.log(auditEntry)
    const result = await reporteServi.registrarLog(auditEntry)
  } catch (error) {
    console.error('Error saving audit log:', error);
  }

  //   originalSend.apply(res, arguments);
  // };

  next();
};

export default auditMiddleware