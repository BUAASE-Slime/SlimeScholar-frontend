<template>
<div class="homepage" id="homepage">
  <div class="background">
    <img src="../../assets/images/background4.jpg" class="background" alt="">
  </div>
  <PageHeader mode="black"></PageHeader>
  <div>
  <div class="main" id="pageMain">
    <div class="input-box-body">
      <div class="title">Make Academia Visible</div>
      <div class="input-box">
        <el-dropdown @command="handleCommand" trigger="click" placement="bottom">
          <el-input placeholder="请输入内容"
                    v-model="searchValue"
                    class="input-with-select"
                    @keyup.enter.native="goSearch"
                    style="width: 750px; font-size: 17px"
          >
            <el-select v-model="select" slot="prepend" placeholder="检索依据" style="width: 130px" >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
          </el-input>
          <el-dropdown-menu slot="dropdown" style="width: 750px" v-if="showPrefix">
            <el-dropdown-item
                v-for="item in results"
                :key="item"
                :command="item"
                v-html="highlight(item)">
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="logos">
      <el-row gutter="0" justify="center" type="flex">
        <el-col :span="5"><div class="grid-content bg-purple test_a">
          <el-row>
            <el-col :span="5" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_aut.jpg" style="width:70px">
            </el-col>
            <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 class="sub-title">Authors</h3>
              <h2 class="sub-number">{{ statistic.author_count }}</h2>
            </el-col>
          </el-row>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple test_a">
          <el-row>
            <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_art.jpg" style="width:70px">
            </el-col>
            <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 class="sub-title">Papers</h3>
              <h2 class="sub-number">{{ statistic.paper_count }}</h2>
            </el-col>
          </el-row>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple test_a">
          <el-row>
            <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_jou.jpg" style="width:70px">
            </el-col>
            <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 class="sub-title">Journals</h3>
              <h2 class="sub-number">{{ statistic.journal_count }}</h2>
            </el-col>
          </el-row>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple test_a">
          <el-row>
            <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_org.jpg" style="width:70px">
            </el-col>
            <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 class="sub-title">Organizations</h3>
              <h2 class="sub-number">{{ statistic.affiliation_count }}</h2>
            </el-col>
          </el-row>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple test_a">
          <el-row>
            <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_fie.jpg" style="width:70px">
            </el-col>
            <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 class="sub-title">Field</h3>
              <h2 class="sub-number">{{ statistic.fields_count }}</h2>
            </el-col>
          </el-row>
        </div></el-col>
      </el-row>
    </div>

    <div class="topRecommend" id="topRecommend">
      <el-tabs v-model="activeNameOut">
        <el-tab-pane label="热门文献" name="topArticle" style="text-align: left">
          <Articles :articles="top_articles"></Articles>
        </el-tab-pane>
        <el-tab-pane label="推荐文献" name="recommended_articles" style="text-align: left">
          <Articles :articles="recommended_articles"></Articles>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import Articles from "../../components/Articles";
import PageHeader from "../../components/PageHeader";
import $ from 'jquery';
import qs from "qs";
export default {
  name: "HomePage",
  components: {PageHeader, Articles},
  data() {
    return {
      activeNameOut: "topArticle",

      searchValue: '',
      select: 'main',

      statistic: {
        affiliation_count: '27,063',
        author_count: '280,050,502',
        conference_count: '16,479',
        fields_count: '714,856',
        journal_count: '49,063',
        paper_count: '269,451,039',
        topic_count: 0
      },

      options: [
        {
          value: 'main',
          label: '篇关摘'
        }, {
          value: 'title',
          label: '篇名'
        }, {
          value: 'abstract',
          label: '摘要'
        }, {
          value: 'field',
          label: '领域'
        }, {
          value: 'author_name',
          label: '作者'
        }, {
          value: 'affiliation_name',
          label: '作者单位'
        }, {
          value: 'publisher',
          label: '文献来源'
        }, {
          value: 'doi',
          label: 'DOI'
        },
      ],
      value: '',

      top_articles:[
        {
          authors: [
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            },
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            },
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            },
          ],
          book_title: "",
          citation_count: "0",
          citation_msg: [],
          conference: {
            name: "",
          },
          collect_num: 13,
          conference_id: "",
          date: "2021-11-01",
          doctype: "",
          doi: "10.1016/J.SIMPA.2021.100115",
          doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
          fields: [],
          first_page: "100115",
          journal: {
            citation_count: "451567",
            issn: "",
            journalid: "2597175965",
            name: "arXiv: Computer Vision and Pattern Recognition",
            paper_count: "49431",
            publisher: "",
            rank: "8182",
            webpage: ""
          },
          journal_id: "",
          last_page: "12312",
          paper_id: "3191610454",
          paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
          publisher: "Elsevier BV",
          rank: "23112",
          reference_count: "12",
          volume: "10",
          year: "2021",
          abstract: "Importance In December 2019, novel coronavirus (2019-nCoV)–infected pneumonia (NCIP) occurred in Wuhan, China. The number of cases has increased rapidly but information on the clinical characteristics of affected patients is limited. Objective To describe the epidemiological and clinical characteristics of NCIP. Design, Setting, and Participants Retrospective, single-center case series of the 138 consecutive hospitalized patients with confirmed NCIP at Zhongnan Hospital of Wuhan University in Wuhan, China, from January 1 to January 28, 2020; final date of follow-up was February 3, 2020. Exposures Documented NCIP. Main Outcomes and Measures Epidemiological, demographic, clinical, laboratory, radiological, and treatment data were collected and analyzed. Outcomes of critically ill patients and noncritically ill patients were compared. Presumed hospital-related transmission was suspected if a cluster of health professionals or hospitalized patients in the same wards became infected and a possible source of infection could be tracked. Results Of 138 hospitalized patients with NCIP, the median age was 56 years (interquartile range, 42-68; range, 22-92 years) and 75 (54.3%) were men. Hospital-associated transmission was suspected as the presumed mechanism of infection for affected health professionals (40 [29%]) and hospitalized patients (17 [12.3%]). Common symptoms included fever (136 [98.6%]), fatigue (96 [69.6%]), and dry cough (82 [59.4%]). Lymphopenia (lymphocyte count, 0.8 × 109/L [interquartile range {IQR}, 0.6-1.1]) occurred in 97 patients (70.3%), prolonged prothrombin time (13.0 seconds [IQR, 12.3-13.7]) in 80 patients (58%), and elevated lactate dehydrogenase (261 U/L [IQR, 182-403]) in 55 patients (39.9%). Chest computed tomographic scans showed bilateral patchy shadows or ground glass opacity in the lungs of all patients. Most patients received antiviral therapy (oseltamivir, 124 [89.9%]), and many received antibacterial therapy (moxifloxacin, 89 [64.4%]; ceftriaxone, 34 [24.6%]; azithromycin, 25 [18.1%]) and glucocorticoid therapy (62 [44.9%]). Thirty-six patients (26.1%) were transferred to the intensive care unit (ICU) because of complications, including acute respiratory distress syndrome (22 [61.1%]), arrhythmia (16 [44.4%]), and shock (11 [30.6%]). The median time from first symptom to dyspnea was 5.0 days, to hospital admission was 7.0 days, and to ARDS was 8.0 days. Patients treated in the ICU (n = 36), compared with patients not treated in the ICU (n = 102), were older (median age, 66 years vs 51 years), were more likely to have underlying comorbidities (26 [72.2%] vs 38 [37.3%]), and were more likely to have dyspnea (23 [63.9%] vs 20 [19.6%]), and anorexia (24 [66.7%] vs 31 [30.4%]). Of the 36 cases in the ICU, 4 (11.1%) received high-flow oxygen therapy, 15 (41.7%) received noninvasive ventilation, and 17 (47.2%) received invasive ventilation (4 were switched to extracorporeal membrane oxygenation). As of February 3, 47 patients (34.1%) were discharged and 6 died (overall mortality, 4.3%), but the remaining patients are still hospitalized. Among those discharged alive (n = 47), the median hospital stay was 10 days (IQR, 7.0-14.0). Conclusions and Relevance In this single-center case series of 138 hospitalized patients with confirmed NCIP in Wuhan, China, presumed hospital-related transmission of 2019-nCoV was suspected in 41% of patients, 26% of patients received ICU care, and mortality was 4.3%."
        },
        {
          collect_num: 13,
          authors: [
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            },
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            },
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            }
          ],
          book_title: "",
          citation_count: "0",
          citation_msg: [],
          conference: {
            name: "",
          },
          conference_id: "",
          date: "2021-11-01",
          doctype: "",
          doi: "10.1016/J.SIMPA.2021.100115",
          doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
          fields: [],
          first_page: "100115",
          journal: {
            citation_count: "451567",
            issn: "",
            journalid: "2597175965",
            name: "arXiv: Computer Vision and Pattern Recognition",
            paper_count: "49431",
            publisher: "",
            rank: "8182",
            webpage: ""
          },
          journal_id: "",
          last_page: "12312",
          paper_id: "3191610454",
          paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
          publisher: "Elsevier BV",
          rank: "23112",
          reference_count: "12",
          volume: "10",
          year: "2021"
        },
        {
          collect_num: 13,
          authors: [
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            }
          ],
          book_title: "",
          citation_count: "0",
          citation_msg: [],
          conference: {
            name: "",
          },
          conference_id: "",
          date: "2021-11-01",
          doctype: "",
          doi: "10.1016/J.SIMPA.2021.100115",
          doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
          fields: [],
          first_page: "100115",
          journal: {
            citation_count: "451567",
            issn: "",
            journalid: "2597175965",
            name: "arXiv: Computer Vision and Pattern Recognition",
            paper_count: "49431",
            publisher: "",
            rank: "8182",
            webpage: ""
          },
          journal_id: "",
          last_page: "12312",
          paper_id: "3191610454",
          paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
          publisher: "Elsevier BV",
          rank: "23112",
          reference_count: "12",
          volume: "10",
          year: "2021"
        }
      ],
      recommended_articles:[
        {
          authors: [
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            },
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            },
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            },
          ],
          book_title: "",
          citation_count: "0",
          citation_msg: [],
          conference: {
            name: "",
          },
          collect_num: 13,
          conference_id: "",
          date: "2021-11-01",
          doctype: "",
          doi: "10.1016/J.SIMPA.2021.100115",
          doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
          fields: [],
          first_page: "100115",
          journal: {
            citation_count: "451567",
            issn: "",
            journalid: "2597175965",
            name: "arXiv: Computer Vision and Pattern Recognition",
            paper_count: "49431",
            publisher: "",
            rank: "8182",
            webpage: ""
          },
          journal_id: "",
          last_page: "12312",
          paper_id: "3191610454",
          paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
          publisher: "Elsevier BV",
          rank: "23112",
          reference_count: "12",
          volume: "10",
          year: "2021",
          abstract: "Importance In December 2019, novel coronavirus (2019-nCoV)–infected pneumonia (NCIP) occurred in Wuhan, China. The number of cases has increased rapidly but information on the clinical characteristics of affected patients is limited. Objective To describe the epidemiological and clinical characteristics of NCIP. Design, Setting, and Participants Retrospective, single-center case series of the 138 consecutive hospitalized patients with confirmed NCIP at Zhongnan Hospital of Wuhan University in Wuhan, China, from January 1 to January 28, 2020; final date of follow-up was February 3, 2020. Exposures Documented NCIP. Main Outcomes and Measures Epidemiological, demographic, clinical, laboratory, radiological, and treatment data were collected and analyzed. Outcomes of critically ill patients and noncritically ill patients were compared. Presumed hospital-related transmission was suspected if a cluster of health professionals or hospitalized patients in the same wards became infected and a possible source of infection could be tracked. Results Of 138 hospitalized patients with NCIP, the median age was 56 years (interquartile range, 42-68; range, 22-92 years) and 75 (54.3%) were men. Hospital-associated transmission was suspected as the presumed mechanism of infection for affected health professionals (40 [29%]) and hospitalized patients (17 [12.3%]). Common symptoms included fever (136 [98.6%]), fatigue (96 [69.6%]), and dry cough (82 [59.4%]). Lymphopenia (lymphocyte count, 0.8 × 109/L [interquartile range {IQR}, 0.6-1.1]) occurred in 97 patients (70.3%), prolonged prothrombin time (13.0 seconds [IQR, 12.3-13.7]) in 80 patients (58%), and elevated lactate dehydrogenase (261 U/L [IQR, 182-403]) in 55 patients (39.9%). Chest computed tomographic scans showed bilateral patchy shadows or ground glass opacity in the lungs of all patients. Most patients received antiviral therapy (oseltamivir, 124 [89.9%]), and many received antibacterial therapy (moxifloxacin, 89 [64.4%]; ceftriaxone, 34 [24.6%]; azithromycin, 25 [18.1%]) and glucocorticoid therapy (62 [44.9%]). Thirty-six patients (26.1%) were transferred to the intensive care unit (ICU) because of complications, including acute respiratory distress syndrome (22 [61.1%]), arrhythmia (16 [44.4%]), and shock (11 [30.6%]). The median time from first symptom to dyspnea was 5.0 days, to hospital admission was 7.0 days, and to ARDS was 8.0 days. Patients treated in the ICU (n = 36), compared with patients not treated in the ICU (n = 102), were older (median age, 66 years vs 51 years), were more likely to have underlying comorbidities (26 [72.2%] vs 38 [37.3%]), and were more likely to have dyspnea (23 [63.9%] vs 20 [19.6%]), and anorexia (24 [66.7%] vs 31 [30.4%]). Of the 36 cases in the ICU, 4 (11.1%) received high-flow oxygen therapy, 15 (41.7%) received noninvasive ventilation, and 17 (47.2%) received invasive ventilation (4 were switched to extracorporeal membrane oxygenation). As of February 3, 47 patients (34.1%) were discharged and 6 died (overall mortality, 4.3%), but the remaining patients are still hospitalized. Among those discharged alive (n = 47), the median hospital stay was 10 days (IQR, 7.0-14.0). Conclusions and Relevance In this single-center case series of 138 hospitalized patients with confirmed NCIP in Wuhan, China, presumed hospital-related transmission of 2019-nCoV was suspected in 41% of patients, 26% of patients received ICU care, and mortality was 4.3%."
        },
        {
          collect_num: 13,
          authors: [
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            },
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            },
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            }
          ],
          book_title: "",
          citation_count: "0",
          citation_msg: [],
          conference: {
            name: "",
          },
          conference_id: "",
          date: "2021-11-01",
          doctype: "",
          doi: "10.1016/J.SIMPA.2021.100115",
          doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
          fields: [],
          first_page: "100115",
          journal: {
            citation_count: "451567",
            issn: "",
            journalid: "2597175965",
            name: "arXiv: Computer Vision and Pattern Recognition",
            paper_count: "49431",
            publisher: "",
            rank: "8182",
            webpage: ""
          },
          journal_id: "",
          last_page: "12312",
          paper_id: "3191610454",
          paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
          publisher: "Elsevier BV",
          rank: "23112",
          reference_count: "12",
          volume: "10",
          year: "2021"
        },
        {
          collect_num: 13,
          authors: [
            {
              affiliation_id: "",
              affiliation_name: "Independent Researcher",
              author_id: "3323123",
              author_name: "Sergei Belousov",
              order: "1"
            }
          ],
          book_title: "",
          citation_count: "0",
          citation_msg: [],
          conference: {
            name: "",
          },
          conference_id: "",
          date: "2021-11-01",
          doctype: "",
          doi: "10.1016/J.SIMPA.2021.100115",
          doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
          fields: [],
          first_page: "100115",
          journal: {
            citation_count: "451567",
            issn: "",
            journalid: "2597175965",
            name: "arXiv: Computer Vision and Pattern Recognition",
            paper_count: "49431",
            publisher: "",
            rank: "8182",
            webpage: ""
          },
          journal_id: "",
          last_page: "12312",
          paper_id: "3191610454",
          paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
          publisher: "Elsevier BV",
          rank: "23112",
          reference_count: "12",
          volume: "10",
          year: "2021"
        }
      ],

      results: [],
      showPrefix: true,
    }
  },
  created() {
    this.getInfo();
    this.getRecommend();
  },
  watch: {
    searchValue(newVal, oldVal) {
      if (newVal !== '' && newVal !== oldVal)
        this.getPrefix();
    },
    select(newVal, oldVal) {
      if (newVal !== '' && newVal !== oldVal)
        this.getPrefix();
    },
    results(newVal) {
      if (newVal.length > 0)
        this.showPrefix = true;
    }
  },
  methods:{
    getInfo() {
      let self = this;
      this.$axios.all([this.getStat(), this.getHot()])
      .then(this.$axios.spread(function (statDetail, recomDetail) {
        if (statDetail.data.success) {
          self.statistic = statDetail.data;

          self.statistic.fields_count = self.statistic.fields_count.toLocaleString();
          self.statistic.affiliation_count = self.statistic.affiliation_count.toLocaleString();
          self.statistic.author_count = self.statistic.author_count.toLocaleString();
          self.statistic.journal_count = self.statistic.journal_count.toLocaleString();
          self.statistic.paper_count = self.statistic.paper_count.toLocaleString();

        } else {
          this.$message.error("系统错误，请联系管理员解决");
        }

        if (recomDetail.data.success) {
          self.top_articles = recomDetail.data.data;
        } else {
          this.$message.error("系统错误，请联系管理员解决");
        }
      }))
      .catch(err => {
        console.log(err);
      })
    },
    getStat() {
      return this.$axios({
        method: 'post',
        url: '/count/all',
      });
    },
    getHot() {
      return this.$axios({
        method: 'post',
        url: '/es/query/paper/hot'
      })
    },
    getRecommend() {
      this.$axios({
        method: 'post',
        url: '/es/query/paper/recommend'
      })
      .then(res => {
        if (res.data.success) this.recommended_articles = res.data.data;
        else this.$message.error("推荐文献获取失败！");
      })
      .catch(err => {
        console.log(err);
      })
    },
    handleCommand(value) {
      let routeUrl = this.$router.resolve({
        path: '/searchRes?' + this.select + "=" + value,
      });
      window.open(routeUrl .href, "_self");
    },
    goSearch:function() {
      if (this.searchValue === '') {
        this.$message.warning("请输入检索词！");
        return;
      }
      let routeUrl = this.$router.resolve({
        path: '/searchRes?' + this.select + "=" + this.searchValue,
      });
      window.open(routeUrl .href, "_self");
    },
    getPrefix() {
      if (['title', 'main', 'publisher', 'author_name', 'affiliation_name', 'field'].includes(this.select)) {
        this.$axios({
          method: 'post',
          url: '/es/get/prefix',
          data: qs.stringify({
            name: this.select,
            content: this.searchValue
          })
        })
        .then(res => {
          if (res.data.success) {
            this.results = res.data.results;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    highlight(src) {
      let value = src;
      let key = this.searchValue;
      if (!value || !key) return "";
      if (value.length > 100) {
        return value.slice(0,100) + "...";
      }
      let start = value.toLowerCase().indexOf(key.toLowerCase());
      if (start !== -1) {
        return value.replace(value.slice(start, start+key.length), `<font color='#1e90ff' style='font-weight: bold'">${value.slice(start, start+key.length)}</font>`);
      } else {
        return value;
      }
    }
  },
}
</script>

<style scoped>

.homepage {
  min-width: 1100px;
}

.homepage .input-box-body {
  padding-left: 7%;
  padding-right: 10%;
  text-align: left;
}

.homepage .background {
  position:absolute;
  width:100%;
  height:100%;
  left:0;
  z-index:-1;
  object-fit: cover;
}

.homepage .input-box {
  margin-top: 60px;
}
.homepage .input-box >>> .el-input.is-active .el-input__inner, .el-input__inner:focus {
  border: 5px solid #409EFF;
}
.homepage .input-box >>> .el-input__inner {
  height: 50px;
}
.homepage .input-box >>> .el-input-group__append {
  background-color: #409EFF;
  color: white;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: none;
  border-radius: 0 6px 6px 0;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
}
.homepage .input-box >>> .el-input-group__append:hover {
  background-color: #52a9ff;
}
.homepage .input-box >>> .el-input-group--prepend {
  border-radius: 6px 0 0 6px;
}
.homepage .input-box-body .input-box button {
  color: white;
}

.homepage .title {
  font-family: "Asap SemiBold",tahoma,arial,"Hiragino Sans GB",\5b8b\4f53, sans-serif;
  font-size: 60px;
  margin-top: 160px;
  color: white;
  font-weight: 600;
}

.homepage .sub-title {
  display:block;
  font-family: 'Courier New',serif;
  font-weight:bold;
  margin-bottom:0 !important;
  color:white;
}

.homepage .sub-number {
  display:block;
  font-family:'Courier New',serif;
  margin-top:10px;
  color:white;
}

.homepage .logos {
  margin-top: 230px;
  padding-top: 0px;
  padding-left: 5%;
  background-color: rgba(0, 0, 0, 0.2);
}

.homepage .topRecommend {
  min-width: 900px;
  margin: 50px 12%;
  padding: 20px 40px 60px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

.homepage >>> .el-tabs__item{
  padding-left: 20px;
  height: 45px;
  font-size: medium;
}

.homepage >>> .el-tabs__item.is-active{
  color: #00b1fd;
  font-weight: 650;
}

.homepage >>> .el-tabs__active-bar{
  transition: all 0.3s;
  background-color: #00b1fd;
}

.homepage .main .el-col {
  border-radius: 4px ;
}
.homepage .main .bg-purple-dark {
  background: #cccccc !important;
}
#list .bg-purple {
  background: #f5f5f5;
  /* #efeefd */
  padding:20px;
  border-radius: 14px ;
  border: gainsboro solid 1px;
}

.homepage .headImg{
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-left: 10px;
  margin-top: 10px;
}
.homepage .grid-content[data-v-1274387a] {
  border-radius: 14px;
  min-height: 36px;
}
.homepage .bg-purple-light {
  background: #e5e9f2;
}
.homepage .grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.homepage .row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.homepage .clearfix:before,
.homepage .clearfix:after {
  display: table;
  content: "";
}
.homepage .clearfix:after {
  clear: both
}
.homepage .test_a {
  display: block;
  margin: 0 auto;
  width:100%;
  overflow: hidden;
}

.homepage .test_a img {
  width: 100%;
  transform: scale(1);
  transition: all 1s ease 0s;
}

.homepage .test_a:hover img {
  transform: scale(1.2);
  transition: all 1s ease 0s;
}

  
</style>