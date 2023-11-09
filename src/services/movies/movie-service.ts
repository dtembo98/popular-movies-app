import {ApiResponse} from "apisauce"
import {generateApiClient} from "../api"
import {getGeneralApiProblem} from "../api/apiProblem"

const api = generateApiClient()

// TODO : Add the types for the response
export const getPopularMoviesService = async (payload?: any): Promise<any> => {
  try {
    // make the api call
    const response: ApiResponse<any> = await api.get("movie/popular", payload)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem: any = getGeneralApiProblem(response)
      // Toast.show(problem?.message);
      if (problem) return problem
    }

    const data = response.data

    return {kind: "ok", data}
  } catch (e) {
    return {kind: "bad-data"}
  }
}

export const searchMoviesService = async (payload?: any): Promise<any> => {
  try {
    // make the api call
    const response: ApiResponse<any> = await api.get("search/movie", payload)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem: any = getGeneralApiProblem(response)
      // Toast.show(problem?.message);
      if (problem) return problem
    }

    const data = response.data

    return {kind: "ok", data}
  } catch (e) {
    return {kind: "bad-data"}
  }
}
