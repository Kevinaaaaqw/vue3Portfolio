import '@/main'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css';
import 'uno.css'
import VueCookie from 'vue3-cookies'
import VueDatePicker from '@vuepic/vue-datepicker';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@vuepic/vue-datepicker/dist/main.css'

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

//使用日期選擇器
app.component('VueDatePicker', VueDatePicker);

//pinia持久化
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)
app.use(ElementPlus)
app.use(VueCookie)

app.mount('#app')
// prepareApp().then(() => {
//     app.mount('#app')
// })
