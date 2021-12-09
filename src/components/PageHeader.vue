<template>
  <div class="header">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="font-size: 26px" @click="gotoHome">
        <img src="../assets/images/slime_logo.jpg" alt="logo" style="height: 40px">
      </el-menu-item>
      <el-menu-item index="2" @click="advanceSearch">高级检索</el-menu-item>
      <el-menu-item index="3" @click="gotoScholar">搜索学者</el-menu-item>
      <el-menu-item v-if="showSearch">
        <div style="width:700px;" class="input-box">
          <el-input placeholder="请输入内容"
                    v-model="input"
                    class="input-with-select"
                    style="font-size:16px; "
                    @keyup.enter.native="newSearch">
            <el-select v-model="select" slot="prepend" placeholder="检索依据" style="width:170px; border-right:1px solid grey" class="pre">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="newSearch"></el-button>
          </el-input>
        </div>
      </el-menu-item>
      <el-submenu index="5" style="float: right" v-if="isLogin">
        <template slot="title">{{ userName }}</template>
        <el-menu-item index="5-1" class="big-item" @click="gotoLib">个人图书馆</el-menu-item>
        <el-menu-item index="5-2" class="big-item" @click="gotoMySch">我的门户</el-menu-item>
        <el-menu-item index="5-3" class="big-item" @click="settings">账户设置</el-menu-item>
        <el-menu-item index="5-4" class="big-item" @click="logout">退出</el-menu-item>
      </el-submenu>
      <i v-if="isLogin" class="el-icon-user icon"></i>
      <div class="login-button">
        <el-button index="5" style="float: right" v-if="!isLogin" type="primary" @click="login">登录</el-button>
      </div>
    </el-menu>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: 'pageHeader',
  props: ['showSearch', 'tag', 'select', 'input', 'mode', 'options'],
  data() {
    return {
      userName: 'huangzehuan',
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

    switch (this.mode) {
      case 'white':
        document.documentElement.style.setProperty('--item-font-color', 'black');
        document.documentElement.style.setProperty('--background-color', 'transparent');
        document.documentElement.style.setProperty('--border-bottom', 'none');
        break;
      case 'black':
        document.documentElement.style.setProperty('--item-font-color', 'white');
        document.documentElement.style.setProperty('--background-color', 'transparent');
        document.documentElement.style.setProperty('--border-bottom', 'none');
        break;
      case 'default':
        document.documentElement.style.setProperty('--item-font-color', 'black');
        document.documentElement.style.setProperty('--background-color', 'white');
        document.documentElement.style.setProperty('--border-bottom', '2px solid transparent');
        break;
    }
  },
  methods: {
    newSearch() {
      if (this.input === '') {
        this.$message.warning("请输入检索词！");
        return;
      }
      let routeUrl = this.$router.resolve({
        path: '/searchRes?' + this.select + "=" + this.input,
      });
      window.open(routeUrl .href, "_self");
    },
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
      this.$router.push('/searchAut');
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
    gotoMySch() {
      this.$router.push('/schPortal');
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

:root {
  --item-font-color: white;
  --background-color: transparent;
  --border-bottom: 2px solid transparent;
}

.header {
  background-color: var(--background-color);
}

.header .icon {
  color: var(--item-font-color);
}

.header .el-menu {
  height: 70px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: var(--background-color);
  color: black;
}

.header .el-menu.el-menu--horizontal {
  border-bottom: var(--border-bottom);
}

.header .el-menu--horizontal >>> .el-menu-item {
  float: left;
  height: 70px;
  line-height: 70px;
  margin: 0;
  border-bottom: var(--border-bottom);
  color: var(--item-font-color);
}

.header .el-icon-user {
  padding-top: 22px;
  font-size: 24px;
  float: right;
}

.header .el-menu--horizontal >>>.el-menu-item.is-active {
  border-bottom: 2px solid transparent;
}

.header .el-menu-item {
  font-size: 17px;
}

.header .el-menu--horizontal .el-submenu >>> .el-submenu__title {
  height: 70px;
  line-height: 70px;
  color: black;
}

.header .el-submenu__title {
  font-size: 16px;
  color: black;
}

.el-menu--horizontal >>> .el-submenu.is-active .el-submenu__title {
  border-bottom: none !important;
  color: black;
}

.big-item .el-menu-item li {
  line-height: 50px!important;
}

.login-button {
  padding: 15px;
}

.login-button button {
  width: 100px;
  background-color: #1687fd;
}

.news-link {
  cursor: pointer;
}

.header .input-box {
  width: 100%;
  margin: 0 auto;
}
.header .input-box >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.header .input-box >>> .el-input__inner{
  height: 45px !important;
  border-right: none;
}
.header .input-box >>> .el-input-group__append {
  /* border-radius: inherit; */
  background-color: white;
}
.header .input-box >>> .el-input-group__prepend {
  /* border-radius: inherit; */
  background-color: white;
  /* color: azure; */
}
.header .input-box >>> .el-row--flex {
  display: flex;
  margin-top: 100px !important;
}
.header .input-box .pre >>> .el-input__inner::placeholder {
  color: black;
  font-size: 18px;
  text-align: center;
}
/* 谷歌 */
.header .input-box .pre >>> .el-input__inner::-webkit-input-placeholder {
  color: black;
  font-size: 18px;
  text-align: center;
}
/* 火狐 */
.header .input-box .pre >>> .el-input__inner:-moz-placeholder {
  color: black;
  font-size: 18px;
  text-align: center;
}
/*ie*/
.header .input-box .pre >>> .el-input__inner:-ms-input-placeholder {
  color: black;
  font-size: 18px;
  text-align: center;
}

</style>