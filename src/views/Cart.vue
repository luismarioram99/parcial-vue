<template>
  <div>
    <v-container class="mt-5">
      <h1 class="mx-5">Carrito de compras</h1>
      <v-row>
        <v-col cols="12" md="9" class="px-5 py-5" v-scrollanimation>
          <v-data-table
            :headers="headers"
            :items="this.$store.state.cart"
            hide-default-footer
            no-data-text="Agregue elementos al carrito!"
            class="elevation-15"
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
            <template v-slot:item.total="{ item }">
              $ {{ item.precio * item.cantidad }}
            </template>
            <template v-slot:item.nombre="{ item }">
              {{ item.nombre }} {{ item.apellido }}
            </template>
            <template v-slot:item.cancelar="{ item }">
              <v-btn @click="borrar(item)" color="red" text>
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </template>
            <template v-slot:item.img="{ item }">
              <v-img
                :src="item.imagenes[0].url"
                height="140px"
                width="100px"
                contain
              >
              </v-img>
            </template>
          </v-data-table>
          <v-btn
            v-if="$store.getters.getTotal"
            @click="clearCart()"
            color="red"
            dark
            class="mt-5"
          >
            Limpiar
          </v-btn>
          <v-btn
            to="/checkout"
            color="green"
            v-if="$store.getters.getTotal"
            dark
            class="ml-5 mt-5"
          >
            Proceder
          </v-btn>
        </v-col>
        <v-col cols="12" md="3" class="py-5">
          <v-card class="mx-auto" elevation="15" v-scrollanimation="500">
            <v-card-text>
              <div>Total</div>
              <p class="display-1 text--primary" v-if="!promo">
                ${{ $store.getters.getTotal }}
              </p>
              <div v-else>
                <p class="display-1 text--primary">
                  <strike> ${{ $store.getters.getTotal }} </strike>
                </p>
                <p class="display-1 text--secondary">
                  ${{ $store.getters.getTotal - descuento }}
                </p>
              </div>
              <div v-if="!$store.getters.getTotal" class="text--primary">
                Agrega items al carrito para comenzar a comprar.
              </div>
            </v-card-text>
          </v-card>
          <v-card class="mx-auto my-10" elevation="15" v-scrollanimation="800">
            <v-img src="../assets/student-discount.jpg" height="200px"></v-img>

            <v-card-title> Consigue descuentos!</v-card-title>

            <v-card-subtitle>
              Hasta 30% de descuento para usuarios nuevos, y mucho más!
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="primary lighten-1" text>Aprende más!</v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  Aplica a los descuentos para docentes y estudiantes utilizando
                  el código de universitario.

                  <v-text-field
                    v-model="promoText"
                    v-if="!promo"
                    placeholder="#######"
                    label="Promo Code"
                  >
                  </v-text-field>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
var validated = false;
// import { mapState } from 'vuex';
export default {
  name: "Carrito",
  data() {
    return {
      cart: this.$store.state.cart,
      show: false,
      promoText: "",
      headers: [
        { text: "", value: "img" },
        { text: "Teléfono", align: "center", value: "modelo" },
        { text: "Precio", value: "precio" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Total", value: "total" },
        { text: "Vendedor", value: "nombre" },
        { text: "", value: "cancelar" },
      ],
    };
  },
  computed: {
    promo() {
      if (validated){
        return true;
      }else if (this.promoText == "RP18011") {
        validated = true;
        this.$root.$emit('snackbar-message', "Promo code validado con éxito.", "green");
        this.$store.commit("añadirDescuento", this.descuento);
        return true;
      }
      return false;
    },
    descuento() {
      if (this.promo) return this.$store.getters.getTotal * 0.3;
      else return 0;
    },
  },
  methods: {
    incrementar(item) {
      this.$store.commit("addToCart", item);
    },
    decrementar(item) {
      this.$store.commit("removeFromCart", item);
    },
    borrar(item) {
      this.$store.commit("deleteFromCart", item);
    },
    clearCart() {
      this.$store.commit("clearCart");
      this.cart = this.$store.state.cart;
    },
  },
  created() {
    
    if(this.$store.state.descuento){
      this.descuento = this.$store.state.descuento;
      validated = true;
    }else{
      validated = false;
    }
    
  },
};
</script>

<style scoped>
.spanned {
  width: 30px;
  text-align: center;
}
.w-100 {
  width: 100%;
}
.before-enter{
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s;
}
.enter{
  opacity: 1;
  transform: translate(0px);
}
</style>