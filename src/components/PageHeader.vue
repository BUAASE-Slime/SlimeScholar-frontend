<template>
  <div class="header">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="font-size: 26px" @click="gotoHome">
        <img src="../assets/images/slime_logo.png" alt="logo" style="height: 40px">
      </el-menu-item>
      <el-menu-item index="2" @click="advanceSearch">高级检索</el-menu-item>
      <el-menu-item index="3" @click="gotoScholar">学者门户</el-menu-item>
      <el-submenu index="4" style="float: right" v-if="isLogin">
        <template slot="title">{{ userName }}</template>
        <el-menu-item index="4-1" class="big-item" @click="gotoLib">个人中心</el-menu-item>
        <el-menu-item index="4-2" class="big-item" @click="settings">账户设置</el-menu-item>
        <el-menu-item index="4-3" class="big-item" @click="logout">退出</el-menu-item>
      </el-submenu>
      <!--      <i class="el-icon-bell news-link" v-if="isLogin" style="padding-top: 28px; font-size: 24px; float: right;" @click="openNews"></i>-->
      <i v-if="isLogin" class="el-icon-user" @click="settings"></i>
      <div class="login-button">
        <el-button index="4" style="float: right" v-if="!isLogin" type="primary" @click="login">登录</el-button>
      </div>
    </el-menu>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: 'pageHeader',
  data() {
    return {
      userName: '',
      activeIndex: '1',
      isLogin: false,
    };
  },
  created() {
    const userInfo = user.getters.getUser(user.state());
    if (userInfo)
    {
      this.isLogin = true;
      this.userName = userInfo.user.username;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    gotoHome: function () {
      this.$router.push('/');
    },
    advanceSearch: function () {
      // const userInfo = user.getters.getUser(user.state());
      this.$router.push('/advSearch');
    },
    gotoScholar: function () {
      this.$router.push('/schPortal')
    },
    login() {
      this.$router.push('/login');
    },
    gotoLib() {
      this.$router.push('/schLib');
    },
    settings() {
      this.$router.push('/settings');
    },
    logout() {
      this.$axios({
        method: 'get',
        url: '/user/logout',
      })
      .then(res => {
        switch (res.data.status_code) {
          case 200:
            this.$store.dispatch('clear');
            location.reload();
            break;
          case 401:
            this.$message.error('未检测到登录信息！');
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>


<style>
.header .el-menu{
  height: 70px;
  padding-left: 50px;
  padding-right: 50px;
}

.header .el-menu--horizontal>.el-menu-item {
  float: left;
  height: 70px;
  line-height: 70px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: black;
}

.header .el-icon-user {
  padding-top: 22px;
  font-size: 24px;
  float: right;
  cursor: pointer;
}

.header .el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid transparent;
  color: #409EFF !important;
}

.header .el-menu-item {
  font-size: 17px;
}

.header .el-menu--horizontal>.el-submenu .el-submenu__title {
  height: 70px;
  line-height: 70px;
  color: black;
}

.header .el-submenu__title {
  font-size: 16px;
  color: black;
}

.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
  border-bottom: none !important;
  color: black;
}

.big-item .el-menu-item li {
  line-height: 50px!important;
}

.login-button {
  padding: 20px;
}

.login-button button {
  width: 100px;
  background-color: #1687fd;
}

.news-link {
  cursor: pointer;
}
</style>