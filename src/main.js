import '@/assets/css/main.css'

import { supabase } from './api/supabase/supabase'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$supabase = supabase

app.use(createPinia())
app.use(router)

app.mount('#app')
