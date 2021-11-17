<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.user_id}.
          ${article.replyUserId} </h3><div><h6>${article.replyContent}</div><div>${article.replyDatetime}</h6></div>`"
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
      if (this.article.replyContent)
        return this.article.replyContent.split("\n").join("<br>");
      return "";
    },
    // changeDateFormat() {
    //   return moment(new Date(this.article.regtime)).format(
    //     "YYYY.MM.DD hh:mm:ss"
    //   );
    // },
  },
  created() {
    http.get(`/qna/${this.$route.params.replyUserId}`).then(({ data }) => {
      this.article = data;
    });
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "QnaList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "QnaUpdate",
        params: { replyUserId: this.article.replyUserId },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.qnaNo}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "QnaDelete",
          params: { replyUserId: this.article.replyUserId },
        });
      }
    },
  },
};
</script>

<style>

</style>