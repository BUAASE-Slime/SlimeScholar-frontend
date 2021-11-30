<template>
  <div class="header">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="font-size: 26px" @click="gotoHome">
        <img src="../assets/images/slime_logo.png" alt="logo" style="height: 40px">
      </el-menu-item>
      <el-menu-item index="2" @click="advanceSearch">高级检索</el-menu-item>
      <el-menu-item index="3" @click="gotoScholar">学者门户</el-menu-item>
<!--      <el-menu-item index="4" @click="gotoCommunity">交流社区</el-menu-item>-->
      <el-menu-item v-if="showSearch">
        <div style="width:700px;" class="input-box">
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select" style="font-size:16px; ">
            <el-select v-model="select" slot="prepend" placeholder="检索依据" style="width:170px; border-right:1px solid grey" class="pre">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <!-- <el-switch
          v-model="value1"
          active-text="检索文章"
          inactive-text="检索学者"
          style="width:300px; margin-top:20px; margin-left:20px">
        </el-switch> -->
        </div>
      </el-menu-item>
      <el-submenu index="5" style="float: right" v-if="isLogin">
        <template slot="title">{{ userName }}</template>
        <el-menu-item index="5-1" class="big-item" @click="gotoLib">个人中心</el-menu-item>
        <el-menu-item index="5-2" class="big-item" @click="settings">账户设置</el-menu-item>
        <el-menu-item index="5-3" class="big-item" @click="logout">退出</el-menu-item>
      </el-submenu>
      <!--      <i class="el-icon-bell news-link" v-if="isLogin" style="padding-top: 28px; font-size: 24px; float: right;" @click="openNews"></i>-->
      <i v-if="isLogin" class="el-icon-user" @click="gotoLib"></i>
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
  data() {
    return {
      showSearch: false,

      userName: '',
      activeIndex: '1',
      isLogin: true,

      // search
      input: '',
      options: [{
        value: '1',
        label: '篇关摘'
      }, {
        value: '2',
        label: '文献来源'
      }, {
        value: '3',
        label: '关键字'
      }, {
        value: '4',
        label: '篇名'
      }, {
        value: '5',
        label: '摘要'
      },{
        value: '6',
        label: '作者'
      }, {
        value: '7',
        label: '作者单位'
      }, {
        value: '8',
        label: 'DOI'
      }],
      select: '1',
    };
  },
  created() {
    const userInfo = user.getters.getUser(user.state());
    if (userInfo)
    {
      this.isLogin = true;
      this.userName = userInfo.user.username;
    }

    console.log(this.$route.path);
    if (this.$route.path === '/searchRes')
      this.showSearch = true;
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


<style scoped>
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
  /*color: #409EFF !important;*/
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
  height: 250px;
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