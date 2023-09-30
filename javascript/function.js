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
    if (localStorage.getItem(key) != null) {
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

const netoDom = document.getElementById("neto");
const alicuotaDom = document.getElementById("alicuota");
const ivaDom = document.getElementById("iva");
const totalDom = document.getElementById("total");

//Cálculo de IVA y Total en DOM
const calcularIvaTotal = () => {
    const neto = document.getElementById("neto").value;
    const alicuota = document.getElementById("alicuota").value;

    ivaDom.value = (neto * (alicuota / 100)).toFixed(2);
    totalDom.value = (neto * (1 + (alicuota / 100))).toFixed(2);
}

netoDom.addEventListener("change", calcularIvaTotal);
netoDom.addEventListener("keyup", calcularIvaTotal);
alicuotaDom.addEventListener("change", calcularIvaTotal);
alicuotaDom.addEventListener("keyup", calcularIvaTotal);


//Listar facturas en DOM

//eliminar factura
const eliminarFacturaDom = (numero, tipoFac) => {
    if (tipoFac == "compras") {
        facturaComprasEliminar = facturaCompras.filter(factura => factura.numero != numero);
        //sweet alert con confirmación
        Swal.fire({
            title: '¿Está seguro?',
            text: "No podrá revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado',
                    'La factura ha sido eliminada',
                    'success'
                )
                facturaCompras = facturaComprasEliminar;
                guardarLocalStorage(facturaCompras, keyCompras);
                if (facturaCompras.length == 0) {
                    document.getElementById("tablaFacturas").innerHTML = "";
                } else {
                    verFactura(facturaCompras);
                }
            }
        })
    } else {
        facturaVentasEliminar = facturaVentas.filter(factura => factura.numero != numero);
        //sweet alert con confirmación
        Swal.fire({
            title: '¿Está seguro?',
            text: "No podrá revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado',
                    'La factura ha sido eliminada',
                    'success'
                )
                facturaVentas = facturaVentasEliminar;
                guardarLocalStorage(facturaVentas, keyVentas);
                if (facturaVentas.length == 0) {
                    document.getElementById("tablaFacturas").innerHTML = "";
                } else {
                    verFactura(facturaVentas);
                }
            }
        })
    }
}

//Ordenar facturas por fecha de mayor a menor
const ordenarFac = (data) => {
    data.sort((b, a) => new Date(b.fecha) - new Date(a.fecha));
    return data;
}

//Ver facturas
const verFactura = (data) => {
    if (data.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay facturas cargadas',
        })
        return;
    }
    ordenarFac(data);
    let contenidoHTML = `<h3>Listado de Facturas de ${data[0].tipo}</h3><table class="table table-striped table-hover">
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
                                <button class="btn btn-danger" onclick="eliminarFacturaDom(
                                    ${factura.numero}, '${factura.tipo}'
                                )">
                                <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>`
    })

    contenidoHTML += `</table>`;
    document.getElementById("tablaFacturas").innerHTML = contenidoHTML;
}

//Ver ventas
const btnVerVentas = document.getElementById("btnVerVentas");

btnVerVentas.addEventListener("click", (e) => {
    e.preventDefault();
    verFactura(facturaVentas);
})

//Ver compras
const btnVerComprass = document.getElementById("btnVerCompras");

btnVerCompras.addEventListener("click", (e) => {
    e.preventDefault();
    verFactura(facturaCompras);
})


//Ver saldo
const verSaldoIVA = () => {

    let IvaCF = facturaCompras.reduce((acum, fac) => acum + fac.iva, 0);
    let IvaDF = facturaVentas.reduce((acum, fac) => acum + fac.iva, 0);
    let saldoIVA = IvaDF - IvaCF;

    if (saldoIVA > 0) {
        Swal.fire('El saldo de IVA a pagar es de $' + saldoIVA.toFixed(2));
    } else if (saldoIVA < 0) {
        Swal.fire('El saldo de IVA a favor es de $' + saldoIVA.toFixed(2) * -1);
    } else {
        Swal.fire('El saldo de IVA es de' + saldoIVA.toFixed(2));
    }
}

const btnSaldoIVA = document.getElementById("btnSaldoIVA");

btnSaldoIVA.addEventListener("click", (e) => {
    e.preventDefault();
    verSaldoIVA();
})

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

    //Declarar e inicializar con constructor de obj factura para DOM
    const facDom = new Factura(tipo, fecha, tipoFac, ptoVta, numFac, nombreEntidad, neto, alicuota);

    if (tipoFac !== "FA" && tipoFac !== "FB" && tipoFac !== "FC" && tipoFac !== "NDA" && tipoFac !== "NDB" && tipoFac !== "NDC") {
        facDom.iva = facDom.iva * (-1);
        console.log(facDom);
    }


    if (facDom.tipo == "compras") {
        facturaCompras.push(facDom);
        guardarLocalStorage(facturaCompras, keyCompras);
        verFactura(facturaCompras);
    } else {
        facturaVentas.push(facDom);
        guardarLocalStorage(facturaVentas, keyVentas);
        verFactura(facturaVentas);
    }

}

const btnConfirm = document.getElementById("btnConfirm")

btnConfirm.addEventListener("click", (e) => {
    e.preventDefault();
    //Cargar Factura
    cargarFacturaDom();

    //Sweet Alert
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Factura cargada con éxito',
        showConfirmButton: false,
        timer: 1500
    })
    document.getElementById("formFactura").reset();
})