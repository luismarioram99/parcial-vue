import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Anuncio from '../views/Anuncio.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Done from '../views/Done.vue'
import Terms from '../views/Terms.vue'
import Estadisticas from '../views/Estadisticas.vue'
import NotFound from '../views/404.vue';
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
  }, {
    path: '/terms',
    name: 'Terminos',
    component: Terms
  }, {
    path: '/stats',
    name: 'Estadisticas',
    component: Estadisticas
  }, {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
