<template>
  <div class="schLib">
    <div class="main-body">
      <el-row class="header">
        <span style="float:left; font-size: 22px; color: #2c3e50">
          个人图书馆
        </span>
      </el-row>

      <div class="content-select-result">
        <el-row :gutter="0" v-if="articles.length!==0">
          <el-col :span="7"><div class="grid-content bg-purple" style="margin-right:50px">
            <span style="display:flex; margin-bottom:24px; margin-top:10px; font-size:16px; color: #A0A0A0">筛选</span>
            <el-card class="box-card">

              <div class="article-tags sub-block">
                <div class="check-box-title">
                  <span>标签</span>
                </div>
                <div style="text-align: left; margin-bottom: 50px">
                  <el-tag
                      :key="tag"
                      v-for="tag in tagData"
                      closable
                      :disable-transitions="false"
                      style="margin-top: 10px; cursor: pointer"
                      @click="openTag(tag)"
                      @close="handleClose(tag)">
                    {{tag.tag_name}}
                  </el-tag>
                  <el-input
                      class="input-new-tag"
                      v-if="newTagInputVisible"
                      v-model="newTagName"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </div>
              </div>

              <el-divider></el-divider>

              <div class="publish-year sub-block">
                <div class="check-box-title">
                  <span>发表年份</span>
                </div>
                <div style="text-align: left; font-size: 13px">
                  <span>范围：</span>
                  <span style="color: #0274B3; margin-top:2px" class="year-input">
                    <el-input size="mini" v-model="year[0]" @change="changeYear"></el-input>
                    &nbsp;~&nbsp;
                    <el-input size="mini" v-model="year[1]" @change="changeYear"></el-input>
                  </span>
                </div>
                <div style="margin-top: 20px; margin-bottom: 30px">
                  <el-slider v-model="year" range :min=minYear :max=maxYear @change="getCollectByYear"></el-slider>
                </div>
              </div>

            </el-card>
          </div>
          </el-col>

          <el-col :span="16"><div class="grid-content bg-purple">
            <div>
              <el-row>
                <el-col span="17">
                  <span style="display:flex; font-size:16px; margin-top:10px;color: #A0A0A0">收藏论文 ({{articles.length}})</span>
                </el-col>
              </el-row>
            </div>

            <ArticleBlocks v-if="userdata.length>0"
                           :articles="userdata"
                           @delArticle="delArticle"
                           flag="schLib"></ArticleBlocks>

            <div>
              <el-row>
                <el-col :span="5" style="text-align:right">
                  <div >
                    <span>每页</span>
                    <el-input-number style="width:100px; margin: 22px 15px 15px;" el-input-number v-model="size" controls-position="right" @change="handleSizeChange" :min="1" :max="20"></el-input-number>
                    <!-- height:34px; -->
                    <span>条</span>
                  </div>
                </el-col>
                <el-col :span="15">
                  <el-pagination layout="prev, pager, next, jumper"
                                 background
                                 :current-page="pageIdx"
                                 :page-size="size"
                                 :total="articles.length"
                                 @size-change="handleSizeChange"
                                 @current-change="handleCurrentChange"
                                 style="margin: 20px">
                  </el-pagination>
                </el-col>
              </el-row>
            </div>

          </div></el-col>
        </el-row>
        <el-empty :image-size="200" description="您的个人图书馆空荡荡" v-else></el-empty>
      </div>

    </div>

  </div>


</template>

<script>

import ArticleBlocks from "../../components/ArticleBlocks";
import user from "../../store/user";
import qs from "qs";

export default {
  name: "SchLib",
  components: { ArticleBlocks },
  data() {
    return {
      pageIdx: 1,
      size: 5,

      queue: ["匹配程度","发表时间","引用次数"],
      value2: "匹配程度",

      minYear: 1900,
      maxYear: 2021,
      year: [1900, 2021],

      articles: [
        {
          authors: [
            {
              author_name: "John Lee",
            },
            {
              author_name: "Zuo_zuo",
            },
          ],
          paper_id: "4cd223df721b722b1c40689caa52932a41fcc223",
          paper_title: "Computer-assisted composition of Chinese couplets",
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
            },
            {
              author_name: "Zuo_zuo",
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
            },
            {
              author_name: "Zuo_zuo",
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
            },
            {
              author_name: "Zuo_zuo",
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
            },
            {
              author_name: "Zuo_zuo",
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
            },
            {
              author_name: "Zuo_zuo",
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
            },
            {
              author_name: "Zuo_zuo",
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
      ],

      newTagInputVisible: false,
      newTagName: '',
      thisTagName: '',
      tagData: [
        // {
        //   tag_id: 1,
        //   tag_name: "默认",
        //   user_id: 2,
        //   username: "",
        //   create_time: "2021-11-18T17:22:27+08:00"
        // },
        // {
        //   tag_id: 2,
        //   tag_name: "CV",
        //   user_id: 2,
        //   username: "",
        //   create_time: "2021-11-18T17:22:27+08:00"
        // }
      ]
    }
  },
  created() {
    const userInfo = user.getters.getUser(user.state());
    if (!userInfo) {
      this.$message.warning("请先登录！");
      setTimeout(() => {
        this.$router.push('/login');
      }, 500);
      return;
    }
    this.getInfo();
  },
  methods: {
    getInfo() {
      let self = this;
      let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      this.$axios.all([this.getAllTags(), this.getArticles()])
      .then(this.$axios.spread(function (allTags, allArticles) {
        _loadingIns.close();
        switch (allTags.data.status) {
          case 200:
            self.tagData = allTags.data.data;
            break;
          case 400:
            this.$userApi.userInvalid();
            break;
          case 403:
            this.$message.error("获取标签失败！");
            break;
          case 404:
            this.$userApi.userNotFound();
            break;
        }

        switch (allArticles.data.status) {
          case 200:
            self.articles = allArticles.data.data;
            break;
          case 400:
            this.$userApi.userInvalid();
            break;
          case 402:
            self.articles = [];
            break;
          case 404:
            this.$userApi.userNotFound();
            break;
        }
      }))
      .catch(err => {
        console.log(err);
      })
    },
    getAllTags() {
      const userInfo = user.getters.getUser(user.state());
      return this.$axios({
        method: 'post',
        url: '/social/get/tags',
        data: qs.stringify({
          user_id: userInfo.user.userId
        })
      })
    },
    getArticles() {
      const userInfo = user.getters.getUser(user.state());
      return this.$axios({
        method: 'post',
        url: '/social/get/collect/paper',
        data: qs.stringify({
          user_id: userInfo.user.userId
        })
      })
    },

    changeYear() {

    },
    getCollectByYear() {
      const userInfo = user.getters.getUser(user.state());
      this.$axios({
        method: 'post',
        url: '/social/get/collect/year/paper',
        data: qs.stringify({
          user_id: userInfo.user.userId,
          tag_name: this.tag_name,
          min_year: this.year[0],
          max_year: this.year[1]
        })
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            this.articles = res.data.data;
            break;
          case 400:
            this.$userApi.userInvalid();
            break;
          case 402:
            this.articles = [];
            break;
          case 404:
            this.$userApi.userNotFound();
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },

    // 分页
    indexMethod(index) {
      return (this.pageIdx-1)*this.size+index;
    },
    handleSizeChange(val) {
      this.pageIdx = 1;
      this.size = val;
    },
    handleCurrentChange(val) {
      this.pageIdx = val;
    },

    // Delete a tag
    handleClose(tag) {
      const userInfo = user.getters.getUser(user.state());
      let tagName = tag.tag_name;
      if (tagName === '默认') {
        this.$message.error("无法删除默认收藏夹！");
        return;
      }
      if (tagName) {
        this.$axios({
          method: 'post',
          url: '/social/delete/tag',
          data: qs.stringify({
            user_id: userInfo.user.userId,
            tag_name: tagName,
          })
        })
        .then(res => {
          switch (res.data.status) {
            case 200:
              this.tagData.splice(this.tagData.indexOf(tag), 1);
              break;
            case 400:
              this.$userApi.userInvalid();
              break;
            case 403:
              this.$message.error("标签不存在！");
              break;
            case 404:
              this.$userApi.userNotFound();
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    // Show new tag input
    showInput() {
      this.newTagInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // New a tag
    handleInputConfirm() {
      const userInfo = user.getters.getUser(user.state());
      const user_id = userInfo.user.userId;
      let newTagName = this.newTagName;
      if (newTagName && newTagName !== '') {
        this.$axios({
          method: 'post',
          url: '/social/create/tag',
          data: qs.stringify({
            user_id: user_id,
            tag_name: newTagName,
          })
        })
        .then(res => {
          switch (res.data.status) {
            case 200:
              this.tagData.push({tag_name: newTagName});
              break;
            case 400:
              this.$userApi.userInvalid();
              break;
            case 402:
              this.$message.error("无法建立重复标签！");
              break;
            case 404:
              this.$userApi.userNotFound();
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
      this.newTagInputVisible = false;
      this.newTagName = '';
    },
    // Look up articles in certain tag
    openTag(tag) {
      const userInfo = user.getters.getUser(user.state());
      let tagName = tag.tag_name;
      this.thisTagName = tagName;
      if (tagName) {
        this.$axios({
          method: 'post',
          url: '/social/get/collect/paper',
          data: qs.stringify({
            user_id: userInfo.user.userId,
            tag_name: tagName,
          })
        })
        .then(res => {
          switch (res.data.status) {
            case 200:
              this.articles = res.data.data;
              break;
            case 400:
              this.$userApi.userInvalid();
              break;
            case 402:
              this.articles = [];
              break;
            case 404:
              this.$userApi.userNotFound();
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    // delete specific article from schLib
    delArticle(article) {
      const userInfo = user.getters.getUser(user.state());
      this.$axios({
        url: '/social/delete/collect/paper',
        method: 'post',
        data: qs.stringify({
          user_id: userInfo.user.userId,
          tag_name: this.tag_name,
          paper_id: article.paper_id
        })
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            this.delArticleInLists(article.paper_id);
            this.$message.success("成功删除文章！");
            break;
          case 400:
            this.$userApi.userInvalid();
            break;
          case 404:
            this.$userApi.userNotFound();
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    delArticleInLists(paper_id) {
      let i;
      for (i = 0; i < this.articles.length; i++)
        if (this.articles[i].paper_id === paper_id)
          break;
      this.articles.splice(i,1);
    }
  },
  computed: {
    userdata: function(){
      return this.articles.slice((this.pageIdx-1)*this.size,this.pageIdx*this.size);
    }
  }
}
</script>

<style scoped>

.schLib .main-body {
  padding: 30px 40px 20px 80px;
}

.schLib .header {
  margin-bottom: 30px;
}

.schLib >>> .el-pagination .btn-prev .el-icon{
  font-size: 15px;
  margin: 15px;
}

.schLib >>> .el-pagination__jump{
  font-size: 15px;
}

.schLib >>> .el-pagination .btn-next .el-icon{
  font-size: 15px;
  margin: 15px;
}

.schLib >>> .el-pager li{
  width:40px;
  height:40px;
  padding: 7px;
}

.schLib .box-card {
  padding: 20px;
}

.schLib .box-card .sub-block {
  margin-bottom: 20px;
}

.schLib .box-card .check-box-title {
  text-align: left;
  font-size: 17px;
  margin-bottom: 20px;
}

.schLib >>> .el-pagination__editor.el-input .el-input__inner {
  height: 40px;
}

.schLib .el-tag {
  margin-right: 10px;
}

.schLib .button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 10px;
}

.schLib .input-new-tag {
  margin-top: 10px;
  width: 90px;
  vertical-align: bottom;
}

.schLib .year-input >>> .el-input--mini .el-input__inner {
  font-size: 13px;
  color: #0274B3;
}

.schLib .year-input >>> .el-input__inner {
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
}

.schLib .year-input >>> .el-input--mini {
  width: 45px;
  text-align: center;
}

</style>