import '@/main'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'uno.css'
import VueCookie from 'vue3-cookies'
// async function prepareApp() {

//     const { worker } = await import('./mock/broswer')
//     worker.start({
//         serviceWorker: {
//             url: './public/mockServiceWorker'
//         }
//     })


//     return Promise.resolve()
// }

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VueCookie)

app.mount('#app')
// prepareApp().then(() => {
//     app.mount('#app')
// })
