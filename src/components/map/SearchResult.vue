<template>
  <div>
    <div v-for="(vo, index) in result" :key="index">
      <div style="visibility: hidden">{{ vo.aptCode }}</div>
      <div class="aptName">{{ vo.aptName }}</div>
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
  props: {
    sido: String,
    gugun: String,
    result: Array,
  },
};
</script>

<style scoped></style>
