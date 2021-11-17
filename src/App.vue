<template>
  <div id="app">
    <TopNav />
    <div class="row">
      <div id="layoutSidenav" style="width: 20%">
        <SideNav />
      </div>
      <div style="width: 80%">
        <router-view />
      </div>
    </div>
    <DownFooter />
  </div>
</template>

<script>
import DownFooter from "./components/DownFooter.vue";
import SideNav from "./components/navigation/SideNav.vue";
import TopNav from "./components/navigation/TopNav.vue";

export default {
  name: "App",
  components: {
    DownFooter,
    SideNav,
    TopNav,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a:hover {
  text-decoration: none;
  font-weight: bold;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
