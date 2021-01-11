<template>
  <div class="anuncio">
    <v-container v-if="loaded">
      <v-card elevation="8" class="mt-5">
        <v-row>
          <v-col cols="12" md="6">
            <v-carousel class="mx-5 my-5">
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
          </v-col>
          <v-col cols="12" md="6">
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

              <v-expansion-panels >
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row align="center" class="spacer" no-gutters>
                      <v-col cols="4" sm="2" md="1">
                        <v-avatar size="36px">
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
                    <h4> Contacto </h4>
                    {{anuncio.email}} <br>
                    {{anuncio.telefono}}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
    };
  },
  created() {
    var anuncioRef = db.collection("anuncios").doc(this.$route.params.id);
    var context = this;

    anuncioRef.get().then(function (doc) {
      if (doc.exists) {
        console.log(doc.data());
        context.anuncio = doc.data();
        context.loaded = true;
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
</style>