<template>
  <div class="main">
    <el-row>
      <el-col id="bg" :span="24" style="background-color:#f5f5f5;"><div id="logo">
        <!-- <el-card :body-style="{ padding: '0px' }"> -->
          <img src="../../assets/images/bg2.jpg" class="image" style="position:absolute; left:0px; background-size:cover; width:100%; height:395px; z-index:0;" alt="">
        <!-- </el-card> -->
        <img src="../../assets/images/slime_logo4.png" alt="logo" style="height: 120px; margin:50px; margin-top:150px; position:relative; z-index:2;">
      </div></el-col>
    </el-row>
    <el-row >
      <el-col :span="24"><div id="inputbox">
        <div style="margin-top: 0px;" id="inputbox2">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" >
            <el-select v-model="select" slot="prepend" placeholder="检索依据" style="width:150px; ">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div></el-col>
    </el-row>
    <el-row gutter="0" style="margin-top:50px;" justify="center" type="flex">
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_i1.png" style="width:100px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h2 style="display:block; font-family:'Courier New'; font-weight:bold; margin-bottom:0px !important; color:grey;">Authors</h2>
              <h1 style="display:block; font-family:'Courier New'; margin-top:10px; color:grey;">{{authornum}}</h1>
          </el-col>
        </el-row>
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_i2.png" style="width:100px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h2 style="display:block; font-family:'Courier New'; font-weight:bold; margin-bottom:0px !important; color:grey;">Papers</h2>
              <h1 style="display:block; font-family:'Courier New'; margin-top:10px; color:grey;">{{papernum}}</h1>
          </el-col>
        </el-row>  
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_i3.png" style="width:100px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h2 style="display:block; font-family:'Courier New'; font-weight:bold; margin-bottom:0px !important; color:grey;">Journals</h2>
              <h1 style="display:block; font-family:'Courier New'; margin-top:10px; color:grey;">{{journalnum}}</h1>
          </el-col>
        </el-row>  
      </div></el-col>
      <el-col :span="5"><div class="grid-content bg-purple test_a">
        <el-row>
          <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_i4.png" style="width:100px">
          </el-col>
          <el-col :span="5" style="padding:10px; margin-left:20px">
              <h2 style="display:block; font-family:'Courier New'; font-weight:bold; margin-bottom:0px !important; color:grey;">Organizations</h2>
              <h1 style="display:block; font-family:'Courier New'; margin-top:10px; color:grey;">{{orgnum}}</h1>
          </el-col>
        </el-row>  
      </div></el-col>
    </el-row>
    <el-row>
      <el-divider><i class="el-icon-s-data" style="color:grey"></i></el-divider>
    </el-row>
    <el-row id="list" gutter="75" style="padding-left:40px; padding-top:50px; padding-bottom:50px; margin:0;">
      <el-col :span="8" ><div class="grid-content bg-purple">
        <h2 style="font-family:Monospace; border-bottom: gainsboro solid 1px; color:black;">Top Author</h2>
          <el-scrollbar style="height: 350px; overflow-x:hidden !important;">
          <el-row v-for="(i,index) in topAut" :key="index" style="margin:30px">
            <el-col :span="4">
              <div id="rank" style="padding-top: 15px"><span>{{index+1}}</span></div>
            </el-col>
            <el-col :span="30" style="padding-top: 10px">
              <el-row style="color: black ;font-weight: bold;font-size:small">
                <el-col :span="30" style="padding-bottom: 1px">
                  <el-link :underline="false" href="/schPortal" target="_blank">{{i.name}}</el-link>
                  <!-- 跳转到个人主页 -->
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
                  <div id="rank" style="padding-top: 3px"><span>{{index+1}}</span></div>
                </el-col>
                <el-col :span="30" style="padding-bottom: 1px">
                  <el-link :underline="false" href="" target="_blank">{{i.title}}</el-link>
                  <!-- 跳转到期刊详情 -->
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
        <h2 style="font-family:Monospace; border-bottom: gainsboro solid 1px;">Top Conference</h2>
        <el-scrollbar style="height: 350px">
          <el-row v-for="(i,index) in topArt" :key="index" style="margin:30px">
            <el-col :span="4">
              <div id="rank" style="padding-top: 15px"><span>{{index+1}}</span></div>
            </el-col>
            <el-col :span="30" style="padding-top: 10px">
              <el-row style="color: black ;font-weight: bold;font-size:small">
                <el-col :span="30" style="padding-bottom: 1px">
                  <el-link :underline="false" href="/article" target="_blank">{{i.title}}</el-link>
                  <!-- 跳转到文献详情 -->
                </el-col>
              </el-row>
              <div v-for="(j,index) in i.author" :key="index" style="margin-right:10px; display: inline; float:left;">
                <span style="font-size: x-small;" >{{j}}</span>
              </div>
            </el-col>
          </el-row>
          </el-scrollbar>
      </div></el-col>
    </el-row>
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
  }
}
</script>

<style scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  
}
#inputbox{
  width: 600px;
  margin:0 auto;

}
.el-input-group__prepend {
  background-color: #fff !important;
}
  .el-col {
    border-radius: 4px ;
  }
  .bg-purple-dark {
    background: #cccccc !important;
  }
  #list .bg-purple {
    background: #f5f5f5;
    /* #efeefd */
    padding:20px;
    border-radius: 14px ;
    border: gainsboro solid 1px;
  }
  .grid-content[data-v-1274387a] {
    border-radius: 14px;
    min-height: 36px;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  /* .el-col .el-col-24 {
    background-color: rgb(114, 114, 114);
  } */
  #bg{
    background-image: "../../assets/images/bg2.png" !important;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .test_a {  
      display: block;
      margin: 0 auto;
      width:100%;
      overflow: hidden;
  }
    
  .test_a img {  
      width: 100%;  
      transform: scale(1);  
      transition: all 1s ease 0s;
  }  
  
  .test_a:hover img {  
      transform: scale(1.15);
      transition: all 1s ease 0s;
  } 
</style>
<style>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>