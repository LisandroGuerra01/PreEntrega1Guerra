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
    let dataCotizaciones = [0, 2, 4, 5, 18, 20, 27, 50, 67, 40, 1, 8, 11, 13, 14, 10, 16, 17, 49, 117];
    for (let i = 0; i < 20; i++) {
        dataCotizaciones.push(data[0]);
    }

    dataCotizaciones.forEach(element => {
        dataApi.innerHTML += `<span>${element.Symbol} - ${element.Price} | </span>`;
    });
}

showData();