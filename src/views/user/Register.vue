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
    register() {
      const _formData = new FormData();
      _formData.append("username", this.form.username);
      _formData.append("confirm_number", this.form.confirmCode);
      this.$axios({
        method: 'post',
        url: '/user/confirm',
        data: _formData,
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            this.$message.success("注册成功！");
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
            break;
          case 401:
            this.$message.warning("请勿重复注册");
            break;
          case 402:
            this.$message.error("验证码错误");
            break;
          case 404:
            this.$message.error("查无注册用户信息，请重新注册");
            break;
          case 600:
            this.$message.error("验证码失效，请重新获取");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    getCode() {
      const _formData = new FormData();
      _formData.append("username", this.form.username);
      _formData.append("password", this.form.password2);
      _formData.append("email", this.form.email);
      this.$axios({
        method: 'post',
        url: '/user/register',
        data: _formData,
      })
      .then(res => {
        if (res.data.success) {
          this.$message.success("验证码已发送至您的邮箱");
        } else {
          this.$message.warning("用户名或邮箱已注册");
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
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
  margin-top: 60px;
}
#register >>> .el-input__inner {
  font-family: 'Noto Serif SC', serif;
}
#register .bgbox {
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
#register .wrap {
  width: 320px;
  height: 500px;
  padding: 0 25px 0 25px;
  line-height: 40px;
  position: relative;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
}
#register .btn_register {
  margin-top: 25px;
  text-align: center;
}
#register .btn_register button{
  line-height: 10px;
  font-family: 'Noto Serif SC', serif;
  width: 100%;
  height: 38px;
}
#register .confirmCode button {
  font-family: 'Noto Serif SC', serif;
}
#register .suffix {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:right;
}
</style>