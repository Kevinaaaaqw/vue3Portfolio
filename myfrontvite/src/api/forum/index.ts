import { loginApi } from './login'

// const domainName = 'http://192.168.50.175:5678/'
const domainName = 'http://localhost:5678/'
const appPoolName = 'myback'

export const toDoListapi = loginApi(domainName, appPoolName) 