import axios from 'axios'

export type MovieSearchData = {
    title: string;
    page?: number;
    type?: 'movie' | 'series' | 'episode';
    y?: number;
};

export type MovieDetails = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
};

export type MovieReturnData = {
    Search: Array<MovieDetails> | [];
    totalResults: string;
    Response: string | boolean
};

export const movie = (domainName: string, appPoolName: string) => {
    const movieSearch = async (data: MovieSearchData) => {
        const type = data.type ? `&type=${data.type}` : ''
        const page = data.page ? `&page=${data.page}` : ''
        const y = data.y ? `&y=${data.y}` : ''
        const url = domainName + appPoolName + `/?s=${data.title}&apikey=a9ad8207${page}${type}${y}`
        return await axios.get(url)
    }

    const movieAPI = {
        movieSearch: movieSearch, //電影搜尋

    }

    return movieAPI
}