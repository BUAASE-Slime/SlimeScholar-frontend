<template>
  <div style="margin: 0px; padding: 0px">
    <!-- <PageHeader></PageHeader> -->
    <!-- <div class="header">header</div> -->
    <!-- <div class="community-name">
      <div class="community-title">欢迎来到Slime交流社区</div>
      <div class="community-describe">在这里您可以讨论各方面学术相关的内容</div>
    </div> -->
    <!-- https://tse1-mm.cn.bing.net/th/id/R-C.8f737f008eecb0965c2e900721b4ad32?rik=TrY2lydT5%2f9mIQ&riu=http%3a%2f%2fwww.bitc.edu.cn%2fxxgk%2fxsxx%2f201809%2fW020180909436995305437.jpg&ehk=LQWbqd%2ffTo5768VA0YkbzGczA0jWUvbdueeBOhXo1H8%3d&risl=&pid=ImgRaw&r=0 -->
    <el-carousel height="350px">
      <el-carousel-item v-for="(item, index) in topImg" :key="index">
        <img :src="item.url" style="width: 100%; height: 100%" alt="" />
        <div class="cover">
          {{ item.title }}<br />
          <!-- 欢迎来到Slime交流社区<br /> -->
          <span style="font-size: 35px">{{ item.subTitle }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="community">
      <el-container>
        <el-aside width="200px">
          <el-button type="primary" class="addQuestion" @click="questionDialog"
            >发布问题</el-button
          >
          <el-menu>
            <el-menu-item index="1" class="myQuestion">
              <i class="el-icon-menu"></i>
              <span slot="title">所有问题</span>
            </el-menu-item>
            <el-menu-item index="2" class="myQuestion">
              <i class="el-icon-star-off"></i>
              <span slot="title">我的关注</span>
            </el-menu-item>
            <el-menu-item index="3" class="myQuestion">
              <i class="el-icon-share"></i>
              <span slot="title">我的提问</span>
            </el-menu-item>
            <el-menu-item index="4" class="myQuestion">
              <i class="el-icon-chat-dot-round"></i>
              <span slot="title">我的回复</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <el-input
              placeholder="请输入问题"
              v-model="input"
              prefix-icon="el-icon-search"
              clearable
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-header>
          <el-main>
            <div class="rank-refresh-button">
              <el-dropdown
                size="medium"
                split-button
                type="primary"
                class="rank-button"
              >
                最新发布
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>最新回复</el-dropdown-item>
                  <el-dropdown-item>最多回复</el-dropdown-item>
                  <el-dropdown-item>最少回复</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- <el-dropdown>
                <el-button type="primary" class="rank-button" size="medium">
                  排序方式<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>

                <el-dropdown-menu slot="dropdown" class="rank-dropdown">
                  <el-dropdown-item>最新发布</el-dropdown-item>
                  <el-dropdown-item>最新回复</el-dropdown-item>
                  <el-dropdown-item>最多回复</el-dropdown-item>
                  <el-dropdown-item>最少回复</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
              <el-button class="refresh-button"
                ><i class="el-icon-refresh"></i
              ></el-button>
            </div>

            <div
              class="question"
              v-for="(ques, index) in questionList"
              :key="index"
            >
              <div class="avatar">
                <div>
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </div>
                <!-- <div>
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div> -->
              </div>
              <div class="question-detail">
                <div class="question-title">{{ ques.title }}</div>
                <div class="question-author">
                  <i class="el-icon-user"></i>
                  <!-- lllyyyss 创建于 11月13日 22:38 -->
                  {{ ques.author }} 创建于 {{ ques.time }}
                </div>
              </div>
              <div class="question-reply">
                <i class="el-icon-chat-dot-round"></i> {{ ques.reply }}
              </div>
              <div
                class="question-like"
                v-if="ques.islike == false"
                @click="likeIt(ques)"
              >
                <el-tooltip
                  class="item"
                  effect="light"
                  content="关注下叭"
                  placement="right"
                >
                  <i class="el-icon-star-off"></i>
                </el-tooltip>
              </div>
              <div
                class="question-like"
                v-if="ques.islike == true"
                @click="dislikeIt(ques)"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="取消关注"
                  placement="right"
                >
                  <i class="el-icon-star-on" style="font-size: 21px"></i>
                </el-tooltip>
              </div>
            </div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="PageSize"
              layout="prev, pager, next"
              :total="questionList.length"
            >
            </el-pagination>
          </el-main>
        </el-container>
      </el-container>
    </div>

    <!-- <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      class="question-drawer"
    >
      <el-input placeholder="请输入内容" v-model="questionTitle" clearable>
      </el-input>
      <div id="e"></div>
    </el-drawer> -->

    <el-dialog
      title="发布问题"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <!-- <span>这是一段信息</span> -->
      <el-input
        placeholder="请输入标题"
        v-model="quesTitle"
        clearable
        style="margin-bottom: 10px"
      >
      </el-input>

      <div id="e"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
//import PageHeader from "../../components/PageHeader.vue";
// import Editor from "@tinymce/tinymce-vue";
import E from "wangeditor";
export default {
  // components: {
  //   editor: Editor,
  // },
  name: "Community",
  data() {
    return {
      input: "",
      questionList: [],
      drawer: false,
      direction: "btt",
      quesTitle: "",
      dialogVisible: false,
      currentPage: 1,
      PageSize: 9,
      pageSizes: [4, 5, 7],
      topImg: [
        {
          title: "欢迎来到Slime学术交流社区",
          subTitle: "Welcome to Slime Scholar Community",
          url: "https://img-1304418829.cos.ap-beijing.myqcloud.com/6.jpg",
        },
        {
          title: "寻找学术伙伴",
          subTitle: "Search for your Academic Partners",
          url: "https://tse1-mm.cn.bing.net/th/id/R-C.1edb284790c863d0575c293ff27d231f?rik=HPCdboMKYKe3aA&riu=http%3a%2f%2fwww.hopscotchchina.com%2fuploadfile%2f2019%2f0114%2f20190114104140854.jpg&ehk=V5hHwHhcf44xkgzTl%2bJxJbPwuG%2bSA5qVEc%2bSUd10vVs%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          title: "解决学术难题",
          subTitle: "Solve your Academic Problems",
          url: "https://tse1-mm.cn.bing.net/th/id/R-C.3d943cb5eebab5592baadcba25f8376b?rik=KkxxE86UyRSNzQ&riu=http%3a%2f%2fx0.ifengimg.com%2fcmpp%2f2020_20%2f24fdc93934572b3_size603_w1920_h960.jpg&ehk=RaVS8KbjHgiJZrSvLLXQaF%2bv69d6G%2fPxXSUcuKqPRW8%3d&risl=&pid=ImgRaw&r=0",
        },
      ],
    };
  },
  methods: {
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then((_) => {
    //       done();
    //     })
    //     .catch((_) => {});
    // },
    likeIt(ques) {
      ques.islike = true;
    },
    dislikeIt(ques) {
      ques.islike = false;
    },

    questionDialog() {
      this.dialogVisible = true;
      const editor = new E("#e");
      editor.create();
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleClose() {},
  },
  created() {
    var obj1 = {
      title: "今天软工写完了嘛",
      author: "lllysss",
      time: "2021-11-14 00:15:44",
      reply: 10,
      islike: true,
    };
    var obj2 = {
      title: "今天编译写完了嘛",
      author: "lllyyysss",
      time: "2021-11-14 00:16:44",
      reply: 100,
      islike: false,
    };
    this.questionList.push(obj1);
    this.questionList.push(obj2);
    this.questionList.push(obj1);
    this.questionList.push(obj2);
    this.questionList.push(obj1);
    this.questionList.push(obj2);
    this.questionList.push(obj1);
    this.questionList.push(obj2);
    this.questionList.push(obj1);

    // console.log(this.projectList);
  },
  mounted() {},
};
</script>

<style scoped>
.cover {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  left: 0;
  top: 0;
  color: white;
  font-size: 50px;
  line-height: 60px;
  padding-top: 120px;
}
.el-main {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(251, 252, 252, 1);
  padding: 0;
}
.header {
  height: 70px;
}
.community-name {
  height: 160px;
  width: 100%;
  background-color: rgba(64, 158, 255, 0.2);
}
.community-title {
  padding-top: 40px;
  font-family: "Helvetica Neue";
  font-size: 28px;
  color: rgb(64, 158, 255);
}
.community-describe {
  margin-top: 10px;
  color: rgb(64, 158, 255);
}
.community {
  width: 74%;
  margin-left: 13%;
  margin-top: 30px;
}
.aside {
  width: 200px;
}
.addQuestion {
  width: 100%;
  height: 40px;
  font-size: 18px;
  margin-bottom: 20px;
}
.myQuestion {
  /* margin-top: 10px; */
  margin-bottom: 10px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  text-align: left;
  padding-left: 10px;
}
.el-main {
  background-color: #fff;
  /* text-align: left; */
}
.rank-refresh-button {
  display: flex;
  margin-bottom: 10px;
}
.rank-button {
  margin-left: 30px;
}
.refresh-button {
  margin-left: 630px;
}
.question {
  display: flex;
  height: 60px;
  padding-top: 20px;
}
.question:hover {
  background-color: rgb(245, 245, 245);
}
.avatar {
  margin-left: 30px;
}
.question-detail {
  margin-left: 20px;
  text-align: left;
  width: 650px;
}
.question-title {
  font-family: "Helvetica Neue";
  font-size: 18px;
  font-weight: 550;
}
.question-author {
  color: rgb(170, 170, 170);
  font-size: 13px;
}
.question-reply {
  width: 80px;
  margin-top: 10px;
  margin-left: 0px;
  font-size: 18px;
  text-align: left;
}
.question-like {
  margin-top: 10px;
  /* margin-left: 10px; */
  font-size: 18px;
  cursor: pointer;
}
.question-like:hover {
  margin-top: 10px;
  /* margin-left: 10px; */
  /* font-size: 22px; */
  cursor: pointer;
}
.question-drawer {
  width: 60%;
  margin-left: 30%;
  /* height: 300px; */
  /* border-style: solid;
  border-width: 2px;
  border-color: red; */
}
</style>