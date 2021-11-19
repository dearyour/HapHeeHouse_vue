<template>
  <div>
    <section id="index_section">
      <div>
        <b-tabs content-class="mt-3">
          <b-tab title="First" active><p>I'm the first tab</p></b-tab>
          <b-tab title="Second"><p>I'm the second tab</p></b-tab>
          <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
        </b-tabs>
      </div>
      <div class="card" style="min-height: 650px">
        <div class="m-3">
          <b-row>
            <b-col>
              <b-form-select
                v-model="sido"
                @change="changeSido"
                :options="sidoOptions"
                size="sm"
              ></b-form-select>
            </b-col>
            <b-col>
              <b-form-select
                v-model="gugun"
                @change="changeGugun"
                :options="gugunOptions"
              ></b-form-select>
            </b-col>
            <b-col>
              <b-form-select
                v-model="dong"
                @change="changeArea"
                :options="dongOptions"
              ></b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-form-input id="areaMin" type="text" v-model="areaMinValue" @change="changeArea" />
            <b-form-input id="areaMax" type="text" v-model="areaMaxValue" @change="changeArea" />
          </b-row>
        </div>
        <hr />
        <div class="row m-3">
          <div style="overflow: scroll; width: 20%; height: 500px">
            <SearchResult
              :result="aptResult"
              :sido="sidoOptions.selected"
              :gugun="gugunOptions.selected"
            />
          </div>
          <div style="width: 80%">
            <KakaoMap />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import KakaoMap from "@/components/map/KakaoMap.vue";
import SearchResult from "@/components/map/SearchResult.vue";

export default {
  name: "Map",
  data() {
    return {
      sido: 1,
      sidoName: "",
      sidoOptions: [{ value: 0, text: "시를 선택해주세요." }],
      gugun: 0,
      gugunName: "",
      gugunOptions: [{ value: 0, text: "구, 군을 선택해주세요." }],
      dong: 0,
      dongOptions: [{ value: 0, text: "읍, 면, 동을 선택해주세요." }],
      aptResult: [],
      places: [],
      areaMinValue: 0,
      areaMaxValue: 70,
    };
  },
  components: {
    KakaoMap,
    SearchResult,
  },
  created() {
    axios
      .get(`http://127.0.0.1:8080/vue/map/sido`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then(({ data }) => {
        const list = [];
        data.forEach(function (ele) {
          list.push({ text: ele.sidoName, value: ele.sidoCode });
        });
        this.sidoOptions = list;
      });
  },
  methods: {
    changeSido() {
      axios
        .get(`http://127.0.0.1:8080/vue/map/gugun?sido=${this.sido}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=utf-8",
          },
        })
        .then(({ data }) => {
          const list = [];
          data.forEach(function (ele) {
            list.push({ text: ele.gugunName, value: ele.gugunCode });
          });
          this.gugunOptions = list;
        });
      this.gugun = 1;
    },
    changeGugun() {
      axios
        .get(`http://127.0.0.1:8080/vue/map/dong?gugun=${this.gugun}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=utf-8",
          },
        })
        .then(({ data }) => {
          const list = [];
          data.forEach(function (ele) {
            list.push({ text: ele.dongName, value: ele.dongCode });
          });
          this.dongOptions = list;
        });
      this.dong = 1;
    },
    changeDong() {
      axios.get(`http://127.0.0.1:8080/vue/map/apt?dong=${this.dong}`).then(({ data }) => {
        this.aptResult = data;
        const list = [];
        data.forEach(function (ele) {
          list.push({ text: ele.dongName, value: ele.dongCode });
        });
        this.places = list;
      });
    },
    changeArea() {
      if (this.dong === 0) {
        console.log("enter dong");
      } else {
        axios
          .get(
            `http://127.0.0.1:8080/vue/map/apt?dong=${this.dong}&min=${this.areaMinValue}&max=${this.areaMaxValue}`
          )
          .then(({ data }) => {
            this.aptResult = data;
            const list = [];
            data.forEach(function (ele) {
              list.push({ text: ele.dongName, value: ele.dongCode });
            });
            this.places = list;
          });
      }
    },
  },
};
</script>

<style scoped></style>
