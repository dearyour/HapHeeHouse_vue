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
      <b-col>
        <b-table
          striped
          hover
          :items="articles"
          :fields="fields"
          @row-clicked="viewArticle"
        >
          <template #cell(qna_name)="data">
            <router-link
              :to="{
                name: 'BoardView',
                params: { qna_id: data.item.qna_id },
              }"
              >{{ data.item.qna_name }}</router-link
            >
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common";
// import BoardListRow from "@/components/board/BoardListRow";

export default {
  name: "QnaList",
  components: {
    // QnaListRow,
  },
  data() {
    return {
      articles: [],
      fields: [
        { key: "qna_id", label: "글번호", tdClass: "tdClass" },
        { key: "qna_name", label: "제목", tdClass: "tdqna_name" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "total", label: "조회수", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    http.get(`/qna`).then(({ data }) => {
      this.articles = data;
    });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "QnaWrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "QnaView",
        params: { qna_id: article.qna_id },
      });
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdqna_name {
  width: 300px;
  text-align: left;
}
</style>
