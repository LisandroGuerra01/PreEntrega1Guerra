//Declaración de clase Factura
class Factura {
    constructor(numero, fecha, nombre, neto, alicuota) {
        this.numero = numero;
        this.fecha = fecha;
        this.nombre = nombre;
        this.neto = neto;
        this.alicuota = alicuota;
    }

    //Método de cálculo del total
    calcularTotal() {
        return this.neto * (1 + (this.alicuota / 100));
    }
    //Método de cálculo del IVA
    calcularIVA() {
        return this.neto * (this.alicuota / 100)
    }
}


//Declaración de arrays
let facturaCompras = [];
let facturaVentas = [];

//FUNCIONES

//Cargar Factura
const cargarFactura = () => {
    let facCompraOVenta = 0;
    do {
        facCompraOVenta = parseInt(prompt("Ingrese 1 para Compras \nIngrese 2 para Ventas"));
        if (facCompraOVenta != 1 && facCompraOVenta != 2) {
            alert("Opción incorrecta");
        }
    } while (facCompraOVenta != 1 && facCompraOVenta != 2);
    let facFecha = prompt("Ingrese la fecha de la factura");
    let facNro = parseInt(prompt("Ingrese el numero de la factura"));
    let facNombre = prompt("Ingrese el nombre del cliente o proveedor");
    let facNeto = parseFloat(prompt("Ingrese el neto de la factura"));

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

    // Declaración e inicialización con constructor de objeto fac
    const fac = new Factura(facNro, facFecha, facNombre, facTotal, facAlicuota)

    if (facCompraOVenta == 1) {
        facturaCompras.push(fac);
    } else {
        facturaVentas.push(fac);
    }

    alert("Factura cargada con exito");
}

//Ordenar facturas de compras por fecha
const ordenarFacCompras = () => {
    facturaCompras.sort((a, b) => a.fecha - b.fecha);
}

//Ordenar facturas de ventas por fecha            ME ARMA LA LISTA DE MAYOR A MENOR!!!
const ordenarFacVentas = () => {
    facturaVentas.sort((a, b) => a.fecha - b.fecha);
}

//Listar Facturas  de compras
const listarFacturasCompras = () => {
    ordenarFacCompras();
    facturaCompras.forEach(factura => {
        console.log(`Fecha: ${factura.fecha} // N°: ${factura.numero} // Nombre: ${factura.nombre} // Neto: ${factura.neto} // IVA CF: ${factura.calcularIVA().toFixed(2)} // Total: ${factura.calcularTotal().toFixed(2)}`);
    })
}

//Listar Facturas  de ventas
const listarFacturasVentas = () => {
    ordenarFacVentas();
    facturaVentas.map(factura => {
        console.log(`Fecha: ${factura.fecha} // N°: ${factura.numero} // Nombre: ${factura.nombre} // Neto: ${factura.neto} // IVA DF: ${factura.calcularIVA().toFixed(2)} // Total: ${factura.calcularTotal().toFixed(2)}`);
    })
}


//Eliminar factura
const eliminarFactura = () => {
    let facCompraOVenta = 0;
    do {
        facCompraOVenta = parseInt(prompt("Ingrese 1 para Compras \nIngrese 2 para Ventas"));
        if (facCompraOVenta != 1 && facCompraOVenta != 2) {
            alert("Opción incorrecta");
        }
    } while (facCompraOVenta != 1 && facCompraOVenta != 2);

    let facturaAEliminar = prompt("Ingrese el número de factura que desea eliminar:");
    let facturaEncontrada = false;

    if (facCompraOVenta == 1) {
        for (let i = 0; i < facturaCompras.length; i++) {
            if (facturaCompras[i].numero === parseInt(facturaAEliminar)) {
                facturaCompras.splice(i, 1);
                facturaEncontrada = true;
                alert("Factura eliminada con éxito");
                break;
            }
        }
    } else {
        for (let i = 0; i < facturaVentas.length; i++) {
            if (facturaVentas[i].numero === parseInt(facturaAEliminar)) {
                facturaVentas.splice(i, 1);
                facturaEncontrada = true;
                alert("Factura eliminada con éxito");
                break;
            }
        }
    }

    if (!facturaEncontrada) {
        alert("Factura inexistente");
    }

    // Devolver el array actualizado
    if (facCompraOVenta == 1) {
        return facturaCompras;
    } else {
        return facturaVentas;
    }
}


//Calcular saldo de IVA
const verSaldoIVA = () => {

    let totalIvaCompras = facturaCompras.reduce((acum, fac) => acum + fac.calcularIVA(), 0);
    let totalIvaVentas = facturaVentas.reduce((acum, fac) => acum + fac.calcularIVA(), 0);
    let saldo = totalIvaVentas - totalIvaCompras;

    if (saldo > 0) {
        alert("El saldo de IVA a pagar es de $" + saldo.toFixed(2));
        console.log("IVA a pagar $" + saldo.toFixed(2));
    } else {
        alert("El saldo de IVA a favor es de $" + saldo.toFixed(2) * (-1));
        console.log("IVA a favor $" + saldo.toFixed(2) * (-1));
    }
}

//Buscar facturas
const buscarFactura = () => {
    let facNro = parseInt(prompt("Ingrese el número de factura"));
    let facEncontrada = facturaCompras.find(factura => factura.numero == facNro);

    if (facEncontrada) {
        console.log(`Fecha: ${facEncontrada.fecha} - N°: ${facEncontrada.numero} - Nombre: ${facEncontrada.nombre} - Neto: ${facEncontrada.calcularNeto().toFixed(2)} - IVA CF: ${facEncontrada.calcularIVA().toFixed(2)} - Total: ${facEncontrada.total}`);
    } else {
        facEncontrada = facturaVentas.find(factura => factura.numero == facNro);
        if (facEncontrada) {
            console.log(`Fecha: ${facEncontrada.fecha} - N°: ${facEncontrada.numero} - Nombre: ${facEncontrada.nombre} - Neto: ${facEncontrada.calcularNeto().toFixed(2)} - IVA DF: ${facEncontrada.calcularIVA().toFixed(2)} - Total: ${facEncontrada.total}`);
        }
        else {
            alert("Factura inexistente!")
        }
    }
}
