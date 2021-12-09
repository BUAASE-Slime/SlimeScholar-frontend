<template>
  <div class="search-res">
    <PageHeader :showSearch="showSearch"
                :tag="tag"
                :options="articleOptions"
                :select="header_select"
                :input="input"></PageHeader>
    <ArticleRes :header_select="header_select"
                :input="input"
                :aggregation="aggregation"
                :articles="articles"
                :total_hits_str="total_hits_str"
                :total_hits="total_hits"
                @changeCollect="changeCollect"
                mode="normal"></ArticleRes>
  </div>
</template>

<script>

import PageHeader from "../../components/PageHeader";
import ArticleRes from "../../components/ArticleRes";
import qs from "qs";

  export default {
    components: {ArticleRes, PageHeader},
    data() {
      return {
        showSearch: true,
        tag: 'searchRes',
        header_select: '1',
        input: "",
        articleOptions: [{
            value: 'title_abstract',
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
            abstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
            citation_count: 3288,
            comment_count: 5,
            year:2021,
            reference_count: 42,
            is_collect:true,
            // 是否收藏
          }
        ],
      }
    },
    created() {
      let _query = this.$route.query;
      let _search_key = Object.keys(_query)[0];
      let _search_value = _query[_search_key];

      this.header_select = _search_key;
      this.input = _search_value;
      this.getSearchRes(1);
    },
    methods:{
      getSearchRes(pageIdx) {
        // let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
        this.$axios({
          method: 'post',
          url: '/es/query/paper/' + this.header_select,
          data: qs.stringify({
            [this.header_select]: this.input,
            page: pageIdx,
            is_precise: true,
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
              break;
            case 404:
              this.total_hits = 0;
              this.total_hits_str = '0';
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
      },
      changeCollect(data) {
        let paper = data.paper;
        let status = data.newStatus;
        for (var i = 0; i < this.articles.length; i++)
          if (this.articles[i].paper_id === paper.paper_id)
            this.articles[i].is_collect = status;
      },
    },
  };
</script>

<style scoped>

/* .search-res >>> .el-input-number.is-controls-right .el-input-number__decrease{
  width:15px !important;
  height: 14px;

}

.search-res >>> .el-input-number.is-controls-right .el-input-number__increase{
  width:15px !important;
  height: 14px;
  margin-top: 3px;
}

.search-res >>> .el-input-number.is-controls-right .el-input__inner {
    padding-left: 10px;
    padding-right: 20px;
    height: 30px;
} */

.search-res >>> .el-pager li{
  width:40px;
  height:40px;
  padding: 7px;
}

.search-res >>> .el-pagination .btn-prev .el-icon{
  font-size: 15px;
  margin: 15px;
}

.search-res >>> .el-pagination .btn-next .el-icon{
  font-size: 15px;
  margin: 15px;
}

.search-res .main-body {
  padding: 0 40px 20px 80px;
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

.search-res .year-input >>> .el-input--mini .el-input__inner {
  font-size: 13px;
  color: #0274B3;
}

.search-res .year-input >>> .el-input__inner {
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
}

.search-res .year-input >>> .el-input--mini {
  width: 45px;
  text-align: center;
}

.search-res >>> .el-pagination__editor.el-input .el-input__inner {
    height: 40px;
}

.search-res >>> .el-pagination__jump{
  font-size: 15px;
}

.search-res .box-card .check-box-title {
  text-align: left;
  font-size: 17px;
  margin-bottom: 20px;
}

</style>