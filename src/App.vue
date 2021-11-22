<template>
  <div id="app">
    <TopNav />
    <div class="p-3">
      <router-view />
    </div>
    <DownFooter />
  </div>
</template>

<script>
import DownFooter from "./components/DownFooter.vue";
import TopNav from "./components/navigation/TopNav.vue";

export default {
  name: "App",
  components: {
    DownFooter,
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
  color: white;
}
</style>
