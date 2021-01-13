<template>
  <div class="h-100">
    <div class="d-flex flex-column align-center py-10 justify-center text-center">
      <v-img
        color="primary"
        contain
        class="check-icon"
        src="../assets/check-circle.svg"
      >
      </v-img>
      <br />
      <p class="text-h3 green--text">Listo!</p>
      <p>
        Tu pedido está en camino. <br />
        Un repartidor te contactará en breve.
      </p>
      <v-btn color="green" to="/">
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
</style>

