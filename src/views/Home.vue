<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3" class="hidden-sm-and-down">
          {{ anuncios }}
          {{ imageDicc }}
        </v-col>
        <v-col cols="12" md="9">
          <v-data-iterator :items="anuncios" hide-items-per-page>
            <template v-slot:default="props">
              <v-row>
                <v-col
                  v-for="item in props.items"
                  :key="item.name"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card class="mx-auto my-12">
                    <v-img height="250" :src="item.imagenes[0].url" lazy-src="../assets/placeholder.png">
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
                      <div class="subtitle">$ {{ item.precio }}</div>

                      <div>
                        {{ item.desc }}
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
                        <v-chip>{{ item.marca }}</v-chip>
                        <v-chip>{{ item.modelo }}</v-chip>
                        <v-chip>{{ item.sistema }}</v-chip>
                      </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn color="primary">
                        <v-icon>mdi-magnify</v-icon>
                        Detalles
                      </v-btn>
                      <v-btn black color="yellow" class="black--text">
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
      anuncios: [],
      imageDicc: {},
    };
  },
  firestore: {
    anuncios: db.collection("anuncios"),
  },
  methods: {},
};
</script>

<style scoped>
.home {
  padding: 0;
  margin: 0;
}
.borders {
  border: solid black 1px;
}
</style>