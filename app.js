import { fetchApi } from "./fetch.js";              //importa las funciones fetchApi y cargarSeries() de fetch.js y series.js respectivamente
import { cargarSeries } from "./series.js";

// Arreglos vacios que reciben los datos que queramos extraer de la api
let peliculasTop = [];
let ranking = [];
let pagina = 1;

// Función asincrona que espera recibir todos los datos de la api para comenzar a llenar los arreglos vacios con info
async function cargarPeliculas() {
    //guarda en respuesta los datos entregados por la api, el import del archivo fetch permite verlo como objeto inmediatamente
    const respuesta = await fetchApi(`https://api.themoviedb.org/3/movie/now_playing?api_key=5e0977ca2aac82b8cead0042eb0d634f&page=${pagina}`);

    //rellena los arreglos vacios con el nombre de las películas y su promedio de puntuacion respectivamente
    peliculasTop = respuesta.results.map((pelicula) => pelicula.title);
    ranking = respuesta.results.map((pelicula) => pelicula.vote_average);
    
   
    //toma las carátulas de películas traidas por la api y las pone en el contenedor 'imagenes' del index
    let peliculas = '';
    respuesta.results.forEach(pelicula => {
        peliculas += `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            </div>
        `;
    });

    document.getElementById('imagenes').innerHTML = peliculas;


    
    // Gráfico

    //cantidad de graficos disponibles para mostrar
    let paginaFinal = respuesta.total_pages;
 
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',                //grafico de barras
        data: {

            labels: peliculasTop,           //arreglo con nombres de peliculas para el eje x
            datasets: [{
                label: 'Promedios de puntuación dada por usuarios a Películas en Cartelera (de 1 a 10)',            //Titulo del gráfico
                data: ranking,              //arreglo con promedios de puntuación para el eje y
                backgroundColor: 'blue',            //color de la barras
                borderColor: 'blue',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: `Página ${pagina} de ${paginaFinal}` // Título del eje X
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
    
    
    // Botones
    const btnInicial = document.getElementById('btnInicial');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const btnFinal = document.getElementById('btnFinal');

    //Grafica el arreglo de la primera página
    btnInicial.addEventListener('click', () => {
        myChart.clear();
        myChart.destroy();
        pagina = 1;
        cargarPeliculas();
    });

    //Grafica la siguiente página
    btnSiguiente.addEventListener('click', () => {
        if (pagina < paginaFinal) {
            myChart.clear();
            myChart.destroy();
            pagina += 1;
            cargarPeliculas();
        }
    });

    //Grafica la pagina anterior
    btnAnterior.addEventListener('click', () => {
        if (pagina > 1) {
            myChart.clear();
            myChart.destroy();
            pagina -= 1;
            cargarPeliculas();
        }
    });

    //Grafica la página final
    btnFinal.addEventListener('click', () => {
        myChart.clear();
        myChart.destroy();
        pagina = paginaFinal;
        cargarPeliculas();
    });

}

//Llama a la funcion para mostrar ambos graficos (peliculas y series). cargarSeries() es un impor de series.js
cargarPeliculas();
cargarSeries();