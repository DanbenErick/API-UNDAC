export const MensajesHttp = {
    errorServer: 'Error Servidor Interno',
    msjBadRequestParam: 'No existe parámetros de consulta',
    msjNoParamForInsert: 'No existe datos para registrar',
    msjNoParamForUpdate: 'No existe datos para actualizar',
    msjNoParamForDelete: 'No existe datos para eliminar'
}

export const EstadosHttp = {
    statusExito: 200,
    statusBadRequest: 400,
    statusError: 500,
    noContent: 204,
    partialContent: 206
}

export const ServerError = {
    status: EstadosHttp.statusBadRequest,
    msg: MensajesHttp.errorServer
}

export const paramsIncorrectos = {
    status: EstadosHttp.statusBadRequest,
    msg: "No se cuenta con los parámetros adecuados para consumir el servicio"
}

export const parametroNoExiste = {
    status: EstadosHttp.statusBadRequest,
    msg: "Error de Parámetros => los parámetros no han sido registrados."
}

export const ErrorOcurrido = {
    status: EstadosHttp.statusError,
    msg: "Ocurrio un error, Comuníquese con el soporte técnico."
}

export const SuccessInsert = {
    status: EstadosHttp.statusExito,
    msg: "La información se registró éxitosamente"
}

export const SuccessUpdate = {
    status: EstadosHttp.statusExito,
    msg: "La información se actualizó éxitosamente"
}

export const SuccessDelete = {
    status: EstadosHttp.statusExito,
    msg: "La información se eliminó éxitosamente"
}

export const SuccessProcess = {
    status: EstadosHttp.statusExito,
    msg: "La información se procesó éxitosamente"
}