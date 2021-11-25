<template>
  <div>
    <div v-for="(vo, index) in result" :key="index">
      <div style="visibility: hidden">{{ vo.aptCode }}</div>
      <div class="aptName">
        <div @click="getAptDeal(vo.aptCode)">{{ vo.aptName }}</div>
        <!-- <router-link :to="`/deal/apt?aptCode=` + vo.aptCode">{{ vo.aptName }}</router-link> -->
      </div>
      <div>{{ vo.dongName }} {{ vo.jibun }}</div>
      <div>{{ vo.buildYear }}</div>
      <div style="color: red">{{ vo.recentPrice }}</div>
      <hr align="center" style="width: 80%" />
    </div>
  </div>
</template>

<script>
import Constant from "@/util/Constant.js";
export default {
  name: "SearchResult",
  computed: {
    result() {
      return this.$store.getters.aptResult;
    },
    isDeal() {
      return this.$store.getters.isDeal;
    },
  },
  methods: {
    getAptDeal(aptCode) {
      console.log("getHouseDeal " + aptCode);
      this.$store.dispatch(Constant.GET_HOUSE_DEAL, aptCode).then(() => {
        console.log("aptData를 가지고 왔습니다..!");
      });
    },
  },
};
</script>

<style scoped></style>
