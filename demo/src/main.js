import { createApp } from 'vue'
import App from '@/App.vue'
import '@/index.css'
import router from './router/router'


const app = createApp(App)

app.use(router)
// app.mount('#app')
router.isReady().then(() =>{
    app.mount('#app')
})