import axios from "axios";

export const filterHorrorMovies = (movies) => {
    const filteredMovies = []
        
    for (const movie of movies) {
        const genreList = movie.genre_ids;
        
        if (genreList.includes(27) && movie.poster_path !== null) { 
            filteredMovies.push(movie)
        }
    }

    return filteredMovies
}

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
})