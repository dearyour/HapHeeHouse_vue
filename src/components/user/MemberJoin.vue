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
          :class="{
            'is-valid': isUserNameFocusAndValid,
            'is-invalid': isUserNameFocusAndInvalid,
          }"
          @input="validateUserName"
          @focus="isUserNameFocus = true"
        ></b-form-input>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">아이디는 최소 4글자 이상입니다.</div>
      </b-form-group>
      <b-form-group label="비밀번호:" label-for="userpwd">
        <b-form-input
          type="password"
          id="userpwd"
          v-model="user.userpwd"
          required
          placeholder="비밀번호 입력...."
          :class="{
            'is-valid': isUserPasswordFocusAndValid,
            'is-invalid': isUserPasswordFocusAndInvalid,
          }"
          @input="validatePassword"
          @focus="isUserPasswordFocus = true"
        ></b-form-input>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">
          1개 이상의 특수문자, 대소문자 및 숫자를 포함하고 8자리 이상이여야
          합니다.
        </div>
      </b-form-group>
      <b-form-group label="비밀번호 확인:" label-for="userpwdCheck">
        <b-form-input
          type="password"
          id="userpwdCheck"
          v-model="user.userpwdCheck"
          required
          placeholder="비밀번호 입력...."
          :class="{
            'is-valid': isUserPassword2FocusAndValid,
            'is-invalid': isUserPassword2FocusAndInvalid,
          }"
          @input="validatePassword2"
          @focus="isUserPassword2Focus = true"
        >
        </b-form-input>
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
          :class="{
            'is-valid': isUserEmailFocusAndValid,
            'is-invalid': isUserEmailFocusAndInValid,
          }"
          @input="validateEmail"
          @focus="isUserEmailFocus = true"
        ></b-form-input>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">올바른 email 를 입력해 주세요.</div>
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

  computed: {
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

  methods: {
    validateUserName() {
      this.isUserNameValid = this.user.userid.length > 3 ? true : false;
      console.log(this.isUserNameValid);
    },
    validateEmail() {
      // ^ 시작일치, $ 끝 일치
      // {2, 3} 2개 ~ 3개
      // * 0회 이상, + 1회 이상
      // [-_.] - 또는 _ 또는 .
      // ? 없거나 1회
      let regexp =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      this.isUserEmailValid = regexp.test(this.user.email) ? true : false;
      console.log(this.isUserEmailValid);
    },
    validatePassword() {
      let patternEngAtListOne = new RegExp(/[a-zA-Z]+/); // + for at least one
      let patternSpeAtListOne = new RegExp(/[~!@#$%^&*()_+|<>?:{}]+/); // + for at least one
      let patternNumAtListOne = new RegExp(/[0-9]+/); // + for at least one

      this.isUserPasswordValid =
        patternEngAtListOne.test(this.user.userpwd) &&
        patternSpeAtListOne.test(this.user.userpwd) &&
        patternNumAtListOne.test(this.user.userpwd) &&
        this.user.userpwd.length >= 8
          ? true
          : false;
    },
    validatePassword2() {
      this.isUserPassword2Valid =
        this.user.userpwd == this.user.userpwdCheck ? true : false;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    onSubmit() {
      http
        .post(`/user/join`, {
          userid: this.user.userid,
          userpwd: this.user.userpwd,
          name: this.user.name,
          email: this.user.email,
          address: this.user.address,
        })
        .then(({ data }) => {
          if (data === 1) {
            alert("회원가입에 성공하였습니다.");
            this.moveLogin();
          } else {
            alert("회원가입에 실패하였습니다.");
          }
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
