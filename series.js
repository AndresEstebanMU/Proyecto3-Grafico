import { fetchApi } from "./fetch.js";
let seriesTop = [];
let ranking2 = [];
let pagina2 = 1;



export async function cargarSeries() {

    
    const respuesta = await fetchApi(`https://api.themoviedb.org/3/tv/airing_today?api_key=5e0977ca2aac82b8cead0042eb0d634f&page=${pagina2}`);

    
    seriesTop = respuesta.results.map((pelicula) => pelicula.name);
    ranking2 = respuesta.results.map((pelicula) => pelicula.vote_average);
   
    let peliculas2 = '';
    respuesta.results.forEach(pelicula => {
        peliculas2 += `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            </div>
        `;
    });

    document.getElementById('imagenes2').innerHTML = peliculas2;


    // !graficos


    let paginaFinal2 = respuesta.total_pages;
    let totalResultados2 = respuesta.total_results;
   

    
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: seriesTop,
            datasets: [{
                label: 'Promedio de puntuación dada por usuarios a Series Actuales (de 1 a 10)',
                data: ranking2,
                backgroundColor: 'red',
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
    const btnInicial2 = document.getElementById('btnInicial2');
    const btnAnterior2 = document.getElementById('btnAnterior2');
    const btnSiguiente2 = document.getElementById('btnSiguiente2');
    const btnFinal2 = document.getElementById('btnFinal2');

    btnInicial2.addEventListener('click', () => {
        myChart2.clear();
        myChart2.destroy();
        pagina2 = 1;
        cargarSeries();
    });

    btnSiguiente2.addEventListener('click', () => {
        if (pagina2 < paginaFinal2) {
            myChart2.clear();
            myChart2.destroy();
            pagina2 += 1;
            cargarSeries();
        }
    });

    btnAnterior2.addEventListener('click', () => {
        if (pagina2 > 1) {
            myChart2.clear();
            myChart2.destroy();
            pagina2 -= 1;
            cargarSeries();
        }
    });

    btnFinal2.addEventListener('click', () => {
        myChart2.clear();
        myChart2.destroy();
        pagina2 = paginaFinal2;
        cargarSeries();
    });

}


