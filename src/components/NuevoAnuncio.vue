<template>
  <!-- <div class="px-0 py-0 mx-0 my-0"> -->
  <!-- <v-btn color="primary" dark @click.stop="dialog = true">
      Open Dialog
    </v-btn> -->
  <v-dialog
    v-model="dialog"
    fullscreen
    scrollable
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        dark
        @click.stop="dialog = true"
        v-on="on"
        elevation="0"
      >
        Nuevo Anuncio <v-icon class="ml-2">mdi-plus-circle</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="px-0 py-0">
              <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Crear <span class="hidden-sm-and-down">un nuevo anuncio</span></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="">
          <v-btn dark color="secondary" text @click="limpiar()">
            <v-icon class="mr-2"> mdi-broom </v-icon>
            <span class="hidden-sm-and-down"> Limpiar </span>
          </v-btn>
          <v-btn dark color="green" text @click="guardar()">
            <v-icon class="mr-2"> mdi-content-save </v-icon>
            <span class="hidden-sm-and-down">Guardar </span>
          </v-btn>
          <v-btn dark color="red" text @click="dialog = false">
            <v-icon class="mr-2">mdi-delete</v-icon>
            <span class="hidden-sm-and-down">Cancelar</span>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      </v-card-title>
      <v-card-text class="px-0 py-0" text-color="primary">
        
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col md="6" cols="12" class="px-10 py-10 text-center">
              <h2>Información del producto</h2>
              <!-- <p>{{nuevoAnuncio}}</p> -->
              <hr />
              <v-select
                :items="estados"
                v-model="nuevoAnuncio.estado"
                :rules="rules.selection"
                label="Estado del telefono"
              ></v-select>
              <v-select
                :items="marcas"
                :rules="rules.selection"
                v-model="nuevoAnuncio.marca"
                label="Marca"
              ></v-select>
              <v-select
                :items="sistemas"
                :rules="rules.selection"
                v-model="nuevoAnuncio.sistema"
                label="Sistema Operativo"
              ></v-select>
              <v-text-field
                v-model="nuevoAnuncio.modelo"
                label="Modelo del teléfono"
                :counter="maxModel"
                :rules="rules.modelo"
              ></v-text-field>
              <v-row>
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="nuevoAnuncio.tamano"
                    type="number"
                    max="20"
                    min="1"
                    suffix="Pulg"
                    :rules="rules.tamano"
                    label="Pantalla"
                  >
                  </v-text-field>
                </v-col>
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="nuevoAnuncio.ram"
                    type="number"
                    max="128"
                    min="1"
                    suffix="GB"
                    label="RAM"
                    :rules="rules.ram"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="nuevoAnuncio.almacenamiento"
                type="number"
                max="1024"
                min="1"
                suffix="GB"
                label="Almacenamiento Interno"
                :rules="rules.almacenamiento"
              >
              </v-text-field>
            </v-col>
            <v-col md="6" cols="12" class="px-10 py-10 text-center">
              <h2>Información del anuncio</h2>
              <hr />
              <v-text-field
                label="Titulo"
                :rules="rules.titulo"
                v-model="nuevoAnuncio.titulo"
                :counter="maxTitulo"
              >
              </v-text-field>
              <v-textarea
                label="Descripcion"
                v-model="nuevoAnuncio.desc"
                :counter="maxDesc"
                :rules="rules.desc"
              >
              </v-textarea>

              <v-text-field
                label="precio"
                prefix="$"
                v-model="nuevoAnuncio.precio"
                type="number"
                :rules="rules.precio"
                min="0"
              >
              </v-text-field>

              <h2 class="mt-5">Información de contacto</h2>
              <hr />

              <v-row>
                <v-col sm="6">
                  <v-text-field
                    label="Nombre"
                    v-model="nuevoAnuncio.nombre"
                    :counter="maxNombre"
                    :rules="rules.nombre"
                  >
                  </v-text-field>
                </v-col>
                <v-col sm="6">
                  <v-text-field
                    label="Apellido"
                    v-model="nuevoAnuncio.apellido"
                    :counter="maxNombre"
                    :rules="rules.nombre"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                label="Correo Electronico"
                v-model="nuevoAnuncio.email"
                :counter="maxEmail"
                :rules="rules.email"
              >
              </v-text-field>

              <v-text-field
                label="Numero telefónico"
                prefix="+503"
                placeholder="00000000"
                :counter="maxTel"
                :rules="rules.telefono"
              >
              </v-text-field>
              <v-switch
                v-model="acceptedTerms"
                color="green"
                :rules="rules.condiciones"
                label="He leido y acepto los terminos y condiciones"
              >
                <template v-slot:label>
                  <p class="my-0">He leido y acepto los <router-link class="d-inline-block" active-class="link" to="/terms">terminos y condiciones</router-link></p>                  
                </template>
              </v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      </v-card-text>
      <!-- <v-card-actions>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false"> Save </v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NuevoAnuncio",
  data() {
    return {
      acceptedTerms: false,
      dialog: false,
      valid: true,
      maxModel: 10,
      maxTitulo: 20,
      maxDesc: 500,
      maxNombre: 20,
      maxEmail: 50,
      maxTel: 8,
      marcas: ["Samsung", "Apple", "Huawei", "LG", "Xiaomi", "Oppo"],
      estados: [
        "Sellado",
        "Nuevo",
        "En excelente estado",
        "En buen estado",
        "Usado",
      ],
      sistemas: ["IOS", "Android", "Windows", "Lineage OS"],
      nuevoAnuncio: {},
      rules: {
        selection: [(v) => !!v || "Este campo es requerido"],
        modelo: [
          (v) => !!v || "Este campo es requerido",
          (v) => (v && v.length <= 10) || "Solo son permitidos 10 caracteres",
        ],
        tamano: [
          (v) => !!v || "Este campo es requerido",
          (v) => (v && v > 0) || "El tamaño debe ser mayor a 0",
          (v) => (v && v <= 0) || "El tamañó debe ser menor o igual a 20",
        ],
        ram: [
          (v) => !!v || "Este campo es requerido",
          (v) => (v && v > 0) || "La memoria RAM debe ser mayor a 0",
          (v) => (v && v <= 128) || "La memoria RAM debe ser menor a 128 GB",
        ],
        almacenamiento: [
          (v) => !!v || "Este campo es requerido",
          (v) => (v && v > 0) || "La memoria interna debe ser mayor a 0",
          (v) =>
            (v && v <= 1024) || "La memoria interna debe ser menor a 1024 GB",
        ],
        titulo: [
          (v) => !!v || "Este campo es requerido",
          (v) =>
            (v && v.length <= this.maxTitulo) ||
            "El titulo no debe exceder 20 caracteres",
        ],
        desc: [
          (v) => !!v || "Este campo es requerido",
          (v) =>
            (v && v.length <= this.maxDesc) ||
            "La descripción no debe exceder 500 caracteres",
        ],
        precio: [
          (v) => !!v || "Este campo es requerido",
          (v) => (v && v >= 0) || "El precio debe ser un numero positivo",
        ],
        nombre: [
          (v) => !!v || "Este campo es requerido",
          (v) =>
            (v && v.length <= this.maxNombre) ||
            "El nombre no debe exceder los 20 caracteres",
        ],
        email: [
          (v) => !!v || "Este campo es requerido",
          (v) =>
            (v && v.length <= this.maxEmail) ||
            "El email no debe exceder los 50 caracteres",
          (v) => /.+@.+\..+/.test(v) || "El email debe ser válido",
        ],
        telefono: [
          (v) => !!v || "Este campo es requerido",
          (v) =>
            (v && v.length <= this.maxTel) ||
            "Telefono no debe exceder los 8 caracteres",
          (v) => /\d{8}/.test(v) || "El telefono debe ser de la forma ########",
        ],
        condiciones: [
          () =>
            this.acceptedTerms || "Debe aceptar los terminos y condiciones.",
        ],
      },
    };
  },
  methods: {
    limpiar() {
      this.$refs.form.reset();
    },
    guardar() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
      }
    },
  },
};
</script>

<style scoped>
h2 {
  color: black;
}
hr {
  border-color: #aaa;
  border-bottom: 0;
}
</style>