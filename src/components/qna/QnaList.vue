<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
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
      </b-col>
      <!-- <b-col v-else class="text-center">도서 목록이 없습니다.</b-col> -->
    </b-row>
    <!-- <b-pagination v-modle="currentPage" :total-rows="rows" :per-page="perPage">
    </b-pagination> -->
  </b-container>
</template>

<script>
// import http from "@/util/http-common";
import { mapGetters, mapState } from "vuex";
import QnaListRow from "@/components/qna/child/QnaListRow";
// import { mapGetters } from "vuex";
// const commentStore = "commentStore";
const memberStore = "memberStore";
export default {
  name: "QnaList",
  components: {
    QnaListRow,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
    // vuex의 getters에 등록된 함수 얻기.
    ...mapGetters(["articles"]),
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
  },
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
