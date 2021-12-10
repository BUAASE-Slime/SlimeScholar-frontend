<template>
  <div class="advSearch">
    <div id="option-div" v-bind:class="{changeH:!isShow}">
        <el-row >
          <el-col class="retrieval">
            <el-row :class="{'category-first':!index, 'category': index}" v-for="(item, index) in searchValue" :key="index">
              <el-col :span="21">
                <el-input placeholder="请输入内容" v-model="item.content" class="input-with-select">
                  <el-select v-if="index>0" v-model="item.type" slot="prepend" style="width: 80px; margin-right: 10px">
                    <el-option
                        v-for="(item, index) in types"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="item.category" slot="prepend" style="width: 120px">
                    <el-option
                        v-for="(item, index) in options"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-input>
              </el-col>
              <el-col :span="3" v-if="isShow">
                <el-button  v-if="index" circle icon="el-icon-minus" @click="deleteCategory(index)"></el-button>
                <el-button   :class="{'button_right': !index}" circle icon="el-icon-plus" @click="addCategory(index)" ></el-button>
              </el-col>
              <el-col :span="3" v-else>
                <el-button type="success" icon="el-icon-search" style="margin-left: 20px">&nbsp;检&nbsp;索</el-button>
              </el-col>
            </el-row>
            <el-row class="time">
              <span style="color: #8f9298; font-size: 14px; margin-right: 47px">发表日期</span>
              <el-date-picker
                  v-model="timeRange"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
              </el-date-picker>
            </el-row>
            <el-row class="button">
              <el-button type="success" icon="el-icon-search" @click="advanceSearch">&nbsp;检&nbsp;索</el-button>
            </el-row>
          </el-col>
        </el-row>
      </div>
    <el-button icon="el-icon-arrow-down" @click="isShow=!isShow" v-if="!isShow" class="changeButton"></el-button>
    <el-button icon="el-icon-arrow-up" @click="isShow=!isShow" v-if="isShow" class="changeButton"></el-button>
<!--    <el-row style="margin-top: 50px" >这里是文章列表</el-row>-->
    <ArticleRes v-if="isShowRes"
                mode="advance"
                :total_hits="total_hits"
                :total_hits_str="total_hits_str"
                :articles="articles"
                :aggregation="aggregation"
                :conditions="this.searchValue"
                :min_date="timeRange[0]"
                :max_date="timeRange[1]"
                style="margin-top: 30px"></ArticleRes>
  </div>
</template>

<script>
import ArticleRes from "../../components/ArticleRes";
import qs from "qs";
export default {
  name: "AdvSearch",
  components: {ArticleRes},
  data(){
    return{
      //articles info
      total_hits:45112,
      total_hits_str: '',
      aggregation: {
        conference: [
          {
            citation_count: 384,
            conference_id: "3083037350",
            count: 8,
            end: "2021-05-29",
            id: "3083037350",
            location: "Madrid, Spain",
            name: "ICSE 2021",
            offical_url: "https://conf.researchr.org/home/icse-2021",
            paper_count: 471,
            start: "2021-05-23"
          },
          {
            citation_count: 3246,
            conference_id: "71090686",
            count: 8,
            end: "2014-06-01",
            id: "71090686",
            location: "Hyderabad, India",
            name: "MSR 2014",
            offical_url: "http://2014.msrconf.org/",
            paper_count: 63,
            start: "2014-05-31"
          },],
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
            id: "2595428313",
            journal_id: "2595428313",
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
            id: "2595428313",
            journal_id: "2595804992",
            name: "arXiv: Social and Information Networks",
            paper_count: "7232",
            publisher: "",
            rank: "10327",
            webpage: ""
          },
        ],
        publisher: [
          {
            "IEEE": 13
          },
          {
            "Apress, Berkeley, CA": 8
          },
          {
            "IOP Publishing": 7
          },
          {
            "ACM": 5
          },
          {
            "The Open Journal": 4
          },
          {
            "Elsevier BV": 3
          },
          {
            "Github": 3
          },
          {
            "Packt Publishing": 3
          },
          {
            "Apress": 2
          }
        ]
      },
      //articles表示当前页面显示的文章块数组
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
          fields:[
            {
              "citation_count": 3383974,
              "field_id": "115903868",
              "level": 1,
              "main_type": "business.industry",
              "name": "Software engineering",
              "paper_count": 368585,
              "rank": 8347
            },
            {
              "citation_count": 3901149,
              "field_id": "136197465",
              "level": 2,
              "main_type": "",
              "name": "Variety (cybernetics)",
              "paper_count": 243478,
              "rank": 8507
            }],
          paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
          paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets Knowledge-rich, computer-assisted composition of Chinese couplets",
          abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonotypeal principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
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
          fields:[
            {
              "citation_count": 3383974,
              "field_id": "115903868",
              "level": 1,
              "main_type": "business.industry",
              "name": "Software engineering",
              "paper_count": 368585,
              "rank": 8347
            },
            {
              "citation_count": 3901149,
              "field_id": "136197465",
              "level": 2,
              "main_type": "",
              "name": "Variety (cybernetics)",
              "paper_count": 243478,
              "rank": 8507
            }],
          paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
          paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
          abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonotypeal principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
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
          fields:[
            {
              "citation_count": 3383974,
              "field_id": "115903868",
              "level": 1,
              "main_type": "business.industry",
              "name": "Software engineering",
              "paper_count": 368585,
              "rank": 8347
            },
            {
              "citation_count": 3901149,
              "field_id": "136197465",
              "level": 2,
              "main_type": "",
              "name": "Variety (cybernetics)",
              "paper_count": 243478,
              "rank": 8507
            }],
          paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
          paper_title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
          abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonotypeal principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
          citation_count: 3288,
          comment_count: 5,
          year:2021,
          reference_count: 42,
          is_collect:true,
          // 是否收藏
        }
      ],

      isShow:true,
      isShowRes: false,
      searchValue: [
        {
          category: 'title_key_abstract',
          content: "",
          type: 1,
        },
        {
          category: 'title',
          content: "",
          type: 1,
        },
        {
          category: 'author',
          content: "",
          type: 1,
        },
      ],
      timeRange: ['0', '0'],
      options: [
        {
          value: 'title_key_abstract',
          label: '篇关摘'
        },
        {
          value: 'title',
          label: '篇名',
        }, {
          value: 'author',
          label: '作者'
        }, {
          value: 'abstract',
          label: '摘要'
        }, {
          value: 'field',
          label: '领域'
        },  {
          value: 'doi',
          label: 'DOI'
        },  {
          value: 'author_affiliation',
          label: '作者机构'
        },  {
          value: 'source',
          label: '文献来源'
        },
      ],
      types: [
        {
          value: 1,
          label: 'AND',
        }, {
          value: 2,
          label: 'OR'
        }, {
          value: 3,
          label: 'NOT'
        },
      ],
    }
  },
  methods:{
    deleteCategory: function (index) {
      this.searchValue.splice(index, 1)
    },
    addCategory: function (index) {
      if (this.searchValue.length >= 10) {
        this.$message.warning('添加失败！检索项必须在10条以内！')
        return;
      }
      this.searchValue.push({
        category: this.searchValue[index].category,
        content: '',
        type: this.searchValue[index].type,
      })
    },
    isValueEmpty() {
      for (let i = 0; i < this.searchValue.length; i++)
        if (this.searchValue[i].content !== '')
          return false;
      return true;
    },
    advanceSearch() {
      if (this.isValueEmpty()) {
        this.$message.warning("请输入检索词！");
        return;
      }
      // 清除空检索依据
      this.searchValue = this.searchValue.filter(item => item.content !== '');

      let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      this.$axios({
        method: 'post',
        url: '/es/query/paper/advanced',
        data: qs.stringify({
          conditions: JSON.stringify(this.searchValue),
          min_date: this.timeRange[0],
          max_date: this.timeRange[1],
          page: 1,
          size: 10,
        })
      })
      .then(res => {
        _loadingIns.close();
        switch (res.data.status) {
          case 200:
            this.articles = res.data.details;
            this.aggregation = res.data.aggregation;
            this.total_hits = res.data.total_hits;
            this.total_hits_str = res.data.total_hits.toLocaleString();
            if (res.data.total_hits === 10000)
              this.total_hits_str = "10000+";
            this.isShow = false;
            this.isShowRes = true;
            break;
          case 401:
            this.$message.error('参数错误！');
            break;
          case 404:
            this.total_hits = 0;
            this.total_hits_str = '0';
            this.isShow = false;
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
}
</script>

<style scoped>
.advSearch {
  width: 100%;
  height: 100%;
}

.advSearch #option-div{
  transition: 1s fade;
  min-height: 80px;
  width: 75%;
  text-align: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
  margin-left: 190px;
  margin-top: 10px;
  overflow: hidden;
}
.changeH{
  height: 80px !important;
}

.changeButton{
  height: 20px;
  width: 50px;
  padding: 0 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}

.retrieval {
  background-color: white;
  padding-top: 20px;
  padding-bottom: 50px;
  padding-left: 50px;
  padding-right: 50px;

}

.category {
  margin-top: 20px;
}

.category-first {
  margin-left: 70px;
  padding-right: 1%;
}

.button_right {
  margin-left: 50%;
}

.time {
  float: left;
  margin-top: 20px;
  padding-left: 88px;
}

.button {
  margin-top: 20px;
  margin-left: 696px;
}


</style>