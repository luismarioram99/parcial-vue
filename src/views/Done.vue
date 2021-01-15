<template>
  <div class="h-100">
    <div class="d-flex flex-column align-center py-10 justify-center text-center">
      <v-img
        v-scrollanimation
        color="primary"
        contain
        class="check-icon"
        src="../assets/check-circle.svg"
      >
      </v-img>
      <br />
      <p class="text-h3 green--text" v-scrollanimation="500">Listo!</p>
      <p v-scrollanimation="800">
        Tu pedido está en camino. <br />
        Un repartidor te contactará en breve.
      </p>
      <v-btn v-scrollanimation="1000" color="green" to="/">
        Inicio
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.h-100 {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.check-icon {
  height: 150px;
  width: 150px;
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