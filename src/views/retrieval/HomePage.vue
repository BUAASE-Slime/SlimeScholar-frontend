<template>
<div class="homepage">
  <div class="main">
    <el-row>
      <el-col id="bg" :span="24" ><div id="logo">
        <img src="../../assets/images/bg5.jpg" class="image" style="position:absolute; left:0px; background-size:cover; width:100%; height:455px; z-index:0;" alt="">
        <img src="../../assets/images/make-visible-v1.png" alt="logo" style="height: 200px; margin:50px; margin-top:100px; margin-bottom:0px; position:relative; z-index:2;">
<!--        <img src="../../assets/images/SlimeScholar-en.png" alt="logo" style="height: 200px; margin:50px; margin-top:100px; margin-bottom:0px; position:relative; z-index:2;">-->
      </div></el-col>
    </el-row>
    <el-row >
      <el-col :span="24"><div id="inputbox">
        <div style="margin-top: 0px; width:800px; margin:0 auto; box-shadow:grey 2px 1px 2px 1px" id="inputbox2">
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
    <el-row gutter="0" style="margin-top:50px; margin-left:50px" justify="center" type="flex">
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_i1.png" style="width:70px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 style="display:block; font-family:'Courier New',serif; font-weight:bold; margin-bottom:0px !important; color:black;">Authors</h3>
              <h2 style="display:block; font-family:'Courier New',serif; margin-top:10px; color:black;">{{authornum}}</h2>
          </el-col>
        </el-row>
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_i2.png" style="width:70px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 style="display:block; font-family:'Courier New',serif; font-weight:bold; margin-bottom:0px !important; color:black;">Papers</h3>
              <h2 style="display:block; font-family:'Courier New',serif; margin-top:10px; color:black;">{{papernum}}</h2>
          </el-col>
        </el-row>  
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_i3.png" style="width:70px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 style="display:block; font-family:'Courier New',serif; font-weight:bold; margin-bottom:0px !important; color:black;">Journals</h3>
              <h2 style="display:block; font-family:'Courier New',serif; margin-top:10px; color:black;">{{journalnum}}</h2>
          </el-col>
        </el-row>  
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_i4.png" style="width:70px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 style="display:block; font-family:'Courier New',serif; font-weight:bold; margin-bottom:0px !important; color:black;">Orgnizations</h3>
              <h2 style="display:block; font-family:'Courier New',serif; margin-top:10px; color:black;">{{orgnum}}</h2>
          </el-col>
        </el-row>  
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_i5.png" style="width:70px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 style="display:block; font-family:'Courier New',serif; font-weight:bold; margin-bottom:0px !important; color:black;">Field</h3>
              <h2 style="display:block; font-family:'Courier New',serif; margin-top:10px; color:black;">{{fieldnum}}</h2>
          </el-col>
        </el-row>  
      </div></el-col>
    </el-row>
    <!-- <el-row>
      <el-divider><i class="el-icon-s-data" style="color:grey"></i></el-divider>
    </el-row> -->
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
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      input3: '',
      select: '',
      authornum: 12345,
      papernum: 233344,
      journalnum:747,
      orgnum:1235,
      fieldnum:75,
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
        value: '',
        topAut:[
        {
          id:"19373180",
          name:"Zuozhou Zhang",
          organization:"Software Engineering, BeiHang University",
        },
        {
          id:"19373180",
          name:"Zewan Huang",
          organization:"Software Engineering, BeiHang University",
        },
        {
          id:"19373180",
          name:"Yu Li",
          organization:"Software Engineering, BeiHang University",
        },
        {
          id:"19373180",
          name:"Luxia Lin",
          organization:"Software Engineering, BeiHang University",
        },
        {
          id:"19373180",
          name:"Qin Zhou",
          organization:"Software Engineering, BeiHang University",
        },
        {
          id:"19373180",
          name:"Yuning Tong",
          organization:"Software Engineering, BeiHang University",
        },
        {
          id:"19373180",
          name:"Yiting Shi",
          organization:"Software Engineering, BeiHang University",
        }
        ],
        topArt:[
        {
          id:"19373180",
          title:"计算机网络概要1",
          author:["Zuozhou Zhang","Rui Guo"],
          organization:"Software Engineering, BeiHang University",
        },
        {
          id:"19373180",
          title:"计算机网络概要2",
          author:["Yu Li"],
          organization:"Software Engineering, BeiHang University",
        },
        {
          id:"19373180",
          title:"计算机网络概要3",
          author:["Zewan"],
          organization:"Software Engineering, BeiHang University",
        },
        {
          id:"19373180",
          title:"计算机网络概要4",
          author:["Yuning Tong","Yiting Shi"],
          organization:"Software Engineering, BeiHang University",
        },
        {
          id:"19373180",
          title:"计算机网络概要5",
          author:["Qin Zhou"],
          organization:"Software Engineering, BeiHang University",
        },
        {
          id:"19373180",
          title:"计算机网络概要6",
          author:["Zewan Huang","Yu Li","Qin Zhou"],
          organization:"Software Engineering, BeiHang University",
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
  background-color: white;
}
.homepage >>> .el-input-group__prepend {
  /* border-radius: inherit; */
  background-color: white;
}
.homepage >>> .el-row--flex {
  display: flex;
  margin-top: 100px !important;
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