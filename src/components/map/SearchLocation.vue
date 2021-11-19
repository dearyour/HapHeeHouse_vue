<template>
  <div>
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
        <b-form-select v-model="dong" @change="getApt" :options="dongOptions"></b-form-select>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-input
          id="minArea"
          type="number"
          v-model="minArea"
          @change="getApt"
          @keyup.enter="getApt"
        />
      </b-col>
      <b-col>
        <b-form-input
          id="maxArea"
          type="number"
          v-model="maxArea"
          @change="getApt"
          @keyup.enter="getApt"
        />
      </b-col>
      <b-col>
        <b-form-input
          id="minAmount"
          type="number"
          v-model="minAmount"
          @change="getApt"
          @keyup.enter="getApt"
        />
      </b-col>
      <b-col>
        <b-form-input
          id="maxAmount"
          type="number"
          v-model="maxAmount"
          @change="getApt"
          @keyup.enter="getApt"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Constant from "@/util/Constant.js";
export default {
  name: "SearchLocation",
  computed: {
    sido: {
      get() {
        return this.$store.getters.sido;
      },
      set(value) {
        this.$store.commit(Constant.SET_SIDO, value);
      },
    },
    sidoOptions() {
      return this.$store.getters.sidoOptions;
    },
    gugun: {
      get() {
        return this.$store.getters.gugun;
      },
      set(value) {
        this.$store.commit(Constant.SET_GUGUN, value);
      },
    },
    gugunOptions() {
      return this.$store.getters.gugunOptions;
    },
    dong: {
      get() {
        return this.$store.getters.dong;
      },
      set(value) {
        this.$store.commit(Constant.SET_DONG, value);
      },
    },
    dongOptions() {
      return this.$store.getters.dongOptions;
    },
    minArea: {
      get() {
        return this.$store.getters.minArea;
      },
      set(value) {
        this.$store.commit(Constant.SET_MIN_AREA, value);
      },
    },
    maxArea: {
      get() {
        return this.$store.getters.maxArea;
      },
      set(value) {
        this.$store.commit(Constant.SET_MAX_AREA, value);
      },
    },
    minAmount: {
      get() {
        return this.$store.getters.minAmount;
      },
      set(value) {
        this.$store.commit(Constant.SET_MIN_AMOUNT, value);
      },
    },
    maxAmount: {
      get() {
        return this.$store.getters.maxAmount;
      },
      set(value) {
        this.$store.commit(Constant.SET_MAX_AMOUNT, value);
      },
    },
  },
  created() {
    this.$store
      .dispatch(Constant.GET_SIDO_OPTIONS)
      .then(() => {
        console.log("sidoOptions 데이터 load 완료");
      })
      .catch((error) => alert(`처리 중 문제가 발생하였습니다.${error}`));
  },
  methods: {
    changeSido() {
      console.log("changeSido event " + this.sido);
      this.$store.dispatch(Constant.GET_GUGUN_OPTIONS, this.sido).then(() => {
        console.log("gugunOptions 데이터 load 완료");
      });
    },
    changeGugun() {
      this.$store.dispatch(Constant.GET_DONG_OPTIONS, this.gugun).then(() => {
        console.log("gugunOptions 데이터 load 완료");
      });
    },
    getApt() {
      console.log("dong: " + this.dong);
      this.$store
        .dispatch(Constant.GET_APT, {
          dong: this.dong,
          minArea: this.minArea,
          maxArea: this.maxArea,
        })
        .then(() => {
          console.log("AptOptions 데이터 load 완료");
        });
    },
  },
};
</script>
<style scoped></style>
