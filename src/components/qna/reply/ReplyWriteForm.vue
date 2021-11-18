<template>
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
              id="userid"
              :disabled="isuserid"
              v-model="article.userid"
              type="text"
              required
              placeholder="작성자 입력..."
            ></b-form-input>
          </b-form-group>

          <b-form-group id="replyContent-group" label="내용:" label-for="replyContent">
            <b-form-textarea
              id="replyContent"
              v-model="article.replyContent"
              placeholder="내용 입력..."
              type="text"
            ></b-form-textarea>
          </b-form-group>

          <b-button
            type="submit"
            variant="primary"
            class="m-1"
            v-if="this.type === 'register'"
            >댓글작성</b-button
          >
          <b-button type="submit" variant="primary" class="m-1" v-else
            >댓글수정</b-button
          >
        </b-form>
      </b-col>
    </b-row>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "QnaWriteForm",
  data() {
    return {
      article: {
        qnaNo: 0,
        userid: "",
        replyreplyContent: "",
      },
      isuserid: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      http.get(`/qna/reply/${this.$route.params.qnaNo}`).then(({ data }) => {
        // this.article.qnaNo = data.article.qnaNo;
        // this.article.userid = data.article.userid;
        // this.article.qnaName = data.article.qnaName;
        // this.article.replyContent = data.article.replyContent;
        this.article = data;
      });
      this.isuser_id = true;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.article.userid &&
        ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
      err &&
        !this.article.replyContent &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.replyContent.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    
    registArticle() {
      http
        .post(`/qna/`, {
          userid: this.article.userid,
          replyContent: this.article.replyContent,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === 1) {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        });
    },
    modifyArticle() {
      http
        .put(`/qna/reply`, {
          qnaNo: this.article.qnaNo,
          userid: this.article.userid,
          replyContent: this.article.replyContent,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "QnaList" });
        });
    },
    moveList() {
      this.$router.push({ name: "QnaList" });
    },
  },
};
</script>

<style>

</style>