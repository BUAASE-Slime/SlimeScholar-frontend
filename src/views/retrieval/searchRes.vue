<template>
<div>
    <div id="inputbox">
      <el-row>
        <el-col :span="6"><div class="grid-content bg-purple">
          <img src="../../assets/images/SlimeScholar.png" alt="" style="margin-left:20px; margin-top:40px; height:130px">
        </div></el-col>
        <el-col :span="15"><div class="grid-content bg-purple">
          <el-row>
            <div style=" width:800px; margin-left:50px; padding-top: 70px; display:flex;" id="inputbox2">
              <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style="font-size:20px; ">
                <el-select v-model="select" slot="prepend" placeholder="检索依据" style="width:170px; border-right:1px solid grey" class="pre">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <!-- <el-switch
              v-model="value1"
              active-text="检索文章"
              inactive-text="检索学者"
              style="width:300px; margin-top:20px; margin-left:20px">
            </el-switch> -->
            </div>
          </el-row>
          <el-row>
            <h2 style="display:block;float:left; margin-left:50px;margin-top:40px">{{resnum}}条来自数据库的搜索结果:</h2>
          </el-row>
        </div></el-col>
      </el-row>
    </div>
    
    <div>
      <el-row :gutter="0">
        <el-col :span="6"><div class="grid-content bg-purple" style="padding:20px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>结果筛选</span>
            </div>
            <div>
              <div style="float:left; width:100%; display:flex; margin:20px； float:left;"><span>
                发表年份
              </span></div>
              <div v-for="o in year" :key="o" class="text item" style="display:block; margin:20px">
                <el-checkbox v-model="checked">{{o}}</el-checkbox>
              </div>
            </div>
            <div>
              <div style="float:left; width:100%; display:flex; margin:20px"><span>
                期刊
              </span></div>
              <div v-for="o in journals" :key="o" class="text item" style="display:block; margin:20px; float:left;">
                <el-checkbox v-model="checked" style="">{{o}}</el-checkbox>
              </div>
            </div>
          </el-card>
        </div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple">
          <el-card v-for="item in articles" :key="item" id="the_item" style="margin:20px;display:flex">
              <el-row>
              <h3 style="float:left; display:block;">{{item.title}}</h3>
              </el-row>
              <el-row>
              <span style="float:left; margin-left:10px; color:grey;">{{item.year}} · </span>
              <span v-for="j in item.authors" :key="j" style="float:left; margin-left:10px; color:grey;">{{j.name}}</span>
              </el-row>
              <div style="text-align:left;margin-top:10px;">
                <span style="display:block; font-weight:bold; font-size:15px; margin-bottom:10px">摘要：<br></span>
                <span>{{item.paperAbstract|ellipsis}}</span>
              </div>
              <el-divider></el-divider>
              <div style="text-align:left;">
                <div v-if="item.is_collect" @click="collectChange(item)" style="float:left"><i class="el-icon-star-on" >收藏</i></div>
                <div v-else @click="collectChange(item)" style="float:left"><i class="el-icon-star-off" >收藏</i></div>
                <i class="el-icon-collection" style="margin-left:30px; float:left">引用</i>
                <span style="float:right; text-align:right;">被引次数：{{item.reference_num}}</span>
              </div>
          </el-card>
        </div></el-col>
      </el-row>
    </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        value1: false,
        resnum:45112,
        options: [{
          value: '1',
          label: '主题'
        }, {
          value: '2',
          label: '篇关摘'
        }, {
          value: '3',
          label: '关键字'
        }, {
          value: '4',
          label: '篇名'
        }, {
          value: '5',
          label: '摘要'
        },{
          value: '6',
          label: '作者'
        }, {
          value: '7',
          label: '作者单位'
        }, {
          value: '8',
          label: '文献来源'
        }, {
          value: '9',
          label: 'DOI'
        }],
        select: '1',
        year:["2008","2009","2021"],
        journals:["Natural","Science","SCI","北京航空航天大学学报","浙江大学学报"],
        articles:[
          {
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
            id: "4cd223df721b722b1c40689caa52932a41fcc223",
            title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
            paperAbstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
            citation_num: 3288,
            reference_num: 14,
            comment_num: 5,
            year:2021,
            reference_num: 42,
            is_collect:true,
            // 是否收藏
          },
          {
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
            id: "4cd223df721b722b1c40689caa52932a41fcc223",
            title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
            paperAbstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
            citation_num: 3288,
            reference_num: 14,
            comment_num: 5,
            year:2021,
            reference_num: 42,
            is_collect:true,
            // 是否收藏
          },
          {
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
            id: "4cd223df721b722b1c40689caa52932a41fcc223",
            title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
            paperAbstract: "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
            citation_num: 3288,
            reference_num: 14,
            comment_num: 5,
            year:2021,
            reference_num: 42,
            is_collect:true,
            // 是否收藏
          }
        ]
      }
    },
    created() {
    this.resnum = this.resnum.toLocaleString();
    },
    methods:{
      collectChange:function(item){
        item.is_collect=!(item.is_collect);
      }
    },
    filters: {
      //超过20位显示 ...
      ellipsis: function(value) {
        if (!value) return "";
        if (value.length > 500) {
          return value.slice(0, 500) + "...";
        }
        return value;
      }
    }, 
  };
</script>

<style scoped>
  #inputbox{
      height:250px;
      background-color:rgb(115, 222, 255);
      width:100%; 
      margin:0 auto;
  }
</style>

<style>
 #inputbox2 .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  #inputbox2 .el-input__inner{
    height: 60px !important;
    border-right: none;
  }
  #inputbox2 .el-input-group__append {
    /* border-radius: inherit; */
    background-color: white;
  }
  #inputbox2 .el-input-group__prepend {
    /* border-radius: inherit; */
    background-color: white;
    /* color: azure; */
  }
  #inputbox2 .el-row--flex {
    display: flex;
    margin-top: 100px !important;
  }
  #inputbox2 .pre .el-input__inner::placeholder {
      color: black;
      font-size: 18px;
      text-align: center;
  }
    /* 谷歌 */
  #inputbox2 .pre .el-input__inner::-webkit-input-placeholder {
      color: black;
      font-size: 18px;
      text-align: center;
  }
    /* 火狐 */
  #inputbox2 .pre .el-input__inner:-moz-placeholder {
      color: black;
      font-size: 18px;
      text-align: center;
  }
    /*ie*/
  #inputbox2 .pre .el-input__inner:-ms-input-placeholder {
      color: black;
      font-size: 18px;
      text-align: center;
  }
  #the_item{
    height: 300px;
  }
</style>