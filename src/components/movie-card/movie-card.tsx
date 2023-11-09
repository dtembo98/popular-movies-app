// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as react from "react"

import {Box, Typography} from "@material-ui/core"
import styled from "styled-components"
import FavoriteIcon from "@mui/icons-material/Favorite"

import {imageExtractor} from "../../utils/helpers"

import {IMovie} from "../../types/movie.type"
import {useAppSelector} from "../../store/rootReducer"
import {useAppDispatch} from "../../store"
import {addFavouriteMovie, removeFavouriteMovie} from "../../store/movieSlice"

interface MovieCardProps {
  movie: IMovie
}

export const MovieCard = (props: MovieCardProps) => {
  const dispatch = useAppDispatch()
  const {favoriteMovies} = useAppSelector((state) => state.movies)
  const {movie} = props
  const posterImageUrl = imageExtractor("posterSmall", movie?.poster_path)

  const favouriteMovie = favoriteMovies.find((m) => m.id === movie.id)
  const isFavouriteMovie = favouriteMovie ? true : false

  const handleClick = () => {
    if (!isFavouriteMovie) {
      dispatch(addFavouriteMovie(movie))
    } else {
      dispatch(removeFavouriteMovie(movie))
    }
  }

  if (!movie) {
    return null
  }

  return (
    <StyledMovieCard onClick={handleClick}>
      <StyledImage loading='lazy' src={posterImageUrl} />
      <StyledBoxWrapper>
        <StyledTitle className='MovieCard-title__p'>{movie.title}</StyledTitle>
        <StyledIcon isfavourite={isFavouriteMovie} />
      </StyledBoxWrapper>
    </StyledMovieCard>
  )
}

const StyledMovieCard = styled(Box)`
  display: flex;
  flex-direction: column;
  transition-property: all;
  cursor: pointer;
  align-items: center;

  &:hover {
    transform: scale(1.1);
    transition-timing-function: ease-in;
    transition-duration: 0.2s;
    .MovieCard-title__p {
      color: ${({theme}) => theme.palette.primary.main};
    }
  }
`

const StyledImage = styled.img`
  width: 150px;
  border-radius: 10px;
  position: relative;
`

const StyledTitle = styled(Typography)`
  color: ${({theme}) => theme.palette.neutral.black};
  font-size: 16px;
  font-weight: 400;
  word-wrap: break-word;
  width: 11em;
  text-align: center;
`

const StyledBoxWrapper = styled(Box)``

const StyledIcon = styled(FavoriteIcon)<{isfavourite: boolean}>`
  position: absolute;
  height: 30px;
  width: 30px;
  top: 5px;
  left: 120px;
  color: ${({isfavourite, theme}) =>
    isfavourite ? theme.palette.neutral.red : theme.palette.neutral.black};
`
