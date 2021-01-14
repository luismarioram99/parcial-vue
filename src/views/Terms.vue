<template>
  <div class="h-100 d-flex flex-row justify-center align-center" >
    <v-container>
      <v-card elevation="15" v-scrollanimation>
        <v-card-title>
          <h2>Terminos y condiciones</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>Esta es una aplicación ficticia.</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                Esta es una aplicación que pone en práctica la creación y
                despliegue de aplicaciónes en Vue. Ha sido una experiencia muy
                interesante, conocer y aplicar distintas propiedades que hacen
                más practica la programación web, y también introducen nuevos
                tipos de comportamientos y bugs. <br />
                Me pareció un proyecto muy cultivador, que me permitió poner en
                práctica habilidades nuevas relacionadas a Vue, javascript y el
                diseñó web. <br /><br />
                Dicho esto,
                <strong>
                  esta aplicación es una tienda en linea ficticia
                </strong>
                , no tiene ninguna significancia empresarial, ni se tramitarán
                los pedidos que se hagan usando esta aplicación.
                <br>
                Ocupar código RP18011 para obtener 30% de descuento en cualquier compra <strong> (ficticia) </strong>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>Acerca de publicación de anuncios.</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                La publicación de anuncios es libre, sin embargo el autor no
                supervisa las imágenes subidas o el contenido de los anuncios.
                Si uno sucede ser inapropiado, se removerá. Lo siguiente es
                Lorem ipsum. <br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                cursus sed arcu et elementum. Nam id quam id justo semper
                egestas. Maecenas ac vehicula lacus. Phasellus dapibus libero et
                sodales scelerisque. Proin sit amet sem ut nisi eleifend
                viverra. Vestibulum dictum mauris ac elit convallis luctus. Nam
                efficitur magna ut blandit sagittis. Vestibulum gravida erat
                felis, in vehicula lacus mattis vel. Praesent tempus laoreet
                posuere. Cras libero leo, euismod quis ornare sed, viverra sed
                turpis. Cras aliquet nisi risus, quis accumsan augue pharetra
                id. Fusce pellentesque sapien sed sapien aliquam, eget iaculis
                turpis pretium. Donec sit amet diam facilisis, rutrum elit in,
                condimentum nibh. Morbi ac neque in leo sodales aliquet. Nullam
                id rhoncus leo. Nunc non diam venenatis lorem pharetra
                ullamcorper sed et nibh. Aliquam eget dui at justo molestie
                pellentesque sit amet rhoncus magna. Praesent ullamcorper eros
                eget semper fermentum. Curabitur quam nibh, faucibus eu euismod
                a, convallis eget orci. Vivamus et sollicitudin dui, quis
                accumsan arcu. Ut congue commodo felis, ut dapibus diam
                scelerisque vitae. Aenean ornare ante mauris, consectetur
                venenatis nisl bibendum ut. Duis aliquet mollis scelerisque.
                Phasellus imperdiet enim eu leo tempor, et finibus risus
                viverra. Etiam vitae est neque. Vivamus elit lacus, fermentum in
                bibendum a, posuere vel libero.
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>Acerca de la información personal.</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                Las información personal se sube a la base de datos y alimenta
                los anuncios. Por favor no incluir información sensible real en
                ninguna de las formas, como números de teléfonos, correos, etc.
                Para hacer esto parecer mas un acerca de, ocupo lorem ipsum.
                <br><br>
                Cras quis diam imperdiet, laoreet odio et, sodales metus.
                Phasellus a varius erat. Aliquam metus velit, feugiat at metus
                eu, ullamcorper vehicula nisi. Etiam non nibh a erat congue
                vulputate in in risus. Cras ac nisi eu nisl commodo tristique.
                Donec facilisis vel turpis non bibendum. Nulla rutrum diam eget
                est convallis, a ultrices augue molestie. Nullam et quam nisi.
                Vivamus tincidunt quis nulla ac venenatis. Suspendisse venenatis
                orci sapien, ac cursus massa tincidunt ut. Vivamus ut est vel
                lectus sagittis interdum eget eget leo. Praesent ligula mauris,
                facilisis egestas commodo eu, convallis nec magna. Duis vehicula
                at eros accumsan congue. Nunc fermentum nisi sit amet nisi
                placerat, in mattis tortor egestas. Vivamus quam neque, posuere
                non convallis sit amet, euismod vitae mi. Aenean non convallis
                ante. In non ligula vitae augue pharetra iaculis. Fusce ut
                tellus eget justo venenatis interdum porta vitae turpis.
                Vestibulum iaculis ipsum dignissim, porttitor nisi non, blandit
                velit. Morbi sit amet ipsum ut enim dignissim elementum. Sed
                enim felis, dictum et pellentesque nec, blandit ac lacus. Nullam
                et dolor a libero convallis ultricies. Quisque vulputate lectus
                non euismod consequat. Integer sagittis nisi sit amet magna
                efficitur mollis. Quisque consectetur ante quis ante dignissim,
                at fermentum ligula iaculis. Nullam vel sagittis tellus.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Terminos",
  data() {
    return {
      items: {},
    };
  },
};
</script>

<style scoped>
.h-100{
  height: 100%;
}
</style>