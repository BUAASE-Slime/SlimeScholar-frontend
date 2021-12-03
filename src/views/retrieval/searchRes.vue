<template>
  <div class="search-res">
    <PageHeader :showSearch="showSearch" :tag="tag" :options="articleOptions" :select="header_select" :input="input"></PageHeader>
    <div class="main-body">
      <el-row class="header">
        <span style="float:left; font-size: 22px; color: #A0A0A0">
        为您查询到
        <span style="color: #525455">&nbsp;{{ total_hits }}&nbsp;</span>
        条结果
        </span>
      </el-row>
      <div class="content-select-result">
        <el-row :gutter="0" v-if="total_hits!==0">
          <el-col :span="7"><div class="grid-content bg-purple" style="margin-right:50px">
            <span style="display:flex; margin-bottom:24px; margin-top:10px; font-size:16px; color: #A0A0A0">筛选</span>
            <el-card class="box-card">

              <div class="publish-year sub-block">
                <div class="check-box-title">
                  <span>发表年份</span>
                </div>
                <div style="text-align: left; font-size: 13px">
                  <span>范围：</span>
                  <span style="color: #0274B3; margin-top:2px">{{ year[0] }} ~ {{ year[1] }}</span>
                </div>
                <div style="margin-top: 20px; margin-bottom: 30px">
                  <el-slider v-model="year" range :min=minYear :max=maxYear></el-slider>
                </div>
              </div>

              <el-divider></el-divider>

              <div class="publish-type sub-block">
                <div class="check-box-title">
                  <span>类型</span>
                </div>
                <el-checkbox-group v-for="(o,index) in aggregation.doctype"
                     :key="index"
                     style="margin-bottom: 15px; text-align: left"
                     v-model="checkDoctypeList">
                  <div v-for="(val, key) in o" :key="key">
                    <el-checkbox :label=key>
                      <span>{{ key|ellipsis_25 }}&nbsp;({{ val }})</span>
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>

              <el-divider></el-divider>

              <div class="publish-journal sub-block">
                <div class="check-box-title">
                  <span>期刊</span>
                </div>
                <el-checkbox-group v-for="(o,index) in aggregation.journal"
                                   :key="index"
                                   style="margin-bottom: 15px; text-align: left"
                                   v-model="checkJournalList">
                  <el-checkbox :label=o.name>
                    <el-tooltip class="item" effect="dark" :content="o.name" placement="right">
                      <span>{{ o.name|ellipsis_25 }}&nbsp;({{ o.count }})</span>
                    </el-tooltip>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </el-card>
          </div>
          </el-col>

          <el-col :span="15"><div class="grid-content bg-purple">
            <div>
              <el-row>
                <el-col span="17">
                  <span style="display:flex; font-size:16px; margin-top:10px;color: #A0A0A0">论文 ({{total_hits}})</span>
                </el-col>
                <el-col span="2">
                  <div style="margin-top:10px">
                    <span style="font-size:16px;color: #A0A0A0">排序</span>
                  </div>
                </el-col>
                <el-col span="5">
                  <el-select v-model="value2" placeholder="请选择" style="float:right; height:30px; margin-bottom:5px">
                    <el-option
                        v-for="item in queue"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </div>

            <ArticleBlocks :articles="articles" flag="searchRes"></ArticleBlocks>

          </div></el-col>
        </el-row>
        <el-empty :image-size="200" description="暂无相关文献数据" v-else></el-empty>
      </div>
    </div>
  </div>
</template>

<script>

import ArticleBlocks from "../../components/ArticleBlocks";
import PageHeader from "../../components/PageHeader";

  export default {
    components: {PageHeader, ArticleBlocks},
    data() {
      return {
        showSearch: true,
        tag: 'searchRes',
        header_select: '1',
        input: "",
        articleOptions: [{
          value: '1',
          label: '篇关摘'
        }, {
          value: '2',
          label: '文献来源'
        }, {
          value: '3',
          label: '关键字'
        }, {
          value: 'title',
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

        total_hits:45112,
        select: '1',
        queue:["匹配程度","发表时间","引用次数"],
        value2:"匹配程度",
        minYear: 1900,
        maxYear: 2021,
        year: [1900, 2021],

        aggregation: {
          doctype: [
            {
              "Conference": 286
            },
            {
              "Journal": 170
            },
            {
              "Repository": 144
            },
            {
              "Thesis": 26
            },
            {
              "Patent": 12
            }
          ],
          journal: [
            {
              citation_count: "19256",
              count: 78,
              issn: "",
              journalid: "2595428313",
              name: "arXiv: Software Engineering",
              paper_count: "7794",
              publisher: "",
              rank: "10353",
              webpage: ""
            },
            {
              citation_count: "34541",
              count: 17,
              issn: "",
              journalid: "2595804992",
              name: "arXiv: Social and Information Networks",
              paper_count: "7232",
              publisher: "",
              rank: "10327",
              webpage: ""
            },
          ]
        },

        checkDoctypeList: [],
        checkJournalList: [],

        articles:[
          {
            authors: [
              {
                author_name: "John Lee",
                ids: [
                  "3362353",
                ]
              },
              {
                author_name: "Zuo_zuo",
                ids: [
                  "19373260",
                ]
              },
            ],
            paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
            paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets Knowledge-rich, computer-assisted composition of Chinese couplets",
            abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
            citation_count: 3288,
            comment_count: 5,
            year:2021,
            reference_count: 42,
            is_collect:true,
            // 是否收藏
          },
          {
            authors: [
              {
                author_name: "John Lee",
                ids: [
                  "3362353",
                ]
              },
              {
                author_name: "Zuo_zuo",
                ids: [
                  "19373260",
                ]
              },
            ],
            paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
            paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
            abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
            citation_count: 3288,
            comment_count: 5,
            year:2021,
            reference_count: 42,
            is_collect:true,
            // 是否收藏
          },
          {
            authors: [
              {
                author_name: "John Lee",
                ids: [
                  "3362353",
                ]
              },
              {
                author_name: "Zuo_zuo",
                ids: [
                  "19373260",
                ]
              },
            ],
            paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
            paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
            abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
            citation_count: 3288,
            comment_count: 5,
            year:2021,
            reference_count: 42,
            is_collect:true,
            // 是否收藏
          }
        ]
      }
    },
    created() {
      let _query = this.$route.query;
      let _search_key = Object.keys(_query)[0];
      let _search_value = _query[_search_key];

      this.header_select = _search_key;
      this.input = _search_value;

      // this.getSearchRes(1);
    },
    methods:{
      collectChange:function(item){
        item.is_collect=!(item.is_collect);
      },
      getSearchRes(pageIdx) {
        let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
        const _formData = new FormData();
        _formData.append(_search_key, _search_value);
        _formData.append("page", pageIdx);
        console.log(_formData);
        this.$axios({
          method: 'post',
          url: '/es/query/paper/' + _search_key,
          data: _formData
        })
        .then(res => {
          _loadingIns.close();
          switch (res.data.status) {
            case 200:
              this.articles = res.data.details;
              this.aggregation = res.data.aggregation;
              this.total_hits = res.data.total_hits.toLocaleString();
              break;
            case 404:
              this.total_hits = 0;
              break;
            case 500:
              this.$message.error("系统发生错误，请联系管理员！");
              setTimeout(() => {
                this.$router.push("/");
              }, 1500);
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    filters: {
      //超过20位显示 ...
      ellipsis: function(value) {
        if (!value) return "";
        if (value.length > 400) {
          return value.slice(0,400) + "...";
        }
        return value;
      },
      ellipsis_25: function(value) {
        if (!value) return "";
        if (value.length > 25) {
          return value.slice(0,25) + "...";
        }
        return value;
      }
    }, 
  };
</script>

<style scoped>

.search-res .main-body {
  padding: 0 100px 30px;
}

.search-res .header {
  margin-bottom: 40px;
}

.search-res .box-card {
  padding: 20px;
}

.search-res .box-card .sub-block {
  margin-bottom: 20px;
}

.search-res .box-card .check-box-title {
  text-align: left;
  font-size: 17px;
  margin-bottom: 20px;
}

</style>