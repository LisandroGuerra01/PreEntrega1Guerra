//Declaración de clase Factura
class Factura {
    constructor(tipo, fecha, tipoFac, ptoVta, numero, nombre, neto, alicuota) {
        this.tipo = tipo;
        this.fecha = fecha;
        this.tipoFac = tipoFac;
        this.ptoVta = ptoVta;
        this.numero = numero;
        this.nombre = nombre;
        this.neto = neto;
        this.alicuota = alicuota;
        this.iva = this.calcularIVA();
        this.total = this.calcularTotal();
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

//Carga de facturas de compras y ventas de JS
if (localStorage.getItem("facturaCompras") != null) {
    facturaCompras = JSON.parse(localStorage.getItem("facturaCompras"));
}
if (localStorage.getItem("facturaVentas") != null) {
    facturaVentas = JSON.parse(localStorage.getItem("facturaVentas"));
}


//FUNCIONES



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

//Cargar facturas DOM
const cargarFacturaDom = () => {
    const tipo = document.getElementById("tipo").value;
    const fecha = document.getElementById("fecha").value;
    const tipoFac = document.getElementById("tipoFac").value;
    const ptoVta = document.getElementById("ptoVta").value;
    const numFac = document.getElementById("numFac").value;
    const nombreEntidad = document.getElementById("nombreEntidad").value;
    const neto = document.getElementById("neto").value;
    const alicuota = document.getElementById("alicuota").value;
    const iva = neto * (alicuota / 100);
    const total = neto + iva;

    //Declarar e inicializar con constructor de obj factura para DOM
    const facDom = new Factura(tipo, fecha, tipoFac, ptoVta, numFac, nombreEntidad, neto, alicuota);

    if (facDom.tipo == "compras") {
        facturaCompras.push(facDom);
        localStorage.setItem("facturaCompras", JSON.stringify(facturaCompras));
    } else {
        facturaVentas.push(facDom);
        localStorage.setItem("facturaVentas", JSON.stringify(facturaVentas));
    }

}

const btnConfirm = document.getElementById("btnConfirm")

btnConfirm.addEventListener("click", (e) => {
    e.preventDefault();
    //Cargar Factura
    cargarFacturaDom();

    //Sweet Alert. Librería JS
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Factura cargada con éxito',
        showConfirmButton: false,
        timer: 1500
    })
    document.getElementById("formFactura").reset();
})


//Ver facturas
//Listar facturas en DOM
//COMPRAS
const listarFacturasComprasDom = () => {
    let tabla = document.getElementById("tablaCompras");
    let cuerpoTabla = document.createElement("tbody");
    tabla.appendChild(cuerpoTabla);

    facturaCompras.forEach((fac) => {
        let fila = document.createElement("tr");
        cuerpoTabla.appendChild(fila);

        let fecha = document.createElement("td");
        fecha.innerText = fac.fecha;
        fila.appendChild(fecha);

        let tipoFac = document.createElement("td");
        tipoFac.innerText = fac.tipoFac;
        fila.appendChild(tipoFac);

        let ptoVta = document.createElement("td");
        ptoVta.innerText = fac.ptoVta;
        fila.appendChild(ptoVta);

        let numFac = document.createElement("td");
        numFac.innerText = fac.numero;
        fila.appendChild(numFac);

        let nombre = document.createElement("td");
        nombre.innerText = fac.nombre;
        fila.appendChild(nombre);

        let neto = document.createElement("td");
        neto.innerText = fac.neto;
        fila.appendChild(neto);

        let alicuota = document.createElement("td");
        alicuota.innerText = fac.alicuota;
        fila.appendChild(alicuota);

        let iva = document.createElement("td");
        iva.innerText = fac.iva;
        fila.appendChild(iva);

        let total = document.createElement("td");
        total.innerText = fac.total;
        fila.appendChild(total);
    })
}

//VENTAS
const listarFacturasVentasDom = () => {
    let tabla = document.getElementById("tablaVentas");
    let cuerpoTabla = document.createElement("tbody");
    tabla.appendChild(cuerpoTabla);

    facturaCompras.forEach((fac) => {
        let fila = document.createElement("tr");
        cuerpoTabla.appendChild(fila);

        let fecha = document.createElement("td");
        fecha.innerText = fac.fecha;
        fila.appendChild(fecha);

        let tipoFac = document.createElement("td");
        tipoFac.innerText = fac.tipoFac;
        fila.appendChild(tipoFac);

        let ptoVta = document.createElement("td");
        ptoVta.innerText = fac.ptoVta;
        fila.appendChild(ptoVta);

        let numFac = document.createElement("td");
        numFac.innerText = fac.numero;
        fila.appendChild(numFac);

        let nombre = document.createElement("td");
        nombre.innerText = fac.nombre;
        fila.appendChild(nombre);

        let neto = document.createElement("td");
        neto.innerText = fac.neto;
        fila.appendChild(neto);

        let alicuota = document.createElement("td");
        alicuota.innerText = fac.alicuota;
        fila.appendChild(alicuota);

        let iva = document.createElement("td");
        iva.innerText = fac.iva;
        fila.appendChild(iva);

        let total = document.createElement("td");
        total.innerText = fac.total;
        fila.appendChild(total);
    })
}
