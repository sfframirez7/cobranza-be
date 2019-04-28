var IFactura = {

    id: 0,
    ViviendaId: 0,
    Anio: 0,
    Mes: 0,
    UsuarioGeneraId: 0,
    ISV: 0.00,
    Otros: 0.00,
    OtrosCargos: 0.00,
    Descuento: 0.00,
    SubTotal: 0.00,
    Total: 0.00,
    FechaVence: null,
    Pagada: false,
    FormaPagoId: 0,
    FechaPago: null,
    UsuarioRealizaCobroId: 0,
    Anulada: 0,
    FechaAnulada: null,
    UsuarioAnulaId: null,
    MotivoAnulaId: null,
    ComentarioAnula: '',
}

module.exports = IFactura