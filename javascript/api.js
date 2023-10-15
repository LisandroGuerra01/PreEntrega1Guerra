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
        console.log(result);
    } catch (error) {
        console.error(error);
    }

