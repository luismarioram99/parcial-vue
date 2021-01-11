import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, item) {

      let found = state.cart.find(compra => compra.anuncio.id == item.id)

      if (found) {
        found.cantidad++;
      } else {

        state.cart.push({
          anuncio: item,
          cantidad: 1
        });

      }

    },
    clearCart(state) {
      state.cart = [];
    }
  },
  getters: {
    count: state => {
      return state.cart.length;
    }
  },
  plugins: [createPersistedState()]
})