import {ApisauceInstance, create} from "apisauce"
import Config from "../../config"
import {API_KEY, BASE_URL} from "../../utils/constants"
import type {ApiConfig} from "./api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */

export const generateApiClient = () => {
  const config: ApiConfig = DEFAULT_API_CONFIG
  const api: ApisauceInstance = create({
    baseURL: BASE_URL,
    timeout: config.timeout,
    headers: {
      "Content-Type": "application/json",
    },
  })

  api.addAsyncRequestTransform((request) => async () => {
    request.url = request.url + `?&api_key=${API_KEY}`
  })
  return api
}
// Singleton instance of the API for convenience
// export const api = new Api()
export const api = generateApiClient()
