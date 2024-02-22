import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ElLoading, ElScrollbar } from 'element-plus'
import App from './App.vue'
import router from './router'
import 'uno.css'

const plugins = [ElLoading]

const components = [ElScrollbar]

const app = createApp(App)

app.use(createPinia())
app.use(router)
plugins.forEach((plugin) => {
    app.use(plugin)
})

components.forEach((component) => {
    app.component(component.name, component)
})


app.mount('#app')
