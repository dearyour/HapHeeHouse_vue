<template>
  <div>
    <section id="index_section">
      <div>
        <b-tabs content-class="mt-3">
          <b-tab title="아파트" @click="changeHouseType('apartment')" active
            ><search-location
          /></b-tab>
          <b-tab title="다세대/연립" @click="changeHouseType('house')"><search-location /></b-tab>
        </b-tabs>
      </div>
      <div class="card m-3">
        <div class="row m-3">
          <div style="overflow: scroll; width: 20%; height: 500px">
            <SearchResult />
          </div>
          <div style="width: 20%; height: 500px">
            <DetailResult />
          </div>
          <div style="width: 60%">
            <KakaoMap />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Constant from "@/util/Constant.js";
import KakaoMap from "@/components/map/KakaoMap.vue";
import SearchResult from "@/components/map/SearchResult.vue";
import SearchLocation from "@/components/map/SearchLocation.vue";
import DetailResult from "@/components/deal/DetailResult.vue";

export default {
  name: "Map",
  created() {
    this.$store.commit(Constant.SET_HOUSE_TYPE, "apartment");
  },
  computed: {
    houseType() {
      return this.$store.getters.houseType;
    },
    isDetailResultOpen: function () {
      this.changeSize();
      return this.$store.getters.isDetailResultOpen;
    },
  },
  components: {
    KakaoMap,
    SearchResult,
    SearchLocation,
    DetailResult,
  },
  methods: {
    changeHouseType(type) {
      this.$store.commit(Constant.SET_HOUSE_TYPE, type);
    },
  },
};
</script>

<style scoped></style>
