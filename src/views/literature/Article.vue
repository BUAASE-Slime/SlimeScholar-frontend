<template>
  <el-container class="article">

    <el-main class="info">
      <el-row class="info-title">
        <el-col :span="19" class="title-text">
          {{ article.title }}
        </el-col>
        <el-col :span="5" class="title-button">
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
            <el-button type="success" icon="el-icon-share" circle></el-button>
          </el-tooltip>
        </el-col>
      </el-row>

      <el-row class="info-author">
        <span class="link" v-for="author in article.authors" v-bind:key="author.index" @click="toAuthor(author.ids[0])">
          {{ author.name }}&nbsp;
        </span>
      </el-row>
      <el-row class="info-block1">
        <el-col :span="2" class="line-title">摘要：</el-col>
        <el-col :span="22" class="line-text">{{ getAbstract(article.paperAbstract) }}</el-col>
      </el-row>
      <el-row class="info-block2">
        <el-col :span="2" class="line-title">关键词：</el-col>
        <span class="line-text" v-for="keyword in article.keywords" v-bind:key="keyword.index">{{ keyword }};&nbsp;&nbsp;</span>
      </el-row>
      <el-row class="info-block2">
        <el-col :span="2" class="line-title">专题：</el-col>
        <span class="line-text" v-for="field in article.fieldsOfStudy" v-bind:key="field.index">{{ field }}&nbsp;&nbsp;</span>
      </el-row>
      <el-row class="info-block2">
        <el-col :span="2" class="line-title">期刊：</el-col>
        <el-col :span="22" class="line-text">
          <span style="font-style: italic">
            {{ article.journalName }}
          </span>
          <span>
            [Volume {{ article.journalVolume }}, Pages {{ article.journalPages }}, {{ article.year }}]
          </span>
        </el-col>
      </el-row>
      <el-row class="info-block2">
        <el-col :span="2" class="line-title">DOI：</el-col>
        <el-col :span="22" class="line-text link">
          <span @click="toDOI(article.doiUrl)">{{ article.doi }}</span>
        </el-col>
      </el-row>

<!--      <el-row class="info-block3">-->
<!--        <el-row>参考文献&nbsp;&nbsp;{{ article.outCitations.length }}</el-row>-->
<!--        <el-row>被引次数&nbsp;&nbsp;{{ article.inCitations.length }}</el-row>-->
<!--      </el-row>-->

      <el-row class="cite">
        <el-col :span="18" class="cite-table">
          <el-tabs type="border-card">
            <el-tab-pane label="参考文献">
              <el-row class="cite-article" v-for="article in article.outCitations" v-bind:key="article.index">
                {{ article }}
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="引证文献">
              <el-row class="cite-article" v-for="article in article.inCitations" v-bind:key="article.index">
                {{ article }}
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="3" class="cite-graph out">
          {{ article.outCitations.length }}
          <div class="cite-text">引用量</div>
        </el-col>
        <el-col :span="3" class="cite-graph in">
          {{ article.inCitations.length }}
          <div class="cite-text">被引量</div>
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
      article: {
        id: "4cd223df721b722b1c40689caa52932a41fcc223",
        title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
        paperAbstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
        entities: [
        ],
        fieldsOfStudy: [
          "Computer Science"
        ],
        s2Url: "https://semanticscholar.org/paper/4cd223df721b722b1c40689caa52932a41fcc223",
        pdfUrls: [
          "https://doi.org/10.1093/llc/fqu052 ",
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
        keywords:[
            "Automatic language generation",
            "Computer-assisted",
        ],
        inCitations: [
          "c789e333fdbb963883a0b5c96c648bf36b8cd242",
        ],
        outCitations: [
          "abe213ed63c426a089bdf4329597137751dbb3a0",
        ],
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
  methods: {
    toAuthor: function(id){
      alert("前往" + "id:" + id + "的学者门户")
    },
    toDOI: function(url){
      window.location.href = url
    },
    getAbstract: function(abstract) {
      if (abstract.length > 400) {
        return abstract.slice(0,395) + "..."
      }
      return abstract
    }
  },
}
</script>

<style>
.article {
  border-bottom: solid 1px lightgray;
  border-left: solid 1px lightgray;
  border-right: solid 1px lightgray;
  margin: 0 30px;
  min-height: 650px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.article .info {
  padding: 20px 40px;
  text-align: left;
}

.article .info-title {
  color: #353535;
  margin-top: 20px;
}

.article .title-text {
  font-weight: bold;
  font-size: 26px;
}

.article .title-button {
  line-height: 50px;
  padding-left: 14px;
  border-left: solid 1px lightgray;
}

.article .info-author {
  font-size: 18px;
  color: #516798;
}

.article .info-block1 {
  margin-top: 40px;
  font-size: 18px;
  line-height: 24px;
}

.article .info-block2 {
  margin-top: 20px;
  font-size: 18px;
  line-height: 24px;
}

.article .info-block3 {
  margin-top: 10px;
  float: right;
  font-size: 15px;
  line-height: 24px;
  color: #9a9a9a;
}

.article .line-title {
  font-weight: bold;
  color: #353535;
}

.article .line-text {
  margin-left: -20px;
  margin-right: 20px;
  color: #565656;
}

.article .link {
  font-size: 18px;
  color: #516798;
}

.article .link:hover {
  cursor: pointer;
  text-decoration: underline;
  color: #4b93ff;
}

.article .cite {
  margin-top: 20px;
  border-top: solid 1px lightgray;
}

.article .cite-table {
  padding: 20px 20px 0 0;
  border-right: solid 1px lightgray;
}

.article .cite-article {

}

.article .cite-graph {
  font-size: 30px;
  margin: 30px 0;
  text-align: center;
}

.article .cite-text {
  margin-top: 10px;
  font-size: 16px;
  color: #565656;
}

.article .out {
  color: #409EFF;
  border-right: solid 1px lightgray;
}

.article .in {
  color: #67C23A;
}

.article .catalogue {
  float: right;
  padding: 0 20px;
  margin: 20px 0;
  width: 280px !important;
  border-left: solid 1px lightgray;
  text-align: left;
}

.article .catalogue-title {
  margin: 20px 0;
  padding-bottom: 6px;
  font-size: 20px;
  color: #676767;
  border-bottom: solid 1px lightgray;
}

</style>