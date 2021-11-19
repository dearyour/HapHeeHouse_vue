<template>
  <div>
    <section id="index_section">
      <div>
        <b-tabs content-class="mt-3">
          <b-tab title="First" active><search-location /></b-tab>
          <b-tab title="Second"><p>I'm the second tab</p></b-tab>
          <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
        </b-tabs>
      </div>
      <div class="card" style="min-height: 650px">
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
