"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessProcess = exports.SuccessDelete = exports.SuccessUpdate = exports.SuccessInsert = exports.ErrorOcurrido = exports.parametroNoExiste = exports.paramsIncorrectos = exports.ServerError = exports.EstadosHttp = exports.MensajesHttp = void 0;
exports.MensajesHttp = {
    errorServer: 'Error Servidor Interno',
    msjBadRequestParam: 'No existe parámetros de consulta',
    msjNoParamForInsert: 'No existe datos para registrar',
    msjNoParamForUpdate: 'No existe datos para actualizar',
    msjNoParamForDelete: 'No existe datos para eliminar'
};
exports.EstadosHttp = {
    statusExito: 200,
    statusBadRequest: 400,
    statusError: 500,
    noContent: 204,
    partialContent: 206
};
exports.ServerError = {
    status: exports.EstadosHttp.statusBadRequest,
    msg: exports.MensajesHttp.errorServer
};
exports.paramsIncorrectos = {
    status: exports.EstadosHttp.statusBadRequest,
    msg: "No se cuenta con los parámetros adecuados para consumir el servicio"
};
exports.parametroNoExiste = {
    status: exports.EstadosHttp.statusBadRequest,
    msg: "Error de Parámetros => los parámetros no han sido registrados."
};
exports.ErrorOcurrido = {
    status: exports.EstadosHttp.statusError,
    msg: "Ocurrio un error, Comuníquese con el soporte técnico."
};
exports.SuccessInsert = {
    status: exports.EstadosHttp.statusExito,
    msg: "La información se registró éxitosamente"
};
exports.SuccessUpdate = {
    status: exports.EstadosHttp.statusExito,
    msg: "La información se actualizó éxitosamente"
};
exports.SuccessDelete = {
    status: exports.EstadosHttp.statusExito,
    msg: "La información se eliminó éxitosamente"
};
exports.SuccessProcess = {
    status: exports.EstadosHttp.statusExito,
    msg: "La información se procesó éxitosamente"
};
