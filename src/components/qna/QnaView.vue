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
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>No_${article.articleno}_ _ _ _ _ _ _
             ${article.subject}_ _ _ _ _ _ _조회수 : ${article.hit}</h3>
             <div><h5>${article.userid}</div>
             <div>${article.regtime}</h5></div>`"
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

    <!-- 도서정보 상세보기 Component -->
    <comment-write :articleno="this.articleno" />
    <comment-write
      v-if="isModifyShow && this.modifyComment != null"
      :modifyComment="this.modifyComment"
      @modify-comment-cancel="onModifyCommentCancel"
    />
    <comment
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
      @modify-comment="onModifyComment"
    />
  </b-container>
</template>

<script>
import http from "@/util/http-common";
import CommentWrite from "@/components/qna/comment/CommentWrite.vue";
import Comment from "@/components/qna/comment/Comment.vue";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
const memberStore = "memberStore";
const commentStore = "commentStore";

export default {
  name: "QnaView",
  data() {
    return {
      article: {},
      articleno: "",
      userid: "",
      isModifyShow: false,
      modifyComment: Object,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(commentStore, ["article", "comments"]),
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
    // changeDateFormat() {
    //   return moment(new Date(this.article.regtime)).format(
    //     "YYYY.MM.DD hh:mm:ss"
    //   );
    // },
  },
  components: {
    CommentWrite,
    Comment,
  },
  created() {
    this.userid = this.article.userid;
    this.articleno = this.$route.params.articleno;
    http.get(`/qna/${this.$route.params.articleno}`).then(({ data }) => {
      this.article = data;
    });
    // 도서 정보 얻기.
    this.$store.dispatch("getArticle", `/qna/${this.articleno}`);

    // 도서평(댓글) 얻기.
    this.$store.dispatch("getComments", `/comment/${this.articleno}`);
  },

  methods: {
    listArticle() {
      this.$router.push({ name: "QnaList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "QnaUpdate",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "QnaDelete",
          params: { articleno: this.article.articleno },
        });
      }
    },
    onModifyComment(comment) {
      this.modifyComment = comment;
      this.isModifyShow = true;
    },
    onModifyCommentCancel(isShow) {
      this.isModifyShow = isShow;
    },
  },
};
</script>

<style></style>
