<template>
  <div class="article">
    <el-row>
      <el-col class="title-block" :span="12">
        <div class="title-text">
          {{ articleDetails.title }}
        </div>
        <div class="sub-title">
          <span v-for="(author, index) in articleDetails.authors" :key="index">
            <span class="_link" @click="toAuthor(author.ids[0])">{{ author.name }}&nbsp;&nbsp;</span>
            <span v-if="articleDetails.authors.length > index + 1">/&nbsp;&nbsp;</span>
          </span>
          <span class="journal" v-if="articleDetails.journalName">·&nbsp;&nbsp;{{ articleDetails.journalName }}&nbsp;&nbsp;</span>
          <span class="date" v-if="articleDetails.year">·&nbsp;&nbsp;{{ articleDetails.year }}</span>
        </div>
        <div class="sub-title" v-if="articleDetails.doi">
          <span class="_info">DOI: <span class="_link" @click="toDOI(articleDetails.doi)">{{ articleDetails.doi }}</span></span>
        </div>
        <div class="title-button">
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
          <el-tooltip class="item" effect="light" content="引用" placement="bottom">
            <el-button type="info" icon="el-icon-paperclip" circle></el-button>
          </el-tooltip>
        </div>
      </el-col>
<!--      <el-col :span="7" class="logo-div">LOGO</el-col>-->
    </el-row>

    <el-row>
      <el-col :span="15">
        <div class="abstract-div">
          <div class="abstract-title">摘要</div>
          <div class="abstract-content _content" v-if="articleDetails.paperAbstract.length<spanLength || isSpan">
            {{ articleDetails.paperAbstract }}
            <span v-if="isSpan && articleDetails.paperAbstract.length>=spanLength" class="_link" @click="isSpan=!isSpan"> 折叠</span>
          </div>
          <div class="abstract-content _content" v-else>
            {{ articleDetails.paperAbstract.substring(0, 570) }}...
            <span v-if="!isSpan" class="_link" @click="isSpan=!isSpan"> 展开</span>
          </div>
        </div>

        <div class="detail-div">
          <el-tabs v-model="activeDetail" type="card">
            <el-tab-pane label="参考文献" name="first">
              <div class="reference-info">
                <span>共 {{ articleDetails.reference_num }} 条</span>
              </div>
              <div class="reference-article">
                <div class="reference-article-block" v-for="(article, index) in articleDetails.reference_msg" :key="index">
                  <div @click="toArticle(article.id)">
                    <el-row>
                      <el-col :span="2" style="text-align: right; font-size: 15px">[{{ index+1 }}]&nbsp;&nbsp;&nbsp;</el-col>
                      <el-col :span="22">
                        <div class="reference-title">
                          <span>{{ article.title }}</span>
                        </div>
                        <div class="reference-author _info">
                          <span v-for="(author, index2) in article.authors" :key="index2">
                        <span>{{ author.name }}&nbsp;&nbsp;</span>
                        <span v-if="articleDetails.authors.length > index2 + 1">/&nbsp;&nbsp;</span>
                      </span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="引证文献" name="second">
              <div class="reference-info">
                <span>共 {{ articleDetails.reference_num }} 条</span>
              </div>
              <div class="reference-article">
                <div class="reference-article-block" v-for="(article, index) in articleDetails.reference_msg" :key="index">
                  <div @click="toArticle(article.id)">
                    <el-row>
                      <el-col :span="2" style="text-align: right; font-size: 15px">[{{ index+1 }}]&nbsp;&nbsp;&nbsp;</el-col>
                      <el-col :span="22">
                        <div class="reference-title">
                          <span>{{ article.title }}</span>
                        </div>
                        <div class="reference-author _info">
                      <span v-for="(author, index2) in article.authors" :key="index2">
                        <span>{{ author.name }}&nbsp;&nbsp;</span>
                        <span v-if="articleDetails.authors.length > index2 + 1">/&nbsp;&nbsp;</span>
                      </span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="文章评论" name="third">
              <div class="comment-card">
                <el-card shadow="hover" class="comment-card-body">
                  <el-row class="comment-info">
                    <el-col :span="18" class="comment-author">
                      <span class="_link" @click="toAuthor(-1)">Zuo_zuo</span>
                      <span class="comment-date _info">&nbsp;&nbsp;&nbsp;&nbsp;1024 点赞&nbsp;&nbsp;·&nbsp;&nbsp;375 回复&nbsp;&nbsp;·&nbsp;&nbsp;2021/11/20</span>
                    </el-col>
                    <el-col :span="5">
                      <span style="font-size: 14px; float: right" class="_info">&ensp;&ensp;赞&ensp;</span>
                      <span style="font-size: 14px; float: right" class="_link _bd_right" @click="toComment(-1)">查看详情&ensp;&ensp;</span>
                    </el-col>
                    <el-col :span="1">
                      <div v-bind:class="{'dislike' : !like, 'like' : like, 'is_animating' : isAnimating}" @click="likeClick"></div>
                    </el-col>
                  </el-row>
                  <el-row class="comment-content _content">
                    {{ comment }}
                  </el-row>
                </el-card>
                <el-card shadow="hover">
                  <el-row class="comment-info">
                    <el-col :span="18" class="comment-author">
                      <span class="_link" @click="toAuthor(-1)">Zuo_zuo</span>
                      <span class="comment-date _info">&nbsp;&nbsp;&nbsp;&nbsp;1024 点赞&nbsp;&nbsp;·&nbsp;&nbsp;375 回复&nbsp;&nbsp;·&nbsp;&nbsp;2021/11/20</span>
                    </el-col>
                    <el-col :span="5">
                      <span style="font-size: 14px; float: right" class="_info">&ensp;&ensp;赞&ensp;</span>
                      <span style="font-size: 14px; float: right" class="_link _bd_right" @click="toComment(-1)">查看详情&ensp;&ensp;</span>
                    </el-col>
                    <el-col :span="1">
                      <div v-bind:class="{'dislike' : !like, 'like' : like, 'is_animating' : isAnimating}" @click="likeClick"></div>
                    </el-col>
                  </el-row>
                  <el-row class="comment-content _content">
                    {{ comment }}
                  </el-row>
                </el-card>
              </div>

            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>

      <el-col :span="9">
        <div class="info-div">
          <el-row class="digit _bd_bottom">
            <el-col :span="6" class="digit-num _primary">
              {{ articleDetails.reference_num }}
              <div class="digit-text">引用量</div>
            </el-col>
            <el-col :span="6" class="digit-num _success">
              {{ articleDetails.outCitations.length }}
              <div class="digit-text" >被引量</div>
            </el-col>
            <el-col :span="6" class="digit-num _warning">
              {{ toBigNum(17232) }}
              <div class="digit-text">收藏数</div>
            </el-col>
            <el-col :span="6" class="digit-num _danger">
              {{ toBigNum(1000) }}
              <div class="digit-text">评论数</div>
            </el-col>
          </el-row>
          <el-row class="field _bd_bottom" v-if="articleDetails.fieldsOfStudy">
            <div class="field-title">领域</div>
            <div class="field-content" v-for="(field, index) in articleDetails.fieldsOfStudy" :key="index">
              -&ensp;<span class="_link" @click="toField(field)">{{ field }}</span>
            </div>
          </el-row>
          <el-row class="relation" v-if="articleDetails.reference_msg"> <!-- 假借 -->
            <div class="field-title">相关文献</div>
            <div class="relation-article" v-for="(article, index) in articleDetails.reference_msg" :key="index">
              <div class="relation-title">
                <span class="_link" @click="toArticle(article.id)">{{ article.title }}</span>
              </div>
              <div class="relation-author _info">
                <span v-for="(author, index2) in article.authors" :key="index2">
                  <span>{{ author.name }}&nbsp;&nbsp;</span>
                  <span v-if="articleDetails.authors.length > index2 + 1">/&nbsp;&nbsp;</span>
                </span>
              </div>
            </div>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      // 点赞动画
      like: false,
      isAnimating: false,

      // 摘要展开
      isSpan: false,
      spanLength: 600,

      // 标签页
      activeDetail: "first",

      // 暂态评论
      comment: "终于收到我需要的宝贝了，东西很好，价美物廉，谢谢掌柜的!说实在，这是我淘宝购物来让我最满意的一次购物。无论是掌柜的态度还是对物品，我都非常满意的。掌柜态度很专业热情，有问必答，回复也很快，我问了不少问题，他都不觉得烦，都会认真回答我，这点我向掌柜表示由衷的敬意，这样的好掌柜可不多。再说宝贝，正是我需要的，收到的时候包装完整，打开后让我惊喜的是，宝贝比我想象中的还要好!不得不得竖起大拇指。下次需要的时候我还会再来的，到时候麻烦掌柜给个优惠哦!",

      articleDetails: {
        authors: [
          {
            ids: [
              143783283
            ],
            name: "Pablo Saiz",
            structuredName: null
          },
          {
            ids: [
              2684022
            ],
            name: "Ulrich Schwickerath",
            structuredName: null
          }
        ],
        citation_num: 0,
        doi: "10.1051/epjconf/202024507021",
        fieldsOfStudy: [
          "Computer Science",
        ],
        id: "9782951d43920382d2f1229601d018ca87df4dcb",
        journalName: "EPJ Web of Conferences",
        journalPages: "07021",
        journalVolume: "245",
        outCitations: [
          "d884573116a4363256d52575a4dd642f3b5b6f24",
          "44d2abe2175df8153f465f6c39b68b76a0d40ab9"
        ],
        paperAbstract: "The Centralised Elasticsearch Service at CERN runs the infrastructure to provide Elasticsearch clusters for more than 100 different use cases.This contribution presents how the infrastructure is managed, covering the resource distribution, instance creation, cluster monitoring and user support. The contribution will present the components that have been identified as critical in order to share resources and minimise the amount of clusters and machines needed to run the service. In particular, all the automation for the instance configuration, including index template management, backups and visualisation settings, will be explained in detail.",
        pdfUrls: [],
        reference_msg: [
          {
            authors: [
              {
                ids: [
                  "2684022"
                ],
                name: "Ulrich Schwickerath",
                structuredName: null
              },
              {
                ids: [
                  "143783283"
                ],
                name: "Pablo Saiz",
                structuredName: null
              },
              {
                ids: [
                  "2857698"
                ],
                name: "Zhechka Toteva",
                "structuredName": null
              }
            ],
            citation_num: 1,
            id: "d884573116a4363256d52575a4dd642f3b5b6f24",
            journalName: "EPJ Web of Conferences",
            paperAbstract: "In early 2016 CERN IT created a new project to consolidate and centralise Elas-ticsearch instances across the site, with the aim to offer a production quality new IT services to experiments and departments. We present the solutions we adapted for securing the system using open source only tools, which allows us to consolidate up to 20 different use cases on a single Elasticsearch cluster.",
            reference_num: 2,
            title: "Securing and sharing Elasticsearch resources with Read-onlyREST",
            year: 2019
          },
          {
            authors: [
              {
                ids: [
                  "3308557"
                ],
                "name": "Sepp Hochreiter",
                "structuredName": null
              },
              {
                ids: [
                  "145341374"
                ],
                name: "Jürgen Schmidhuber",
                structuredName: null
              }
            ],
            citation_num: 44135,
            id: "44d2abe2175df8153f465f6c39b68b76a0d40ab9",
            journalName: "Neural Computation",
            paperAbstract: "Learning to store information over extended time intervals by recurrent backpropagation takes a very long time, mostly because of insufficient, decaying error backflow. We briefly review Hochreiter's (1991) analysis of this problem, then address it by introducing a novel, efficient, gradient based method called long short-term memory (LSTM). Truncating the gradient where this does not do harm, LSTM can learn to bridge minimal time lags in excess of 1000 discrete-time steps by enforcing constant error flow through constant error carousels within special units. Multiplicative gate units learn to open and close access to the constant error flow. LSTM is local in space and time; its computational complexity per time step and weight is O. 1. Our experiments with artificial data involve local, distributed, real-valued, and noisy pattern representations. In comparisons with real-time recurrent learning, back propagation through time, recurrent cascade correlation, Elman nets, and neural sequence chunking, LSTM leads to many more successful runs, and learns much faster. LSTM also solves complex, artificial long-time-lag tasks that have never been solved by previous recurrent network algorithms.",
            reference_num: 42,
            title: "Long Short-Term Memory",
            year: 1997
          }
        ],
        reference_num: 2,
        s2PdfUrl: "",
        title: "Large Elasticsearch cluster management",
        venue: "",
        year: 2020,
      },
    }
  },
  methods: {
    toArticle: function(index) {
      window.location.href = this.GLOBAL.baseUrl + "/article?v=" + index.id;
    },
    toAuthor: function(id) {
      alert("前往" + "id:" + id + "的学者门户")
    },
    toDOI: function(doi) {
      alert("前往" + ":" + doi )
    },
    toComment: function(index) {
      alert("前往" + "id:" + id + "的文献评论")
    },
    toField: function(field) {
      alert("前往" + field + "领域")
    },
    toBigNum: function(num) {
      if (num>=10000) {
        let ten_thousand = Math.floor(num/10000)
        let thousand = Math.floor(num%10000/1000)
        num = ten_thousand + "." + thousand + "w"
      }
      else if (num>=1000) {
        let thousand = Math.floor(num/1000)
        let hundred = Math.floor(num%1000/100)
        num = thousand + "." + hundred + "k"
      }
      return num
    },
    likeClick: function() {
      if (!this.like) {
        this.isAnimating = true
        setTimeout(this.likeHandler, 800);
      }
      else {
        this.likeHandler()
        this.isAnimating = false
      }
    },
    likeHandler: function() {
      this.like = !this.like
    },
    share(message) {
      let aux = document.createElement("input");
      aux.setAttribute("value", window.location.href);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      if (message !== null) {
        this.$message.success("链接已复制至剪贴板");
      } else {
        this.$message.error("链接复制失败");
      }
    },
    download() {
      // TODO: 下载PDF文件
      window.open(this.articleDetails.pdfUrls.at(0));
    },
  },
  // created() {
  //     let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
  //     const _formData = new FormData();
  //     // _formData.append("id", this.$route.query.v);
  //     this.$axios({
  //       method: 'post',
  //       url: '/es/get/paper',
  //       data: _formData
  //     })
  //         .then(res => {
  //           _loadingIns.close();
  //           switch (res.data.status) {
  //             case 200:
  //               this.articleData = res.data.details;
  //               console.log(this.articleData);
  //               break;
  //             case 404:
  //               // this.$message.error("查无此文献！");
  //               // setTimeout(() => {
  //               //   this.$router.push("/");
  //               // }, 1500);
  //               break;
  //             case 500:
  //               this.$message.error("系统发生错误，请联系管理员！");
  //               setTimeout(() => {
  //                 this.$router.push("/");
  //               }, 1500);
  //               break;
  //           }
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         })
  //   },
}
</script>

<style scoped>

.article .title-block {
  margin-left: 180px;
  min-height: 200px;
}
.article .abstract-div {
  background-color: white;
  margin-left: 180px;
  min-height: 200px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}
.article .detail-div {
  background-color: white;
  margin-top: 26px;
  margin-left: 180px;
  margin-bottom: 30px;
  padding: 30px;
  min-height: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}
.article .info-div {
  background-color: white;
  margin:0 180px 30px 36px;
  padding: 30px;
  min-height: 666px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}

.article .title-text {
  text-align: left;
  padding-top: 50px;
  padding-left: 20px;
  font-weight: bold;
  font-size: 28px;
  line-height: 40px;
  color: #353535;
}
.article .sub-title {
  text-align: left;
  padding-left: 20px;
  margin-top: 10px;
  font-size: 15px;
  color: #909eb4;
}
.article .title-button {
  text-align: left;
  padding-left: 20px;
  margin-top: 15px;
  margin-bottom: 20px;
}

.article .abstract-title {
  text-align: left;
  font-weight: bold;
  margin-top: 5px;
  padding: 0 16px;
  font-size: 16px;
  color: #353535;
}
.article .abstract-content {
  text-align: justify;
  padding: 16px 16px 6px 16px;
  font-size: 15px;
  line-height: 24px;
}

.article .digit {
  margin-top: 14px;
  padding-bottom: 30px;
}
.article .digit-num {
  font-size: 26px;
}
.article .digit-text {
  margin-top: 10px;
  font-size: 14px;
  color: #909eb4;
}

.article .field {
  padding: 36px 10px;
}
.article .field-title {
  text-align: left;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 16px;
  color: #353535;
}
.article .field-content {
  text-align: left;
  font-size: 16px;
  line-height: 30px;
}

.article .relation {
  padding: 36px 10px;
  text-align: left;
  font-size: 15px;
}
.article .relation-author {
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 12px;
}

.article .reference-info {
  margin-bottom: 12px;
  color: #909eb4;
  font-size: 13px;
}
.article .reference-article-block {
  padding-top: 10px;
}
.article .reference-article-block:hover {
  background: #f4f9ff;
  cursor: pointer;
}
.article .reference-title {
  font-size: 15px;
}
.article .reference-author {
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 14px;
}
.article .reference-article-block:hover .reference-title {
  color: #1f71df;
}

.article .comment-card {
  padding: 5px;
}
.article .comment-card-body {
  margin-bottom: 20px;
}
.article .comment-info {
  padding-bottom: 15px;
}
.article .comment-date {
  font-size: 14px;
}
.article .comment-content {
  font-size: 14px;
  line-height: 24px;
}
.article .dislike {
  margin: -20px;
  cursor: pointer;
  height: 60px;
  width: 60px;
  background-image:url( 'https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png');
  background-position: left;
  background-repeat:no-repeat;
  background-size:2900%;
}
.article .like {
  margin: -20px;
  cursor: pointer;
  height: 60px;
  width: 60px;
  background-image:url( 'https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png');
  background-position: right;
  background-repeat:no-repeat;
  background-size:2900%;
}
.article .dislike:hover {
  background-position:right;
}
.article .is_animating {
  animation: heart-burst .8s steps(28) 1;
}
@keyframes heart-burst {
  from {background-position:left;}
  to { background-position:right;}
}

.article ._bd_bottom {
  border-bottom: solid 1px lightgray;
}
.article ._bd_right {
  border-right: solid 1px lightgray;
}
.article ._bd_left {
  border-left: solid 1px lightgray;
}
.article ._bd_top {
  border-top: solid 1px lightgray;
}
.article ._primary {
  color: #409EFF;
}
.article ._danger {
  color: #F56C6C;
}
.article ._warning {
  color: #E6A23C;
}
.article ._success {
  color: #67C23A;
}
.article ._info {
  color: #909eb4;
}
.article ._content {
  color: #565656;
}
.article ._link {
  color: #00b1fd;
}
.article ._link:hover {
  color: #38c5ff;
  cursor: pointer;
}

.article .detail-div .el-tab-pane {
  text-align: left;
}
.article .detail-div .el-tabs__item.is-active {
  color: #353535;
  font-weight: bold;
}
.article .detail-div .el-tabs__item {
  font-size: 15px;
}
.article .detail-div .el-tabs__item:hover {
  color: #353535;
}

</style>