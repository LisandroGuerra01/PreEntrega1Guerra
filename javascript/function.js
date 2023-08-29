let facturaCompras = [];
let facturaVentas = [];

//FUNCIONES

//Cargar Factura
const cargarFactura = () => {
    let facCompraOVenta = 0;
    do {
        facCompraOVenta = parseInt(prompt("Ingrese 0 para Compras \nIngrese 1 para Ventas"));
        if (facCompraOVenta != 0 && facCompraOVenta != 1) {
            alert("Opción incorrecta");
        }
    } while (facCompraOVenta != 0 && facCompraOVenta != 1);
    let facFecha = prompt("Ingrese la fecha de la factura");
    let facNro = parseInt(prompt("Ingrese el numero de la factura"));
    let facNombre = prompt("Ingrese el nombre del cliente o proveedor");
    let facTotal = parseFloat(prompt("Ingrese el total de la factura"));

    let facAlicuota = 0;
    let opcionAlicuota = 0;
    do {
        opcionAlicuota = parseInt(prompt("Ingrese 1 si la alícuota es 10.5% \nIngrese 2 si la alícuota es 21% \nIngrese 3 si la alícuota es 27%"));
        switch (opcionAlicuota) {
            case 1:
                facAlicuota = 10.5;
                break;
            case 2:
                facAlicuota = 21;
                break;
            case 3:
                facAlicuota = 27;
                break;
            default:
                alert("Opción incorrecta");
                break;
        }
    } while (opcionAlicuota != 1 && opcionAlicuota != 2 && opcionAlicuota != 3);

    let fac = {
        compraOVenta: facCompraOVenta,
        fecha: facFecha,
        nro: facNro,
        nombre: facNombre,
        total: facTotal,
        alicuota: facAlicuota
    }

    if (facCompraOVenta == 0) {
        facturaCompras.push(fac);
    } else {
        facturaVentas.push(fac);
    }

    alert("Factura cargada con exito");
}

//Listar Facturas
const listarFacturasCompras = () => {
    for (let i = 0; i < facturaCompras.length; i++) {
        console.log(`Fecha: ${facturaCompras[i].fecha} - N°: ${facturaCompras[i].nro} - Nombre: ${facturaCompras[i].nombre} - Total: ${facturaCompras[i].total}`);
    }
}

const listarFacturasVentas = () => {
    for (let i = 0; i < facturaVentas.length; i++) {
        console.log(`Fecha: ${facturaVentas[i].fecha} - N°: ${facturaVentas[i].nro} - Nombre: ${facturaVentas[i].nombre} - Total: ${facturaVentas[i].total}`);
    }
}

//Ver Saldo IVA
const verSaldoIVA = () => {
    let totalIvaCompras = 0;
    let totalIvaVentas = 0;
    let neto = 0;
    let saldo = 0;

    for (let i = 0; i < facturaCompras.length; i++) {
        neto = facturaCompras[i].total / (1 + (facturaCompras[i].alicuota / 100));
        totalIvaCompras += neto * (facturaCompras[i].alicuota / 100);
    }

    for (let i = 0; i < facturaVentas.length; i++) {
        neto = facturaVentas[i].total / (1 + (facturaVentas[i].alicuota / 100));
        totalIvaVentas += neto * (facturaVentas[i].alicuota / 100);
    }

    saldo = totalIvaVentas - totalIvaCompras;

    if (saldo > 0) {
        alert("El saldo de IVA a pagar es de $" + saldo.toFixed(2));
    } else {
        alert("El saldo de IVA a favor es de $" + saldo.toFixed(2) * (-1));
    }
}