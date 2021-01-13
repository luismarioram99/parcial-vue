<template>
  <div class="transparent">
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
            <v-toolbar-title
              >Crear
              <span class="hidden-sm-and-down"
                >un nuevo anuncio</span
              ></v-toolbar-title
            >
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
              <v-btn dark color="red" text @click="cancelar()">
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
                  <h2>Información del teléfono</h2>
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
                    v-on:change="selectSistema()"
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

                   <v-row>
                    <v-col md="6" cols="12">
                      <v-text-field
                        v-model="nuevoAnuncio.camara_trasera"
                        type="number"
                        min="0"
                        suffix="MP"
                        :rules="rules.camara"
                        label="Cámara trasera"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col md="6" cols="12">
                      <v-text-field
                        v-model="nuevoAnuncio.camara_frontal"
                        type="number"
                        min="0"
                        suffix="MP"
                        :rules="rules.camara"
                        label="Cámara frontal"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-textarea
                    label="Detálles"
                    v-model="nuevoAnuncio.detalles"
                    :counter="maxDesc"
                    :rules="rules.detalles"
                  ></v-textarea>
                  <h2 class="mt-5">Galería de imágenes</h2>
                  <hr />
                  <div class="d-flex align-items-center pt-9">
                    <v-file-input
                      class="py-0 pr-4"
                      counter
                      accept="image/*"
                      :rules="rules.imagenes"
                      chips
                      prepend-icon="mdi-camera"
                      v-model="imagen"
                      label="Subir imágenes"
                      show-size
                      truncate-length="20"
                    ></v-file-input>
                    <v-btn
                      color="primary"
                      :disabled="!imagen || subiendo"
                      @click="subirImagen()"
                    >
                      <v-progress-circular
                        indeterminate
                        class="m-3"
                        v-if="subiendo"
                      >
                      </v-progress-circular>
                      <v-icon v-if="!subiendo" class="mr-2">mdi-upload</v-icon>
                      Subir
                    </v-btn>
                  </div>
                  <v-progress-linear
                    v-if="subiendo"
                    :value="uploadProgress"
                    class="mt-5"
                  ></v-progress-linear>
                  <v-carousel
                    v-if="subidas.length"
                    :show-arrows="subidas.length > 1"
                    class="mt-5"
                  >
                    <v-carousel-item
                      v-for="(item, ref) in subidas"
                      :key="ref"
                      :src="item.url"
                    >
                      <v-btn
                        class="delete-btn"
                        color="red"
                        dark
                        bottom
                        left
                        elevation="2"
                        fab
                        @click="borrarImagen(item.ref)"
                        ><v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-carousel-item>
                  </v-carousel>
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
                    v-model="nuevoAnuncio.telefono"
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
                  <v-btn   color="secondary" class=" mt-4 mx-2 black--text" @click="limpiar()">
                    <v-icon class="mr-2"> mdi-broom </v-icon>
                    <span> Limpiar </span>
                  </v-btn>
                  <v-btn  :disabled="!valid" color="green"  class=" mt-4 mx-2 black--text" @click="guardar()">
                    <v-icon class="mr-2"> mdi-content-save </v-icon>
                    <span>Guardar </span>
                  </v-btn>
                  <v-btn   color="red" dark class=" mt-4 mx-2" @click="cancelar()">
                    <v-icon class="mr-2">mdi-delete</v-icon>
                    <span>Cancelar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { storage } from "../firebase";
import { db } from "../firebase";
export default {
  name: "NuevoAnuncio",
  data() {
    return {
      acceptedTerms: false,
      dialog: false,
      valid: true,
      maxModel: 10,
      snacktext: "El anuncio ha sido creado correctamente",
      maxTitulo: 100,
      maxDesc: 500,
      maxNombre: 20,
      subidasValid: true,
      maxEmail: 50,

      uploadProgress: 0,
      imageDir: "",
      subiendo: false,
      imagen: null,

      subidasHeaders: [
        { text: "Nombre", value: "name" },
        { text: "Estado", value: "estado" },
        { text: "progreso", value: "progreso" },
      ],
      subidas: [],

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
      nuevoAnuncio: {
        sistema: "",
        marca: ""
      },
      rules: {
        selection: [(v) => !!v || "Este campo es requerido"],
        modelo: [
          (v) => !!v || "Este campo es requerido",
          (v) => (v && v.length <= 10) || "Solo son permitidos 10 caracteres",
        ],
        tamano: [
          (v) => !!v || "Este campo es requerido",
          (v) => (v && v > 0) || "El tamaño debe ser mayor a 0",
          (v) => (v && v <= 20) || "El tamañó debe ser menor o igual a 20",
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
            "El titulo no debe exceder " +this.maxTitulo + " caracteres",
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
        imagenes: [
          () =>
            !!this.subidas.length || !!this.imagen ||
            "Debe subir al menos una imagen",
          () => this.subidasValid || "Debe subir al menos una imagen para guardar."
            
        ],
        camara:[
          (v) => !!v || "Este campo es requerido",
          (v) => (v && v > 0) || "La resolución debe ser mayor a 0",
          (v) => (v && v <= 128) || "La resolución debe ser menor a 128 MP",
        ],
        detalles:[
          (v) => (!v || v.length <= 500) || "Los detalles no debe exceder 500 caracteres",
        ]
      },
    };
  },
  methods: {
    selectSistema(){
      if(this.nuevoAnuncio.marca == "Apple"){
        this.nuevoAnuncio.sistema = "IOS";
      }else{
        this.nuevoAnuncio.sistema = "Android"
      }
    },
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    borrarImagen(ref) {
      var storageRef = storage.ref();

      var index = this.subidas.findIndex(function (value) {
        if (value.ref == ref) return true;
      });

      console.log(index, this.subidas);
      var context = this;
      storageRef
        .child(ref)
        .delete()
        .then(function () {
          context.subidas.splice(index, 1);
        });
    },
    async subirImagen() {
      var storageRef = storage.ref();

      if (this.imagen) {
        this.subiendo = true;

        if (this.imageDir == "") {
          var dir = "";
          var is_unique = false;
          var listRef = null;

          while (!is_unique) {
            dir = this.makeid(10);
            listRef = storageRef.child(dir);

            await listRef.listAll().then(function (res) {
              if (res.items.length == 0) {
                is_unique = true;
              }
            });
          }

          this.imageDir = dir;
    
        }

        var imgRef = storageRef.child(this.imageDir + "/" + this.imagen.name);
        var status = imgRef.put(this.imagen);

        var context = this;

        status.on(
          "state_changed",
          function (snapshot) {
            context.uploadProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(context.uploadProgress);
          },
          function () {},
          function () {
            status.snapshot.ref.getDownloadURL().then(function (_url) {
              context.subidas.push({
                url: _url,
                ref: context.imageDir + "/" + context.imagen.name,
              });
              context.imagen = null;
              context.subiendo = false;
            });
          }
        );
      }

    },
    limpiar() {
      this.$refs.form.reset();
      var storageRef = storage.ref();
      for (var i = 0; i < this.subidas.length; i++) {
        storageRef.child(this.subidas[i].ref).delete();
      }
    },
    guardar() {      
      console.log(this.subidas);
      this.nuevoAnuncio.imagenes = this.subidas;

      if(this.subidas.length == 0) this.subidasValid = false;

      if (this.$refs.form.validate()) {

        db.collection("anuncios").add(this.nuevoAnuncio).then((docRef)=>{
          
          var refId = docRef.id;
          
          db.collection("anuncios").doc(docRef.id).set({
            key: refId
          }, {merge: true});
          console.log(refId);
        });

        this.$refs.form.reset();

        this.subidas = [];
        this.imagen = null;
        this.imageDir = "";

        this.uploadProgress = 0;
        this.subiendo = false;

        this.dialog = false;

        this.$root.$emit("snackbar-message", this.snacktext, "green");
      }
    },
    cancelar() {
      var storageRef = storage.ref();
      for (var i = 0; i < this.subidas.length; i++) {
        storageRef.child(this.subidas[i].ref).delete();
      }

      this.subidas = [];
      this.imagen = null;
      this.imageDir = "";

      this.uploadProgress = 0;
      this.subiendo = false;

      this.$refs.form.reset();

      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.delete-btn {
  position: absolute;
  bottom: 60px;
  right: 15px;
}
h2 {
  color: black;
}
hr {
  border-color: #aaa;
  border-bottom: 0;
}
.transparent {
  padding: 0;
  margin: 0;
  display: inline-block;
}
</style>