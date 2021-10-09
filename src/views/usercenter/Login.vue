<template>
  <div id="login">
    <img class="bgbox" id="bgbox" alt="" src="../../../src/assets/images/background1.jpg">
  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>
.bgbox {
  display: block;
  opacity: 1;
  z-index: -3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s,transform .25s,filter .25s;
  backface-visibility: hidden;
}
</style>