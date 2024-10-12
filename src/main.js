import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret , faPhone, faShoppingBag, faQuestionCircle, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

//import { faAddressBook } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faPhone, faShoppingBag, faQuestionCircle, faThumbsUp)

const app = createApp(App)

app.use(VueAxios, axios)
app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
