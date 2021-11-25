<template>
  <div>
    <div>
      <p>아파트 상세 매매 현황</p>
      <b-tabs content-class="mt-3">
        <b-tab title="그래프" active
          ><p>매매 그래프</p>
          <canvas id="chart" width="400" height="400"></canvas
        ></b-tab>
        <b-tab title="5종 비교"><p>최근 거래된 매매 5종 비교</p></b-tab>
        <b-tab title="전체 매매 현황"><p>전체 매매 현황</p></b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  methods: {
    fillData() {
      if (window.myChart != undefined) {
        window.myChart.destroy();
      }
      const ctx = document.getElementById("chart").getContext("2d");
      window.myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.fillData();
  },
};
</script>

<style scoped></style>
