import axios from 'axios'

export const loginApi = (domainName: string, appPoolName: string) => {
    const toDoListSearch = async (data: object) => {
        const url = domainName + appPoolName + '/vue3API/toDoListAPI/search'
        const newdata = {
            parameter: data

        }
        // return await axios.post(url, newdata)
        return
    }

    const login = {
        toDoListSearch: toDoListSearch, //搜尋
    }

    return login
}