<template>
  <div class="notfound">
    <v-container fluid class="h-100">
      <v-img        
        contain
        class="image-404"
        :src="require('../assets/gifs/' + gifURL)"
      >
        <div class="centered-text">
          <h1 class="text-h1 font-weight-medium">
            404 no encontrado
          </h1>
        </div>
      </v-img>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      gifURL: "",
    };
  },
  methods: {
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  },
  created() {
    this.gifURL = "image" + this.getRandomInt(1, 5) + ".gif";
  },
};
</script>

<style>
.notfound {
  max-height: 100vh;
}
.h-100 {
  width: 100%;
  height: 80vh;
}
.image-404 {
  width: 100%;
  height: 100%;
}
.centered-text {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>