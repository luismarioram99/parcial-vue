<template>
  <div>
    <v-container class="mt-5">
      <h1 class="mx-5">Carrito de compras</h1>
      <v-row>
        <v-col cols="12" md="9" class="px-5 py-5">
          <v-data-table
            :headers="headers"
            :items="cart"
            hide-default-footer
            no-data-text="Agregue elementos al carrito!"
            class="elevation-10"
          >
            <template v-slot:item.precio="{ item }">
              $ {{ item.precio }}
            </template>
            <template v-slot:item.cantidad="{ item }">
              <div class="d-flex flex-row align-center justify-left">
                <v-btn @click="decrementar(item)" text>
                  <v-icon> mdi-minus </v-icon>
                </v-btn>
                <span class="spanned">
                  {{ item.cantidad }}
                </span>
                <v-btn @click="incrementar(item)" text>
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
              </div>
            </template>
            <template v-slot:item.total="{item}">
                $ {{item.precio*item.cantidad}}
            </template>
            <template v-slot:item.nombre="{ item }">
              {{ item.nombre }} {{ item.apellido }}
            </template>
            <template v-slot:item.cancelar="{ item }">
              <v-btn @click="borrar(item)" color="red" text>
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <v-btn @click="clearCart()" color="red" dark class="mt-5">
              Limpiar
          </v-btn>
        </v-col>
        <v-col cols="12" md="3"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
export default {
  name: "Carrito",
  data() {
    return {
      headers: [
        { text: "Teléfono", align: "center", value: "modelo" },
        { text: "Precio", value: "precio" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Total", value: "total" },
        { text: "Vendedor", value: "nombre" },
        { text: "Cancelar", value: "cancelar" },
      ],
    };
  },
  computed:{
      cart(){
          return this.$store.state.cart;
      }
  },
  methods: {
    incrementar(item) {
        this.$store.commit("addToCart", item);
    },
    decrementar(item) {        
        this.$store.commit("removeFromCart", item);
    },
    clearCart(){
        this.$store.commit("clearCart");
    }
  },
  created() {},
};
</script>

<style>
.spanned {
  width: 30px;
  text-align: center;
}
.w-100 {
  width: 100%;
}
</style>