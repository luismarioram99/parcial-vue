<template>
  <div class="estadisticas">
    <div v-if="!ready" fluid class="loading-pre">
      <v-progress-circular indeterminate color="primary">

      </v-progress-circular>
    </div>
    <v-container class="my-5" v-if="ready">
      <h2 class="mb-5">Estadisticas</h2>

      <v-row>
        <v-col col="12" md="6">
          <v-card elevation="15" v-scrollanimation>
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
          <v-card elevation="15" v-scrollanimation>
            <v-card-title> Marcas Compradas </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div>
                <bar-chart
                  :options="chartOptions"
                  :styles="chartStyles"
                  :chart-data="barData"
                ></bar-chart>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col col="12" md="6">
          <v-card elevation="15" v-scrollanimation>
            <v-card-title> Ventas, Descuentos y Ganancias </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div>
                <line-chart
                  :options="chartOptions"
                  :styles="chartStyles"
                  :chart-data="lineData"
                ></line-chart>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
         <v-col col="12" md="6">
          <v-card elevation="15" v-scrollanimation>
            <v-card-title> Datos acumulados </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div>
                <line-chart
                  :options="chartOptions"
                  :styles="chartStyles"
                  :chart-data="lineData2"
                ></line-chart>
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
import BarChart from "../charts/BarChart.js";
import LineChart from "../charts/LineChart.js";
import { db } from "../firebase";
export default {
  name: "Estadisticas",
  data() {
    return {
      ready: true,
      doughnutData1: {},
      barData: {},
      lineData: {},
      lineData2: {},

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
    BarChart,
    LineChart,
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
          countMap[item.marca]+= item.cantidad;
        });
      });

      counts = [];
      marcas.forEach((marca) => {
        counts.push(countMap[marca]);
      });

      this.barData = {
        labels: marcas,
        datasets: [
          {
            label: "ventas",
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

      var fechas = [];
      var ventaCant = [];
      var descuentoCant = [];
      var gananciaCant = [];

      ventas.forEach((venta) => {
        var total = 0;
        venta.carrito.forEach((item) => {
          total += item.precio * item.cantidad;
        });
        ventaCant.push(total);
        descuentoCant.push(venta.descuento);
        gananciaCant.push(total * 0.50);
        fechas.push(venta.timestamp.toDate());
      });

      this.lineData = {
        labels: fechas.map(
          (venta) =>
            "" +
            (venta.getMonth() + 1) +
            "/" +
            venta.getDate() +
            " " +
            venta.getHours() +
            ":" +
            venta.getMinutes()
        ),
        datasets: [
          {
            label: "ganancia",
            backgroundColor: "rgba(50,50,255,0.8)",
            data: gananciaCant,
          },
          {
            label: "descuentos",
            backgroundColor: "rgba(50,255,50,0.8)",
            data: descuentoCant,
          },
          {
            label: "ventas",
            backgroundColor: "rgba(255,50,50,0.8)",
            data: ventaCant,
          },
        ],
      };

      var ventaAcum = [];
      var descuentoAcum = [];
      var gananciaAcum = [];

      var suma = 0;
      ventaCant.forEach(venta => {
        suma += venta;
        ventaAcum.push(suma);
      });

      suma = 0;
      descuentoCant.forEach(venta => {
        suma += venta;
        descuentoAcum.push(suma);
      });

      
      for(var i = 0; i < descuentoAcum.length; i++){
        gananciaAcum.push(ventaAcum[i]*0.50 - descuentoAcum[i]);
      }

       this.lineData2 = {
        labels: fechas.map(
          (venta) =>
            "" +
            (venta.getMonth() + 1) +
            "/" +
            venta.getDate() +
            " " +
            venta.getHours() +
            ":" +
            venta.getMinutes()
        ),
        datasets: [
          {
            label: "ganancia",
            backgroundColor: "rgba(50,50,255,0.8)",
            data: gananciaAcum,
          },
          {
            label: "descuentos",
            backgroundColor: "rgba(50,255,50,0.8)",
            data: descuentoAcum,
          },
          {
            label: "ventas",
            backgroundColor: "rgba(255,50,50,0.8)",
            data: ventaAcum,
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
.before-enter{
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s;
}
.enter{
  opacity: 1;
  transform: translate(0px);
}
.loading-pre{
  height: 100% !important;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.estadisticas{
  height: 100%;
}
</style>

<style>
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