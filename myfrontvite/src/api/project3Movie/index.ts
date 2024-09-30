import { movie, type MovieSearchData, type MovieReturnData, type MovieDetails } from './movie'

const domainName = 'https://www.omdbapi.com'
const appPoolName = ''

export const movieApi = movie(domainName, appPoolName)
export type { MovieSearchData, MovieDetails, MovieReturnData }