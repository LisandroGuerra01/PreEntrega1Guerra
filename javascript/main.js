//MENU PRINCIPAL

alert("Bienvenido al programa de cálculo de IVA");

let opcion = 0;

do {
    opcion = parseInt(prompt("Ingrese una opcion: \n 1. Cargar Facturas \n 2. Ver Facturas de Compra \n 3. Ver Facturas de Venta \n 4. Ver saldo de IVA \n 5. Salir"));

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
            verSaldoIVA();
            break;
        case 5:
            alert("Gracias por usar el programa");
            break;
        default:
            alert("Opción incorrecta");
            break;
    }
} while (opcion != 5);