<template>
  <el-container class="article">

    <el-main class="info">
      <div class="info-title">
        {{article.title}}
      </div>
      <div class="info-author">
        <span class="author-name" v-for="author in article.authors" v-bind:key="author.index" @click="toAuthor(author.ids[0])">
          {{author.name}}&nbsp;
        </span>

      </div>
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
        paperAbstract: "Recent research effort in poem composition has focused on the use of automatic language generation...",
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
        inCitations: [
          "c789e333fdbb963883a0b5c96c648bf36b8cd242",
        ],
        outCitations: [
          "abe213ed63c426a089bdf4329597137751dbb3a0",
        ],
        year: 2016,
        venue: "DSH",
        journalName: "DSH",
        journalVolume: "31",
        journalPages: "152-163",
        sources: [
          "DBLP"
        ],
        doi: "10.1093/llc/fqu052",
        doiUrl: "https://doi.org/10.1093/llc/fqu052 ",
        pmid: "",
        magId: "2050850752"
      }
    }
  },
  methods: {
    toAuthor: function(id){
      alert("前往" + "id:" + id + "的学者门户")
    },
  }
}
</script>

<style>
.article {
  border: solid 1px lightgray;
  margin: 0 30px;
  min-height: 650px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.info {
  padding: 20px 40px;
  text-align: left;
}

.info-title {
  color: #353535;
  margin: 20px 0;
  font-weight: bold;
  font-size: 24px;
}

.info-author {
  margin: 10px 0;
  font-size: 17px;
  color: #516798;
}

.author-name:hover {
  cursor: pointer;
  text-decoration: underline;
  color: #4b93ff;
}

.catalogue {
  float: right;
  padding: 0 20px;
  margin: 20px 0;
  width: 280px !important;
  border-left: solid 1px lightgray;
  text-align: left;
}

.catalogue-title {
  margin: 20px 0;
  padding-bottom: 6px;
  font-size: 20px;
  color: #676767;
  border-bottom: solid 1px lightgray;
}
</style>