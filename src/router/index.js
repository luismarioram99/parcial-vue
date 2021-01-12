import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Anuncio from '../views/Anuncio.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Done from '../views/Done.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/anuncio/:id',
    name: 'Anuncio',
    component: Anuncio
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  }, {
    path: '/done',
    name: 'Done',
    component: Done
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
