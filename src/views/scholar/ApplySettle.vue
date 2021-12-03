<template>
  <div class="schPortal">
    <el-row class="info-div" style="padding: 30px">
      <el-steps :active="step - 1" finish-status="success" style="padding:20px 50px 0 50px">
        <el-step title="输入个人信息">
        </el-step>
        <el-step title="选择您发表的学术成果"></el-step>
        <el-step title="完成"></el-step>
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
                <el-input v-model="applyInfo.author_name" placeholder="请输入姓名"></el-input>
              </el-col>
            </el-row>
            <el-row class="fill-in-row">
              <el-col :span="5">
                工作单位
              </el-col>
              <el-col :span="8">
                <el-input v-model="applyInfo.affiliation_name" placeholder="请输入工作单位"></el-input>
              </el-col>
            </el-row>

            <el-row class="fill-in-row">
              <el-col :span="5">
                电子邮箱
              </el-col>
              <el-col :span="8">
                <el-input v-model="applyInfo.work_email" placeholder="请输入电子邮箱"></el-input>
              </el-col>
            </el-row>

            <el-row class="fill-in-row">
              <el-col :span="5">
                研究领域
              </el-col>
              <el-col :span="8">
                <el-input v-model="applyInfo.fields" placeholder="多个研究领域用英文半角逗号分隔"></el-input>
              </el-col>
            </el-row>

            <el-row class="fill-in-row">
              <el-col :span="5">
                个人首页（可选）
              </el-col>
              <el-col :span="8">
                <el-input v-model="applyInfo.home_page" placeholder="请输入您的个人首页"></el-input>
              </el-col>
            </el-row>
            <el-button type="primary" @click="submit_info"> 下一步</el-button>
          </el-row>
          <!--  第一步结束    -->

          <!--      第二步开始-->
          <el-row :hidden="step !== 2">
            <el-row justify="space-between" style="padding: 10px" type="flex">
              <el-col>已根据您的姓名，检索出 <span
                  style="font-weight: bolder; color: #217ad9; font-size: larger;">{{ paper_group.length }}</span>
                个文章组，请选择：
              </el-col>
              <el-col>
                <el-button type="primary" @click="confirm_choice"> 确认</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-collapse v-model="opened_collapse" class="papers-collapse" @change="handleChange">
                <el-collapse-item v-for="(papers, index) in paper_group" :key="index"
                                  :name="papers.author_id">
                  <template slot="title">
                    <el-checkbox v-model="papers_group_state[index].selected" class="choose-paper-checkbox"
                                 style="padding-left: 20px"><span
                        style="font-size: x-large;margin: 30px;font-weight: bolder;"
                        v-bind="papers_group_state[index].selected">{{
                        papers.author_name
                      }}</span>
                    </el-checkbox>
                  </template>
                  <div v-for="item in papers.papers" :key="item" class="article-item" style="margin-left: 50px">
                    <div style="text-align: left">
                      <div style="margin-bottom: 10px">
                        <span class="paper-title" style="font-size: large; font-weight: bold">{{
                            item.paper_title
                          }}</span>
                      </div>
                      <span v-for="(j, index) in item.authors" :key="j" class="author-name">
                  {{ j.author_name }}
                  <span v-if="index<item.authors.length-1"> / </span>
                </span>
                      <span class="publish-year"> · {{ item.year }}</span>
                      -
                      <span> {{ item.publisher }} </span>
                    </div>
                  </div>
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
                  <el-button type="primary">返回</el-button>
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
        author_name: "",
        affiliation_name: "",
        work_email: "",
        fields: "",
        home_page: "",
      },
      papers_group_state: [{open: true, selected: false, author_id: "a123"}, {
        open: true,
        selected: true,
        author_id: "a12acd3"
      }],
      paper_group: [
        {
          author_id: "a123",
          author_name: "Li Yu",
          papers: [
            {
              "authors": [
                {
                  "affiliation_id": "",
                  "affiliation_name": "Independent Researcher",
                  "author_id": "3192512793",
                  "author_name": "Sergei Belousov",
                  "order": "1"
                }
              ],
              "book_title": "",
              "citation_count": "0",
              "citation_msg": [],
              "conference": "",
              "conference_id": "",
              "date": "2021-11-01",
              "doctype": "",
              "doi": "10.1016/J.SIMPA.2021.100115",
              "doi_url": "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
              "fields": [],
              "first_page": "100115",
              "journal": "",
              "journal_id": "",
              "last_page": "",
              "paper_id": "3191610454",
              "paper_title": "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
              "publisher": "Elsevier BV",
              "rank": "23112",
              "reference_count": "12",
              "volume": "10",
              "year": "2021"
            }
          ]
        },
        {
          author_id: "a12acd3",
          author_name: "Li Yu",
          papers: [
            {
              "authors": [
                {
                  "affiliation_id": "",
                  "affiliation_name": "Independent Researcher",
                  "author_id": "3192512793",
                  "author_name": "Sergei Belousov",
                  "order": "1"
                }
              ],
              "book_title": "",
              "citation_count": "0",
              "citation_msg": [],
              "conference": "",
              "conference_id": "",
              "date": "2021-11-01",
              "doctype": "",
              "doi": "10.1016/J.SIMPA.2021.100115",
              "doi_url": "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
              "fields": [],
              "first_page": "100115",
              "journal": "",
              "journal_id": "",
              "last_page": "",
              "paper_id": "3191610454",
              "paper_title": "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
              "publisher": "Elsevier BV",
              "rank": "23112",
              "reference_count": "12",
              "volume": "10",
              "year": "2021"
            }
          ]
        }
      ]
    }
  },
  computed: {
    opened_collapse: function () {
      return this.papers_group_state.filter((x) => x.open).map(x => x.author_id);
    }
  },

  methods: {
    submit_info() {
      this.step = 2;
    },
    confirm_choice() {
      this.step = 3;
    }
  }
}
</script>

<style scoped>
@import "../../styles/article.css";

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


.article-blocks .article-item {
  margin-top: 20px;
  display: flex;
}

.article-blocks .article-item >>> .el-card__body {
  width: 100%;
  padding: 25px 30px 15px;
}

.article-blocks .article-item >>> .el-divider--horizontal {
  margin: 10px 0;
}

.choose-paper-checkbox >>> .el-checkbox__inner {
  width: 20px;
  height: 20px;
}

.choose-paper-checkbox >>> .el-checkbox__inner::after {

  height: 12px;
  left: 7px;
}


.choose-paper-checkbox >>> .el-checkbox__inner {
  width: 20px;
  height: 20px;
}


</style>