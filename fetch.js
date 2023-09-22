export const fetchApi = async (url)=> {
    const response = await fetch(url);
    const datos = response.json();
    return datos;
}

//Función asincrona que espera a que la api entregue todos los datos en formato JSON para luego transformarlos a objeto y devolverlos. Esta función se exporta a app.js y series.js