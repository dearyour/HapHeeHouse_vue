<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="user_id-group"
          label="작성자:"
          label-for="user_id"
          description="작성자를 입력하세요."
        >
          <b-form-input
            id="user_id"
            :disabled="isuser_id"
            v-model="article.user_id"
            type="text"
            required
            placeholder="작성자 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="qnaName-group"
          label="제목:"
          label-for="qnaName"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="qnaName"
            v-model="article.qnaName"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
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
        user_id: "",
        qnaName: "",
        content: "",
      },
      isuser_id: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      http.get(`/qna/${this.$route.params.qnaNo}`).then(({ data }) => {
        // this.article.qnaNo = data.article.qnaNo;
        // this.article.user_id = data.article.user_id;
        // this.article.qnaName = data.article.qnaName;
        // this.article.content = data.article.content;
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
      !this.article.user_id &&
        ((msg = "작성자 입력해주세요"), (err = false), this.$refs.user_id.focus());
      err &&
        !this.article.qnaName &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.qnaName.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.qnaNo = 0;
      this.article.qnaName = "";
      this.article.content = "";
      this.$router.push({ name: "QnaList" });
    },
    registArticle() {
      http
        .post(`/qna/`, {
          user_id: this.article.user_id,
          qnaName: this.article.qnaName,
          content: this.article.content,
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
        .put(`/qna`, {
          qnaNo: this.article.qnaNo,
          user_id: this.article.user_id,
          qnaName: this.article.qnaName,
          content: this.article.content,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === 1) {
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

<style></style>
