<template>
  <div class="home">
    <v-container fluid class="px-0 py-0">
      <v-row> </v-row>
      <v-parallax
        height="500"
        class="px-0 py-0 mx-0 elevation-15"
        dark
        :src="imageDir"
      >
        <v-overlay
          value="true"
          color="primary"
          opacity="0.8"
          absolute
          class="mx-0 px-0 text-center"
        >
          <div v-if="loading">
              <v-progress-circular indeterminate color="secondary">

              </v-progress-circular>
          </div>

          <div v-if="!loading">

          <h1 class="text-h2 text-bold font-weight-medium" v-scrollanimation>
            Compra y vende teléfonos aquí!
          </h1>
          <h2 class="text-h4" v-scrollanimation="500">
            La mejor tienda de celulares.
          </h2>
          <v-btn
            class="my-5 black--text"
            to="/terms"
            color="secondary"
            v-scrollanimation="1000"
          >
            Aprende más
          </v-btn>
          </div>
        </v-overlay>
      </v-parallax>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3" class="relative hidden-sm-and-down px5 pt-6">
          <div class="filter-container">
            <div class="d-flex flex-row justify-center align-center">
              <v-icon class="my-3">mdi-filter</v-icon>
              <h2>Filtros</h2>
            </div>
            <div class="my-3">
              <h3>Estado</h3>
              <div
                class="px-0 py-0 mx-0 my-0"
                v-for="estado in estados"
                :key="estado"
              >
                <v-checkbox
                  v-model="estadoSelect"
                  class="py-0 my-0"
                  hide-details
                  :label="estado"
                  :value="estado"
                >
                </v-checkbox>
              </div>
            </div>
            <div class="my-3">
              <h3>Marcas</h3>
              <div
                class="px-0 py-0 mx-0 my-0"
                v-for="marca in marcas"
                :key="marca"
              >
                <v-checkbox
                  v-model="marcaSelect"
                  class="py-0 my-0"
                  hide-details
                  :label="marca"
                  :value="marca"
                >
                </v-checkbox>
              </div>
            </div>
            <div class="my-3">
              <h3>Sistema Operativo</h3>
              <div
                class="px-0 py-0 mx-0 my-0"
                v-for="sistema in sistemas"
                :key="sistema"
              >
                <v-checkbox
                  v-model="sistemaSelect"
                  class="py-0 my-0"
                  hide-details
                  :label="sistema"
                  :value="sistema"
                >
                </v-checkbox>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="9">
          <v-row v-if="!anuncios.length">
            <v-col cols="12">
              <v-skeleton-loader class="mt-5 mb-5" type="table-heading">
              </v-skeleton-loader>
            </v-col>
            <v-col v-for="index in 6" :key="index" cols="12" sm="6" md="4">
              <v-skeleton-loader
                type="card-avatar, article, actions"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-data-iterator
            no-data-text="Ningún telefono con esa descripción."
            v-if="anuncios.length"
            :items="anunciosFiltrado"
            :search="busqueda"
            :sort-by="ordenar.param"
            :items-per-page="10"
            :sort-desc="sortDesc"
          >
            <template v-slot:header>
              <v-toolbar class="mb-5 mt-5" elevation="0">
                <v-text-field
                  v-model="busqueda"
                  clearable
                  filled
                  rounded
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Buscar"
                ></v-text-field>
                <template v-if="$vuetify.breakpoint.mdAndUp">
                  <v-spacer></v-spacer>
                  <v-select
                    v-model="ordenar"
                    filled
                    rounded
                    hide-details
                    :items="params"
                    item-text="texto"
                    prepend-inner-icon="mdi-magnify"
                    label="Ordenar por"
                  ></v-select>
                  <v-spacer></v-spacer>
                  <v-btn-toggle v-model="sortDesc" mandatory>
                    <v-btn large depressed :value="false">
                      <v-icon>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn large depressed :value="true">
                      <v-icon>mdi-arrow-down</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </template>
              </v-toolbar>
            </template>
            <template v-slot:default="props">
              <v-row>
                <v-col
                  v-for="(item, index) in props.items"
                  :key="index"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card
                    v-scrollanimation="200"
                    :data-mult="index % 3"
                    class="mx-auto my-3"
                    elevation="8"
                  >
                    <v-img
                      height="250"
                      :src="
                        item.imagenes.length > 0
                          ? item.imagenes[0].url
                          : '../assets/logo.svg'
                      "
                      lazy-src="../assets/placeholder.png"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey darken-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>

                    <v-card-title class="pt-3 pb-0">
                      <div v-if="item.titulo.length < 20">
                        {{ item.titulo }}
                      </div>
                      <div v-else>
                        {{ item.titulo.substring(0, 20) + ".." }}
                      </div>
                    </v-card-title>

                    <v-card-text>
                      <v-chip color="secondary" class="black--text"
                        >$ {{ item.precio }}</v-chip
                      >

                      <div>
                        <div v-if="item.desc.length < 50">
                          {{ item.desc }}
                        </div>
                        <div v-else>
                          {{ item.desc.substring(0, 50) + "..." }}
                        </div>
                      </div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>
                      <v-row align="center" class="spacer" no-gutters>
                        <v-col cols="1">
                          <v-icon> mdi-account</v-icon>
                        </v-col>

                        <v-col cols="3" md>
                          <strong
                            class="mx-3"
                            v-html="item.nombre + ' ' + item.apellido"
                          ></strong>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>

                    <v-card-text>
                      <v-chip-group
                        active-class="deep-purple accent-4 white--text"
                        column
                      >
                        <v-chip @click="filtrarPor(item.marca)">{{
                          item.marca
                        }}</v-chip>
                        <v-chip @click="filtrarPor(item.modelo)">{{
                          item.modelo
                        }}</v-chip>
                        <v-chip @click="filtrarPor(item.sistema)">{{
                          item.sistema
                        }}</v-chip>
                      </v-chip-group>
                    </v-card-text>

                    <v-card-actions
                      class="d-flex flex-row justify-center flex-wrap"
                    >
                      <v-btn
                        :to="'/anuncio/' + item.id"
                        color="primary"
                        class="action-button"
                      >
                        <v-icon>mdi-magnify</v-icon>
                        Detalles
                      </v-btn>
                      <v-btn
                        black
                        color="yellow"
                        @click="comprar(item)"
                        class="black--text action-button"
                      >
                        <v-icon>mdi-cart</v-icon>
                        Agregar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="filterDialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          color="primary"
          @click="filterDialog = true"
          fab
          class="esquina hidden-md-and-up"
        >
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          <div class="d-flex flex-row justify-center align-center w-100">
            <v-icon class="my-3">mdi-filter</v-icon>
            <h2>Filtros</h2>
          </div>
        </v-card-title>

        <v-card-text>
          <div class="my-3">
            <h3>Estado</h3>
            <div
              class="px-0 py-0 mx-0 my-0"
              v-for="estado in estados"
              :key="estado"
            >
              <v-checkbox
                v-model="estadoSelect"
                class="py-0 my-0"
                hide-details
                :label="estado"
                :value="estado"
              >
              </v-checkbox>
            </div>
          </div>
          <div class="my-3">
            <h3>Marcas</h3>
            <div
              class="px-0 py-0 mx-0 my-0"
              v-for="marca in marcas"
              :key="marca"
            >
              <v-checkbox
                v-model="marcaSelect"
                class="py-0 my-0"
                hide-details
                :label="marca"
                :value="marca"
              >
              </v-checkbox>
            </div>
          </div>
          <div class="my-3">
            <h3>Sistema Operativo</h3>
            <div
              class="px-0 py-0 mx-0 my-0"
              v-for="sistema in sistemas"
              :key="sistema"
            >
              <v-checkbox
                v-model="sistemaSelect"
                class="py-0 my-0"
                hide-details
                :label="sistema"
                :value="sistema"
              >
              </v-checkbox>
            </div>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="filterDialog = false">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      loading: true,
      backgroundImg: null,
      imageDir: "",
      busqueda: "",
      ordenar: {},
      sortDesc: true,
      filterDialog: false,
      marcas: ["Samsung", "Apple", "Huawei", "LG", "Xiaomi", "Oppo", "Otro"],
      estados: [
        "Sellado",
        "Nuevo",
        "En excelente estado",
        "En buen estado",
        "Usado",
      ],
      sistemas: ["IOS", "Android", "Windows", "Lineage OS"],
      marcaSelect: [],
      estadoSelect: [],
      sistemaSelect: [],
      params: [
        { texto: "Titulo", param: "titulo" },
        { texto: "Precio", param: "precio" },
        { texto: "Marca", param: "marca" },
        { texto: "Sistema", param: "sistema" },
      ],
      anuncios: [],
      imageDicc: {},
    };
  },
  computed: {
    marcasFiltrado() {
      if (this.marcaSelect.length) return this.marcaSelect;
      else return this.marcas;
    },
    estadosFiltrado() {
      if (this.estadoSelect.length) return this.estadoSelect;
      else return this.estados;
    },
    sistemasFiltrado() {
      if (this.sistemaSelect.length) return this.sistemaSelect;
      else return this.sistemas;
    },
    anunciosFiltrado() {
      return this.anuncios.filter((v) => {
        if (!this.marcasFiltrado.includes(v.marca)) return false;

        if (!this.estadosFiltrado.includes(v.estado)) return false;

        if (!this.sistemasFiltrado.includes(v.sistema)) return false;

        return true;
      });
    },
  },
  firestore: {
    anuncios: db.collection("anuncios"),
  },
  methods: {
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    filtrarPor(param) {
      if (this.busqueda == param) this.busqueda = "";
      else this.busqueda = param;
    },
    comprar(anuncio) {
      this.$root.$emit("Added-to-cart", anuncio);
    },
  },
  created() {
    
    let backgroundImg = new Image();
    
    console.log("Here");

    backgroundImg.onload = () => {
      this.loading = false;
      this.imageDir = backgroundImg.src;
      console.log("loaded image...")
    }

    backgroundImg.src = "https://picsum.photos/2000/1000?random";

  },
};
</script>

<style scoped>
.home {
  padding: 0;
  margin: 0;
  position: relative;
}
.borders {
  border: solid black 1px;
}
.esquina {
  position: fixed;
  z-index: 99;
  bottom: 20px;
  right: 20px;
}
.w-100 {
  width: 100%;
}
.relative {
  position: relative;
}
/* .filter-container {
  position: fixed;
} */
.action-button {
  margin: 5px;
}

.before-enter {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s;
}
.enter {
  opacity: 1;
  transform: translate(0px);
}
</style>