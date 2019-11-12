const API_TOKEN="89776578a0ff15b8f8552c1ece1bc14d";

export function getFilmsFromApiWithSearchText(text,page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page='+page
    return fetch(url)
        .then((response)=>response.json())
        .catch((error)=>console.log(error))
}
export function getFilmsPoster(name) {
  return "https://image.tmdb.org/t/p/w300"+name
}

export function getFilmDetails(id) {
    const url = 'https://api.themoviedb.org/3/movie/' + id +'?api_key='+API_TOKEN + '&language=fr'
    return fetch(url)
        .then((response)=>response.json())
        .catch((error)=>console.log(error))
}


export function getNewMovies(page) {
  return fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN +'&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page='+page)
         .then((response)=>response.json())
          .catch((error)=>console.error(error))
}