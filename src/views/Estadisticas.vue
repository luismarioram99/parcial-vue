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
              <div>
                <doughnut-chart
                  :options="chartOptions"
                  :styles="chartStyles"
                  :chart-data="doughnutData1"
                />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col col="12" md="6">
          <v-card elevation="15">
            <v-card-title> Marcas Compradas </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div>
                <doughnut-chart :options="chartOptions" :styles="chartStyles" :chart-data="doughnutData2"></doughnut-chart>
              </div>  
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DoughnutChart from "../charts/DoughnutChart.js";
import { db } from "../firebase";
export default {
  name: "Estadisticas",
  data() {
    return {
      ready: true,
      doughnutData1: {},
      doughnutData2: {},

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartStyles: {
        height: "400px",
        width: "100%",
      },
    };
  },
  components: {
    DoughnutChart,
  },
  methods: {
    async fillData() {

      this.ready = false;      

      var ventas = [];
      await db
        .collection("ventas")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            ventas.push(doc.data());
          });
        });

      var publicaciones = [];
      await db
        .collection("anuncios")
        .get()
        .then((query) => {
          query.forEach((doc) => {
            publicaciones.push(doc.data());
          });
        });

      
      var marcas = ["Samsung", "Apple", "Huawei", "LG", "Xiaomi", "Oppo"];
      var countMap = {};
      marcas.forEach((marca) => {
        countMap[marca] = 0;
      });

      publicaciones.forEach((publicacion) => {
        countMap[publicacion.marca]++;
      });

      var counts = [];
      marcas.forEach((marca) => {
        counts.push(countMap[marca]);
      });

      this.doughnutData1 = {
        labels: marcas,
        datasets: [
          {
            label: "Data ",
            backgroundColor: [
              "#FCBA04",
              "#A50104",
              "#020122",
              "#7FB685",
              "#426A5A",
              "#677DB7",
            ],
            data: counts,
          },
        ],
      };

      marcas.forEach((marca) => {
        countMap[marca] = 0;
      });

      ventas.forEach((venta) => {
        venta.carrito.forEach((item) => {
          countMap[item.marca] ++;
        });
      });

      counts = [];
      marcas.forEach((marca) => {
        counts.push(countMap[marca]);
      });

      this.doughnutData2 = {
        labels: marcas,
        datasets: [
          {
            label: "Data ",
            backgroundColor: [
              "#FCBA04",
              "#A50104",
              "#020122",
              "#7FB685",
              "#426A5A",
              "#677DB7",
            ],
            data: counts,
          },
        ],
      };

      this.ready = true;
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
  mounted() {
    this.fillData();
  },
};
</script>

<style scoped>
</style>