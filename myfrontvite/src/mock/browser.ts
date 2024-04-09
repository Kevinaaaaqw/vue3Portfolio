import { setupWorker } from 'msw/browser'
import login from './login'

export const worker = setupWorker(...login)