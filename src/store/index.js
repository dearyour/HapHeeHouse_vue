import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import memberStore from "@/store/modules/memberStore.js";
import commentStore from "@/store/modules/commentStore.js";
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
    aptDeal: [],
    places: [],
    articles: [],
    article: null,
    comments: [],
    isOk: false,
    isDetailResultOpen: false,
    houseType: "apartment",
    dealType: "deal",
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
    articles(state) {
      // 도서목록
      return state.articles;
    },
    article(state) {
      // 도서정보
      return state.article;
    },
    comments(state) {
      // 도서평 목록
      return state.comments;
    },
    aptDeal: (state) => {
      return state.aptDeal;
    },
    isOk: (state) => {
      return state.isOk;
    },
    isDetailResultOpen: (state) => {
      return state.isDetailResultOpen;
    },
    houseType: (state) => {
      return state.houseType;
    },
    dealType: (state) => {
      return state.dealType;
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
    [Constant.SET_HOUSE](state, payload) {
      state.aptResult = payload;
      state.isOk = true;
      state.isDetailResultOpen = false;
    },
    [Constant.SET_APT_DEAL](state, payload) {
      state.aptDeal = payload;
      state.isDetailResultOpen = true;
    },
    [Constant.SET_HOUSE_TYPE](state, payload) {
      console.log(payload);
      state.houseType = payload;
    },
    [Constant.SET_DEAL_TYPE](state, payload) {
      state.dealType = payload;
    },

    setArticles(state, payload) {
      // state의 books에 서버에서 얻어온 도서목록 세팅.
      state.articles = payload;
    },
    setArticle(state, payload) {
      // state의 book에 서버에서 얻어온 도서정보 세팅.
      state.article = payload;
    },
    setComments(state, payload) {
      // state의 comments에 서버에서 얻어온 도서평 목록 세팅.
      state.comments = payload;
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
        context.commit(Constant.SET_DONG_OPTIONS, data);
      });
    },
    [Constant.GET_HOUSE](context, payload) {
      return http
        .get(
          `/map/${context.state.dealType}/${context.state.houseType}?dong=${payload.dong}&minArea=${payload.minArea}&maxArea=${payload.maxArea}&minAmount=${payload.minAmount}&maxAmount=${payload.maxAmount}`
        )
        .then(({ data }) => {
          context.commit(Constant.SET_HOUSE, data);
        });
    },
    [Constant.GET_APT_DEAL](context, payload) {
      console.log(payload);
      return http
        .get(`/deal/${context.state.houseType}?aptCode=${payload.aptCode}`)
        .then(({ data }) => {
          context.commit(Constant.SET_APT_DEAL, data);
        });
    },

    // 서버에서 도서목록을 얻고 mutation의 setBooks를 호출한다.
    getArticles(context) {
      http
        .get("/qna")
        .then(({ data }) => {
          context.commit("setArticles", data);
        })
        .catch(() => {
          alert("에러발생!");
        });
    },
    // 서버에서 isbn에 해당하는 도서정보 얻고 mutation의 setBook을 호출한다.
    getArticle(context, payload) {
      http.get(payload).then(({ data }) => {
        context.commit("setArticle", data);
      });
    },
    // 서버에서 isbn에 해당하는 도서평을 얻고 mutation의 setComments를 호출한다.
    getComments(context, payload) {
      http.get(payload).then(({ data }) => {
        context.commit("setComments", data);
      });
    },
  },
  modules: {
    memberStore,
    commentStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});

export default store;
