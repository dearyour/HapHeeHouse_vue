<template>
  <div>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <!-- Navbar Brand--><router-link :to="{ name: 'Home' }">HappyHouse</router-link>

      <!-- Sidebar Toggle-->

      <button
        class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
      >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Navbar Search-->

      <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div class="input-group">
          <input
            class="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />

          <button class="btn btn-primary" id="btnNavbarSearch" type="button">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </form>

      <!-- Navbar-->

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <b-icon icon="people" font-scale="2"></b-icon>
          </template>
          <div v-if="loginCheck">
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
          </div>
          <div v-else>
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'SignOut' }" class="link"
                ><b-icon icon="key"></b-icon> 로그아웃</router-link
              ></b-dropdown-item
            >
          </div>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </nav>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  data() {
    return {
      loginCheck: false,
    };
  },
  created() {
    http.get(`/user/login-check`).then(({ data }) => {
      if (data === 1) this.loginCheck = false;
      else this.loginCheck = true;
    });
  },
};
</script>

<style scoped></style>
