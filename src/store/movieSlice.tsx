import {PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import {getPopularMoviesService, searchMoviesService} from "../services/movies"
import {IMovie} from "../types/movie.type"
import {saveFavouriteMovie} from "../utils/storage"

export interface movieState {
  popularMovies: IMovie[]
  favoriteMovies: IMovie[]
  searchedMovies: IMovie[]
  page: number
  loading: string
  error: string | undefined
}

const initialState: movieState = {
  popularMovies: [],
  favoriteMovies: [],
  page: 0,
  loading: "idle",
  error: "",
  searchedMovies: [],
}

export const fetchPopularMovies = createAsyncThunk(
  "movies/loadMoreMovies",
  async () => {
    const response = await getPopularMoviesService()
    return response.data
  }
)

export const loadMoreMovies = createAsyncThunk(
  "getmovies/loadMoreMovies",
  async (payload: any) => {
    const response = await getPopularMoviesService(payload)
    return response.data
  }
)

export const searchMovies = createAsyncThunk(
  "searchmovies/loadMoreMovies",
  async (payload: any) => {
    const response = await searchMoviesService(payload)
    return response.data
  }
)

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    loadFavouriteMovies: (state) => {
      try {
        const favMovies = localStorage.getItem("@favourites")
        if (favMovies !== null) {
          state.favoriteMovies = JSON.parse(favMovies)
        }
      } catch (err) {}
    },
    addFavouriteMovie: (state, action: PayloadAction<IMovie>) => {
      const movie = state.favoriteMovies.find(
        (movie) => movie.id === action.payload.id
      )

      if (!movie) {
        state.favoriteMovies = [...state.favoriteMovies, action.payload]
        let faveMovies = [...state.favoriteMovies, action.payload]
        saveFavouriteMovie(faveMovies)
      }
    },
    removeFavouriteMovie: (state, action: PayloadAction<IMovie>) => {
      const newFavouriteMovies = state.favoriteMovies.filter(
        (m) => m.id !== action.payload.id
      )
      state.favoriteMovies = newFavouriteMovies
      saveFavouriteMovie(newFavouriteMovies)
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = "pending"
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.popularMovies = action.payload.results
        state.page = action.payload.page
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = "rejected"
        state.error = action.error.message
      })

      .addCase(loadMoreMovies.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.popularMovies = [
          ...state.popularMovies,
          ...action.payload.results,
        ]
        state.page = action.payload.page
      })
      .addCase(loadMoreMovies.rejected, (state, action) => {
        state.loading = "rejected"
        state.error = action.error.message
      })

      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = "fulfilled"
        state.searchedMovies = action.payload.results
      })
  },
})

export const {loadFavouriteMovies, addFavouriteMovie, removeFavouriteMovie} =
  movieSlice.actions

export default movieSlice.reducer
