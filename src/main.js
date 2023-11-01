import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import naive from 'naive-ui'
import 'ant-design-vue/dist/reset.css';
import './assets/main.css'
import {createPinia} from "pinia";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(naive)
app.use(naive)

app.mount('#app')
