import { useCookies } from 'vue3-cookies'
const cookie = useCookies().cookies

export const getToken = () => {
    return cookie.get('forumToken') || window.sessionStorage.getItem('forumToken')
}