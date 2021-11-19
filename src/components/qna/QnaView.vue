<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="listArticle">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.qnaNo}.
          ${article.qnaName} [${article.total}]</h3><div><h6>${article.userid}</div><div>${article.writeDate}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <!--댓글 입력 -->
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="userid-group"
            label="작성자:"
            label-for="userid"
            description="작성자를 입력하세요."
          >
            <b-form-input
              id="user_id"
              :disabled="isuserid"
              v-model="article.userid"
              type="text"
              required
              placeholder="작성자 입력..."
            ></b-form-input>
          </b-form-group>

          <b-form-group id="content-group" label="내용:" label-for="content">
            <b-form-textarea
              id="replyContent"
              v-model="article.replyContent"
              placeholder="내용 입력..."
              type="text"
            ></b-form-textarea>
          </b-form-group>

          <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'"
            >댓글작성</b-button
          >
          <b-button type="submit" variant="primary" class="m-1" v-else>댓글수정</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import http from "@/util/http-common";

export default {
  data() {
    return {
      article: {},
    };
  },
  computed: {
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
    // changeDateFormat() {
    //   return moment(new Date(this.article.regtime)).format(
    //     "YYYY.MM.DD hh:mm:ss"
    //   );
    // },
  },
  created() {
    http.get(`/qna/${this.$route.params.qnaNo}`).then(({ data }) => {
      this.article = data;
    });
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "QnaList" });
    },
    moveModifyArticle() {
      this.$router.push({
        name: "QnaUpdate",
        params: { qnaNo: this.article.qnaNo },
      });
      // this.$router.push({ path: `/qna/modify/${this.article.qnaNo}` });
    },
    deleteArticle() {
      if (confirm("삭제하시겠습니까?")) {
        this.$router.replace({
          name: "QnaDelete",
          params: { qnaNo: this.article.qnaNo },
        });
      }
    },
    onSubmit() {
      console.log("submit");
    },
    onReset() {
      console.log("reset");
    },
  },
};
</script>

<style></style>
