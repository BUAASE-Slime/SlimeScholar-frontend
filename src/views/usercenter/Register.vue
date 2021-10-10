<template>
  <div id="register" class="register">
    <img class="bgbox" id="bgbox" alt="" src="../../../src/assets/images/background1.jpg">
    <div>
<!--      <img class="logo" src="../../assets/images/SlimeScholar.png" alt="logo" @click="toHome"/>-->
    </div>
    <div class="wrap">
      <h1>注 册</h1>
      <el-form :model="form" :rules="rules" ref="form" class="form">
        <el-form-item prop="username">
          <el-input
              placeholder="用户名"
              type="username"
              v-model="form.username"
              autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            placeholder="邮箱"
            type="email"
            v-model="form.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item id="password" prop="password">
          <el-input
              placeholder="密码"
              show-password
              type="password"
              v-model="form.password"
              autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item id="password2" prop="password">
          <el-input
              placeholder="确认密码"
              show-password
              type="password"
              v-model="form.password2"
              autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="confirmCode" prop="confirmCode">
          <el-input
            placeholder="邮箱验证码"
            v-model="form.confirmCode"
            type="confirmCode"
            style="width: 190px"
          ></el-input>&emsp;
          <el-button @click="getCode">获取验证码</el-button>
        </el-form-item>
        <el-form-item class="btn_register">
          <el-button type="primary" @click="register('form')">注&nbsp;&nbsp;册</el-button>
        </el-form-item>
      </el-form>
      <div class="suffix">
        <p @click="toLogin">已有账号？点击登录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var checkUsername = (rule, value, callback) => {
      const reg=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      if (!value) {
        return callback(new Error('用户名不能为空'));
      } else if (!reg.test(value)) {
        callback(new Error('用户名由中英文、数字或下划线组成'))
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      } else {
        var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(value)) {
          callback(new Error('请输入有效的邮箱'));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        var reg_pwd=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
        if (!reg_pwd.test(value)) {
          callback(new Error('密码至少同时包含字母和数字，且长度为8-18'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空！'));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: '',
        email: '',
        password: '',
        password2: '',
        confirmCode: '',
      },
      rules: {
        username: [
          { validator: checkUsername, trigger: 'blur'}
        ],
        email: [
          { validator: checkEmail, trigger: 'blur'}
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        confirmCode: [
          { validator: checkCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {},
    getCode() {},
    toHome() {},
    toLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
#register {
  font-family: 'Noto Serif SC', serif;
}
#register .el-input__inner {
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
  width: 320px;
  height: 500px;
  padding: 0 25px 0 25px;
  line-height: 40px;
  position: relative;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
}
.btn_register {
  margin-top: 25px;
  text-align: center;
}
.btn_register button{
  line-height: 10px;
  font-family: 'Noto Serif SC', serif;
  width: 100%;
  height: 38px;
}
.confirmCode button {
  font-family: 'Noto Serif SC', serif;
}
.suffix {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:right;
}
</style>