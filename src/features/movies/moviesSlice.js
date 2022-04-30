import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import movieAPI, { filterHorrorMovies } from '../../common/apis/movieAPI'
import APIKey from '../../common/apis/movieAPIKey'

const initialState = {
    movieData: {},
    searchTerm: '', //'a nightmare on elm street',
    currentMovie: [],
    loading: true,
};

export const resetMovies = () => {
    return (dispatch) => {
        dispatch(resetMovies())
        dispatch(getPopularMovies())
    }
}

export const getPopularMovies = createAsyncThunk(
    'movies/mostPopular',
    async() => {
        const response = await movieAPI
            .get(`discover/movie?api_key=${APIKey}&sort_by=vote_count.desc&with_genres=27`)
            .catch((error) => {
              console.error(error)
            })

        return filterHorrorMovies(response.data.results)
    }
)

export const searchAsyncMovies = createAsyncThunk(
    'movies/searchMovies',
    async (searchTerm, { getState }) => {
        const response = await movieAPI
            .get(`search/movie?api_key=${APIKey}&query=${searchTerm}`)
            .catch((error) => {
              console.error(error)
            })

        return filterHorrorMovies(response.data.results)
    }
)

export const getMovie = createAsyncThunk(
    'movies/getMovie',
    async (id, { getState }) => {
        const response = await movieAPI
            .get(`movie/${id}?api_key=${APIKey}`)
            .catch((error) => {
              console.error(error)
            })

            setTimeout(() => {} ,30000)
            return response.data
    }
)

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        updateSearchTerm(state, { payload }) {
            state.movieData = {}
            state.searchTerm = payload
        },
        setCurrentMovie(state, { payload }) {
            state.currentMovie = payload
        },
        clearMovie(state) {
            state.currentMovie = []
        },
        resetMovies(state) {
            state.movieData = {}
        } 
    },
    extraReducers: (builder) => {
        builder
        // search      
        .addCase(searchAsyncMovies.pending, (state) => {
            state.loading = true;
        })
        .addCase(searchAsyncMovies.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.movieData = payload;
        })
        .addCase(searchAsyncMovies.rejected, (state) => {
            state.loading = false;
        })    

        //popular
        .addCase(getPopularMovies.pending, (state) => {
            state.loading = true;
        })
        .addCase(getPopularMovies.fulfilled, (state, { payload }) => {
            state.loading = false;  
            state.movieData = payload;
        })
        .addCase(getPopularMovies.rejected, (state) => {
            state.loading = false;
        })    

        //single
        .addCase(getMovie.pending, (state) => {
            state.loading = true;
        })
        .addCase(getMovie.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.currentMovie = payload;
        })
        .addCase(getMovie.rejected, (state) => {
            state.loading = false;
        })  
    }
})

export const { updateSearchTerm, clearMovie } = moviesSlice.actions

export const selectAllMovies = (state) => state.movies.movieData
export const selectSearchTerm  = (state) => state.movies.searchTerm
export const selectCurrentMovie = (state) => state.movies.currentMovie
export const selectLoadingState = (state) => state.movies.loading

export default moviesSlice.reducer;