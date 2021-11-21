<template>
  <div id="app">
    <pageHeader v-if="!$route.meta.noNav" />
    <router-view />
  </div>
</template>

<script>
import PageHeader from "./components/PageHeader";

export default {
  name: "App",
  components: {
    PageHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
