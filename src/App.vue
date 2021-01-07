<template>
  <v-app>
    <v-navigation-drawer absolute dark color="primary" v-model="drawer" left>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

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
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-plus-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Nuevo anuncio</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo-phoneshop.png"
          transition="scale-transition"
          width="200"
        />
      </div>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click="drawer = true"
      ></v-app-bar-nav-icon>

      <div class="hidden-xs-only">
        <v-btn color="primary" elevation="0" to="/" active-class="lighten-1">
          Inicio <v-icon class="mx-2">mdi-home</v-icon></v-btn
        >
        <v-btn color="primary" elevation="0"
          >Estadisticas <v-icon class="mx-2">mdi-finance</v-icon></v-btn
        >

        <NuevoAnuncio />

        <v-btn class="mx-2" fab small color="yellow">
          <v-icon color="black"> mdi-cart </v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
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
  }),
};
</script>
