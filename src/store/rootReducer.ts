import {combineReducers} from "@reduxjs/toolkit"
import {TypedUseSelectorHook, useSelector} from "react-redux"

import movieSlice from "./movieSlice"

const rootReducer = combineReducers({
  movies: movieSlice,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
