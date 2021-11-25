<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>로그인</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.userid"
                required
                placeholder="아이디 입력...."
                @keyup.enter="confirm"
                :class="{
                  'is-valid': isUserNameFocusAndValid,
                  'is-invalid': isUserNameFocusAndInvalid,
                }"
                @input="validateUserName"
                @focus="isUserNameFocus = true"
              ></b-form-input>
              <div class="valid-feedback">Valid.</div>
              <div class="invalid-feedback">
                아이디는 최소 4글자 이상입니다.
              </div>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.userpwd"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              variant="primary"
              class="m-1"
              @click="confirm"
              >로그인</b-button
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
              @click="moveFind"
              >아이디 찾기</b-button
            >

            <li v-if="userName == undefined">
              <b-button
                type="button"
                variant="success"
                class="m-5"
                @click="KakaoLogin"
                >카카오 로그인</b-button
              >
            </li>
            <!-- <li v-else>
              <b-button
                type="button"
                variant="success"
                class="m-1"
                @click="KakaoLogout"
                >카카오 로그아웃</b-button
              >
            </li> -->
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
  name: "MemberLogin",
  data() {
    return {
      user: {
        // userid: "",
        // userpwd: "",
        // name: "",
        // email: "",
        // address: "",
        userEmail: "daun@daun.net",
        userPassword: "1234",
        userName: "",
        userProfileImageUrl: "",
        userRank: "4", // 일반회원 default
      },
      // focus
      isUserNameFocus: false,

      // validation
      isUserNameValid: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
    isUserNameFocusAndValid() {
      return this.isUserNameFocus && this.isUserNameValid;
    },
    isUserNameFocusAndInvalid() {
      return this.isUserNameFocus && !this.isUserNameValid;
    },
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "Map" });
      }
    },
    movePage() {
      this.$router.push({ name: "MemberWrite" });
    },
    moveFind() {
      this.$router.push({ name: "MemberFind" });
    },
    ////////////////////////////////////////////////
    validateUserName() {
      this.isUserNameValid = this.user.userid.length > 3 ? true : false;
      console.log(this.isUserNameValid);
    },

    // KakaoLogout() {
    //   window.Kakao.Auth.logout((res) => {
    //     if (!res) return LoginFailure();
    //     social_logout();
    //   });
    // },

    KakaoLogin() {
      console.log(window.Kakao);
      window.Kakao.Auth.login({
        scope: "account_email, profile_nickname, gender",
        success: this.GetMe,
        fail: function (error) {
          console.log(error);
        },
      });
    },

    GetMe(authObj) {
      console.log(authObj);
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          console.log(kakao_account);
          http
            .post("/login", {
              userName: kakao_account.profile.nickname,
              userEmail: kakao_account.email,
              userProfileImageUrl: kakao_account.profile.profile_image_url,
              userPassword: "kakao",
              userRank: this.userRank,
            })
            .then(({ data }) => {
              console.log("LoginVue: data : ");
              console.log(data);

              // login 성공 전달
              this.$store.commit("SET_LOGIN", {
                isLogin: true,
                userSeq: data.userSeq,
                userName: data.userName,
                userEmail: data.userEmail,
                userMessage: data.userMessage,
                userPassword: data.userPassword,
                userPhone: data.userPhone,
                userRank: data.codeName,
                userProfileImageUrl: data.userProfileImageUrl,
              });

              this.$store.commit("SET_KAKAO");
              this.$alertify.success(
                this.$store.state.userInfo.userName + "님 환영합니다"
              );
              // home 로 이동
              this.$router.push({ name: "Map" });
            })
            .catch((error) => {
              console.log("KaKaoLoginVue: error : ");
              console.log(error);
              if (error.response.status == "404") {
                // => 카카오 회원가입

                http
                  .post("/login", {
                    userName: kakao_account.profile.nickname,
                    userEmail: kakao_account.email,
                    userProfileImageUrl:
                      kakao_account.profile.profile_image_url,
                    userPassword: "kakao",
                    userRank: this.userRank,
                  })
                  .then(({ data }) => {
                    console.log("JoinVue - data : ");
                    console.log(data);

                    // join 성공 전달
                    this.$store.commit("SET_LOGIN", {
                      isLogin: true,
                      userSeq: data.userSeq,
                      userName: data.userName,
                      userEmail: data.userEmail,
                      userMessage: data.userMessage,
                      userPassword: data.userPassword,
                      userPhone: data.userPhone,
                      userRank: data.codeName,
                      userProfileImageUrl: data.userProfileImageUrl,
                    });

                    this.$store.commit("SET_KAKAO");
                    this.$alertify.success(
                      this.$store.state.userInfo.userName + "님 환영합니다"
                    );
                    // home 로 이동
                    this.$router.push("/Map");
                  })
                  .catch((error) => {
                    console.log("LoginVue: error : ");
                    console.log(error);
                    if (error.response.status == "404") {
                      this.$alertify.error("카카오 로그인에 실패했습니다.");
                    } else {
                      this.$alertify.error(
                        "Opps!! 서버에 문제가 발생했습니다."
                      );
                    }
                  });
              } else {
                this.$alertify.error("Opps!! 서버에 문제가 발생했습니다.");
              }
            });
        },

        fail: (error) => {
          this.$router.push("/");
          console.log(error);
        },
      });
    },
  },
};
</script>

<style></style>
