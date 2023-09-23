//MENU PRINCIPAL 
alert("Bienvenido al programa de cálculo de IVA");

let opcion = 0;

do {
    opcion = parseInt(prompt("Ingrese una opcion: \n 1. Cargar Facturas \n 2. Ver Facturas de Compra \n 3. Ver Facturas de Venta \n 4. Eliminar Factura \n 5. Ver saldo de IVA \n 6. Buscar factura \n 7. Salir"));

    switch (opcion) {
        case 1:
            cargarFactura();
            break;
        case 2:
            listarFacturasCompras();
            break;
        case 3:
            listarFacturasVentas();
            break;
        case 4:
            eliminarFactura();
            break;
        case 5:
            verSaldoIVA();
            break;
        case 6:
            buscarFactura();
            break;
        case 7:
            alert("Gracias por usar el programa");
            break;
        default:
            alert("Opción incorrecta");
            break;
    }
} while (opcion != 7);