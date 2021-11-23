<template>
  <el-container class="article-body">

    <el-main class="info">
      <el-row class="info-title">
        <el-col :span="18" class="title-text">
          {{ articleData.title }}
        </el-col>
        <el-col :span="6" class="title-button">
          <el-tooltip class="item" effect="light" content="引用" placement="bottom">
            <el-button icon="el-icon-paperclip" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="评论" placement="bottom">
            <el-button type="primary" icon="el-icon-chat-dot-square" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="收藏" placement="bottom">
            <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="分享" placement="bottom">
            <el-button type="success" icon="el-icon-share" circle @click="share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="下载" placement="bottom">
            <el-button type="danger" icon="el-icon-download" circle @click="download"></el-button>
          </el-tooltip>
        </el-col>
      </el-row>

      <el-row class="info-author">
        <span v-for="author in articleData.authors" v-bind:key="author.index" @click="toAuthor(author.ids[0])">
          <span class="link">{{ author.name }}</span>&ensp;
        </span>
      </el-row>
      <el-row class="info-block1">
        <el-col :span="2" class="line-title">摘要：</el-col>
        <el-col :span="22" class="line-text">{{ getAbstract(articleData.paperAbstract) }}</el-col>
      </el-row>
<!--      <el-row class="info-block2">-->
<!--        <el-col :span="2" class="line-title">关键词：</el-col>-->
<!--        <span class="line-text" v-for="keyword in article.keywords" v-bind:key="keyword.index">{{ keyword }};&nbsp;&nbsp;</span>-->
<!--      </el-row>-->
      <el-row class="info-block2">
        <el-col :span="2" class="line-title">专题：</el-col>
        <span class="line-text" v-for="field in articleData.fieldsOfStudy" v-bind:key="field.index">{{ field }}&nbsp;&nbsp;</span>
      </el-row>
      <el-row class="info-block2">
        <el-col :span="2" class="line-title">期刊：</el-col>
        <el-col :span="22" class="line-text">
          <span style="font-style: italic">
            {{ articleData.journalName }}
          </span>
          <span>
            [Volume {{ articleData.journalVolume }}, Pages {{ articleData.journalPages }}, {{ articleData.year }}]
          </span>
        </el-col>
      </el-row>
      <el-row class="info-block2">
        <el-col :span="2" class="line-title">DOI：</el-col>
        <el-col :span="22" class="line-text link">
          <span @click="toDOI(articleData.doi)" style="font-size: 16px">{{ articleData.doi }}</span>
        </el-col>
      </el-row>

      <el-row class="cite">
        <el-col :span="18" class="cite-table">
          <el-tabs type="border-card">
            <el-tab-pane label="参考文献">
              <el-scrollbar style="height:100%">
                <div style="height: 112px">
                  <el-row class="cite-article" v-for="(article, index) in articleData.reference_msg" v-bind:key="index">
                    <span @click="toArticle(article)">[{{ index+1 }}]&nbsp;&nbsp;{{ article.title }}</span>
                  </el-row>
                </div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="引证文献">
              <el-scrollbar style="height:100%">
                <div style="height: 116px">
                  <el-row class="cite-article" v-for="(article, index) in articleData.inCitations" v-bind:key="index" @click="toArticle(article)">
                    <span @click="toArticle(article)">[{{ index+1 }}]&nbsp;&nbsp;{{ article }}</span>
                  </el-row>
                </div>
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
        </el-col>

        <el-col :span="3" class="cite-graph1 out1">
          {{ articleData.reference_num }}
          <div class="cite-text">引用量</div>
        </el-col>
        <el-col :span="3" class="cite-graph1 in1">
          {{ articleData.citation_num }}
          <div class="cite-text">被引量</div>
        </el-col>
        <el-col :span="3" class="cite-graph2 out2">
          {{ articleData.comment_num }}
          <div class="cite-text">评论数</div>
        </el-col>
        <el-col :span="3" class="cite-graph2 in2">
          {{ articleData.comment_num }}
          <div class="cite-text">评论人数</div>
        </el-col>
      </el-row>
    </el-main>

    <el-aside class="catalogue">
      <div class="catalogue-title">
        相关文章
      </div>
    </el-aside>

  </el-container>
</template>

<script>
export default {
  name: "article",
  data() {
    return {
      articleData: {
        id: "4cd223df721b722b1c40689caa52932a41fcc223",
        title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
        paperAbstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
        citation_num: 3288,
        reference_num: 14,
        comment_num: 5,
        entities: [
        ],
        fieldsOfStudy: [
          "Computer Science"
        ],
        s2Url: "https://semanticscholar.org/paper/4cd223df721b722b1c40689caa52932a41fcc223",
        pdfUrls: [
          "https://doi.org/10.1093/llc/fqu052",
        ],
        s2PdfUrl: "",
        authors: [
          {
            name: "John Lee",
            ids: [
              "3362353",
            ]
          },
          {
            name: "Zuo_zuo",
            ids: [
              "19373260",
            ]
          },
        ],
        // keywords:[
        //     "Automatic language generation",
        //     "Computer-assisted",
        // ],
        // inCitations: [
        //   "c789e333fdbb963883a0b5c96c648bf36b8cd242",
        //   "c789e333fdbb963883a0b5c96c648bf36b8cd242",
        //   "c789e333fdbb963883a0b5c96c648bf36b8cd242",
        // ],
        outCitations: [
          "abe213ed63c426a089bdf4329597137751dbb3a0",
          "abe213ed63c426a089bdf4329597137751dbb3a0",
          "abe213ed63c426a089bdf4329597137751dbb3a0",
          "abe213ed63c426a089bdf4329597137751dbb3a0",
          "abe213ed63c426a089bdf4329597137751dbb3a0",
          "abe213ed63c426a089bdf4329597137751dbb3a0",
        ],
        reference_msg: [
          {
            authors: [
              {
                ids: [
                  "145757025"
                ],
                name: "Lydia  White",
                structuredName: null
              }
            ],
            citation_num: 570,
            id: "feeae2819731d33a87de0cabdd10dad7bda39854",
            journalName: "",
            paperAbstract: "This book explores the relationship between linguistic universals and second language acquisition. Although no knowledge of generative grammar is presupposed, the theoretical framework underlying the work is the principles and parameters approach to Universal Grammar (UG), as realized in Chomsky's Government and Binding theory. In recent research, the question has arisen as to whether the principles and parameters of UG remain available in language acquisition that is non-primary. Within second language acquisition theorizing, hypotheses have ranged from UG playing no role at all to UG operating exactly as in primary language acquisition. In this work the theoretical arguments and data from the whole spectrum are reviewed.",
            reference_num: 26,
            title: "Universal Grammar and second language acquisition",
            year: 1989
          }],
        year: 2016,
        venue: "DSH",
        journalName: "Digital Scholarship in the Humanities",
        journalVolume: "31",
        journalPages: "152-163",
        sources: [
          "DBLP"
        ],
        doi: "10.1093/llc/fqu052",
        doiUrl: "https://doi.org/10.1093/llc/fqu052",
        pmid: "",
        magId: "2050850752"
      }
    }
  },
  created() {
    let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
    const _formData = new FormData();
    _formData.append("id", this.$route.query.v);
    this.$axios({
      method: 'post',
      url: '/es/get/paper',
      data: _formData
    })
    .then(res => {
      _loadingIns.close();
      switch (res.data.status) {
        case 200:
          this.articleData = res.data.details;
          console.log(this.articleData);
          break;
        case 404:
          this.$message.error("查无此文献！");
          setTimeout(() => {
            this.$router.push("/");
          }, 1500);
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
  methods: {
    toAuthor: function(id) {
      alert("前往" + "id:" + id + "的学者门户")
    },
    toArticle: function(index) {
      window.location.href = this.GLOBAL.baseUrl + "/article?v=" + index.id;
    },
    toDOI: function(doi){
      window.open("https://doi.org/" + doi)
    },
    getAbstract: function(abstract) {
      if (abstract.length > 600) {
        return abstract.slice(0,595) + "..."
      }
      return abstract
    },
    share(message) {
      var aux = document.createElement("input");
      aux.setAttribute("value", window.location.href);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      if (message !== null) {
        this.$message.success("链接已复制至剪贴板");
      } else{
        this.$message.error("链接复制失败");
      }
    },
    download() {
      // TODO: 下载PDF文件
      window.open(this.articleData.pdfUrls.at(0));
    }
  },
}
</script>

<style scoped>
body {
  background-color: #ecf5ff;
}

.article-body {
  background-color: white;
  border-bottom: solid 1px lightgray;
  border-left: solid 1px lightgray;
  border-right: solid 1px lightgray;
  margin: 0 30px;
  min-height: 650px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.article-body .info {
  padding: 20px 40px;
  text-align: left;
}

.article-body .info-title {
  color: #353535;
  margin-top: 20px;
}

.article-body .title-text {
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
}

.article-body .title-button {
  line-height: 40px;
  padding-left: 14px;
  border-left: solid 1px lightgray;
}

.article-body .info-author {
  margin-top: 10px;
  font-size: 18px;
  color: #516798;
}

.article-body .info-block1 {
  margin-top: 40px;
  font-size: 16px;
  line-height: 24px;
}

.article-body .info-block2 {
  margin-top: 20px;
  font-size: 16px;
  line-height: 24px;
}

.article-body .line-title {
  font-weight: bold;
  color: #353535;
}

.article-body .line-text {
  margin-left: -20px;
  margin-right: 20px;
  color: #565656;
}

.article-body .link {
  font-size: 18px;
  color: #516798;
}

.article-body .link:hover {
  cursor: pointer;
  text-decoration: underline;
  color: #4b93ff;
}

.article-body .cite {
  margin-top: 20px;
  margin-bottom: 5px;
  border-top: solid 1px lightgray;
}

.article-body .cite-table {
  padding: 24px 24px 0 0;
  border-right: solid 1px lightgray;
}

.article-body .cite-article {
  padding: 5px 0;
  font-size: 16px;
  color: #516798;
}

.article-body .cite-article:hover {
  cursor: pointer;
  color: #4b93ff;
}

.article-body .cite-graph1 {
  font-size: 28px;
  margin-top: 30px;
  margin-bottom: 34px;
  text-align: center;
}

.article-body .cite-graph2 {
  font-size: 28px;
  text-align: center;
}

.article-body .cite-text {
  margin-top: 14px;
  font-size: 16px;
  color: #565656;
}

.article-body .out1 {
  color: #409EFF;
  border-right: solid 1px lightgray;
}

.article-body .in1 {
  color: #67C23A;
}

.article-body .out2 {
  color: #E6A23C;
  border-right: solid 1px lightgray;
}

.article-body .in2 {
  color: #F56C6C;
}


.article-body .catalogue {
  float: right;
  padding: 0 20px;
  margin: 20px 0;
  width: 280px !important;
  border-left: solid 1px lightgray;
  text-align: left;
}

.article-body .catalogue-title {
  margin: 20px 0;
  padding-bottom: 6px;
  font-size: 20px;
  color: #676767;
  border-bottom: solid 1px lightgray;
}

</style>