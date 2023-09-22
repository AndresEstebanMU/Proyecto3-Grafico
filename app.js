import { fetchApi } from "./fetch.js";
import { cargarSeries } from "./series.js";

let peliculasTop = [];
let ranking = [];
let pagina = 1;

async function cargarPeliculas() {

    const respuesta = await fetchApi(`https://api.themoviedb.org/3/movie/now_playing?api_key=5e0977ca2aac82b8cead0042eb0d634f&page=${pagina}`);
    peliculasTop = respuesta.results.map((pelicula) => pelicula.title);
    ranking = respuesta.results.map((pelicula) => pelicula.vote_average);
    
   

    let peliculas = '';
    respuesta.results.forEach(pelicula => {
        peliculas += `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            </div>
        `;
    });

    document.getElementById('imagenes').innerHTML = peliculas;


    // !graficos


    let paginaFinal = respuesta.total_pages;
    let totalResultados = respuesta.total_results;
 

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {

            labels: peliculasTop,
            datasets: [{
                label: 'Promedios de puntuación dada por usuarios a Películas en Cartelera (de 1 a 10)',
                data: ranking,
                backgroundColor: 'blue',
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
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Nota promedio' // Título del eje Y
                    }
                }
            },

        }


    });
    
    //botones
    const btnInicial = document.getElementById('btnInicial');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const btnFinal = document.getElementById('btnFinal');

    btnInicial.addEventListener('click', () => {
        myChart.clear();
        myChart.destroy();
        pagina = 1;
        cargarPeliculas();
    });

    btnSiguiente.addEventListener('click', () => {
        if (pagina < paginaFinal) {
            myChart.clear();
            myChart.destroy();
            pagina += 1;
            cargarPeliculas();
        }
    });

    btnAnterior.addEventListener('click', () => {
        if (pagina > 1) {
            myChart.clear();
            myChart.destroy();
            pagina -= 1;
            cargarPeliculas();
        }
    });

    btnFinal.addEventListener('click', () => {
        myChart.clear();
        myChart.destroy();
        pagina = paginaFinal;
        cargarPeliculas();
    });

}

cargarPeliculas();
cargarSeries();





