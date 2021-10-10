<template>
  <div id="login" class="login">
    <img class="bgbox" id="bgbox" alt="" src="../../../src/assets/images/background1.jpg">
    <div>
      <img class="logo" src="../../assets/images/SlimeScholar.png" alt="logo" @click="toHome"/>
    </div>
    <div class="wrap">
      <h1>登 录</h1>
      <el-form :model="form" ref="form" class="form">
        <el-form-item prop="username">
          <el-input placeholder="用户名" type="username" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item id="password" prop="password">
          <el-input
            placeholder="密码"
            show-password
            type="password"
            v-model="form.password"
            autocomplete="off"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn_login">
          <el-button type="primary" @click="login">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
      <div class="suffix">
        <p @click="register">注册帐号</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login() {},
    register() {
      this.$router.push("/register");
    },
    toHome() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
#login {
  font-family: 'Noto Serif SC', serif;
}
#login .el-input__inner {
  font-family: 'Noto Serif SC', serif;
}
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
.logo {
  cursor: pointer;
  overflow: hidden;
}
.wrap {
  width: 300px;
  height: 315px;
  padding: 0 25px 0 25px;
  line-height: 40px;
  position: relative;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
}
.btn_login {
  margin-top: 25px;
  text-align: center;
}
.btn_login button{
  line-height: 10px;
  font-family: 'Noto Serif SC', serif;
  width: 100%;
  height: 38px;
}
.suffix {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:right;
}
</style>