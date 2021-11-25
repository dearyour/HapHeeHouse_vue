<template>
  <b-container class="bv-example-row mt-1">
    <b-row>
      <b-col>
        <b-alert show><h3>QNA</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>

    <b-row>
      <b-col v-if="articles.length">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>제목</b-th>
              <b-th>조회수</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <!-- 하위 component인 ListRow에 데이터 전달(props) -->
            <qna-list-row
              v-for="(article, index) in articles"
              :key="index"
              v-bind="article"
            />
          </tbody>
        </b-table-simple>

        <!-- <div class="d-flex justify-content-center mb-2" style="height: 100px">
          <div class="row">
            <div class="col align-self-center">
              <input
                type="text"
                v-model="word"
                @keydown.enter="getSearch"
                placeholder="검색어를 입력하세요"
                class="form-control"
                id="searchText"
                style="width: 400px"
              />
            </div>
            <div class="col align-self-center">
              <button
                @click="getSearch"
                class="btn btn-secondary"
                type="button"
              >
                Search
              </button>
            </div>
          </div>
        </div> -->
        <div class="d-flex justify-content-center mb-2" style="height: 100px">
          <div class="row">
            <div class="col align-self-center">
              <input
                type="text"
                v-model="word"
                @keydown.enter="getSearch"
                placeholder="검색어를 입력하세요"
                class="form-control"
                id="searchText"
                style="width: 400px"
              />
            </div>
            <div class="col align-self-center">
              <button
                @click="getSearch"
                class="btn btn-secondary"
                type="button"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <pagination v-on:call-parent="movePage"></pagination>
      </b-col>
      <!-- <b-col v-else class="text-center">도서 목록이 없습니다.</b-col> -->
    </b-row>

    <div class="col align-self-center">
      <b-pagination
        v-modle="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      >
      </b-pagination>
    </div>
  </b-container>
</template>

<script>
// import http from "@/util/http-common";
import { mapGetters, mapState } from "vuex";
// import Pagination from "../Pagination2.vue";
import QnaListRow from "@/components/qna/child/QnaListRow";
// import { mapGetters } from "vuex";
// const commentStore = "commentStore";
import http from "@/util/http-common";
const memberStore = "memberStore";
import util from "@/api/util.js";
export default {
  name: "QnaList",
  components: {
    QnaListRow,
    // Pagination,
  },
  data() {
    return {
      key: "",
      word: "",
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
    // vuex의 getters에 등록된 함수 얻기.
    ...mapGetters(["articles"]),

    // gttters 이용
    listGetters() {
      return this.$store.getters.getBoardList; // no getBoardList()
    },
    formatDate: function () {
      let $this = this;
      // store 사용
      return this.$store.state.board.list.map(function (board) {
        return $this.makeDateStr(
          board.regDt.date.year,
          board.regDt.date.month,
          board.regDt.date.day,
          "."
        );
      });
    },
  },
  created() {
    // http.get(`/qna`).then(({ data }) => {
    //   this.articles = data;
    // });
    this.$store.dispatch("getArticles");
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "QnaWrite" });
    },
    boardList() {
      this.$store.dispatch("boardList");
      console.log(this.$store.boardList);
    },
    movePage(pageIndex) {
      console.log("BoardMainVue : movePage : pageIndex : " + pageIndex);

      this.$store.commit("SET_BOARD_MOVE_PAGE", pageIndex);

      this.boardList();
    },

    getSearch() {
      http
        .get(`/qna`, {
          word: this.searchWord,
          key: this.subject,
        })
        .then(({ data }) => {
          console.log(data);
          this.articles = data;

          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.$router.push({ name: "QnaList" });
        });
    },
  },
  // util
  makeDateStr: util.makeDateStr,
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
