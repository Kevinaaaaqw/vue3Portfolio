import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type MovieDetails } from "@/api/project3Movie";

type AddMovieResult =
  | { status: 'success', message: 'AddSuccess' }
  | { status: 'failure', reason: 'NoDataProvided' | 'DataAlreadyExists' };
type RemoveMovieResult =
  | { status: 'success', message: 'MovieRemovedSuccessfully' }
  | { status: 'failure', reason: 'NoDataProvided' | 'MovieNotFound' };

export const useMovieStore = defineStore('movieList', () => {
  const movieCollection = ref<MovieDetails[]>([])

  const addMovie = (movie: MovieDetails): AddMovieResult => {
    if (!movie) return { status: 'failure', reason: 'NoDataProvided' }

    const isMovieExist = movieCollection.value.some((m: MovieDetails) => m.imdbID === movie.imdbID)
    if (isMovieExist) {
      return { status: 'failure', reason: 'DataAlreadyExists' }
    }

    movieCollection.value.push(movie)

    return { status: 'success', message: 'AddSuccess' }
  }

  const getMovieList = () => {
    return movieCollection.value
  }

  const removeMovie = (movie: MovieDetails): RemoveMovieResult => {
    if (!movie) return { status: 'failure', reason: 'NoDataProvided' }
    const movieExists = movieCollection.value.some((existingMovie: MovieDetails) => existingMovie.imdbID === movie.imdbID)
    if (!movieExists) return { status: 'failure', reason: 'MovieNotFound' }

    movieCollection.value = movieCollection.value.filter((existingMovie: MovieDetails) => existingMovie.imdbID !== movie.imdbID)

    return { status: 'success', message: 'MovieRemovedSuccessfully' }

  }

  return { getMovieList, addMovie, removeMovie, movieCollection }
}, { persist: { storage: localStorage } })