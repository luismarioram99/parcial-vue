<template>
  <v-app>
    <v-navigation-drawer fixed dark color="primary" v-model="drawer" left>
      <v-list>
        <v-list-item link class="mt-5">
          <v-list-item-content>
            <v-list-item-title class="title"> Invitado </v-list-item-title>
            <v-list-item-subtitle
              >Registrate para comprar telefonos.</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-finance</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Estadisticas</v-list-item-title>
        </v-list-item>
        <NuevoAnuncio />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo-phoneshop.png"
          transition="scale-transition"
          width="200"
        />

        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = true"
      ></v-app-bar-nav-icon>

      <div class="hidden-sm-and-down">
        <v-btn color="primary" elevation="0" to="/" active-class="lighten-1">
          Inicio <v-icon class="mx-2">mdi-home</v-icon></v-btn
        >
        <v-btn color="primary" elevation="0"
          >Estadisticas <v-icon class="mx-2">mdi-fina nce</v-icon></v-btn
        >

        <NuevoAnuncio />
      </div>

      <v-badge
        :content="$store.getters.count"
        :value="$store.getters.count"
        color="red"
        overlap
      >
        <v-btn class="mx-2" to="/cart" fab small color="yellow">
          <v-icon color="black"> mdi-cart </v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer dark padless>
      <v-card
        flat
        tile
        dark
        color="primary"
        class="lighten-1 white--text text-center w-100"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            class="mx-4 white--text"
            icon
            :href="icon.url"
            target="_blank"
          >
            <v-icon size="24px">
              {{ icon.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Luis Mario Ramirez Peralta - RP18011
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>FPI UES FMOcc</strong>
        </v-card-text>
      </v-card>
    </v-footer>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackColor"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import NuevoAnuncio from "./components/NuevoAnuncio";
export default {
  name: "App",

  components: {
    NuevoAnuncio,
  },

  data: () => ({
    drawer: false,
    snackbar: false,
    timeout: 2000,
    snackText: "Prueba",
    snackColor: "green",
    icons: [
      {
        icon: "mdi-twitter",
        url: "https://twitter.com/luismarioram99",
      },
      {
        icon: "mdi-instagram",
        url: "https://www.instagram.com/_mario.verde/",
      },
      {
        icon: "mdi-github",
        url: "https://github.com/luismarioram99",
      },
      {
        icon: "mdi-code-braces-box",
        url: "http://codeforces.com/profile/luismarioram",
      },
    ],
  }),
  mounted() {
    this.$root.$on("snackbar-message", (snackText, snackColor) => {
      this.snackText = snackText;
      this.snackColor = snackColor;
      this.snackbar = true;
    });
    this.$root.$on("Added-to-cart", (item) => {
      console.log(item.id);
      this.$store.commit("addToCart", item);
    });
  },
};
</script>
<style scoped>
.w-100 {
  width: 100vw !important;
}
</style>