<template>
  <div class="block">
    <el-carousel height="350px">
      <el-carousel-item v-for="(item, index) in topImg" :key="index">
        <img :src="item.url" style="width: 100%; height: 100%" alt="" />
        <div class="cover">
          <!-- {{ item.title }}<br /> -->
          欢迎来到Slime交流社区<br />
          <span style="font-size: 35px">{{ item.subTitle }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="question" v-for="(ques, index) in questionList" :key="index">
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="questionList.length"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  methods: {
    // 每页显示的条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      pageSizes: [4, 5, 7],
      questionList: [],
    };
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
    this.questionList.push(obj2);
    this.questionList.push(obj2);
    this.questionList.push(obj2);
    this.questionList.push(obj2);
    this.questionList.push(obj2);
    this.questionList.push(obj2);
    this.questionList.push(obj2);
    this.questionList.push(obj2);
    this.questionList.push(obj2);
    this.questionList.push(obj2);
    this.questionList.push(obj2);
    // console.log(this.projectList);
  },
  computed: {
    userdata: function () {
      return this.questionList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
};
</script>