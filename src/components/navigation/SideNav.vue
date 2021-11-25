<template>
  <div>
    <b-sidebar
      bg-variant="dark"
      id="sidebar-backdrop"
      aria-labelledby="sidebar-backdrop-title"
      text-variant="light"
      backdrop
      shadow
    >
      <template #default="{ hide }">
        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide"
                ><router-link :to="{ name: 'Map' }" class="link"
                  ><b-icon icon="house" font-scale="1"></b-icon>
                  HOME</router-link
                ></b-nav-item
              >
              <b-nav-item href="#link-1" @click="confirm"
                ><router-link :to="{ name: 'Qna' }" class="link"
                  ><b-icon icon="journal" font-scale="1"></b-icon>
                  Q&A</router-link
                ></b-nav-item
              >
              <b-nav-item href="#link-1" @click="confirm"
                ><router-link :to="{ name: 'chat' }" class="link"
                  ><b-icon icon="journal" font-scale="1"></b-icon>
                  대화</router-link
                ></b-nav-item
              >
              <b-nav-item href="#link-1" @click="confirm"
                ><router-link :to="{ name: 'MyPage' }" class="link"
                  ><b-icon icon="journal" font-scale="1"></b-icon>
                  마이페이지</router-link
                ></b-nav-item
              >
            </b-nav>
          </nav>
          <!-- <b-button variant="primary" block @click="hide">Close Sidebar</b-button> -->
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberLogin",
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
      } else if (this.getUserInfo == null) {
        alert("로그인이 필요한 페이지 입니다! ");
        this.$router.push({ name: "SignIn" });
      }
    },
  },
};
</script>

<style scoped></style>
