import { fetchApi } from "./fetch.js";              //Importa la funcion fetchApi del archivo fetch.js

// Arreglos vacios que reciben los datos que queramos extraer de la api
let seriesTop = [];
let ranking2 = [];
let pagina2 = 1;


// Función asincrona que espera recibir todos los datos de la api para comenzar a llenar los arreglos vacios con info. Se exporta a app.js
export async function cargarSeries() {
    //guarda en respuesta los datos entregados por la api, el import del archivo fetch permite verlo como objeto inmediatamente
    const respuesta = await fetchApi(`https://api.themoviedb.org/3/tv/airing_today?api_key=5e0977ca2aac82b8cead0042eb0d634f&page=${pagina2}`);

    //rellena los arreglos vacios con el nombre de las series y su promedio de puntuacion respectivamente
    seriesTop = respuesta.results.map((pelicula) => pelicula.name);
    ranking2 = respuesta.results.map((pelicula) => pelicula.vote_average);
   
    //toma las carátulas de series traidas por la api y las pone en el contenedor 'imagenes' del index
    let peliculas2 = '';
    respuesta.results.forEach(pelicula => {
        peliculas2 += `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            </div>
        `;
    });

    document.getElementById('imagenes2').innerHTML = peliculas2;


    // Gráficos

    //cantidad de graficos disponibles para mostrar
    let paginaFinal2 = respuesta.total_pages;
        
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const myChart2 = new Chart(ctx2, {
        type: 'bar',                //grafico de barras
        data: {
            labels: seriesTop,          //arreglo con nombres de series para el eje x
            datasets: [{
                label: 'Promedio de puntuación dada por usuarios a Series al aire Actualmente (de 1 a 10)',        //Titulo del gráfico
                data: ranking2,         //arreglo con promedios de puntuación para el eje y
                backgroundColor: 'red',             //color de la barras
                borderColor: 'red',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: `Página ${pagina2} de ${paginaFinal2}` // Título del eje X
                    }
                },
                y: {
                    beginAtZero: true,          //El grafico empieza desde el cero
                    title: {
                        display: true,
                        text: 'Nota promedio' // Título del eje Y
                    }
                }
            },

        }


    });
    

    //botones
    const btnInicial2 = document.getElementById('btnInicial2');
    const btnAnterior2 = document.getElementById('btnAnterior2');
    const btnSiguiente2 = document.getElementById('btnSiguiente2');
    const btnFinal2 = document.getElementById('btnFinal2');

    //Grafica el arreglo de la primera página
    btnInicial2.addEventListener('click', () => {
        myChart2.clear();
        myChart2.destroy();
        pagina2 = 1;
        cargarSeries();
    });

    //Grafica la siguiente página
    btnSiguiente2.addEventListener('click', () => {
        if (pagina2 < paginaFinal2) {
            myChart2.clear();
            myChart2.destroy();
            pagina2 += 1;
            cargarSeries();
        }
    });

    //Grafica la pagina anterior
    btnAnterior2.addEventListener('click', () => {
        if (pagina2 > 1) {
            myChart2.clear();
            myChart2.destroy();
            pagina2 -= 1;
            cargarSeries();
        }
    });

    //Grafica la página final
    btnFinal2.addEventListener('click', () => {
        myChart2.clear();
        myChart2.destroy();
        pagina2 = paginaFinal2;
        cargarSeries();
    });

}