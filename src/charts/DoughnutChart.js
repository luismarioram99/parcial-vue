import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['options'],
  data() {
    return {
     
    }
  },
  mounted() {
    console.log(this.options);
    this.renderChart(this.chartData, this.options); 
  }

}