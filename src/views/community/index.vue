<template>
  <div class="details">
    <div class="main">
      <div class="question-title">
        <h2>
          {{ this.title }}
        </h2>
      </div>
      <!-- <div class="arrow">论文详情 > 问题详情 ></div> -->
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="margin-top: 20px"
      >
        <el-breadcrumb-item>论文详情</el-breadcrumb-item>
        <el-breadcrumb-item>问题详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main-body">
        <div class="question-desciption">
          <h4>
            {{ this.questionDescription }}
          </h4>
        </div>
        <div class="authorAndtime">
          {{ this.author }} · {{ this.answerNum }}回答 · {{ this.time }}
        </div>
        <div class="divider1"></div>
        <div class="answerList">
          <div class="who" v-for="(ans, index) in answerList" :key="index">
            <div class="avatar">
              <div>
                <el-avatar icon="el-icon-user-solid"></el-avatar>
              </div>
              <!-- <div>
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div> -->
              <div class="whoAnserIt">
                <h5 style="margin-right: 10px">{{ ans.whoAnswerIt }}</h5>
                <div style="font-size: 8px; color: rgb(100, 101, 101)">
                  回复
                </div>
                <h5 style="margin-left: 10px">{{ ans.whoQuestionIt }}</h5>
              </div>
              <div class="answerTime">
                {{ ans.answerTime1 }} {{ ans.answerTime2 }}
              </div>
            </div>
            <div class="answerDetail">
              {{ ans.answerDetail }}
              <div
                class="icon"
                style="margin-top: 10px; font-size: 12px; cursor: pointer"
                v-if="ans.answerIt == false"
                @click="ans.answerIt = true"
              >
                <i
                  class="el-icon-chat-dot-round"
                  style="font-size: 15px; margin-left: 5px; margin-right: 5px"
                ></i>
                回复
              </div>
              <div
                class="icon"
                style="margin-top: 10px; font-size: 12px; cursor: pointer"
                v-if="ans.answerIt == true"
                @click="ans.answerIt = false"
              >
                <i
                  class="el-icon-chat-dot-round"
                  style="font-size: 15px; margin-left: 5px; margin-right: 5px"
                ></i>
                取消回复
              </div>
              <div
                class="answerAnswer"
                style="margin-top: 10px; display: flex"
                v-if="ans.answerIt == true"
              >
                <i
                  class="el-icon-s-custom"
                  style="
                    margin-top: 10px;
                    font-size: 15px;
                    margin-left: 5px;
                    margin-right: 5px;
                  "
                ></i>
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  style="font-size: 15px"
                  v-model="ans.myAnswer"
                >
                </el-input>
                <el-button type="primary" size="small" style="margin-left: 5px"
                  >回复</el-button
                >
              </div>
            </div>
            <div class="divider2"></div>
          </div>
          <!--  -->
        </div>
        <div class="divider1"></div>
        <div class="AnswerIt">
          <div class="avatarAndtext">
            <el-avatar
              icon="el-icon-user-solid"
              style="margin-left: 5px; margin-right: 10px"
            ></el-avatar>
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入你的回答"
              v-model="myAnswer"
            >
            </el-input>
          </div>
          <el-button
            type="primary"
            style="margin-top: 10px; margin-left: 85%; margin-bottom: 20px"
            >发布</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title:
        "Swin Transformer: Hierarchical Vision Transformer using Shifted Windows",
      questionDescription:
        "问题：This paper presents a new vision Transformer, called Swin Transformer, that capably serves as a general-purpose backbone for computer vision. Challenges in adapting Transformer from language to vision arise from differences between the two domains, such as large variations in the scale of visual entities and the high resolution of pixels in images compared to words in text. To address these differences, we propose a hierarchical Transformer whose representation is computed with shifted windows. The shifted windowing...",
      author: "Huangzehuan",
      answerNum: 2,
      time: "2021/11/26",
      myAnswer: null,
      answerList: [],
    };
  },
  created() {
    var obj1 = {
      whoAnswerIt: "Li Yu",
      whoQuestionIt: "Huangzahuan",
      answerTime1: "2021/11/26",
      answerTime2: "18:21",
      answerDetail:
        "This paper presents a new vision Transformer, called Swin Transformer, that capably serves as a general-purpose backbone for computer vision. Challenges in adapting Transformer from language to vision arise from differences between the two domains, such as large variations in the scale of visual entities and the high resolution of pixels in images compared to words in text. To address these differences, we propose a hierarchical Transformer whose representation is computed with shifted windows. The shifted windowing...",
      answerIt: false,
      myAnswer: null,
    };
    var obj2 = {
      whoAnswerIt: "Huangzahuan",
      whoQuestionIt: "Huangzahuan",
      answerTime1: "2021/11/26",
      answerTime2: "18:21",
      answerDetail:
        "This paper presents a new vision Transformer, called Swin Transformer, that capably serves as a general-purpose backbone for computer vision. Challenges in adapting Transformer from language to vision arise from differences between the two domains, such as large variations in the scale of visual entities and the high resolution of pixels in images compared to words in text. To address these differences, we propose a hierarchical Transformer whose representation is computed with shifted windows. The shifted windowing...",
      answerIt: true,
      myAnswer: null,
    };
    this.answerList.push(obj1);
    this.answerList.push(obj2);
  },
};
</script>

<style scoped>
.details {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(241, 244, 248);
  min-height: 720px;
  text-align: left;
  padding-bottom: 20px;
}
.main {
  width: 60%;
  margin-left: 20%;
  /* background-color: #fff; */
}
.question-title {
  padding-top: 40px;
  margin-left: 0px;
}
.arrow {
  text-align: left;
  font-size: 10px;
  margin-top: 20px;
  color: rgb(101, 100, 100);
}
.main-body {
  margin-top: 20px;
  background-color: #fff;
  margin-bottom: 40px;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(201, 201, 201);
}
.question-desciption {
  padding-top: 30px;
  width: 90%;
  margin-left: 5%;
}
.authorAndtime {
  margin-top: 10px;
  font-size: 10px;
  width: 90%;
  margin-left: 5%;
  color: rgb(101, 100, 100);
}
.who {
  width: 100%;
}
.avatar {
  width: 90%;
  margin-left: 5%;
  display: flex;
  height: 40px;
}
.whoAnserIt {
  line-height: 20px;
  width: 80%;
  display: flex;
}
.answerTime {
  margin-right: 10px;
  margin-top: 10px;
}
.divider1 {
  border-top: 1px solid;

  width: 90%;
  margin-left: 5%;
  border-color: #dcdfe6;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 0px;
}
.divider2 {
  border-top: 1px solid;

  width: 85%;
  margin-left: 10%;
  border-color: #dcdfe6;
  margin-top: 20px;
  margin-bottom: 20px;
}
.whoAnserIt {
  /* margin-top: -5px; */
  line-height: 40px;
  margin-left: 10px;
}
.answerTime {
  color: rgb(101, 124, 130);
  font-size: 10px;
  margin-top: 5px;
}
.answerDetail {
  width: 85%;
  padding-left: 10%;
}
.avatarAndtext {
  width: 90%;
  margin-left: 5%;
  display: flex;
}
</style>