//Declaración de clase Factura
class Factura {
    constructor(numero, fecha, nombre, total, alicuota) {
        this.numero = numero;
        this.fecha = fecha;
        this.nombre = nombre;
        this.total = total;
        this.alicuota = alicuota;
    }

//Método de cálculo del IVA
    calcularNeto() {
        return this.total / (1 + (this.alicuota/100));
    }
//Método de cálculo del neto
    calcularIVA() {
        return this.calcularNeto() * (this.alicuota/100)
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

// Declaración e inicialización con constructor de objeto fac
    const fac = new Factura (facNro, facFecha, facNombre, facTotal, facAlicuota)

    if (facCompraOVenta == 1) {
        facturaCompras.push(fac);
    } else {
        facturaVentas.push(fac);
    }

    alert("Factura cargada con exito");
}

//Listar Facturas  de compras
const listarFacturasCompras = () => {
        facturaCompras.forEach(factura => {
            console.log(`Fecha: ${factura.fecha} - N°: ${factura.numero} - Nombre: ${factura.nombre} - Neto: ${factura.calcularNeto().toFixed(2)} - IVA: ${factura.calcularIVA().toFixed(2)} - Total: ${factura.total}`);
        })
    }

//Listar Facturas  de ventas
const listarFacturasVentas = () => {
    facturaVentas.map(factura => {
        console.log(`Fecha: ${factura.fecha} - N°: ${factura.numero} - Nombre: ${factura.nombre} - Neto: ${factura.calcularNeto().toFixed(2)} - IVA: ${factura.calcularIVA().toFixed(2)} - Total: ${factura.total}`);
    })
}

//Calcular saldo de IVA
const verSaldoIVA = () => {

    let totalIvaCompras = facturaCompras.reduce((acum, fac) => acum + fac.calcularIVA(), 0);
    let totalIvaVentas = facturaVentas.reduce((acum, fac) => acum + fac.calcularIVA(), 0);
    let saldo = totalIvaVentas - totalIvaCompras;

    if (saldo > 0) {
        alert("El saldo de IVA a pagar es de $" + saldo.toFixed(2));
    } else {
        alert("El saldo de IVA a favor es de $" + saldo.toFixed(2) * (-1));
    }
}