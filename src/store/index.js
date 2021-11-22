import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import memberStore from "@/store/modules/memberStore.js";
import Constant from "@/util/Constant.js";
import http from "@/util/http-common.js";

const store = new Vuex.Store({
  state: {
    sido: "",
    sidoOptions: [],
    gugun: "",
    gugunOptions: [],
    dong: "",
    dongOptions: [],
    minArea: 0,
    maxArea: 70,
    minAmount: 0,
    maxAmount: 10000000,
    aptResult: [],
    places: [],
  },
  getters: {
    sido: (state) => {
      return state.sido;
    },
    sidoOptions: (state) => {
      return state.sidoOptions;
    },
    gugun: (state) => {
      return state.gugun;
    },
    gugunOptions: (state) => {
      return state.gugunOptions;
    },
    dong: (state) => {
      return state.dong;
    },
    dongOptions: (state) => {
      return state.dongOptions;
    },
    minArea: (state) => {
      return state.minArea;
    },
    maxArea: (state) => {
      return state.maxArea;
    },
    minAmount: (state) => {
      return state.minAmount;
    },
    maxAmount: (state) => {
      return state.maxAmount;
    },
    aptResult: (state) => {
      return state.aptResult;
    },
  },
  mutations: {
    [Constant.SET_SIDO_OPTIONS](state, payload) {
      const list = [{ text: "도시를 선택하세요.", value: "0" }];
      payload.forEach(function (ele) {
        list.push({ text: ele.sidoName, value: ele.sidoCode });
      });
      state.sidoOptions = list;
      state.sido = "0";
    },
    [Constant.SET_SIDO](state, payload) {
      state.sido = payload;
    },
    [Constant.SET_GUGUN_OPTIONS](state, payload) {
      const list = [{ text: "구, 군을 선택하세요.", value: "0" }];
      payload.forEach(function (ele) {
        list.push({ text: ele.gugunName, value: ele.gugunCode });
      });
      console.log(list);
      state.gugunOptions = list;
      state.gugun = "0";
    },
    [Constant.SET_GUGUN](state, payload) {
      state.gugun = payload;
    },
    [Constant.SET_DONG_OPTIONS](state, payload) {
      const list = [{ text: "읍, 면, 동을 선택하세요.", value: "0" }];
      payload.forEach(function (ele) {
        list.push({ text: ele.dongName, value: ele.dongCode });
      });
      state.dongOptions = list;
      state.dong = "0";
    },
    [Constant.SET_DONG](state, payload) {
      state.dong = payload;
    },
    [Constant.SET_MIN_AREA](state, payload) {
      state.minArea = payload;
    },
    [Constant.SET_MAX_AREA](state, payload) {
      state.maxArea = payload;
    },
    [Constant.SET_MIN_AMOUNT](state, payload) {
      state.minAmount = payload;
    },
    [Constant.SET_MAX_AMOUNT](state, payload) {
      state.maxAmount = payload;
    },
    [Constant.SET_APT](state, payload) {
      state.aptResult = payload;
    },
  },
  actions: {
    [Constant.GET_SIDO_OPTIONS](context) {
      return http.get(`/map/sido`).then(({ data }) => {
        context.commit(Constant.SET_SIDO_OPTIONS, data);
      });
    },
    [Constant.GET_GUGUN_OPTIONS](context, payload) {
      return http.get(`/map/gugun?sido=${payload}`).then(({ data }) => {
        context.commit(Constant.SET_GUGUN_OPTIONS, data);
      });
    },
    [Constant.GET_DONG_OPTIONS](context, payload) {
      return http.get(`/map/dong?gugun=${payload}`).then(({ data }) => {
        console.log(data);
        context.commit(Constant.SET_DONG_OPTIONS, data);
      });
    },
    [Constant.GET_APT](context, payload) {
      return http
        .get(
          `/map/apt?dong=${payload.dong}&minArea=${payload.minArea}&maxArea=${payload.maxArea}&minAmount=${payload.minAmount}&maxAmount=${payload.maxAmount}`
        )
        .then(({ data }) => {
          context.commit(Constant.SET_APT, data);
        });
    },
  },
  modules: {
    memberStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});

export default store;
