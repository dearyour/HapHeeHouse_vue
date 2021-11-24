<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>아이디 찾기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >이름 과 이메일을 입력해주세요.</b-alert
            >
            <b-form-group label="이름:" label-for="name">
              <b-form-input
                id="name"
                v-model="user.name"
                required
                placeholder="이름 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이메일:" label-for="email">
              <b-form-input
                type="password"
                id="email"
                v-model="user.email"
                required
                placeholder="이메일 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              variant="primary"
              class="m-1"
              @click="confirm"
              >로그인 화면으로</b-button
            >
            <b-button
              type="button"
              variant="success"
              class="m-1"
              @click="movePage"
              >회원가입</b-button
            >
            <b-button
              type="button"
              variant="success"
              class="m-1"
              @click="registArticle"
              >아이디 찾기</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import http from "@/util/http-common";
const memberStore = "memberStore";

export default {
  name: "MemberFind",
  data() {
    return {
      user: {
        name: null,
        email: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    registArticle() {
      http
        .get(`/user/find-userId`, {
          name: this.user.name,
          email: this.user.email,
        })
        .then(({ data }) => {
          if (data === 1) {
            alert("아이디 찾기에 성공하였습니다.");
            console.log(data);
            this.moveLogin();
          } else {
            alert("아이디를 찾을 수 없습니다.");
          }
        });
    },

    confirm() {
      this.$router.push({ name: "SignIn" });
    },
    movePage() {
      this.$router.push({ name: "MemberWrite" });
    },
    moveFind() {
      this.$router.push({ name: "MemberFind" });
    },
  },
};
</script>

<style></style>
