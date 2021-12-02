<template>
  <div id="app">
    <pageHeader v-if="!$route.meta.noNav" />
    <router-view />
  </div>
</template>

<script>
import PageHeader from "./components/PageHeader";
import LucidHeader from "./components/LucidHeader";

export default {
  name: "App",
  components: {
    LucidHeader,
    PageHeader,
  },
};
</script>

<style>
body {
  background-color: #f1f3f6;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*font-family: Lato,-system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,Liberation Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;*/
}
</style>
