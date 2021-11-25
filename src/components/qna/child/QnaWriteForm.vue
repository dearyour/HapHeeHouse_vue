<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="userid-group"
          label="작성자:"
          label-for="userid"
          description="아이디"
        >
          <b-form-input
            id="userid"
            :disabled="isUserid"
            v-model="article.userid"
            type="text"
            required
            placeholder="작성자 입력..."
            :class="{
              'is-valid': isUserNameFocusAndValid,
              'is-invalid': isUserNameFocusAndInvalid,
            }"
            @input="validateUserName"
            @focus="isUserNameFocus = true"
          ></b-form-input>
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">로그인이 필요합니다</div>
        </b-form-group>

        <b-form-group
          id="subject-group"
          label="제목:"
          label-for="subject"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="subject"
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력..."
            :class="{
              'is-valid': isUserEmailFocusAndValid,
              'is-invalid': isUserEmailFocusAndInValid,
            }"
            @input="validateEmail"
            @focus="isUserEmailFocus = true"
          ></b-form-input>
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">4글자 이상 입력해 주세요.</div>
        </b-form-group>
        <div class="mb-3">
          <div id="divEditorInsert"></div>
        </div>
        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
            :class="{
              'is-valid': isUserPasswordFocusAndValid,
              'is-invalid': isUserPasswordFocusAndInvalid,
            }"
            @input="validatePassword"
            @focus="isUserPasswordFocus = true"
          ></b-form-textarea>
          <div class="valid-feedback">Valid.</div>
          <div class="invalid-feedback">8글자 이상 입력해 주세요</div>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          class="m-1"
          v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else
          >글수정</b-button
        >
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import http from "@/util/http-common";
import { mapState } from "vuex";
import Vue from "vue";
const memberStore = "memberStore";

import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VueAlertify from "vue-alertify";

Vue.use(CKEditor).use(VueAlertify);

export default {
  name: "QnariteForm",
  data() {
    return {
      article: {
        articleno: 0,
        userid: "",
        subject: "",
        content: "",
      },
      isUserid: false,

      // focus
      isUserNameFocus: false,
      isUserEmailFocus: false,
      isUserPasswordFocus: false,
      isUserPassword2Focus: false,

      // validation
      isUserNameValid: false,
      isUserEmailValid: false,
      isUserPasswordValid: false,
      isUserPassword2Valid: false,
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    isUserNameFocusAndValid() {
      return this.isUserNameFocus && this.isUserNameValid;
    },
    isUserNameFocusAndInvalid() {
      return this.isUserNameFocus && !this.isUserNameValid;
    },
    isUserEmailFocusAndValid() {
      return this.isUserEmailFocus && this.isUserEmailValid;
    },
    isUserEmailFocusAndInValid() {
      return this.isUserEmailFocus && !this.isUserEmailValid;
    },
    isUserPasswordFocusAndValid() {
      return this.isUserPasswordFocus && this.isUserPasswordValid;
    },
    isUserPasswordFocusAndInvalid() {
      return this.isUserPasswordFocus && !this.isUserPasswordValid;
    },
    isUserPassword2FocusAndValid() {
      return this.isUserPassword2Focus && this.isUserPassword2Valid;
    },
    isUserPassword2FocusAndInvalid() {
      return this.isUserPassword2Focus && !this.isUserPassword2Valid;
    },
  },
  created() {
    this.article.userid = this.userInfo.userid;
    // if (this.type === "modify") {
    http.get(`/qna/${this.$route.params.articleno}`).then(({ data }) => {
      // this.article.articleno = data.article.articleno;
      // this.article.userid = data.article.userid;
      // this.article.subject = data.article.subject;
      // this.article.content = data.article.content;
      this.article = data;
    });
    this.isUserid = true;
    // }
  },
  mounted() {
    ClassicEditor.create(document.querySelector("#divEditorInsert"))
      .then((editor) => {
        this.CKEditor = editor;
      })
      .catch((err) => {
        console.error(err.stack);
      });
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.article.userid &&
        ((msg = "작성자 입력해주세요"),
        (err = false),
        this.$refs.userid.focus());
      err &&
        !this.article.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else
        this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
      this.$router.push({ name: "QnaList" });
    },
    registArticle() {
      var formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.CKEditor.getData());

      http
        .post("/qna", {
          formData,
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        });
    },
    modifyArticle() {
      http
        .put(`/qna`, {
          articleno: this.article.articleno,
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
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
    validateUserName() {
      this.isUserNameValid = this.article.userid.length > 3 ? true : false;
      console.log(this.isUserNameValid);
    },
    validateEmail() {
      this.isUserEmailValid = this.article.subject.length > 3 ? true : false;
      console.log(this.isUserEmailValid);
    },
    validatePassword() {
      this.isUserPasswordValid = this.article.content.length > 8 ? true : false;
      console.log(this.isUserPasswordValid);
    },
  },
};
</script>

<style scoped>
/* CKEditor 는 vue 와 별개로 rendering 되어서 scope 를 넣으면 반영되지 않는다. */
.ck-editor__editable {
  min-height: 300px !important;
}
</style>
