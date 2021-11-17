<template>
  <div>
    <section id="index_section">
      <div class="card" style="min-height: 650px">
        <div class="m-3">
          시도 :
          <select v-model="sido" @change="changeSido">
            <option value="0">
              {{ sido }}
            </option>
          </select>
          구군 :
          <select v-model="gugun" @change="changeGugun">
            <option value="0">{{ gugun }}</option>
          </select>
          읍면동 :
          <select v-model="dong" @change="changeDong">
            <option value="0">{{ dong }}</option>
          </select>
        </div>
        <hr />
        <div class="row m-3">
          <h3 id="subject">전국 아파트 매매 현황</h3>
          <div class="mr-3" style="overflow: scroll; width: 20%; height: 500px">
            <SearchResult />
          </div>
          <div class="mr-3 ml-3" style="width: 80%">
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
      .then((data) => {
        console.log(data);
        // $.each(data, function (index, vo) {
        //  v-for="option in SidoOptions" v-bind:value="option.value" :key="option.text"
        // });
      });
  },
  methods: {
    aptSearch() {
      if (this.dong === "선택") {
        axios
          .get(`http://127.0.0.1:8080/vue/map/apt-gugun?gugun=${this.gugun}`)
          .then(({ data }) => {
            console.log(data);
          });
      } else {
        axios.get(`http://127.0.0.1:8080/vue/map/apt?dong=${this.dong}`).then(({ data }) => {
          console.log(data);
        });
      }
    },
    changeSido() {
      console.log(this.sido);
    },
    changeGugun() {
      console.log(this.gugun);
    },
    changeDong() {
      console.log(this.dong);
    },
  },
};
</script>

<style scoped></style>
