import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    descuento: 0
  },
  mutations: {
    addToCart(state, item) {
      
      let found = state.cart.find(compra => compra.key == item.key)

      console.log("incremento");

      if (found) {
        found.cantidad++;
      } else {
        item = { ...item, cantidad: 1 };
        state.cart = [...state.cart, item];        
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
    deleteFromCart(state, item) {
      let found = state.cart.findIndex(compra => compra.key == item.key)
      state.cart.splice(found, 1);
    },
    clearCart(state) {
      state.cart = [];
    },
    añadirDescuento(state,descuento) {
      state.descuento = descuento;
    },
    quitarDescuento(state) {
      state.descuento = 0;
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
    getTotal: (state) => {
      var total = 0;
      for (var i = 0; i < state.cart.length; i++) total += state.cart[i].precio * state.cart[i].cantidad
      
      return total;
    },
    count: state => {
      return state.cart.length;
    }
  },
  plugins: [createPersistedState()]
})