import { login } from './login'
import { getToken } from '@/api/forum/forumToken'
import { forumCategory } from '@/api/forum/forumCategory'

// const domainName = 'http://192.168.50.175:5678/'
const domainName = 'http://localhost:3001/'
const appPoolName = 'myback'

export const loginApi = login(getToken, domainName, appPoolName)
export const forumCategoryApi = forumCategory(getToken, domainName, appPoolName) 