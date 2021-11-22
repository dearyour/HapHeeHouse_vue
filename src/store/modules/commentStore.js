import http from "@/util/http-common";

const commentStore = {
  namespaced: true,
  state: { articles: [], article: null, comments: [] },
  getters: {
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
  },
  mutations: {
    setArticles(state, payload) {
      // state의 books에 서버에서 얻어온 도서목록 세팅.
      state.books = payload;
    },
    setArticle(state, payload) {
      // state의 book에 서버에서 얻어온 도서정보 세팅.
      state.book = payload;
    },
    setComments(state, payload) {
      // state의 comments에 서버에서 얻어온 도서평 목록 세팅.
      state.comments = payload;
    },
  },
  actions: {
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
};

export default commentStore;
