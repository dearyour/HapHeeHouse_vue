<template>
  <div>
    <div v-for="(vo, index) in result" :key="index">
      <div style="visibility: hidden">{{ vo.aptCode }}</div>
      <div class="aptName">
        <router-link :to="`/deal/apt?aptCode=` + vo.aptCode">{{ vo.aptName }}</router-link>
      </div>
      <div>{{ sido }} {{ gugun }} {{ vo.dongName }} {{ vo.jibun }}</div>
      <div>{{ vo.buildYear }}</div>
      <div style="color: red">{{ vo.recentPrice }}</div>
    </div>
    <hr align="center" style="width: 80%" />
  </div>
</template>

<script>
export default {
  name: "SearchResult",
  computed: {
    sido() {
      return this.$store.getters.sido;
    },
    gugun() {
      return this.$store.getters.dong;
    },
    result() {
      return this.$store.getters.aptResult;
    },
  },
};
</script>

<style scoped></style>
