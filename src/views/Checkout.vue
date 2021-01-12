<template>
  <div class="checkout">
    <v-container>
      <v-card elevation="15" class="mx-5 py-5">
        <v-card-title class="d-flex flex-row align-center justify-center">
          <v-icon class="mx-3">mdi-clipboard-check-outline</v-icon>
          <h2>Checkout</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="6" class="px-5 py-5">
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      :rules="rules.text"
                      label="Nombre"
                      v-model="cliente.nombre"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      :rules="rules.text"
                      label="Apellido"
                      v-model="cliente.apellido"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  label="Correo Electronico"
                  v-model="cliente.email"
                  placeholder="example@example.com"
                  :counter="50"
                  :rules="rules.email"
                ></v-text-field>
                <v-text-field
                  v-model="cliente.telefono"
                  label="Numero telefónico"
                  prefix="+503"
                  placeholder="00000000"
                  :counter="8"
                  :rules="rules.telefono"
                ></v-text-field>
                <v-select
                  v-model="cliente.departamento"
                  :items="departamentos"
                  label="Departamento"
                  hint="Pronto llegaremos a todo el pais."
                  :rules="rules.text"
                >
                </v-select>
                <v-text-field
                  label="Dirección (Linea 1)"
                  hint="Barrio o calle"
                  :rules="rules.text"
                  v-model="cliente.direccion1"
                >
                </v-text-field>
                <v-text-field
                  label="Dirección (Linea 2)"
                  :rules="rules.text"
                  hint="Numero de casa, punto de referencia."
                  v-model="cliente.direccion2"
                >
                </v-text-field>
                <p class="text-caption">
                  Por ahora solo está disponible el pago en efectivo al
                  repartidor.
                </p>

                <v-switch
                  v-model="terminos"
                  color="green"
                  :rules="rules.condiciones"
                  label="He leido y acepto los terminos y condiciones"
                >
                  <template v-slot:label>
                    <p class="my-0">
                      He leido y acepto los
                      <router-link
                        class="d-inline-block"
                        active-class="link"
                        to="/terms"
                        >terminos y condiciones</router-link
                      >
                    </p>
                  </template>
                </v-switch>
              </v-form>
            </v-container>
            <center>
              <v-btn color="green" @click="send()">
                <v-icon class="mr-3"> mdi-check </v-icon>
                Enviar
              </v-btn>
            </center>
          </v-col>

          <v-col cols="12" md="6">
            <v-card class="mx-auto my-10" color="primary" dark max-width="400">
              <v-card-title>
                <v-icon large left> mdi-cash </v-icon>
                <span class="title font-weight-light"
                  >Maneja tu propia tienda.</span
                >
              </v-card-title>

              <v-card-text class="headline font-weight-bold">
                "Desde que inicié mi tienda en linea, tengo un buen incremento
                en mis ingresos mensuales. El servicio es facil de usar, tu solo
                publicas y entregas al repartidor."
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-row align="center" justify="end">
                    <v-icon class="mr-1"> mdi-moped </v-icon>
                    <span class="subheading mr-2">116 repartidores</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1"> mdi-account-tie </v-icon>
                    <span class="subheading">250 vendedores</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  name: "Checkout",
  data() {
    return {
      cliente: {},
      valid: false,
      terminos: false,
      departamentos: ["Santa Ana", "San Miguel", "San Salvador"],
      rules: {
        text: [(v) => !!v || "Debe completar este campo"],
        email: [
          (v) => !!v || "Este campo es requerido",
          (v) =>
            (v && v.length <= 50) ||
            "El email no debe exceder los 50 caracteres",
          (v) => /.+@.+\..+/.test(v) || "El email debe ser válido",
        ],
        telefono: [
          (v) => !!v || "Este campo es requerido",
          (v) =>
            (v && v.length <= 8) || "Telefono no debe exceder los 8 caracteres",
          (v) => /\d{8}/.test(v) || "El telefono debe ser de la forma ########",
        ],
        condiciones: [
          () => this.terminos || "Debe aceptar los terminos y condiciones.",
        ],
      },
    };
  },
  methods: {
    send() {
      if (this.$refs.form.validate()) {
        var cart = this.$store.state.cart;
        var descuento = this.$store.state.descuento;

        var compra = {
          carrito: cart,
          descuento: descuento,
          cliente: this.cliente,
        };

        var context = this;

        db.collection("ventas")
          .add(compra)
          .then(() => {
            context.$store.commit("clearCart");
            context.$store.commit("quitarDescuento");
            context.$root.$emit(
              "snackbar-message",
              "La compra se ha realizado con éxito",
              "green"
            );
            context.$router.push("/done");
          });
      }
    },
  },
};
</script>

<style scoped>
</style>