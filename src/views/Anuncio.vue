<template>
  <div class="anuncio">
    <v-container v-if="!loaded" class="progress-container">
      <v-progress-circular indeterminate size="50">

      </v-progress-circular>
    </v-container>
    <v-container v-if="loaded">
      <v-card elevation="20" class="my-5">
        <v-row>
          <v-col cols="12" md="6" v-scrollanimation>
            <v-container fluid>

            <v-carousel class="mx-md-5 my-5 elevation-8">
              <v-carousel-item v-for="item in anuncio.imagenes" :key="item.ref">
                <v-img
                  :src="item.url"
                  lazy-src="../assets/placeholder.png"
                  class="galeria-img"
                  contain
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
              </v-carousel-item>
            </v-carousel>
            </v-container>
          </v-col>
          <v-col cols="12" md="6" v-scrollanimation="500">
            <div class="mx-5 my-5">
              <div class="d-flex flex-row justify-left align-center">
                <h1>
                  {{ anuncio.titulo }}
                </h1>
                <v-chip color="yellow" class="mx-5">
                  ${{ anuncio.precio }}
                </v-chip>
              </div>

              <hr />

              <h3 class="mt-5">Descripción</h3>
              <p>
                {{ anuncio.desc }}
              </p>

              <v-expansion-panels class="elevation-3">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row align="center" class="spacer" no-gutters>
                      <v-col class="mr-5" cols="4" sm="2" md="1">
                        <v-avatar  size="36px">
                          <v-icon> mdi-account-circle</v-icon>
                        </v-avatar>
                      </v-col>

                      <v-col>
                        <strong
                          v-html="anuncio.nombre + anuncio.apellido"
                        ></strong>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <h4>Información de contacto</h4>
                    {{ anuncio.email }} <br />
                    {{ anuncio.telefono }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

              <v-treeview
                class="mt-5"
                :items="telefonoTree"
                open-on-click
                shaped
                dense
                hoverable
                color="warning"
              >
                <template v-slot:prepend="{ item }">
                  <v-icon v-if="item.info">
                    {{ item.icon ? item.icon : "mdi-cellphone" }}
                  </v-icon>
                </template>
                <template v-slot:label="{ item }">
                  <strong
                    >{{ item.name }} <span v-if="item.info">:</span></strong
                  >
                  {{ item.info }}
                </template>
              </v-treeview>

              <h3 class="mt-5">Tags:</h3>
              <hr />
              <v-chip class="mt-3">
                {{ anuncio.estado }}
              </v-chip>
              <v-chip class="mt-3">
                {{ anuncio.marca }}
              </v-chip>
              <v-chip class="mt-3">
                {{ anuncio.sistema }}
              </v-chip>
              <v-chip class="mt-3">
                {{ anuncio.modelo }}
              </v-chip>
              <br />
              <div class=" mt-5 d-flex flex-row justify-center">
                <v-btn color="yellow" @click="comprar()" class="black--text">
                  <v-icon class="ml-3">
                    mdi-cart
                  </v-icon>
                  Agregar
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  data() {
    return {
      anuncio: {},
      loaded: false,
      telefonoTree: [],
    };
  },
  methods:{
    comprar(){
      this.anuncio.id = this.$route.params.id;
      this.$root.$emit("Added-to-cart", this.anuncio);
    }
  },
  created() {
    var anuncioRef = db.collection("anuncios").doc(this.$route.params.id);
    var context = this;

    anuncioRef.get().then(function (doc) {
      if (doc.exists) {
        
        context.anuncio = doc.data();
        context.loaded = true;

        context.telefonoTree = [
          {
            name: "Información",
            icon: "",
            info: " ",
            children: [
              {
                name: "Marca",
                info: context.anuncio.marca,
                icon: "mdi-tag-text",
              },
              {
                name: "Modelo",
                info: context.anuncio.modelo,
                icon: "mdi-tablet-cellphone",
              },
              {
                name: "Sistema",
                info: context.anuncio.sistema,
                icon: "mdi-android",
              },
              {
                name: "Estado",
                info: context.anuncio.estado,
                icon: "mdi-clipboard-pulse",
              },
              {
                name: "Detalles",
                info: context.anuncio.detalle
                  ? context.anuncio.detalle
                  : "No hay detalles disponibles",
                icon: "mdi-comment",
              },
            ],
          },
          {
            name: "Memoria",
            info: " ",
            icon: "mdi-memory",
            children: [
              {
                name: "RAM",
                info: context.anuncio.ram + " GB",
                icon: "mdi-memory",
              },
              {
                name: "Almacenamiento",
                info: context.anuncio.almacenamiento + " GB",
                icon: "mdi-database",
              },
            ],
          },
          {
            name: "Cámaras",
            info: " ",
            icon: "mdi-camera",
            children: [
              {
                name: "Frontal",
                info:
                  context.anuncio.camara_frontal +
                  context.anuncio.camara_frontal
                    ? " MP"
                    : "",
                icon: "mdi-account",
              },
              {
                name: "Trasera",
                info:
                  context.anuncio.camara_trasera +
                  context.anuncio.camara_trasera
                    ? " MP"
                    : "",
                icon: "mdi-image-filter-hdr",
              },
            ],
          },
        ];
      } else {
        context.$router.push("/404");
      }
    });
  },
};
</script>

<style scoped>
.galeria-img {
  height: 100%;
}
.anuncio{
  /* background-color: red; */
  height:100%
}
.progress-container{
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
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