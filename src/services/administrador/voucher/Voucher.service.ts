import connectMysql from "../../../config/connection.mysqldb";
import { VoucherInterface } from "../../../interfaces/administrador/voucher.interface";
import VoucherRepository from "../../../repository/administrador/voucher/voucher.repository";

export class VoucherService {
  public voucherRepo: VoucherRepository;
  public constructor() {
    this.voucherRepo = new VoucherRepository();
  }
  public obtenerVouchers = async () => {
    const dbConex: any = await connectMysql.connectMysql();
    try {
      const result = await this.voucherRepo.obtenerVouchers(dbConex);
      return result;
    } catch (error) {
      await dbConex.rollback();
    } finally {
      await dbConex.close();
    }
  };
  public buscarVoucher = async (params: VoucherInterface) => {
    const dbConex: any = await connectMysql.connectMysql();
    try {
      const resp = await this.voucherRepo.buscarVoucher(dbConex, params);
      return resp;
    } catch (error) {
      await dbConex.rollback();
    } finally {
      await dbConex.close();
    }
  };
  public buscarEstudianteParaVoucher = async (params: VoucherInterface) => {
    const dbConex: any = await connectMysql.connectMysql();
    try {
      const resp = await this.voucherRepo.buscarEstudianteParaVoucher(dbConex,params);
      return resp;
    } catch (error) {
      await dbConex.rollback();
    } finally {
      dbConex.close();
    }
  };
  public crearVoucher = async (params: VoucherInterface) => {
    const dbConex: any = await connectMysql.connectMysql();
    try {
      const resp = await this.voucherRepo.crearVoucher(dbConex, params);
      if (resp[0].affectedRows > 0) {
        return { ok: true, message: "Guardado correctamente" };
      }
      return { ok: false, message: "Ocurrio un error al guardar" };
    } catch (error: any) {
      if (error.code && error.code === 'ER_DUP_ENTRY') {
        return { ok: false, message: "El estudiante ya registro este pago" };
      }
      await dbConex.rollback();
    } finally {
      dbConex.close();
    }
  };
}
