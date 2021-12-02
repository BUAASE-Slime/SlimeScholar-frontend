<template>
<div class="homepage">
  <div class="background">
    <img src="../../assets/images/bg2.jpg" style="position:absolute;width:100%; height:100%; left:0; z-index:-1;" alt="">
  </div>
  <div >
  <div class="main">
    <el-row>
      <el-col id="bg" :span="24" ><div id="logo">
        <!-- <img src="../../assets/images/bg5.jpg" class="image" style="position:absolute; left:0px; background-size:cover; width:100%; height:455px; z-index:0;" alt=""> -->
        <img src="../../assets/images/make-visible-v2.png" alt="logo" style="height: 200px; margin:50px; margin-top:100px; margin-bottom:0px; position:relative; z-index:2;">
<!--        <img src="../../assets/images/SlimeScholar-en.png" alt="logo" style="height: 200px; margin:50px; margin-top:100px; margin-bottom:0px; position:relative; z-index:2;">-->
      </div></el-col>
    </el-row>
    <el-row >
      <el-col :span="24"><div id="inputbox">
        <div style="margin-top: 0px; width:800px; margin:0 auto; box-shadow:black 2px 1px 2px 1px" id="inputbox2">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style="font-size:20px; ">
            <el-select v-model="select" slot="prepend" placeholder="检索依据" style="width:170px; border-right:2px solid grey" class="pre">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
          </el-input>
        </div>
      </div></el-col>
    </el-row>
    <div id="invisable" style="wdith:100%; background: rgba(0,0,0,.5); padding-top:1px; padding-bottom:7px; margin-top:155px">
    <el-row gutter="0" style="margin-top:50px; margin-left:50px" justify="center" type="flex">
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_aut.png" style="width:70px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 style="display:block; font-family:'Courier New',serif; font-weight:bold; margin-bottom:0px !important; color:white;">Authors</h3>
              <h2 style="display:block; font-family:'Courier New',serif; margin-top:10px; color:white;">{{authornum}}</h2>
          </el-col>
        </el-row>
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_art.png" style="width:70px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 style="display:block; font-family:'Courier New',serif; font-weight:bold; margin-bottom:0px !important; color:white;">Papers</h3>
              <h2 style="display:block; font-family:'Courier New',serif; margin-top:10px; color:white;">{{papernum}}</h2>
          </el-col>
        </el-row>  
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_jou.png" style="width:70px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 style="display:block; font-family:'Courier New',serif; font-weight:bold; margin-bottom:0px !important; color:white;">Journals</h3>
              <h2 style="display:block; font-family:'Courier New',serif; margin-top:10px; color:white;">{{journalnum}}</h2>
          </el-col>
        </el-row>  
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_org.png" style="width:70px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 style="display:block; font-family:'Courier New',serif; font-weight:bold; margin-bottom:0px !important; color:white;">Orgnizations</h3>
              <h2 style="display:block; font-family:'Courier New',serif; margin-top:10px; color:white;">{{orgnum}}</h2>
          </el-col>
        </el-row>  
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_fie.png" style="width:70px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 style="display:block; font-family:'Courier New',serif; font-weight:bold; margin-bottom:0px !important; color:white;">Field</h3>
              <h2 style="display:block; font-family:'Courier New',serif; margin-top:10px; color:white;">{{fieldnum}}</h2>
          </el-col>
        </el-row>  
      </div></el-col>
    </el-row>
    </div>
    <el-row>
      <el-divider><i class="el-icon-s-data" style="color:grey"></i></el-divider>
    </el-row>
    <div style="margin:50px 200px;">
      <el-tabs type="border-card">
        <el-tab-pane label="热门文献">
          <div style="padding-bottom:20px">
            <div v-for="(item1,index1) in topArt" :key="item1" style="text-align:left;">
              <el-divider v-if="index1!==0"></el-divider>
              <h3>{{item1.paper_title}}</h3>
              <span v-for="j in item1.authors" :key="j" style="color: #2d94d4; ">
                {{j.author_name}}
              </span>
              <br>
              <span>{{item1.abstract}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="热门作者">
          <div style="padding-left:50px">
              <div v-for="(item1,index) in topAut" :key="index" style="text-align:left; margin-bottom:30px">
              <el-divider v-if="index!==0"></el-divider>
              <el-row>
                <el-col span="3">
                  <el-image class="headImg" :src="item1.headImgUrl">
                  </el-image>
                </el-col>
                <el-col span="25">
                  <h3 style="display:inline-block;  ">{{index+1}} </h3>
                  <span style=" font-size:18px"> {{item1.name}}</span>
                  <br>
                  <span style="  margin-bottom:2px">{{item1.organization}}</span>
                  <br>
                  <el-link style="font-size: medium;color:#00b1fd;" v-for="(i,j) in item1.fields" v-bind:key="j">
                    {{i}}<span style="margin-left: 4px;margin-right: 4px" v-if="j!==item1.fields.length-1">/</span>
                  </el-link>
                </el-col>
              </el-row>
              </div>
            
          </div>
        </el-tab-pane>
        <el-tab-pane label="热门期刊">热门期刊</el-tab-pane>
      </el-tabs>
    </div>
    <!-- <el-row id="list" gutter="75" style="padding-left:40px; padding-top:50px; padding-bottom:50px; margin:0;">
      <el-col :span="8" ><div class="grid-content bg-purple">
        <h2 style="font-family:Monospace; border-bottom: gainsboro solid 1px; color:black;">Top Author</h2>
          <el-scrollbar style="height: 350px; overflow-x:hidden !important;">
          <el-row v-for="(i,index) in topAut" :key="index" style="margin:30px">
            <el-col :span="4">
              <div class="rank" style="padding-top: 15px"><span>{{index+1}}</span></div>
            </el-col>
            <el-col :span="30" style="padding-top: 10px">
              <el-row style="color: black ;font-weight: bold;font-size:small">
                <el-col :span="30" style="padding-bottom: 1px">
                  <el-link :underline="false" href="/schPortal" target="_blank">{{i.name}}</el-link>
                  跳转到个人主页
                </el-col>
              </el-row>
              <el-row style="font-size: x-small">{{i.organization}}</el-row>
            </el-col>
          </el-row>
          </el-scrollbar>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">
        <h2 style="font-family:Monospace; border-bottom: gainsboro solid 1px;">Top Journal</h2>
        <el-scrollbar style="height: 350px">
          <el-row v-for="(i,index) in topJou" :key="index" style="margin:30px">
            
            <el-col :span="30" style="padding-top: 10px">
              <el-row style="color: black ;font-weight: bold;font-size:small; width:200px;">
                <el-col :span="4">
                  <div class="rank" style="padding-top: 3px"><span>{{index+1}}</span></div>
                </el-col>
                <el-col :span="30" style="padding-bottom: 1px">
                  <el-link :underline="false" href="" target="_blank">{{i.title}}</el-link>
                  跳转到期刊详情
                </el-col>
              </el-row>
              <el-row style="margin-left:40px">
                <div v-for="(j,index) in i.sponsor" :key="index" style="margin-right:10px; float:left;">
                  <span style="font-size: x-small;" >{{j}}</span>
                </div>
              </el-row>
            </el-col>
          </el-row>
          </el-scrollbar>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">
        <h2 style="font-family:Monospace,serif; border-bottom: gainsboro solid 1px;">Top Conference</h2>
        <el-scrollbar style="height: 350px">
          <el-row v-for="(i,index) in topArt" :key="index" style="margin:30px">
            <el-col :span="4">
              <div class="rank" style="padding-top: 15px"><span>{{index+1}}</span></div>
            </el-col>
            <el-col :span="30" style="padding-top: 10px">
              <el-row style="color: black ;font-weight: bold;font-size:small">
                <el-col :span="30" style="padding-bottom: 1px">
                  <el-link :underline="false" href="/article" target="_blank">{{i.title}}</el-link>
                  跳转到文献详情
                </el-col>
              </el-row>
              <div v-for="(j,index) in i.author" :key="index" style="margin-right:10px; display: inline; float:left;">
                <span style="font-size: x-small;" >{{j}}</span>
              </div>
            </el-col>
          </el-row>
          </el-scrollbar>
      </div></el-col>
    </el-row> -->
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      input3: '',
      select: '1',
      authornum: 12345,
      papernum: 233344,
      journalnum:747,
      orgnum:1235,
      fieldnum:75,
      options: [{
          value: '1',
          label: '篇关摘'
        }, {
          value: '2',
          label: 'DOI'
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
        }, ],
        value: '',
        topAut:[
        {
          id:"19373180",
          name:"Rui Guo",
          organization:"Software Engineering, BeiHang University",
          headImgUrl: "https://i.loli.net/2021/11/13/39PJtQWi7nrHMXu.jpg",
          fields: ["Software Engineering","Visualizing Program","Software Engineering","OpenCV","Visualizing Program"],
          artNumInit:"6",
        },
        {
          id:"19373181",
          name:"Zewan Huang",
          organization:"Software Engineering, BeiHang University",
          headImgUrl: "https://i.loli.net/2021/11/14/kId5TvGJUiDa7PW.jpg",
          fields: ["Software Engineering","Visualizing Program","Software Engineering","OpenCV","Visualizing Program"],
          artNumInit:"7",
        },
        ],
        topArt:[
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
        ],
        topJou:[
        {
          id:"19373180",
          title:"诗探索",
          sponsor:["北京大学中国诗歌研究院","首都师范大学中国诗歌研究中心"],
        },
        {
          id:"19373180",
          title:"中国会计评论",
          sponsor:["《中国会计评论》理事会"],
        },
        ]
    }
  },
  created() {
    this.authornum = this.authornum.toLocaleString();
    this.papernum = this.papernum.toLocaleString();
    this.journalnum = this.journalnum.toLocaleString();
    this.orgnum = this.orgnum.toLocaleString();
  },
  methods:{
    goSearch:function(){
      this.$router.replace('/searchRes')
    }
  }
}
</script>

<style scoped>
.homepage .main {
  position: relative;
  width: 100%;
  height: 100%;
  
}
/* #inputbox{
  width: 600px;
  margin:0 auto;

} */

.homepage .main .el-col {
  border-radius: 4px ;
}
.homepage .main .bg-purple-dark {
  background: #cccccc !important;
}
#list .bg-purple {
  background: #f5f5f5;
  /* #efeefd */
  padding:20px;
  border-radius: 14px ;
  border: gainsboro solid 1px;
}

.homepage .headImg{
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-left: 10px;
  margin-top: 10px;
}
.homepage .grid-content[data-v-1274387a] {
  border-radius: 14px;
  min-height: 36px;
}
.homepage .bg-purple-light {
  background: #e5e9f2;
}
.homepage .grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.homepage .row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.homepage .clearfix:before,
.homepage .clearfix:after {
  display: table;
  content: "";
}
.homepage .clearfix:after {
  clear: both
}
.homepage .test_a {
  display: block;
  margin: 0 auto;
  width:100%;
  overflow: hidden;
}

.homepage .test_a img {
  width: 100%;
  transform: scale(1);
  transition: all 1s ease 0s;
}

.homepage .test_a:hover img {
  transform: scale(1.2);
  transition: all 1s ease 0s;
}
  /* .background{
    width:100%;  
    height:100%; 
    z-index:-1;
    position: absolute;
  } */
.homepage .input-with-select{
  height: 60px;
  width: 800px;
}

.homepage >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.homepage >>> .el-input__inner{
  height: 60px !important;
  border:none;
}
.homepage >>> .el-input-group__append {
  /* border-radius: inherit; */
  background-color: rgb(43, 124, 245);
}
.homepage >>> .el-input-group__prepend {
  /* border-radius: inherit; */
  background-color: white;
}
.homepage >>> .el-row--flex {
  display: flex;
  /* margin-top: 100px !important; */
}
.pre >>> .el-input__inner::placeholder {
  color: black;
  font-size: 18px;
  text-align: center;
}
/* 谷歌 */
.pre >>> .el-input__inner::-webkit-input-placeholder {
  color: black;
  font-size: 18px;
  text-align: center;
}
/* 火狐 */
.pre >>> .el-input__inner:-moz-placeholder {
  color: black;
  font-size: 18px;
  text-align: center;
}
/*ie*/
.pre >>> .el-input__inner:-ms-input-placeholder {
  color: black;
  font-size: 18px;
  text-align: center;
}
  
</style>