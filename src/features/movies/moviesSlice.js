import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import movieAPI, { filterHorrorMovies } from '../../common/apis/movieAPI'
import APIKey from '../../common/apis/movieAPIKey'

const initialState = {
    movieData: [],
    searchTerm: '', //'a nightmare on elm street',
    currentMovie: [],
    status: 'idle',
};

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
        return response.data
    }
)

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        updateSearchTerm(state, { payload }) {
            state.searchTerm = payload
        },
        setCurrentMovie(state, { payload }) {
            state.currentMovie = payload
        }
    },
    extraReducers: (builder) => {
        builder       
        .addCase(searchAsyncMovies.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(searchAsyncMovies.fulfilled, (state, { payload }) => {
            state.status = 'idle';    
            state.movieData = payload;
        })
        .addCase(searchAsyncMovies.rejected, (state) => {
            state.status = 'rejected';
        })    

        .addCase(getPopularMovies.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getPopularMovies.fulfilled, (state, { payload }) => {
            state.status = 'idle';    
            state.movieData = payload;
        })
        .addCase(getPopularMovies.rejected, (state) => {
            state.status = 'rejected';
        })    

        .addCase(getMovie.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getMovie.fulfilled, (state, { payload }) => {
            state.status = 'idle';    
            state.currentMovie = payload;
        })
        .addCase(getMovie.rejected, (state) => {
            state.status = 'rejected';
        })  
    }
})

export const { updateSearchTerm } = moviesSlice.actions

export const getAllMovies = (state) => state.movies.movieData
export const getSearchTerm  = (state) => state.movies.searchTerm
export const getCurrentMovie = (state) => state.movies.currentMovie

export default moviesSlice.reducer;