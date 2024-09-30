export const translateMovieType = (movieType: 'movie' | 'series' | 'episode' | string) => {
    switch (movieType) {
        case 'movie':
            return '電影'
        case 'series':
            return '連續劇'
        case 'episode':
            return '劇集'

        default:
            return '未知'
    }
}