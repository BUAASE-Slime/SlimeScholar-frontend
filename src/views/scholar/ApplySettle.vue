<template>
  <div class="schPortal">
    <el-row class="info-div" style="padding: 30px">
      <el-steps :active="step - 1" finish-status="success" style="padding:20px 50px 0 50px">
        <el-step title="步骤 1">
        </el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>

      <el-divider/>

      <el-row align="middle" justify="center" type="flex">
        <el-col style="padding: 0 30px 0 30px">
          <!--第一步-->
          <el-row :hidden="step !== 1" style="font-size: large">
            <el-row class="fill-in-row">
              <el-col :span="5">
                姓名
              </el-col>
              <el-col :span="8">
                <el-input v-model="applyInfo.job" placeholder="请输入姓名"></el-input>
              </el-col>
            </el-row>
            <el-row class="fill-in-row">
              <el-col :span="5">
                工作单位
              </el-col>
              <el-col :span="8">
                <el-input v-model="applyInfo.job" placeholder="请输入工作单位"></el-input>
              </el-col>
            </el-row>

            <el-row class="fill-in-row">
              <el-col :span="5">
                电子邮箱
              </el-col>
              <el-col :span="8">
                <el-input v-model="applyInfo.job" placeholder="请输入电子邮箱"></el-input>
              </el-col>
            </el-row>

            <el-row class="fill-in-row">
              <el-col :span="5">
                研究领域
              </el-col>
              <el-col :span="8">
                <el-input v-model="applyInfo.job" placeholder="请输入您的研究领域"></el-input>
              </el-col>
            </el-row>

            <el-row class="fill-in-row">
              <el-col :span="5">
                个人首页（可选）
              </el-col>
              <el-col :span="8">
                <el-input v-model="applyInfo.job" placeholder="请输入您的个人首页"></el-input>
              </el-col>
            </el-row>
            <el-button type="primary" @click="submit_info"> 下一步</el-button>
          </el-row>
          <!--  第一步结束    -->

          <!--      第二步开始-->
          <el-row :hidden="step !== 2">
            <el-row justify="space-between" style="padding: 10px" type="flex">
              <el-col>已根据您的姓名，检索出 <span style="font-weight: bolder; color: #217ad9; font-size: larger;">3</span>
                个文章组，请选择：
              </el-col>
              <el-col>
                <el-button type="primary" @click="confirm_choice"> 确认</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="1" title="一致性 Consistency">
                  <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                  <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
                <el-collapse-item name="2" title="反馈 Feedback">
                  <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                  <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
              </el-collapse>
            </el-row>
          </el-row>
          <!--      第二部结束-->

          <!--step 3 start -->
          <el-row :hidden="step !== 3">
            <el-col>
              <el-result icon="success" subTitle="您的申请将在3天内由管理员审核，请耐心等待" title="欢迎入驻">
                <template slot="extra">
                  <el-button  type="primary">返回</el-button>
                </template>
              </el-result>
            </el-col>
            <!--step 3 ended-->
          </el-row>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "schPortal.vue",
  data() {
    return {
      step: 1,
      applyInfo: {
        name: "",
        job: "",

      }
    }
  },

  methods: {
    submit_info() {
      this.step = 2;
    },
    confirm_choice(){
      this.step = 3;
    }
  }
}
</script>

<style scoped>

.schPortal .info-div {
  background-color: white;
  padding-top: 25px;
  padding-left: 45px;
  padding-bottom: 25px;
  margin-left: 170px;
  margin-top: 40px;
  width: 80%;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

.fill-in-row {
  padding: 10px;
}


</style>