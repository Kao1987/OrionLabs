import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18n } from './locales'
import { setPageMeta, defaultMeta } from '../modules/shared/utils/seo'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

// 設置預設 Meta 標籤
setPageMeta(defaultMeta)

// 錯誤處理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err, info)
  // 整合錯誤追蹤
  import('../modules/shared/utils/analytics').then(({ trackError }) => {
    trackError(err as Error, info)
  })
}

app.mount('#app')
