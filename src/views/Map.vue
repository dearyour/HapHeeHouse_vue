<template>
  <div>
    <section id="index_section">
      <div>
        <b-tabs content-class="mt-3">
          <b-tab title="아파트" active><search-location /></b-tab>
          <b-tab title="단독/다가구"><search-location /></b-tab>
          <b-tab title="오피스텔"><search-location /></b-tab>
        </b-tabs>
      </div>
      <div class="card mt-3">
        <div class="row m-3">
          <div style="overflow: scroll; width: 20%; height: 500px">
            <SearchResult />
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
import KakaoMap from "@/components/map/KakaoMap.vue";
import SearchResult from "@/components/map/SearchResult.vue";
import SearchLocation from "@/components/map/SearchLocation.vue";

export default {
  name: "Map",
  components: {
    KakaoMap,
    SearchResult,
    SearchLocation,
  },
};
</script>

<style scoped></style>
