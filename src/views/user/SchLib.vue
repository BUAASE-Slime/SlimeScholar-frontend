<template>
  <div class="schLib">
    <div class="main-body">
      <el-row class="header">
        <span style="float:left; font-size: 22px; color: #2c3e50">
          个人图书馆
        </span>
      </el-row>

      <div class="content-select-result">
        <el-row :gutter="0" v-if="total_hits!==0">
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
                      style="margin-top: 10px;"
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
                  <span style="color: #0274B3; margin-top:2px">{{ year[0] }} ~ {{ year[1] }}</span>
                </div>
                <div style="margin-top: 20px; margin-bottom: 30px">
                  <el-slider v-model="year" range :min=minYear :max=maxYear></el-slider>
                </div>
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
        <el-empty :image-size="200" description="您的个人图书馆空荡荡" v-else></el-empty>
      </div>

    </div>

  </div>


</template>

<script>

import ArticleBlocks from "../../components/ArticleBlocks";

export default {
  name: "SchLib",
  components: { ArticleBlocks },
  data() {
    return {
      total_hits: 11,
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
          citation_num: 3288,
          comment_num: 5,
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
          citation_num: 3288,
          comment_num: 5,
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
          citation_num: 3288,
          comment_num: 5,
          year:2021,
          reference_count: 42,
          is_collect:true,
          // 是否收藏
        }
      ],

      newTagInputVisible: false,
      newTagName: '',
      tagData: [
        {
          tag_id: 1,
          tag_name: "默认",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00"
        },
        {
          tag_id: 2,
          tag_name: "CV",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00"
        },
        {
          tag_id: 2,
          tag_name: "CV",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00"
        },
        {
          tag_id: 2,
          tag_name: "CV",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00"
        }
      ]
    }
  },
  methods: {
    handleClose(tag) {
      this.tagData.splice(this.tagData.indexOf(tag), 1);
    },

    showInput() {
      this.newTagInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let newTagName = this.newTagName;
      if (newTagName) {
        this.tagData.push({tag_name: newTagName});
      }
      this.newTagInputVisible = false;
      this.newTagName = '';
    }
  }
}
</script>

<style scoped>

.schLib .main-body {
  padding: 30px 100px;
}

.schLib .header {
  margin-bottom: 30px;
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

</style>