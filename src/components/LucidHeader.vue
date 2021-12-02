<template>
  <div class="lucid-header">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="font-size: 26px" @click="gotoHome">
        <img src="../assets/images/slime_logo.png" alt="logo" style="height: 40px">
      </el-menu-item>
      <el-menu-item index="2" @click="advanceSearch" class="sub-menu-title">高级检索</el-menu-item>
      <el-menu-item index="3" @click="gotoScholar" class="sub-menu-title">学者门户</el-menu-item>
      <el-submenu index="5" style="float: right;" v-if="isLogin">
        <template slot="title" style="color: white">{{ userName }}</template>
        <el-menu-item index="5-1" class="big-item" @click="gotoLib">个人图书馆</el-menu-item>
        <el-menu-item index="5-2" class="big-item" @click="settings">账户设置</el-menu-item>
        <el-menu-item index="5-3" class="big-item" @click="logout">退出</el-menu-item>
      </el-submenu>
      <!--      <i class="el-icon-bell news-link" v-if="isLogin" style="padding-top: 28px; font-size: 24px; float: right;" @click="openNews"></i>-->
      <i v-if="isLogin" class="el-icon-user" style="color: white"></i>
      <div class="login-button">
        <el-button index="5" style="float: right" v-if="!isLogin" type="primary" @click="login">登录</el-button>
      </div>
    </el-menu>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: "LucidHeader",
  data() {
    return {
      userName: 'huangzehuan',
      activeIndex: '1',
      isLogin: false,
    }
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
      this.$router.push('/schPortal');
    },
    gotoCommunity: function () {
      this.$router.push('/community');
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
      this.$store.dispatch('clear');
      this.$message.success("退出成功！");
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }
}
</script>

<style scoped>

.lucid-header {
  background-color: transparent;
}

.lucid-header .el-menu {
  height: 70px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: transparent;
  color: black;
}

.el-menu.el-menu--horizontal {
  border: 0;
}

.lucid-header .el-menu--horizontal >>> .el-menu-item {
  float: left;
  height: 70px;
  line-height: 70px;
  margin: 0;
  color: white;
}

.lucid-header .el-icon-user {
  padding-top: 22px;
  font-size: 24px;
  float: right;
}

.lucid-header .el-menu--horizontal >>>.el-menu-item.is-active {
  border-bottom: 2px solid transparent;
}

.lucid-header .el-menu-item {
  font-size: 17px;
}

.lucid-header .el-menu--horizontal .el-submenu >>> .el-submenu__title {
  height: 70px;
  line-height: 70px;
}

.lucid-header .el-submenu__title {
  font-size: 16px;
  color: white;
}

.lucid-header .el-menu--horizontal >>> .el-submenu.is-active {
  background: none;
}

.lucid-header .el-menu--horizontal >>> .el-submenu.is-active .el-submenu__title {
  border-bottom: none !important;
  color: dodgerblue;
}

.lucid-header .big-item .el-menu-item li {
  line-height: 50px!important;
}

.lucid-header .login-button {
  padding: 15px;
}

.lucid-header .login-button button {
  width: 100px;
  background-color: #1687fd;
}

</style>