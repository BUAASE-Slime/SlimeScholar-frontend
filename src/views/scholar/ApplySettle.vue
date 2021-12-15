<template>
  <div class="apply-settle">
    <el-row class="info-div" style="padding: 30px">
      <el-steps :active="step - 1" finish-status="success" style="padding:20px 50px 0 50px">
        <el-step title="个人信息" icon="el-icon-edit-outline"></el-step>
        <el-step title="选择学术成果" icon="el-icon-folder-add"></el-step>
        <el-step title="完成" icon="el-icon-success"></el-step>
      </el-steps>

      <el-divider/>

      <el-row align="middle" justify="center" type="flex">
        <el-col align="left" style="padding: 0 50px 0 50px;">
          <!--第一步-->
          <el-row :hidden="step !== 1" style="font-size: large; width:80%;">
            <el-row class="fill-in-row">
              <el-col :span="7" class="sub-title">
                姓名
              </el-col>
              <el-col :span="17">
                <el-input v-model="applyInfo.author_name" placeholder="请输入姓名"></el-input>
              </el-col>
            </el-row>
            <el-row class="fill-in-row">
              <el-col :span="7" class="sub-title">
                工作单位
              </el-col>
              <el-col :span="17">
                <el-input v-model="applyInfo.affiliation_name" placeholder="请输入工作单位"></el-input>
              </el-col>
            </el-row>

            <el-row class="fill-in-row">
              <el-col :span="7" class="sub-title">
                电子邮箱
              </el-col>
              <el-col :span="17">
                <el-input v-model="applyInfo.work_email" placeholder="请输入电子邮箱"></el-input>
              </el-col>
            </el-row>

            <el-row class="fill-in-row">
              <el-col :span="7" class="sub-title">
                研究领域
              </el-col>
              <el-col :span="17">
                <el-input v-model="applyInfo.fields" placeholder="多个研究领域用英文半角逗号分隔"></el-input>
              </el-col>
            </el-row>

            <el-row class="fill-in-row">
              <el-col :span="7" class="sub-title">
                个人首页（可选）
              </el-col>
              <el-col :span="17">
                <el-input v-model="applyInfo.home_page" placeholder="请输入您的个人首页"></el-input>
              </el-col>
            </el-row>
            <el-button style="margin-top: 20px; margin-left: 10px" type="primary" @click="submit_info"> 下一步</el-button>
          </el-row>
          <!--  第一步结束    -->

          <!--      第二步开始-->
          <el-row :hidden="step !== 2">
            <el-row justify="space-around" style="padding-bottom: 10px; width: 100%; " type="flex">
              <el-col style="text-align: left">已根据您的姓名，检索出 <span
                  style="font-weight: 600; color: #217ad9; font-size: x-large; ">{{ author_count }}</span>
                个文章组，请选择：
              </el-col>
              <el-col>
                <el-row justify="end" style="padding-right: 5px;" type="flex">
                  <el-button type="primary" @click="confirm_choice"> 确认</el-button>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-collapse v-model="opened_collapse" class="papers-collapse">
                <el-collapse-item v-for="(papers, index) in authors" :key="index"
                                  :name="papers.author_id">
                  <template slot="title">
                    <el-checkbox v-model="papers_group_state[index].selected" class="choose-paper-checkbox"
                                 style="padding-left: 20px">
                      <span style="font-size: 17px;margin: 10px;font-weight: bold; color: #2f2e2e"
                            v-bind="papers_group_state[index].selected">
                      {{ papers.name }}
                      </span>
                    </el-checkbox>
                  </template>
                  <div v-for="(item, index) in papers.papers" v-bind:key="index" class="article-item" style="margin-left: 60px; margin-top: 10px; color: grey;">
                    <div style="text-align: left">
                      <div style="margin-bottom: 5px">
                        <span class="paper-title"
                              style="font-size: 16px; font-family:'Times Roman',sans-serif ;color: rgba(53,53,53,0.94)"
                              @click="gotoArticle(item.paper_id)">
                          {{ index+1 }}. {{ item.paper_title }}</span>
                      </div>
                      <span v-for="(j, index) in item.authors" :key="j">
                        {{ j.author_name }}
                        <span v-if="index<item.authors.length-1"> / </span>
                      </span>
                      <span> · {{ item.year }}</span>
                      <span> · {{ item.publisher }} </span>
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
              <el-result icon="success"  title="">
                <template slot="title">
                  <span style="font-size: large">欢迎入驻</span>
                </template>
                <template slot="subTitle">
                  <span style="font-size: 16px">您的申请将在3天内由管理员审核，请耐心等待</span>
                </template>
                <template slot="extra">
                  <el-button type="primary" @click="gotoHome">返回</el-button>
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

import qs from "qs";
import user from "../../store/user";

export default {
  name: "ApplySettle",
  data() {
    return {
      step: 1,
      applyInfo: {
        author_name: "",
        affiliation_name: "",
        work_email: "",
        fields: "",
        home_page: "",
        author_id: "",
      },
      papers_group_state: [
        {
          open: true,
          selected: false,
          author_id: "a123"
        },
        {
          open: true,
          selected: false,
          author_id: "a12acd3"
        }
      ],
      author_count: 21,
      authors: [
        {
          author_id: "a123",
          name: "Li Yu",
          papers: [
            {
              "authors": [
                {
                  "affiliation_id": "",
                  "affiliation_name": "Independent Researcher",
                  "author_id": "3192512793",
                  "author_name": "Sergei Belousov",
                  "order": "1"
                },
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
            },
            {
              "authors": [
                {
                  "affiliation_id": "",
                  "affiliation_name": "Independent Researcher",
                  "author_id": "3192512793",
                  "author_name": "Sergei Belousov",
                  "order": "1"
                },
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
          name: "Li Yu",
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
      ],
      page: 1,
      size: 10,
    }
  },
  computed: {
    opened_collapse: function () {
      return this.papers_group_state.filter((x) => x.open).map(x => x.author_id);
    }
  },
  created() {
    const userInfo = user.getters.getUser(user.state());

    // 若未检测到登录信息，则跳转登录界面
    if (!userInfo) {
      this.$message.warning("请先登录");
      setTimeout(() => {
        this.$router.push("/login");
      }, 1000);
    }
  },
  methods: {
    submit_info() {
      if (this.isStep1Valid()) {
        if (this.$route.query.v && this.$route.query.v!=='') {
          const userInfo = user.getters.getUser(user.state());
          this.applyInfo['user_id'] = userInfo.user.userId;
          this.applyInfo['author_id'] = this.$route.query.v;
          this.$notify({
            title: '成功',
            message: '由于您通过点击学者门户页面的认领按钮进入此页面，因此已自动为您选择学术成果',
            type: 'success'
          });
          setTimeout(() => {
            this.apply();
          }, 1000);
        } else {
          this.getArticlesByAuthor(this.applyInfo.author_name);
        }
      } else {
        this.$message.error("请完善必填信息！");
      }
    },
    confirm_choice() {
      const userInfo = user.getters.getUser(user.state());
      let userId = userInfo.user.userId;
      if (this.isStep2Valid()) {
        this.applyInfo['user_id'] = userId;
        this.apply();
      } else {
        this.$message.error("至少选择一个文献组！");
      }
    },
    apply() {
      let _loadingIns = this.$loading({fullscreen: true, text: '正在提交申请！'});
      this.$axios({
        method: 'post',
        url: '/submit/create',
        data: qs.stringify(this.applyInfo)
      })
      .then(res => {
        _loadingIns.close();
        switch (res.data.status) {
          case 200:
            this.step = 3;
            break;
          case 402:
            this.$userInvalid();
            break;
          case 404:
            this.$userNotFound();
            break;
          case 406:
            this.$message.warning("您已提交过认领申请！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    isStep1Valid() {
      return !(this.applyInfo.author_name === '' || this.applyInfo.affiliation_name === ''
          || this.applyInfo.work_email === '' || this.applyInfo.fields === '');
    },
    isStep2Valid() {
      for (let i = 0; i < this.papers_group_state.length; i++) {
        if (this.papers_group_state[i].selected === true) {
          this.applyInfo.author_id = this.papers_group_state[i].author_id;
          return true;
        }
      }
      return false;
    },
    gotoHome() {
      this.$router.push('/');
    },
    gotoArticle(paper_id) {
      let routeUrl = this.$router.resolve({
        path: '/article',
        query: { v: paper_id }
      });
      window.open(routeUrl .href, "_blank");
    },
    getArticlesByAuthor(author_name) {
      let _loadingIns = this.$loading({fullscreen: true, text: '正在根据您的姓名获取文献组'});
      this.$axios({
        method: 'post',
        url: '/submit/get/papers',
        data: qs.stringify({
          author_name: author_name,
          page: this.page,
          size: this.size
        })
      })
      .then(res => {
        _loadingIns.close();
        switch (res.data.status) {
          case 200:
            this.authors = res.data.authors;
            this.author_count = res.data.author_count;
            this.step = 2;
            // Init Selected
            this.papers_group_state = [];
            for (var i = 0; i < this.authors.length; i++) {
              this.papers_group_state.push({
                open: true,
                selected: false,
                author_id: this.authors[i].author_id
              })
            }
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
@import "../../styles/article.css";

.apply-settle .info-div {
  min-height: 500px;
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

.apply-settle .sub-title {
  font-size: 17px;
  font-weight: 600;
  margin-top: 8px;
}

.fill-in-row {
  padding: 10px;
  margin-bottom: 5px;
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