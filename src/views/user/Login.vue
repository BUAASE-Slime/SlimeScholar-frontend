<template>
  <div id="login" class="login">
    <img class="bgbox" id="bgbox" alt="" src="../../../src/assets/images/background1.jpg">
    <div>
      <img class="logo" src="../../assets/images/SlimeScholar-en.jpg" alt="logo" @click="toHome"/>
    </div>
    <div class="wrap">
      <h1>登 录</h1>
      <el-form :model="form" ref="form" class="form">
        <el-form-item prop="username">
          <el-input placeholder="用户名或邮箱" type="username" v-model="form.username" autocomplete="off"></el-input>
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
    login() {
      const formData = new FormData();
      if (this.form.username.indexOf("@") !== -1)
        formData.append("email", this.form.username);
      else
        formData.append("username", this.form.username);
      formData.append("password", this.form.password);
      this.$axios({
        method: 'post',
        url: '/user/login',
        data: formData,
      })
      .then(res => {
        if (res.data.success) {
          this.$message.success("登录成功");
          this.$store.dispatch('saveUserInfo', {
            user: {
              'username': res.data.detail.username,
              'Authorization': res.data.Authorization,
              'userId': res.data.detail.user_id,
              'authorId': res.data.detail.author_id,
            }
          });
          const history_pth = localStorage.getItem('preRoute');
          setTimeout(() => {
            if (history_pth == null || history_pth === '/register') {
              this.$router.push('/');
            } else {
              this.$router.push({ path: history_pth });
            }
          }, 1000);
        } else {
          this.$message.error("用户名或密码错误");
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
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
  margin-top: 60px;
}
#login >>> .el-input__inner {
  font-family: 'Noto Serif SC', serif;
}
#login .bgbox {
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
#login .logo {
  cursor: pointer;
  overflow: hidden;
  height: 150px;
}
#login .wrap {
  width: 300px;
  height: 315px;
  padding: 0 25px 0 25px;
  line-height: 40px;
  position: relative;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
}
#login .btn_login {
  margin-top: 25px;
  text-align: center;
}
#login .btn_login button{
  line-height: 10px;
  font-family: 'Noto Serif SC', serif;
  width: 100%;
  height: 38px;
}
#login .suffix {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:right;
}
</style>