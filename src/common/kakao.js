const Kakao = {
  init() {
    window.Kakao.init("0ff97e105e24889bc347cdc83044eacc");
  },

  GetMe(authObj) {
    console.log(authObj);
    widow.Kako.API.request({
      url: "/oauth",
      sucess: async (res) => {
        console.log(res);
        const kakao_acount = res.kakao_acount;
        const req_body = {
          name: kakao_acount.profile.nickname,
          email: kakao_acount.email,
          kakaoAccessToken: authObj.access_token,
          profileIMG: kakao_account.profile_image_url,
          source: "k",
        };
        social_login(req_body);
      },
      fail: (error) => {
        LoginFailure();
        console.log(error);
      },
    });
  },

  Login() {
    console.log(window.Kakao);
    window.Kakao.Auth.login({
      scope: "account_email, gender, profile_nickname",
      sucess: this.GetMe,
      fail: LoginFailure,
    });
  },

  Logout() {
    window.Kakao.Auth.logout((res) => {
      if (!res) return LoginFailure();
      social_logout();
    });
  },
};

export default Kakao;
