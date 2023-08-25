let factura = [];

//MENU PRINCIPAL
const mainMenu = () => {
    let opcion = prompt("Ingrese una opcion: \n 1. Cargar Facturas \n 2. Ver Facturas \n 3. Ver saldo de IVA \n 4. Salir");
    switch (opcion) {
        case "1":
            cargarFactura();
            break;
        case "2":
            console.log(listarFacturas());
            break;
        case "3":
            verSaldoIVA();
            break;
        case "4":
            alert("Gracias por usar el programa");
            break;
        default:
            alert("Opción incorrecta");
            break;
    }
}

// función de carga de facturas
const cargarFactura = () => {
    let continuar = "s";
    let i = 0;
    while (continuar == "s") {
        factura[i] = cargarDatos();
        continuar = prompt("Desea continuar? s/n");
        i++;
    }
    mainMenu();
}

// función de carga de datos de la factura
const cargarDatos = () => {
    let datosFactura = {};
    datosFactura.numero = prompt("Ingrese el numero de la factura");
    datosFactura.fecha = prompt("Ingrese la fecha de la factura");
    datosFactura.cliente = prompt("Ingrese el nombre del cliente");
    datosFactura.total = prompt("Ingrese el total de la factura");
    datosFactura.iva = calcularIva(datosFactura.total);
    return datosFactura;
}

// función de cálculo de IVA
const calcularIva = (total) => {
    return total * 0.21;
}

// función de listar facturas
const listarFacturas = () => {
    let cadena = " ";
    for (let i = 0; i < factura.length; i++) {
        cadena += "N°: " + factura[i].numero + " " + "Fecha: " + factura[i].fecha + " " + " Cliente: " + factura[i].cliente + " " +  " Total: $" + " " +  factura[i].total + " " + " IVA: $" + factura[i].iva + "\n"
    }
    return cadena
}

mainMenu();

























// Solicitar al usuario ingresar datos de compra y venta mensual
/* let ventaMensual = parseFloat(prompt("Ingrese el monto total de ventas mensuales:"));
let compraMensual = parseFloat(prompt("Ingrese el monto total de compras mensuales:"));
let alicuotaVenta = parseFloat(prompt("Ingrese alícuota de venta (10.5, 21, 27):"));
let alicuotaCompra = parseFloat(prompt("Ingrese alícuota de compra (10.5, 21, 27):"));

//Cálculo de DF
function debitoFiscalIVA (ventaMensual, alicuotaVenta) {
    switch(alicuotaVenta){
        case 10.5:
        case 21:
        case 27:
            return ventaMensual*(alicuotaVenta/100);
        default:
            return 0;
    }
}

let resultadoDebito = debitoFiscalIVA(ventaMensual, alicuotaVenta);
alert("El débito fiscal es: " + resultadoDebito.toFixed(2));
console.log("DF: $" + resultadoDebito.toFixed(2));

//Cálculo de CF
function creditoFiscalIVA (compraMensual, alicuotaCompra) {
    switch(alicuotaCompra){
        case 10.5:
        case 21:
        case 27:
            return compraMensual*(alicuotaCompra/100);
        default:
            return 0;
    }
}

let resultadoCredito = creditoFiscalIVA(compraMensual, alicuotaCompra);
alert("El crédito fiscal es: " + resultadoCredito.toFixed(2));
console.log("CF: $" + resultadoCredito.toFixed(2));

// Calcular el monto a pagar o a favor
let DeterminacionSaldo = resultadoDebito - resultadoCredito;

    if (DeterminacionSaldo > 0){
        alert("El saldo de IVA a pagar este mes es de $" + DeterminacionSaldo)
    }else{
        alert("El saldo de IVA a favor este mes es de $" + DeterminacionSaldo*(-1))
    } */