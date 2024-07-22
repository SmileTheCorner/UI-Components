import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import SHUI from "../packages/index"
// 本地SVG图标
import "virtual:svg-icons-register";

const app = createApp(App)
app.use(SHUI)
app.mount('#app')
