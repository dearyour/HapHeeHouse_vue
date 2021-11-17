<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-2" label="Your Name:" label-for="name">
        <b-form-input
          id="name"
          v-model="user.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="아이디:" label-for="userid">
        <b-form-input
          id="userid"
          v-model="user.userid"
          required
          placeholder="아이디 입력...."
        ></b-form-input>
      </b-form-group>
      <b-form-group label="비밀번호:" label-for="userpwd">
        <b-form-input
          type="password"
          id="userpwd"
          v-model="user.userpwd"
          required
          placeholder="비밀번호 입력...."
        ></b-form-input>
      </b-form-group>
      <b-form-group label="비밀번호 확인:" label-for="userpwdCheck">
        <b-form-input
          type="password"
          id="userpwdCheck"
          v-model="user.userpwdCheck"
          required
          placeholder="비밀번호 입력...."
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="email"
        label="Email:"
        label-for="email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="email"
          v-model="user.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="address"
        label="Address:"
        label-for="address"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="user.address"
          type="text"
          placeholder="Enter address"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">회원가입</b-button>
      <b-button type="reset" variant="danger">취소</b-button>
    </b-form>
  </b-container>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "MemberJoin",
  data() {
    return {
      user: {
        userid: "",
        userpwd: "",
        userpwdCheck: "",
        name: "",
        email: "",
        address: "",
      },
    };
  },
  methods: {
    onSubmit() {
      http
        .post(`/user/join`, {
          user_id: this.user.userid,
          password: this.user.userpwd,
          name: this.user.name,
          email: this.user.email,
          address: this.user.address,
        })
        .then(({ data }) => {
          if (data === 1) {
            alert("회원가입에 성공하였습니다.");
          } else {
            alert("회원가입에 실패하였습니다.");
          }
          this.moveLogin();
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.user.userid = "";
      this.user.userpwd = "";
      this.user.name = "";
      this.user.email = "";
      this.user.address = "";
    },
    moveLogin() {
      this.$router.push({ name: "SignIn" });
    },
  },
};
</script>

<style></style>
