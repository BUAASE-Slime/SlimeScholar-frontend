<template>
  <div class="article">
    <el-row>
      <el-col class="title-block" :span="12">
        <div class="title-text">
          {{ articleDetails.paper_title }}
        </div>
        <div class="sub-title">
          <span v-for="(author, index) in articleDetails.authors" :key="index">
            <span class="_link" @click="toAuthor(author.author_id)">{{ author.author_name }}</span>
            <span v-if="articleDetails.authors.length > index + 1">,&nbsp;</span>
          </span>
        </div>
        <div class="sub-title">
          <span class="date" v-if="articleDetails.year">{{ articleDetails.year }}</span>
          <span class="journal" v-if="articleDetails.journal_id!==''">
            &nbsp;{{ articleDetails.journal.name }}
            <span v-if="articleDetails.volume"> | Volume: {{ articleDetails.volume }}</span>
            <span v-if="articleDetails.first_page">, pp {{ articleDetails.first_page }}</span>
            <span v-if="articleDetails.last_page">-{{ articleDetails.last_page }}</span>
          </span>
        </div>
        <div class="sub-title" v-if="articleDetails.doi">
          <span class="_info">DOI: <span class="_link" @click="toDOI(articleDetails.doi)">{{ articleDetails.doi }}</span></span>
        </div>
        <div class="title-button">
          <el-tooltip class="item" effect="light" content="下载" placement="bottom">
            <el-button type="primary" icon="el-icon-download" circle @click="download"></el-button>
          </el-tooltip>
          <el-dropdown style="margin-left: 10px; margin-right: 10px" trigger="click" @command="goLink">
            <el-tooltip class="item" effect="light" content="更多链接" placement="bottom">
              <el-button type="success" icon="el-icon-paperclip" circle></el-button>
            </el-tooltip>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(ins, index) in articleDetails.urls" v-bind:key="index" :command="ins">{{ ins }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-tooltip class="item" effect="light" content="收藏" placement="bottom">
            <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="分享" placement="bottom">
            <el-button type="danger" icon="el-icon-share" circle @click="share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="引用" placement="bottom">
            <el-button type="info" icon="el-icon-s-promotion" circle @click="quote"></el-button>
          </el-tooltip>
        </div>
      </el-col>
<!--      <el-col :span="7" class="logo-div">LOGO</el-col>-->
    </el-row>

    <el-row>
      <el-col :span="15">
        <div class="abstract-div">
          <div class="abstract-title">摘要</div>
          <div class="abstract-content _content" v-if="articleDetails.abstract.length<spanLength || isSpan">
            {{ articleDetails.abstract }}
            <span v-if="isSpan && articleDetails.abstract.length>=spanLength" class="_link" @click="isSpan=!isSpan"> 折叠</span>
          </div>
          <div class="abstract-content _content" v-else>
            {{ articleDetails.abstract.substring(0, 570) }}...
            <span v-if="!isSpan" class="_link" @click="isSpan=!isSpan"> 展开</span>
          </div>
        </div>

        <div class="detail-div">
          <el-tabs v-model="activeDetail" type="card">
            <el-tab-pane label="参考文献" name="first">
              <div class="reference-info">
                <span>共 {{ articleDetails.reference_count }} 条</span>
              </div>
              <div class="reference-info" v-if="articleDetails.reference_count>0">
                <span>由于版权限制，此处只展示部分相关论文</span>
              </div>
              <div class="reference-article">
                <div class="reference-article-block" v-for="(article, index) in articleDetails.reference_msg" :key="index">
                  <div @click="toArticle(article.paper_id)">
                    <el-row>
                      <el-col :span="2" style="text-align: right; font-size: 15px">[{{ index+1 }}]&nbsp;&nbsp;&nbsp;</el-col>
                      <el-col :span="22">
                        <div class="reference-title">
                          <span>{{ article.paper_title }}</span>
                        </div>
                        <div class="reference-author _info">
                          <span v-for="(author, index2) in article.authors" :key="index2">
                        <span>{{ author.author_name }}</span>
                        <span v-if="article.authors.length > index2 + 1">,&nbsp;</span>
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
                <span>共 {{ articleDetails.citation_count }} 条</span>
              </div>
              <div class="reference-info" v-if="articleDetails.citation_count>0">
                <span>由于版权限制，此处只展示部分相关论文</span>
              </div>
              <div class="reference-article">
                <div class="reference-article-block" v-for="(article, index) in articleDetails.citation_msg" :key="index">
                  <div @click="toArticle(article.paper_id)">
                    <el-row>
                      <el-col :span="2" style="text-align: right; font-size: 15px">[{{ index+1 }}]&nbsp;&nbsp;&nbsp;</el-col>
                      <el-col :span="22">
                        <div class="reference-title">
                          <span>{{ article.paper_title }}</span>
                        </div>
                        <div class="reference-author _info">
                      <span v-for="(author, index2) in article.authors" :key="index2">
                        <span>{{ author.author_name }}</span>
                        <span v-if="article.authors.length > index2 + 1">,&nbsp;</span>
                      </span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="文章评论" name="third">
              <div class="reference-info" v-if="comments===null||comments.length===0">
                <span>暂无评论</span>
              </div>
              <div class="comment-card" v-else>
                <el-card shadow="hover" class="comment-card-body"
                         v-for="(comment, index) in comments" v-bind:key="index">
                  <el-row class="comment-info">
                    <el-col :span="18" class="comment-author">
                      <span class="_link" @click="toAuthor(-1)">{{ comment.username }}</span>
                      <span class="comment-date _info">
                        &nbsp;&nbsp;&nbsp;&nbsp;{{ comment.like }} 点赞&nbsp;&nbsp;·&nbsp;&nbsp;{{ comment.reply_count }} 回复&nbsp;&nbsp;·&nbsp;&nbsp;{{ $dateFormat(comment.time, "yyyy/MM/dd") }}
                      </span>
                    </el-col>
                    <el-col :span="5">
                      <span style="font-size: 14px; float: right" class="_info">&ensp;&ensp;赞&ensp;</span>
                      <span style="font-size: 14px; float: right" class="_link _bd_right" @click="toComment(comment.id)">查看详情&ensp;&ensp;</span>
                    </el-col>
                    <el-col :span="1">
                      <div v-bind:class="{'dislike' : !comment.is_like, 'like' : comment.is_like, 'is_animating' : isAnimating}" @click="likeClick(comment)"></div>
                    </el-col>
                  </el-row>
                  <el-row class="comment-content _content">
                    {{ comment.content }}
                  </el-row>
                </el-card>
              </div>

              <div class="AnswerIt">
                <el-input
                  type="textarea"
                  maxlength="500"
                  show-word-limit
                  :autosize="{ minRows: 3, maxRows: 6}"
                  placeholder="请输入你的回答"
                  v-model="myAnswer"
                >
                </el-input>
                <div style="width: 100%; text-align: right">
                  <el-button type="primary" style="margin-top: 10px;" @click="createComment(articleDetails.paper_id,myAnswer)">发布</el-button>
                </div>
              </div>

            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>

      <el-col :span="9">
        <div class="info-div">
          <el-row class="digit _bd_bottom">
            <el-col :span="6" class="digit-num _primary">
              {{ articleDetails.reference_count }}
              <div class="digit-text">引用量</div>
            </el-col>
            <el-col :span="6" class="digit-num _success">
              {{ articleDetails.citation_count }}
              <div class="digit-text" >被引量</div>
            </el-col>
            <el-col :span="6" class="digit-num _warning">
              {{ toBigNum(articleDetails.collect_count) }}
              <div class="digit-text">收藏数</div>
            </el-col>
            <el-col :span="6" class="digit-num _danger">
              {{ toBigNum(this.comments.length) }}
              <div class="digit-text">评论数</div>
            </el-col>
          </el-row>
          <el-row class="field _bd_bottom" v-if="articleDetails.fields">
            <div class="field-title">领域</div>
            <div class="field-content" v-for="(field, index) in articleDetails.fields" :key="index">
              -&ensp;<span class="_link" @click="toField(field.name)">{{ field.name }}</span>
            </div>
          </el-row>
          <el-row class="relation" v-if="articleDetails.related_papers"> <!-- 假借 -->
            <div class="field-title">相关文献</div>
            <div class="relation-article" v-for="(article, index) in articleDetails.related_papers" :key="index">
              <div class="relation-title">
                <span class="_link" @click="toArticle(article.id)">{{ article.paper_title }}</span>
              </div>
              <div class="relation-author _info">
                <span v-for="(author, index2) in article.authors" :key="index2">
                  <span>{{ author.author_name }}&nbsp;&nbsp;</span>
                  <span v-if="article.authors.length > index2 + 1">,&nbsp;&nbsp;</span>
                </span>
              </div>
            </div>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <CiteDialog
        :paper_id="articleDetails.paper_id"
        :showQuote="showQuote"
        @closeChildDialog="closeChildDialog"></CiteDialog>
  </div>
</template>

<script>
import user from "../../store/user";
import qs from "qs";
import CiteDialog from "../../components/CiteDialog";

export default {
  name: "Article",
  components: {CiteDialog},
  data() {
    return {
      // 引用
      showQuote: false,

      // 点赞动画
      like: false,
      isAnimating: false,

      // 摘要展开
      isSpan: false,
      spanLength: 600,

      // 标签页
      activeDetail: "first",

      myAnswer: '',

      comments: [
        {
          id: 1,
          like: 1,
          is_like: false,
          is_animating: false,
          reply_count: 2,
          time: "2021-11-23T23:09:56+08:00",
          user_id: 2,
          username: "syt",
          content: "终于收到我需要的宝贝了，东西很好，价美物廉，谢谢掌柜的!说实在，这是我淘宝购物来让我最满意的一次购物。无论是掌柜的态度还是对物品，我都非常满意的。",
        }
      ],

      articleDetails: {
        authors: [
          {
            affiliation_id: "",
            affiliation_name: "",
            author_id: "2772667878",
            author_name: "田中章夫",
            order: "1",
          },
          {
            affiliation_id: "",
            affiliation_name: "",
            author_id: "2773365833",
            author_name: "野口盛雄",
            order: "2"
          },
          {
            affiliation_id: "",
            affiliation_name: "",
            author_id: "2771782143",
            author_name: "渡边良幸",
            order: "3"
          }
        ],
        fields: [
          {
            fields_id: "123123",
            name: "Computer Vision"
          }
        ],
        citation_count: 8,
        collect_count: 16,
        doi: "10.1051/epjconf/202024507021",
        paper_id: "9782951d43920382d2f1229601d018ca87df4dcb",
        journal: "EPJ Web of Conferences",
        publisher: "Elsevier BV",
        conference: "",
        abstract: "The Centralised Elasticsearch Service at CERN runs the infrastructure to provide Elasticsearch clusters for more than 100 different use cases.This contribution presents how the infrastructure is managed, covering the resource distribution, instance creation, cluster monitoring and user support. The contribution will present the components that have been identified as critical in order to share resources and minimise the amount of clusters and machines needed to run the service. In particular, all the automation for the instance configuration, including index template management, backups and visualisation settings, will be explained in detail.",
        pdfs: [
          "https://www.pap.es/files/1116-877-pdf/990.pdf"
        ],
        urls: [
          "https://dialnet.unirioja.es/servlet/articulo?codigo=2946216",
          "https://www.redalyc.org/articulo.oa?id=366638709014",
          "https://medes.com/publication/46160",
          "http://www.pap.es/files/1116-877-pdf/990.pdf",
          "http://www.redalyc.org/pdf/3666/366638709014.pdf"
        ],
        citation_msg: [
          {
            authors: [
              {
                author_id: "2772667878",
                author_name: "Sepp Hochreiter",
              },
              {
                author_id: "2772667878",
                author_name: "Jürgen Schmidhuber",
              }
            ],
            citation_count: 1,
            id: "d884573116a4363256d52575a4dd642f3b5b6f24",
            journalName: "EPJ Web of Conferences",
            abstract: "In early 2016 CERN IT created a new project to consolidate and centralise Elas-ticsearch instances across the site, with the aim to offer a production quality new IT services to experiments and departments. We present the solutions we adapted for securing the system using open source only tools, which allows us to consolidate up to 20 different use cases on a single Elasticsearch cluster.",
            reference_count: 2,
            paper_title: "Securing and sharing Elasticsearch resources with Read-onlyREST",
            year: 2019
          },
        ],
        related_papers: [
          {
            authors: [
              {
                author_id: "2772667878",
                author_name: "Sepp Hochreiter",
              },
              {
                author_id: "2772667878",
                author_name: "Jürgen Schmidhuber",
              }
            ],
            citation_count: 1,
            id: "d884573116a4363256d52575a4dd642f3b5b6f24",
            journalName: "EPJ Web of Conferences",
            abstract: "In early 2016 CERN IT created a new project to consolidate and centralise Elas-ticsearch instances across the site, with the aim to offer a production quality new IT services to experiments and departments. We present the solutions we adapted for securing the system using open source only tools, which allows us to consolidate up to 20 different use cases on a single Elasticsearch cluster.",
            reference_count: 2,
            paper_title: "Securing and sharing Elasticsearch resources with Read-onlyREST",
            year: 2019
          },
          {
            authors: [
              {
                author_id: "2772667878",
                author_name: "Sepp Hochreiter",
              },
              {
                author_id: "2772667878",
                author_name: "Jürgen Schmidhuber",
              }
            ],
            citation_count: 1,
            id: "d884573116a4363256d52575a4dd642f3b5b6f24",
            journalName: "EPJ Web of Conferences",
            abstract: "In early 2016 CERN IT created a new project to consolidate and centralise Elas-ticsearch instances across the site, with the aim to offer a production quality new IT services to experiments and departments. We present the solutions we adapted for securing the system using open source only tools, which allows us to consolidate up to 20 different use cases on a single Elasticsearch cluster.",
            reference_count: 2,
            paper_title: "Securing and sharing Elasticsearch resources with Read-onlyREST",
            year: 2019
          },
        ],
        reference_msg: [
          {
            authors: [
              {
                author_id: "2772667878",
                author_name: "Sepp Hochreiter",
              },
              {
                author_id: "2772667878",
                author_name: "Jürgen Schmidhuber",
              }
            ],
            citation_count: 1,
            id: "d884573116a4363256d52575a4dd642f3b5b6f24",
            journalName: "EPJ Web of Conferences",
            abstract: "In early 2016 CERN IT created a new project to consolidate and centralise Elas-ticsearch instances across the site, with the aim to offer a production quality new IT services to experiments and departments. We present the solutions we adapted for securing the system using open source only tools, which allows us to consolidate up to 20 different use cases on a single Elasticsearch cluster.",
            reference_count: 2,
            paper_title: "Securing and sharing Elasticsearch resources with Read-onlyREST",
            year: 2019
          },
          {
            authors: [
              {
                author_id: "2772667878",
                author_name: "Sepp Hochreiter",
              },
              {
                author_id: "2772667878",
                author_name: "Jürgen Schmidhuber",
              }
            ],
            citation_count: 44135,
            id: "44d2abe2175df8153f465f6c39b68b76a0d40ab9",
            journalName: "Neural Computation",
            abstract: "Learning to store information over extended time intervals by recurrent backpropagation takes a very long time, mostly because of insufficient, decaying error backflow. We briefly review Hochreiter's (1991) analysis of this problem, then address it by introducing a novel, efficient, gradient based method called long short-term memory (LSTM). Truncating the gradient where this does not do harm, LSTM can learn to bridge minimal time lags in excess of 1000 discrete-time steps by enforcing constant error flow through constant error carousels within special units. Multiplicative gate units learn to open and close access to the constant error flow. LSTM is local in space and time; its computational complexity per time step and weight is O. 1. Our experiments with artificial data involve local, distributed, real-valued, and noisy pattern representations. In comparisons with real-time recurrent learning, back propagation through time, recurrent cascade correlation, Elman nets, and neural sequence chunking, LSTM leads to many more successful runs, and learns much faster. LSTM also solves complex, artificial long-time-lag tasks that have never been solved by previous recurrent network algorithms.",
            reference_count: 42,
            paper_title: "Long Short-Term Memory",
            year: 1997
          }
        ],
        reference_count: 2,
        paper_title: "Large Elasticsearch cluster management",
        year: 2020,
      },
    }
  },
  methods: {
    goLink(url) {
      window.open(url);
    },
    closeChildDialog() {
      this.showQuote = false;
    },
    createComment(paper_id, content) {
      const userInfo = user.getters.getUser(user.state());
      if (!userInfo) {
        this.$message.warning("请先登录！");
        setTimeout(() => {
          this.$router.push('/login');
        }, 500);
        return;
      }

      if (content === '') {
        this.$message.warning('无法发布空白评论！');
        return;
      }

      this.$axios({
        url: '/social/create/comment',
        method: 'post',
        data: qs.stringify({
          user_id: userInfo.user.userId,
          paper_id: paper_id,
          content: content
        })
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            this.$message.success("回复成功！");
            this.myAnswer = '';
            this.comments = res.data.data.comments;
            break;
          case 400:
            this.$message.error("用户登录信息已失效，请重新登录！");
            this.$store.dispatch('clear');
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000);
            break;
          case 403:
            this.$message.error("评论创建失败，请稍后重试！");
            break;
          case 404:
            this.$message.error("系统未获取到您的用户信息，请联系管理员！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    toArticle: function(paper_id) {
      let routeUrl = this.$router.resolve({
        path: '/article',
        query: { v: paper_id }
      });
      window.open(routeUrl .href, "_self");
    },
    toAuthor: function(id) {
      let routeUrl = this.$router.resolve({
        path: '/schPortal',
        query: { v: id }
      });
      window.open(routeUrl .href, "_self");
    },
    toDOI: function(doi) {
      window.open("https://doi.org/" + doi);
    },
    toComment: function(id) {
      let routeUrl = this.$router.resolve({
        path: '/commentDetail',
        query: { v: id }
      });
      window.open(routeUrl .href, "_blank");
    },
    toField: function(field_name) {
      let routeUrl = this.$router.resolve({
        path: '/searchRes',
        query: { field: field_name }
      });
      window.open(routeUrl .href, "_self");
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
    likeClick: function(commentIns) {
      const userInfo = user.getters.getUser(user.state());
      if (!userInfo) {
        this.$message.warning("请先登录！");
        setTimeout(() => {
          this.$router.push('/login');
        }, 500);
        return;
      }

      if (!commentIns.is_like)
        this.likeHandler(commentIns, 'comment');
      else
        this.likeHandler(commentIns, 'cancel');
    },
    likeHandler: function(commentIns, tag) {
      const userInfo = user.getters.getUser(user.state());
      this.$axios({
        url: '/social/like/' + tag,
        method: 'post',
        data: qs.stringify({
          user_id: userInfo.user.userId,
          comment_id: commentIns.id,
        })
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            commentIns.is_animating = tag === 'comment';
            setTimeout(() => {
              commentIns.is_like = !commentIns.is_like;
            }, 800);
            break;
          case 403:
            this.$message.error("评论不存在，请刷新重试！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
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
    quote() {
      this.showQuote = true;
    },
    download() {
      // TODO: 下载PDF文件
      if (this.articleDetails.pdfs.length === 0) {
        this.$message.error("未找到该文献原文PDF！");
        return;
      }
      // window.open(this.articleDetails.pdfs.at(0));

      var a = document.createElement('a');
      //需要下载的数据内容,我这里放的就是BLOB，如果你有下载链接就不需要了
      var url = window.URL.createObjectURL(content);
      var filename = this.articleDetails.pdfs.at(0);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    },

    getArticleDetail() {
      const _formData = new FormData();
      _formData.append("id", this.$route.query.v);
      return this.$axios({
        method: 'post',
        url: '/es/get/paper',
        data: _formData
      })
    },
    getComments() {
      let userId;
      const userInfo = user.getters.getUser(user.state());
      if (!userInfo) userId = 0;
      else userId = userInfo.user.userId;

      return this.$axios({
        method: 'post',
        url: '/social/get/comments',
        data: qs.stringify({
          paper_id: this.$route.query.v,
          user_id: userId
        })
      })
    },
    getArticle() {
      let self = this;
      let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      this.$axios.all([this.getArticleDetail(), this.getComments()])
      .then(this.$axios.spread(function (articleDetail, allComments) {
        _loadingIns.close();

        // Get Article Detail
        switch (articleDetail.data.status) {
          case 200:
            self.articleDetails = articleDetail.data.details;
            break;
          case 404:
            // this.$message.error("查无此文献！");
            // setTimeout(() => {
            //   this.$router.push("/");
            // }, 1500);
            break;
          case 500:
            this.$message.error("系统发生错误，请联系管理员！");
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
            break;
        }

        switch (allComments.data.status) {
          case 200:
            self.comments = allComments.data.data.comments;
            break;
          case 403:
            self.comments = [];
            break;
          default:
            self.$message.error("评论获取失败！");
            break;
        }
      }))
      .catch(err => {
        console.log(err);
      })
    },
    getCiteDetail() {
      this.$axios({
        method: 'post',
        url: '/scholar/cite_paper',
        data: qs.stringify({
          paper_id: this.$route.query.v
        })
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            break;
          default:
            this.$message.error("系统发生错误！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  created() {
    this.getArticle();
  },
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
  font-family: Georgia, fantasy;
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
  background-image:url( 'https://img-1304418829.cos.ap-beijing.myqcloud.com/heart.png');
  background-position: left;
  background-repeat:no-repeat;
  background-size:2900%;
}
.article .like {
  margin: -20px;
  cursor: pointer;
  height: 60px;
  width: 60px;
  background-image:url( 'https://img-1304418829.cos.ap-beijing.myqcloud.com/heart.png');
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