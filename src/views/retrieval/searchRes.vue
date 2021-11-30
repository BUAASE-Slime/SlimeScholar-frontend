<template>
  <div class="search-res">
    <div class="main-body">
      <el-row class="header">
        <span style="float:left; font-size: 22px; color: #A0A0A0">
        为您查询到
        <span style="color: #525455">&nbsp;{{ total_hits }}&nbsp;</span>
        条结果
        </span>
      </el-row>
      <div class="content-select-result">
        <el-row :gutter="0">
          <el-col :span="7"><div class="grid-content bg-purple" style="margin-right:50px">
            <span style="display:flex; margin-bottom:24px; margin-top:10px; font-size:16px; color: #A0A0A0">筛选</span>
            <el-card class="box-card">
              <div>
                <!-- <div style="float:left; width:100%; display:flex; margin:20px； float:left;"><span>
                  发表年份
                </span></div>
                <div v-for="o in year" :key="o" class="text item" style="display:block; margin:20px">
                  <el-checkbox v-model="checked">{{o}}</el-checkbox>
                </div> -->
                <el-row>
                  <div style=" width:100%; display:block; margin:20px">
                    <span style="float:left;">发表年份</span>
                    <br>
                  </div>
                  <div style=" margin:20px;">
                    <span style="float:left; font-size:13px;">范围：</span>
                    <span style="font-size:13px; color:rgb(80, 191, 224); float:left; margin-top:2px">{{minYear}}~{{maxYear}}</span>
                  </div>
                </el-row>
                <el-row>
                  <div style="padding:20px">
                    <el-slider v-model="value1" :min=minYear :max=maxYear></el-slider>
                  </div>
                </el-row>
              </div>
              <el-divider></el-divider>
              <div>
                <div style="float:left; width:100%; display:flex; margin:20px">
                  <span>类型</span>
                </div>
                <div v-for="o in journals" :key="o" class="text item" style="display:block; margin:20px;">
                  <el-checkbox v-model="checked" style="">{{o}}</el-checkbox>
                </div>
              </div>
              <el-divider></el-divider>
              <div>
                <div style="float:left; width:100%; display:flex; margin:20px"><span>
                领域
              </span></div>
                <div v-for="o in fields" :key="o" class="text item" style="display:block; margin:20px;">
                  <el-checkbox v-model="checked" style="">{{o}}</el-checkbox>
                </div>
              </div>
            </el-card>
          </div></el-col>
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
            <el-card v-for="item in articles" :key="item" class="article-item">
              <div style="text-align: left">
                <div style="margin-bottom: 5px">
                  <span style="font-size: 20px; font-weight: bold">{{item.paper_title}}</span>
                </div>
                <span style="color:grey;">{{item.year}} · </span>
                <span v-for="j in item.authors" :key="j" style="margin-left: 6px; color: #2d94d4; cursor: pointer">
                  {{j.author_name}}
                </span>
              </div>

              <div style="text-align:left;margin-top:10px;">
<!--                <span style="display:block; font-weight:bold; font-size:15px; margin-bottom:10px">摘要：<br></span>-->
                <span style="color: #A0A0A0">{{item.abstract|ellipsis}}</span>
              </div>
              <el-divider></el-divider>
              <div style="text-align:left; font-size: 15px">
                <div v-if="item.is_collect" @click="collectChange(item)" style="float:left"><i class="el-icon-star-on" >收藏</i></div>
                <div v-else @click="collectChange(item)" style="float:left"><i class="el-icon-star-off" >收藏</i></div>
                <i class="el-icon-collection" style="margin-left:30px; float:left">引用</i>
                <span style="float:right; text-align:right;">被引次数：{{item.reference_count}}</span>
              </div>
            </el-card>
          </div></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        total_hits:45112,
        select: '1',
        year:["2008","2009","2021"],
        journals:["所有","会议","期刊","书籍"],
        fields:["计算机视觉","计算机图形学","人工智能"],
        queue:["发表时间","引用次数"],
        value2:"发表时间",
        minYear:1928,
        maxYear:2021,
        value1:2021,
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
        ]
      }
    },
    created() {
      let _query = this.$route.query;
      let _search_key = Object.keys(_query)[0];
      let _search_value = _query[_search_key];

      let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      const _formData = new FormData();
      _formData.append(_search_key, _search_value);
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
    },
    methods:{
      collectChange:function(item){
        item.is_collect=!(item.is_collect);
      },
      formatTooltip(val) {
        return val / 100;
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
      }
    }, 
  };
</script>

<style scoped>

.search-res {
  padding: 30px 100px;
}

.search-res .header {
  margin-bottom: 40px;
}

.search-res .article-item {
  margin-top:20px;
  display:flex;
}

.search-res .article-item >>> .el-card__body {
  width: 100%;
  padding: 25px 30px 15px;
}

.search-res .article-item >>> .el-divider--horizontal {
  margin: 10px 0;
}

</style>