import axios from 'axios'

export const toDoList = (domainName: string, appPoolName: string) => {
    const toDoListSearch = async (data: object) => {
        const url = domainName + appPoolName + '/vue3API/toDoListAPI/search'
        const newdata = {
            parameter: data

        }
        return await axios.post(url, newdata)
    }

    const toDoListInsert = async (data: object) => {
        const url = domainName + appPoolName + '/vue3API/toDoListAPI/insert'
        const newdata = {
            parameter: data

        }
        return await axios.post(url, newdata)
    }

    const toDoListModify = async (data: object) => {
        const url = domainName + appPoolName + '/vue3API/toDoListAPI/modify'
        const newdata = {
            parameter: data

        }
        return await axios.put(url, newdata)
    }

    const toDoListDelete = async (data: object) => {
        const url = domainName + appPoolName + '/vue3API/toDoListAPI/delete'
        const newdata = {
            parameter: data

        }
        return await axios.delete(url, { data: newdata })
    }

    const toDoList = {
        toDoListSearch: toDoListSearch, //搜尋
        toDoListModify: toDoListModify, //編輯
        toDoListDelete: toDoListDelete, //刪除
        toDoListInsert: toDoListInsert //新增
    }

    return toDoList
}