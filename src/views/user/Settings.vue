<template>
  <div class="settings">
    <div class="settings-body">
      <el-row :gutter="20">
        <el-col :span="6" style="width: 480px">
          <div class="grid-content">
            <el-card class="box-card1">
              <div style="padding: 25px 0">
                <img src="../../assets/images/doctor-bg.png" style="height:300px" alt="Image">
                <h2>{{ info.username }}</h2>
              </div>
            </el-card>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid-content">
            <el-card class="box-card2">
              <div slot="header" class="clearfix" style="display: flex">
                <div class="account-info">
                  <h2 style="margin-left: 80px; text-align: left">账户信息</h2>
                  <div class="a-info2" style="margin-top: 50px">
                    <span>用户名：{{ info.username }}</span>
                  </div>
                </div>
              </div>
              <div style="display: flex" class="set">
                <div>
                  <h2 style="margin-left: 80px; text-align: left">账户设置</h2>
                  <div class="a-info2">
                    <span style="display:inline-block; width: 400px">邮箱地址：{{ info.email }}</span>
                    <el-button type="primary" size="small" @click="dialogFormVisible2=true">更改</el-button>
                  </div>
                  <div class="a-info2">
                    <span style="display:inline-block; width: 100px">密码：</span>
                    <el-button type="primary" size="small" @click="dialogFormVisible=true">修改密码</el-button>
                  </div>

                  <div>
                    <el-dialog  width="515px" title="修改密码" :visible.sync="dialogFormVisible">
                      <el-form :model="form">
                        <el-form-item label="旧密码" label-width="80px">
                          <el-input type="password" show-password v-model="form.old" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" label-width="80px">
                          <el-input type="password" show-password v-model="form.new" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" label-width="80px">
                          <el-input  type="password" show-password v-model="form.newagain" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="clearPasswordForm">取 消</el-button>
                        <el-button type="primary" @click="changePassword">确 定</el-button>
                      </div>
                    </el-dialog>
                  </div>

                  <div>
                    <el-dialog width="500px" title="更换邮箱地址" :visible.sync="dialogFormVisible2" center>
                      <el-form :model="form">
                        <el-form-item label="邮箱地址" label-width="70px">
                          <el-input v-model="form.email" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码" label-width="70px">
                          <el-input v-model="form.code" style="width: 240px"></el-input>
                          <el-button @click="sendConfirmCode">发送验证码</el-button>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="clearEmailForm">取 消</el-button>
                        <el-button type="primary" @click="changeEmail">确 定</el-button>
                      </div>
                    </el-dialog>
                  </div>

                </div>
              </div>
            </el-card>
          </div>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import user from "../../store/user";

export default {
  name: "Settings",
  data() {
    return {
      info: {
        username: "",
        email: "",
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        old: "",
        new: "",
        newagain: "",
        email: "",
        code: ""
      },
    }
  },
  // 获取个人基本信息
  created() {
    const userInfo = user.getters.getUser(user.state());

    // 若未检测到登录信息，则跳转登录界面
    if (!userInfo) {
      this.$message.warning("请先登录");
      setTimeout(() => {
        this.$router.push("/login");
      }, 1000);
    }

    const _formData = new FormData();
    _formData.append("Authorization", userInfo.user.Authorization);
    _formData.append("user_id", userInfo.user.userId);
    console.log(_formData);
    this.$axios({
      method: 'post',
      url: '/user/info',
      data: _formData,
    })
    .then(res => {
      if (res.data.success) {
        this.info = res.data.data;
      } else {
        this.$message.warning("用户信息错误，请重新登录");
        setTimeout(() => {
          this.$store.dispatch('clear');
          this.$router.push("/login");
        }, 1000);
      }
    })
    .catch(err => {
      console.log(err);
    })
  },
  methods: {
    clearEmailForm() {
      this.dialogFormVisible2 = false;
      this.form.email = '';
    },
    clearPasswordForm() {
      this.dialogFormVisible = false;
      this.form.newagain = '';
      this.form.old = '';
      this.form.new = '';
    },
    //TODO: 修改邮箱地址前，发送邮箱验证码
    sendConfirmCode() {
      if (this.form.email === '') {
        this.$message.warning("输入不能为空！");
        return;
      }
      const formData = new FormData();
      formData.append("email", this.form.email);
      this.$axios({
        method: 'post',
        url: '/user/send/code',
        data: formData,
      })
      .then(res => {
        switch (res.data.status_code) {
          case 1:
            this.$message.success("验证码发送成功，3日内有效");
            break;
          case 2:
            this.$message.error("发送验证码失败，请检查您的邮箱是否正确");
            this.form.email = '';
            break;
          case 4:
            this.$message.warning("邮箱已注册，不可用！");
            this.form.email = '';
            break;
          default:
            this.$message.error("请求失败");
            this.form.email = '';
            break;
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    //TODO: 填入验证码后发送修改邮箱请求
    changeEmail() {
      if (this.form.code === '' || this.form.email === '') {
        this.$message.warning("输入不能为空！");
        return;
      }
      const formData = new FormData();
      formData.append("email", this.form.email);
      formData.append("code", this.form.code.trim());
      this.$axios({
        url: '/user/change/email',
        method: 'post',
        data: formData
      })
      .then(res => {
        switch (res.data.status_code) {
          case 1:
            this.$message.success("修改邮箱成功！");
            this.info.email = this.form.email;
            this.form.code = '';
            this.form.email = '';
            this.dialogFormVisible2 = false;
            this.$store.dispatch('saveUserInfo', {user: {
                'username': user.getters.getUser(user.state()).user.username,
                'confirmed': true,
              }});
            break;
          case 2:
            this.$message.error("验证码错误！");
            this.form.code = '';
            break;
          case 3:
            this.$message.error("验证码失效，请重新获取！");
            this.form.code = '';
            break;
          case 4:
            this.$message.warning("邮箱已注册，不可用！");
            this.form.email = '';
            this.form.code = '';
            break;
        }
      })
      .then(err => {
        console.log(err);
      });
    },
    //TODO: 修改密码
    changePassword() {
      if (this.form.new !== this.form.newagain) {
        this.$message.error("两次输入的密码不同");
        this.form.newagain = '';
        this.form.old = '';
        this.form.new = '';
        return;
      }
      const reg=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      if (!reg.test(this.form.new)) {
        this.$message.error("密码不符合规范，须由8-18个字符组成，且同时包含字母和数字");
        this.form.newagain = '';
        this.form.old = '';
        this.form.new = '';
        return;
      }

      const formData = new FormData();
      formData.append("old_password", this.form.old);
      formData.append("new_password_1", this.form.new);
      formData.append("new_password_2", this.form.newagain);

      this.$axios({
        method: 'post',
        url: '/user/change/password',
        data: formData,
      })
      .then(res => {
        switch (res.data.status_code) {
          case 1:
            this.$message.success("修改成功");
            this.dialogFormVisible = false;
            break;
          case 2:
            this.$message.error("两次输入的密码不同");
            break;
          case 3:
            this.$message.error("新旧密码相同");
            break;
          case 4:
            this.$message.error("输入的原密码错误");
            break;
          case 5:
            this.$message.error("输入的密码不符合规范，密码须由8-18个字符组成，且同时包含字母和数字");
            break;
          default:
            this.$message.error("操作失败");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
      this.form.newagain = '';
      this.form.old = '';
      this.form.new = '';
    }
  }
}
</script>

<style scoped>
.settings {
  margin: 0;
  padding: 0;
  height: 100%;
  background-size: 100% 100%;
}
.settings .settings-body {
  margin-top: 40px;
  width: 95%;
  padding: 20px;
}
.settings >>> .el-button {
  color: #2d94d4;
  background-color: white;
  font-size: 14px;
  margin-left: 20px;
}
.settings .a-info2 {
  margin: 30px 30px 30px 80px;
  text-align: left;
}
.settings .box-card1 {
  width: 425px;
  margin: 10px;
}
.settings .box-card2 {
  width: 900px;
  margin: 10px 30px;
}
.settings >>>.el-row {
  margin-bottom: 20px;
}
.settings >>> .el-col {
  border-radius: 4px;
}
.settings .grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.settings .row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>