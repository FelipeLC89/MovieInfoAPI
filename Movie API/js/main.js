$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText){
    axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=93c9f116')
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Detalhes do Filme</a>
                    </div>
                </div>
            `;
        });

        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=93c9f116')
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output =`
        <div class="row">
            <div class="col-md-4>
            <img src="${movie.Poster}" class="thumbnail">
            </div>
             <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Gênero:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Data De Lançamento:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Classificação:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>Nota Imdb:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Diretor:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Roteirista:</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Elenco:</strong> ${movie.Actors}</li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="well">
                <h3>Enredo</h3>
                ${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Página IMDB</a>
                <a href="index.html" class="btn btn-default">Voltar Ao Início</a>
            </div>
        </div>
        `;

       $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}