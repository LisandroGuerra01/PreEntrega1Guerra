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


//Guardar LS
const guardarLocalStorage = (data, key) => {
    localStorage.setItem(key, JSON.stringify(data));
}
//Recuperar LS
const recuperarLocalStorage = (key) => {
    if (localStorage.getItem(key) !=null) {
        return JSON.parse(localStorage.getItem(key));
    } else {
        return [];
    }
}

//Declaración de arrays
let facturaCompras = [];
let facturaVentas = [];

//Declaración de constantes
const keyCompras = "facturaCompras";
const keyVentas = "facturaVentas";

//Carga de facturas de compras y ventas de JS
facturaCompras = recuperarLocalStorage(keyCompras);
facturaVentas = recuperarLocalStorage(keyVentas);

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
        guardarLocalStorage(facturaCompras, keyCompras);
    } else {
        facturaVentas.push(facDom);
        guardarLocalStorage(facturaVentas, keyVentas);
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



//Listar facturas en DOM

//eliminar factura

const eliminarFacturaDom = (numero) => {
    let facturaEncontrada = facturaVentas.find(factura => factura.numero == numero);
    if (facturaEncontrada) {
        facturaVentas.splice(facturaEncontrada, 1);
        guardarLocalStorage(facturaVentas, keyVentas);
        alert("Factura eliminada con éxito");
    } else {
        alert("Factura inexistente");
    }
}

//Ver facturas
const verFactura = (data) => {
    let contenidoHTML = `<table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Tipo Factura</th>
                                    <th scope="col">Pto. Venta</th>
                                    <th scope="col">N° Factura</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Neto</th>
                                    <th scope="col">IVA</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>`;
    data.forEach(factura => {
        contenidoHTML += `<tr>
                            <td>${factura.fecha}</td>
                            <td>${factura.tipo}</td>
                            <td>${factura.tipoFac}</td>
                            <td>${factura.ptoVta}</td>
                            <td>${factura.numero}</td>
                            <td>${factura.nombre}</td>
                            <td>${factura.neto}</td>
                            <td>${factura.iva.toFixed(2)}</td>
                            <td>${factura.total.toFixed(2)}</td>
                            <td>
                                <button class="btn btn-danger" onclick="eliminarFacturaDom(${factura.numero})">Eliminar</button>
                            </td>
                        </tr>`
    })

    contenidoHTML += `</table>`;
    document.getElementById("ventas").innerHTML = contenidoHTML;
}

const btnVerVentas = document.getElementById("btnVerVentas")

btnVerVentas.addEventListener("click", (e) => {
    e.preventDefault();
    verFactura(facturaVentas);
})


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

