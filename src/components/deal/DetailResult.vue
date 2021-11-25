<template>
  <div>
    <div>
      <p>아파트 상세 매매 현황</p>
      <div v-if="aptDeal.length > 0">
        <b-tabs content-class="mt-3">
          <b-tab title="그래프" active>
            <canvas id="chart" width="400" height="400"></canvas
          ></b-tab>
          <b-tab title="5종 비교"
            ><p style="font-weight: bold">최근 거래된 매매 5종 비교</p>
            <b-table striped hover :items="items"></b-table
          ></b-tab>
          <b-tab title="전체 매매 현황">
            <div style="overflow: scroll; height: 363px">
              <div v-for="(history, index) in aptDeal" :key="index">
                <div>{{ history.dealYear }}.{{ history.dealMonth }}.{{ history.dealDay }}</div>
                <div v-if="dealType === `deal`">
                  <div style="color: red">{{ history.dealAmount }}</div>
                </div>
                <div v-else>
                  <div style="color: red">
                    {{ history.rentTypeName }} {{ history.deposit }} {{ history.rentMoney }}
                  </div>
                </div>
                <div></div>
                <hr align="center" style="width: 80%" />
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  methods: {
    changeItem() {
      this.items = [];
      for (let i = this.aptDeal.length > 5 ? 4 : this.aptDeal.length; i > -1; i--) {
        let str =
          (this.aptDeal[i].dealYear === undefined ? "" : this.aptDeal[i].dealYear) +
          "." +
          (this.aptDeal[i].dealMonth === undefined ? "" : this.aptDeal[i].dealMonth) +
          "." +
          (this.aptDeal[i].dealDay === undefined ? "" : this.aptDeal[i].dealDay);
        if (this.dealType === "deal") {
          this.items.push({
            계약일: str,
            매매가: this.aptDeal[i].dealAmount,
            면적: this.aptDeal[i].area,
          });
        } else {
          this.items.push({
            계약일: str,
            종류: this.aptDeal[i].rentTypeName,
            보증금: this.aptDeal[i].deposit,
            월세: this.aptDeal[i].rentMoney,
          });
        }
      }
    },
    fillData() {
      if (window.myChart != undefined) {
        window.myChart.destroy();
      }
      const ctx = document.getElementById("chart").getContext("2d");
      const history_label = [];
      const history_data = [];
      if (this.dealType === "deal") {
        for (let i = 0; i < 5; i++) {
          let str =
            this.aptDeal[i].dealYear +
            "." +
            this.aptDeal[i].dealMonth +
            "." +
            this.aptDeal[i].dealDay;

          history_label.push(str);
          history_data.push(parseInt(this.aptDeal[i].dealAmount.trim().replace(/,/g, "")));
        }
      } else {
        for (let i = 4; i >= 0; i--) {
          let str =
            this.aptDeal[i].dealYear +
            "." +
            this.aptDeal[i].dealMonth +
            "." +
            this.aptDeal[i].dealDay;

          history_label.push(str);
          history_data.push(parseInt(this.aptDeal[i].deposit.trim().replace(/,/g, "")));
        }
      }
      console.log(history_label);
      console.log(history_data);
      window.myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: history_label,
          datasets: [
            {
              label: this.aptDeal[0].aptName + " 매매 그래프",
              data: history_data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
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
      items: [],
    };
  },
  watch: {
    aptDeal() {
      this.fillData();
      this.changeItem();
    },
  },
  computed: {
    dealType() {
      return this.$store.getters.dealType;
    },
    aptDeal() {
      return this.$store.getters.aptDeal;
    },
  },
  mounted() {
    this.fillData();
    this.changeItem();
  },
};
</script>

<style scoped></style>
