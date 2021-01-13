<template>
  <div>
    <v-container class="my-5">
      <h2 class="mb-5">Estadisticas</h2>

      <v-row>
        <v-col col="12" md="6">
          <v-card elevation="15">
            <v-card-title> Marcas publicadas </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <LineChart :chart-data="datacollection" />
              <button @click="fillData()">Randomize</button>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col col="12" md="6">
          <v-card elevation="15">
            <v-card-title> Marcas Compradas </v-card-title>
            <v-divider></v-divider>
            <v-card-text> </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LineChart from "../charts/LineChart.js";
export default {
  name: "Estadisticas",
  data() {
    return {
      datacollection: null,
    };
  },
  components: {
    LineChart,
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#AA0000",
            data: [this.getRandomInt(), this.getRandomInt(),this.getRandomInt(),this.getRandomInt()],
          }
          
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>

<style scoped>
</style>