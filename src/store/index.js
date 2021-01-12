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
      
      const cart = state.cart;

      let found = cart.find(compra => compra.key == item.key)

      console.log("incremento");

      if (found) {
        found.cantidad++;
      } else {
        
        item.cantidad = 1
        cart.push(item);
        state.cart = cart;
      }

    },
    removeFromCart(state, item) {
      let found = state.cart.findIndex(compra => compra.key == item.key)
      console.log("decremento");

      state.cart[found].cantidad--;
      if (!state.cart[found].cantidad) {
        state.cart.splice(found, 1);
      }

    },
    clearCart(state) {
      state.cart = [];
    }
  },
  getters: {
    getCant: (state) => (key) => {
      let found = state.cart.findIndex(compra => compra.key == key)
      if (state.cart[found])
        return state.cart[found].cantidad;
      else
        return 0;
    },
    count: state => {
      return state.cart.length;
    }
  },
  plugins: [createPersistedState()]
})