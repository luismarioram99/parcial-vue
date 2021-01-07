<template>
  <!-- <div class="px-0 py-0 mx-0 my-0"> -->
  <!-- <v-btn color="primary" dark @click.stop="dialog = true">
      Open Dialog
    </v-btn> -->
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator>
      <v-btn color="primary" dark @click.stop="dialog = true" elevation="0">
        Nuevo Anuncio <v-icon class="ml-2">mdi-plus-circle</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Crear un nuevo anuncio</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark color="secondary" text @click="limpiar()">
            <v-icon class="mr-2"> mdi-broom </v-icon>
            Limpiar
          </v-btn>
          <v-btn dark color="green" text @click="dialog = false">
            <v-icon class="mr-2"> mdi-content-save </v-icon>
            Guardar
          </v-btn>
          <v-btn dark color="red" text @click="dialog = false">
            <v-icon class="mr-2">mdi-delete</v-icon>
            Cancelar
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col sm="6" class="px-10 py-10 text-center">
            <h2>Información del producto</h2>
            <hr />
            <v-select
              :items="estados"
              v-model="nuevoAnuncio.estado"
              label="Estado del telefono"
            ></v-select>
            <v-select
              :items="marcas"
              v-model="nuevoAnuncio.marca"
              label="Marca"
            ></v-select>
            <v-select
              :items="sistemas"
              v-model="nuevoAnuncio.sistema"
              label="Sistema Operativo"
            ></v-select>
            <v-text-field
              v-model="nuevoAnuncio.modelo"
              label="Modelo del teléfono"
            ></v-text-field>
            <v-row>
              <v-col sm="6">
                <v-text-field
                  v-model="nuevoAnuncio.tamano"
                  type="number"
                  max="20"
                  min="1"
                  suffix="Pulg"
                  label="Tamaño de pantalla"
                >
                </v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field
                  v-model="nuevoAnuncio.ram"
                  type="number"
                  max="128"
                  min="1"
                  suffix="Gb"
                  label="RAM"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="nuevoAnuncio.almacenamiento"
              type="number"
              max="1024"
              min="1"
              suffix="Gb"
              label="Almacenamiento Interno"
            >
            </v-text-field>
          </v-col>
          <v-col sm="6" class="px-10 py-10 text-center">
            <h2>Información del anuncio</h2>
            <hr />
            <v-text-field
                label="Titulo"
            >

            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
  <!-- </div> -->
</template>

<script>
export default {
  name: "NuevoAnuncio",
  data() {
    return {
      dialog: false,
      valid: true,
      marcas: ["Samsung", "Apple", "Huawei", "LG", "Xiaomi", "Oppo"],
      estados: [
        "Sellado",
        "Nuevo",
        "En excelente estado",
        "En buen estado",
        "Usado",
      ],
      sistemas: ["IOS", "Android", "Windows", "Lineage OS"],
      nuevoAnuncio: {
        titulo:"",
        marca: "",
        estado: "",
        modelo: "",
      },
    };
  },
  methods: {
    limpiar() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>