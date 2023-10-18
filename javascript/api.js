//GetPrices
const getPrices = async () => {
    const url = 'https://crypto-and-forex-rates.p.rapidapi.com/api/getPrices';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '527bdecd2amsh8c9b343c7ed0749p158241jsn8bdd9f9f9d40',
            'X-RapidAPI-Host': 'crypto-and-forex-rates.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

//recorrer data de api y mostrar en consola
const dataApi = document.getElementById('dataApi');

const showData = async () => {
    const data = await getPrices();
console.log(data);
    //Array de cotizaciones a mostrar
    let posicionCotizacion = [0, 16, 2, 4, 5, 8, 1, 11, 13, 14, 10, 17, 18, 20, 27, 50, 67, 40,  49, 117];
    let dataCotizacion = []
    for (let i = 0; i < posicionCotizacion.length; i++) {
        dataCotizacion.push(data[0][posicionCotizacion[i]]);
    }

    dataCotizacion.forEach(element => {
        dataApi.innerHTML += ` <span class="text-warning fw-bold">${element.Symbol}</span>  -  $ ${element.Price} <span class="text-dark">||</span>`;
    });
};

showData();