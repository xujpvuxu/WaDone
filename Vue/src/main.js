import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import store from './store/indes'

const app = createApp(App);
app.use(store)
app.use(ElementPlus);
app.mount('#app');
