import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import ScrollAnimation from './transition.js';
import {
  firestorePlugin
} from 'vuefire'
import store from './store'

Vue.use(firestorePlugin)
Vue.directive('scrollanimation', ScrollAnimation);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')