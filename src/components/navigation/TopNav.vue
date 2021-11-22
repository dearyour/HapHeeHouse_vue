<template>
  <div>
    <nav id="total" class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <!-- Sidebar Toggle-->
      <div style="text-align: left">
        <div class="item">
          <b-button
            class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            v-b-toggle.sidebar-backdrop
            ><i class="fas fa-bars"></i
          ></b-button>
          <side-nav />
        </div>
      </div>
      <div class="item">
        <router-link :to="{ name: 'Map' }">HappyHouse</router-link>
      </div>
      <!-- Navbar-->
      <div style="text-align: right">
        <div class="item">
          <b-navbar-nav class="ml-auto" v-if="userInfo">
            <b-nav-item class="align-self-center"
              ><b-avatar
                variant="primary"
                v-text="userInfo ? userInfo.userid.charAt(0).toUpperCase() : ''"
              ></b-avatar
              >{{ userInfo.username }}({{ userInfo.userid }})님 환영합니다.</b-nav-item
            >
            <b-nav-item class="align-self-center"
              ><router-link :to="{ name: 'MyPage' }" class="link align-self-center"
                >내정보보기</router-link
              ></b-nav-item
            >
            <b-nav-item class="link align-self-center" @click.prevent="onClickLogout"
              >로그아웃</b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item-dropdown right>
              <template #button-content>
                <b-icon icon="people" font-scale="2"></b-icon>
              </template>
              <b-dropdown-item href="#"
                ><router-link :to="{ name: 'SignUp' }" class="link"
                  ><b-icon icon="person-circle"></b-icon> 회원가입</router-link
                ></b-dropdown-item
              >
              <b-dropdown-item href="#"
                ><router-link :to="{ name: 'SignIn' }" class="link"
                  ><b-icon icon="key"></b-icon> 로그인</router-link
                ></b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SideNav from "./SideNav.vue";
const memberStore = "memberStore";

export default {
  name: "TopNav",
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "Map" });
    },
  },
  components: {
    SideNav,
  },
};
</script>

<style scoped>
#total {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.item {
  flex: auto;
}
</style>
