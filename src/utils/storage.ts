import {IMovie} from "../types/movie.type"

export const saveFavouriteMovie = async (movies: IMovie[]) => {
  try {
    const jsonValue = JSON.stringify(movies)
    await localStorage.setItem("@favourites", jsonValue)
  } catch (error) {}
}

export const loadFavouriteMovies = async () => {
  try {
    const value = await localStorage.getItem("@favourites")
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (err) {}
}

export const clearAllMovies = async () => {
  try {
    const jsonValue = JSON.stringify([])
    await localStorage.setItem("@favourites", jsonValue)
  } catch (error) {}
}
