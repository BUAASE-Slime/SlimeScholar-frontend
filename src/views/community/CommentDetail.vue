<template>
  <div class="details">
    <div class="main">
      <div class="question-title">
        <span style="font-size: 27px; font-weight: bold; line-height: 40px; color: #353535; font-family: Lato-Black">
          {{ this.info.paper_title }}
        </span>
      </div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="margin-top: 20px"
      >
        <el-breadcrumb-item :to="{ path: '/article', query: { v: this.info.paper_id } }">论文详情</el-breadcrumb-item>
        <el-breadcrumb-item>问题详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main-body">
        <div class="question-desciption">
          <span style="font-size: 18px; line-height: 24px; font-weight: bold">{{ this.info.base_comment.content }}</span>
        </div>
        <div class="authorAndtime">
          {{ this.info.base_comment.username }} · {{ this.info.answers.length }}&nbsp;回答 · {{ dateFormat(this.info.base_comment.time, "yyyy/MM/dd HH:mm") }}
        </div>
        <el-divider></el-divider>
        <div class="answerList">
          <div v-for="(ans, index) in this.info.answers" v-bind:key="index">
            <el-row :gutter="50">
              <el-col :span="1">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
              </el-col>
              <el-col :span="22">
                <el-row>
                  <el-col :span="18">
                    <div style="font-size: 14px">
                      <span style="font-weight: bold">{{ ans.reply_username }}&nbsp;&nbsp;
                      <span style="color: #73716f; font-weight: normal">
                        回复
                      </span>
                      &nbsp;&nbsp;
                      <span style="font-weight: bold">{{ ans.be_replied_username }}</span>
                      </span>
                    </div>
                  </el-col>
                  <el-col :span="6" style="text-align: right; font-size: 12px; color: #73716f;">{{ dateFormat(ans.time, "yyyy/MM/dd HH:mm") }}</el-col>
                </el-row>
                <el-row>
                  <div class="answer-content">{{ ans.content }}</div>
                </el-row>
                <el-row>
                  <div class="icon"
                       style="margin-top: 10px; font-size: 14px; color: #919fb5; cursor: pointer"
                       v-if="ans.answerIt === false"
                       @click="ans.answerIt = true">
                    <i class="el-icon-chat-dot-round" style="font-size: 15px; margin-left: 5px; margin-right: 5px"></i>
                    回复
                  </div>
                  <div class="icon"
                       style="margin-top: 10px; font-size: 14px; color: #919fb5; cursor: pointer"
                       v-if="ans.answerIt === true" @click="ans.answerIt = false">
                    <i class="el-icon-chat-dot-round" style="font-size: 15px; margin-left: 5px; margin-right: 5px"></i>
                    取消回复
                  </div>
                  <div class="answerAnswer" style="margin-top: 15px; display: flex" v-if="ans.answerIt === true">
                    <el-input
                        type="text"
                        autosize
                        placeholder="请输入内容"
                        style="font-size: 15px"
                        maxlength="500"
                        show-word-limit
                        v-model="ans.myAnswer"
                        class="my-answer"
                    >
                    </el-input>
                    <el-button
                        type="primary"
                        size="small"
                        style="margin-left: 5px"
                        @click="replyAnswer(ans.reply_id, ans.myAnswer)">回复</el-button>
                  </div>
                </el-row>
                <el-divider v-if="index<info.answers.length-1"></el-divider>
              </el-col>
            </el-row>
          </div>

        </div>
        <el-divider></el-divider>
        <div class="AnswerIt">
          <el-input
            type="textarea"
            maxlength="500"
            show-word-limit
            :autosize="{ minRows: 3, maxRows: 6}"
            placeholder="请输入你的回答"
            v-model="myAnswer"
          >
          </el-input>
          <div style="width: 100%; text-align: right">
            <el-button type="primary" style="margin-top: 10px;" @click="replyAnswer(info.base_comment.id,myAnswer)">发布</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import common from "../../utils/common";
import user from "../../store/user";

export default {
  mixins: [ common ],
  data() {
    return {
      myAnswer: '',
      info: {
        paper_id: 'buib1231212',
        paper_title: 'Swin Transformer: Hierarchical Vision Transformer using Shifted Windows',
        base_comment: {
          username: 'Zehuan Huang',
          id: 12,
          content: 'This paper presents a new vision Transformer, called Swin Transformer,\ ' +
              'that capably serves as a general-purpose backbone for computer vision. Challenges \i' +
              'n adapting Transformer from language to vision arise from differences between the two \d' +
              'omains, such as large variations in the scale of visual entities and the high resolution \o' +
              'f pixels in images compared to words in text. To address these differences, we propose a\ ' +
              'hierarchical Transformer whose representation is computed with shifted windows. The shifted windowing...',
          time: '2021/12/2 14:20'
        },
        answers: [
          {
            be_replied_username: 'Huang zehuan',
            reply_username: 'Yu Li',
            reply_id: 12,
            time: '2021/12/2 14:20',
            answerIt: false,
            myAnswer: '',
            content: "笔记：私人 & 共享 针对共享笔记也许可以从微信读书的读书笔记中得出一些设计灵感。 标签：提供多种分类方式，一个文件对应多个标签 & 自动根据关键词分类等 论文追溯：目前的追溯方式是基于单篇论文（connectedpaper提供了可以对参考文献进一步追溯，但是这是一个选项。即，他们提供的排序默认是基于单篇论文的参考文献）的引用和被引用，然后根据某种规则排序。也许可以考虑对参考文献做进一步的递归追溯（往前追溯&往后追溯，可以设置追溯深度或者是否追溯）分析。实现：上传这个领域任意一篇论文，可以追溯到最开始的研究和最新的研究，并且可以根据这个追溯数据分析出更重要的论文和综述等等。管中窥豹。 社区发展：readpaper应该不仅仅是读文献，也考虑了社交问答。所以在组织这块可以像researchgate学习。 总结，researchgate/connectedpaper/mendeley等都各有优势，能把优势结合起来并且进一步考虑用户体验（细节），我相信这个产品会很成功的。"
          },
          {
            be_replied_username: 'Huang zehuan',
            reply_username: 'Yu Li',
            reply_id: 12,
            time: '2021/12/2 14:20',
            answerIt: false,
            myAnswer: '',
            content: "This paper presents a new vision Transformer, called Swin Transformer,\ " +
                "that capably serves as a general-purpose"
          }
        ]
      },
    };
  },
  created() {
    this.getAnswers();
  },
  methods: {
    replyAnswer(reply_id, myAnswer) {
      const userInfo = user.getters.getUser(user.state());
      if (!userInfo) {
        this.$message.warning("请先登录！");
        setTimeout(() => {
          this.$router.push('/login');
        }, 500);
        return;
      }

      this.$axios({
        url: '/social/reply/comment',
        method: 'post',
        data: qs.stringify({
          user_id: userInfo.user.userId,
          comment_id: reply_id,
          content: myAnswer
        })
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            this.$message.success("回复成功！");
            break;
          case 400:
            this.$message.error("用户登录信息已失效，请重新登录！");
            this.$store.dispatch('clear');
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000);
            break;
          case 404:
            this.$message.error("系统未获取到您的用户信息，请联系管理员！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    getAnswers() {
      let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      this.$axios({
        url: '/social/get/replies',
        method: 'post',
        data: qs.stringify({
          comment_id: this.$route.query.v
        })
      })
      .then(res => {
        _loadingIns.close();
        if (res.data.success) {
          this.info = res.data.data;
        } else {
          this.$message.error("获取失败！");
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
};
</script>

<style scoped>
.details {
  margin: 0;
  width: 100%;
  height: 100%;
  min-height: 720px;
  text-align: left;
  padding: 0 0 20px;
}

.details .main {
  width: 60%;
  margin-left: 20%;
  /* background-color: #fff; */
}
.details .question-title {
  padding-top: 40px;
  margin-left: 0;
}

.details .answer-content {
  margin-top: 13px;
  font-size: 14px;
  line-height: 23px;
}
.details .arrow {
  text-align: left;
  font-size: 10px;
  margin-top: 20px;
  color: rgb(101, 100, 100);
}
.details .main-body {
  padding: 30px 45px;
  margin-top: 20px;
  background-color: #fff;
  margin-bottom: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

.details .question-desciption {
  margin-top: 10px;
  margin-bottom: 5px;
}

.details .authorAndtime {
  margin-top: 10px;
  font-size: 10px;
  color: rgb(101, 100, 100);
}

.details .el-avatar {
  width: 28px;
  height: 28px;
  line-height: 28px;
  font-size: 16px;
}

.details .avatarAndtext {
  display: flex;
}
.details .my-answer >>> .el-input__inner {
  height: 35px;
  font-size: 14px;
}

</style>