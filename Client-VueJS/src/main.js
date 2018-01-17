import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './Components/Main/Home.vue'
import Artists from './Components/Main/Artists.vue'
import Header from './Components/Header.vue'
import Footer from './Components/Footer.vue'
import Admin from './Components/Main/Admin.vue'
import Checkout from './Components/Main/Checkout.vue'
import Artwork from './Components/Main/Artwork.vue'
import VueResource from 'vue-resource'
import Dropdown from 'vue-js-dropdown'


Vue.use(Dropdown)

Vue.component('app-artists', Artists)
Vue.component('app-artwork', Artwork)
Vue.component('app-header', Header)
Vue.component('app-footer', Footer)
Vue.component('app-admin', Admin)
Vue.component('app-checkout', Checkout)

Vue.use(VueRouter)

const routes = [
  { path: '/artists', component: Artists },
  { path: '/artwork', component: Artwork },
  { path: '/admin', component: Admin },
  { path: '/checkout', component: Checkout },
  { path: '/', component: Home }
]

const router = new VueRouter ({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
Vue.use(VueResource)

