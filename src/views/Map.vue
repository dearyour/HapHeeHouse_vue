<template>
  <div>
    <section id="index_section">
      <div class="card" style="min-height: 650px">
        <div class="m-3">
          시도 :
          <select v-model="sido" @change="changeSido">
            <option v-for="(option, index) in sidoOptions" v-bind:value="option.value" :key="index">
              {{ option.text }}
            </option>
          </select>
          구군 :
          <select v-model="gugun" @change="changeGugun">
            <option
              v-for="(option, index) in gugunOptions"
              v-bind:value="option.value"
              :key="index"
            >
              {{ option.text }}
            </option>
          </select>
          읍면동 :
          <select v-model="dong" @change="changeDong">
            <option v-for="(option, index) in dongOptions" v-bind:value="option.value" :key="index">
              {{ option.text }}
            </option>
          </select>
        </div>
        <hr />
        <div class="row m-3">
          <div style="overflow: scroll; width: 20%; height: 500px">
            <SearchResult :result="aptResult" />
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
      sido: "선택",
      sidoOptions: [],
      gugun: "선택",
      gugunOptions: [],
      dong: "선택",
      dongOptions: [],
      aptResult: [],
      places: [],
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
  },
};
</script>

<style scoped></style>
