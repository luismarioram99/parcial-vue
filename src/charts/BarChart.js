import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  
  extends: Bar,
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