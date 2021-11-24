<template>
  <b-row v-if="this.modifyComment != null" class="mb-3 mt-2">
    <b-col cols="10">
      <b-form-textarea
        id="comment"
        placeholder="도서평 입력..."
        v-model="modifyComment.comment"
        rows="2"
      ></b-form-textarea>
    </b-col>
    <b-col>
      <b-button variant="outline-info" class="mr-2 h-100" @click="updateComment"
        >수정</b-button
      >
      <b-button
        variant="outline-danger"
        class="h-100"
        @click="updateCommentCancel"
        >취소</b-button
      >
    </b-col>
  </b-row>
  <b-row v-else class="mb-3 mt-2">
    <b-col cols="11">
      <b-form-textarea
        id="comment"
        placeholder="도서평 입력..."
        v-model="comment"
        rows="2"
      ></b-form-textarea>
    </b-col>
    <b-col
      ><b-button variant="dark" class="h-100" @click="registComment"
        >등록</b-button
      ></b-col
    >
  </b-row>
</template>

<script>
import http from "@/util/http-common";
import { mapState } from "vuex";
import { mapActions } from "vuex";
const memberStore = "memberStore";
const commentStore = "commentStore";
export default {
  name: "commnetwrite",
  data() {
    return {
      // 차후 작성자 이름은 로그인 구현후 로그인한 사용자로 바꾼다.
      userid: "",
      comment: "",
    };
  },
  props: {
    articleno: { type: Number },
    modifyComment: { type: Object },
  },
  mounted() {
    this.getComments(`/comment/${this.$route.params.articleno}`);
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(commentStore, ["getComments"]),

    registComment() {
      http
        .post("/comment/", {
          userid: this.userInfo.userid,
          comment: this.comment,
          articleno: this.articleno,
        })
        .then(({ data }) => {
          // window.console(data);
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === 1) {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);

          // 작성글 지우기
          this.comment = "";

          // 도서평(댓글) 얻기.
          // this["commentStore/getComments"](
          //   `/comment/${this.comments.articleno}`
          // );
          // this[("getComments", `/comment/${this.$route.params.articleno}`)]();

          this.$store.dispatch(
            "commentStore/getComments",
            `/comment/${this.$route.params.articleno}`
          );
        });
    },
    updateComment() {
      console.log(this.modifyComment);
      console.log(this.modifyComment.isbn);
      http
        .put(`/comment/${this.modifyComment.isbn}`, {
          comment: this.modifyComment.comment,
          isbn: this.modifyComment.isbn,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === 1) {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);

          // 도서평(댓글) 얻기.
          this.$store.dispatch(
            "commentStore/getComments",
            `/comment/${this.$route.params.articleno}`
          );
          this.$emit("modify-comment-cancel", false);
        });
    },
    updateCommentCancel() {
      this.$emit("modify-comment-cancel", false);
    },
  },
};
</script>
