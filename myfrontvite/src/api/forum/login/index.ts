import axios from 'axios'

export const login = (getToken: Function, domainName: string, appPoolName: string) => {
    const checkLogin = async () => {
        const url = domainName + appPoolName + '/check_login'
        const forumToken = await getToken()
        const newdata = {
            forumToken
        }
        return await axios.post(url, newdata)
    }

    const doLogin = async (data) => {
        const url = domainName + appPoolName + '/do_login'
        const forumToken = await getToken()
        const newdata = {
            ...data
        }
        return await axios.post(url, newdata)
    }

    const login = {
        checkLogin: checkLogin, //搜尋
        doLogin: doLogin, //登入
    }

    return login
}