<template>
  <div class="schPortal">
    <el-container>
      <el-main>
        <el-row class="people">
          <el-col :span="6">
            <el-image class="headImg" :src="headImgUrl">
            </el-image>
          </el-col>
          <el-col class="people-text" :span="18">
            <el-row style="color: black ;font-weight: bold;font-size:xx-large">
              <el-col :span="20">{{name}}</el-col>
              <el-col :span="4">
                <el-button type="primary" style="height: 35px;width: 80px;text-align: center;vertical-align:middle;border-radius: 10px;padding: 10px" icon="el-icon-message">
                关注
                </el-button>
              </el-col>
            </el-row>
            <el-row style="font-size: medium;margin-top: 5px">{{organization}}</el-row>
            <el-row style="margin-top: 10px">
              <el-link style="margin-right: 15px;font-size: medium;color: cornflowerblue" v-for="i in fields" v-bind:key="i">{{i}}</el-link>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="padding-top: 15px;font-size: large ;font-weight: bold;color: #999999">
          <el-col span="19" style="font-size: large">
            文章
          </el-col>
          <el-col span="3">
            引用次数
          </el-col>
          <el-col span="2">
            年份
          </el-col>
        </el-row>
        <div class="article"  v-for="(item,index) in articles" v-bind:key="index">
          <el-row  v-if="index < artNum">
            <el-row class="art-div" >
              <el-col class="art-info" span="19">
                <el-row style="color: #217ad9;font-size: larger;margin: 2px">
                  {{item.title}}
                </el-row>
                <el-row style="color: #999999;font-size: small;padding-left: 2px">
                  <span v-bind:key="p" v-for="p in item.authors" style="padding-right: 3px">{{p}}</span>
                </el-row>
                <el-row style="color: #999999;font-size: small;padding-left: 2px">
                  <span>{{item.journalName}}  {{item.journalVolume}}  {{item.journalPages}}</span>
                </el-row>
              </el-col>
              <el-col class="art-citation" span="2" style="padding-top: 5px;text-align: center">
                <span>{{item.citations}}</span>
              </el-col>
              <el-col class="art-year" span="3" style="padding-top: 5px;text-align: center;padding-left: 4px">
                <span>{{item.year}}</span>
              </el-col>
            </el-row>
          </el-row>
        </div>

        <el-row style="text-align: center;color: #999999">
          文章 1 - {{artNum}}<el-button icon="el-icon-arrow-down" style="margin-left: 50px" @click="AddArtNum()">展开</el-button>
        </el-row>
      </el-main>
      <el-aside width="30%">
        <el-row class="chart">
          <el-row>
            <div id="citation-chart" style="width: 300px;height: 300px"></div>
          </el-row>
        </el-row>
        <el-row class="friends">
          <el-row style="font-size: large;font-weight: bold;margin-bottom: 20px">
            合著作者
          </el-row>
          <el-scrollbar style="height: 350px">
            <el-row class="friends-div" v-for="(i,index) in friends" :key="index">
              <el-col :span="4">
                <el-image :src="i.headImgUrl"></el-image>
              </el-col>
              <el-col :span="17" style="padding-top: 10px">
                <el-row style="color: black ;font-weight: bold;font-size:small">
                  <el-col :span="20" style="padding-bottom: 1px">{{i.name}}</el-col>
                </el-row>
                <el-row style="font-size: x-small">{{i.organization}}</el-row>
              </el-col>
              <el-col :span="2" style="padding-top: 17px;padding-left: 5px;color: #409EFF">
                <i class="el-icon-right" @click="toHim()"></i>
              </el-col>
            </el-row>
          </el-scrollbar>
        </el-row>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "info.vue",
  data(){
    return{
      id:"19373180",
      name:"Rui Guo",
      organization:"Software Engineering, BeiHang University",
      headImgUrl: "https://i.loli.net/2021/11/13/39PJtQWi7nrHMXu.jpg",
      fields: ["Software Engineering","Visualizing Program","Software Engineering","OpenCV","Visualizing Program","OpenCV"],
      artNum:"4",
      articles:[
        {
          title:"Knowledge-rich, computer-assisted composition of Chinese couplets",
          authors:["Ming Xiao","Rui Guo","Hong Xiao","Hua Xiao","Zhu Xiao","Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year:"2018",
          citations:"156",
        },
        {
          title:" computer-assisted composition,Knowledge-rich",
          authors:["Ming Xiao","Rui Guo","Hong Xiao","Hua Xiao","Zhu Xiao","Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year:"2009",
          citations:"186",
        },
        {
          title:"Knowledge-rich, computer-assisted composition of Chinese couplets",
          authors:["Ming Xiao","Rui Guo","Hong Xiao","Hua Xiao","Zhu Xiao","Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year:"2014",
          citations:"178",
        },
        {
          title:"Chinese couplets",
          authors:["Ming Xiao","Rui Guo","Hong Xiao","Hua Xiao","Zhu Xiao","Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year:"2010",
          citations:"16",
        },
        {
          title:"Knowledge-rich, computer-assisted composition of Chinese couplets ",
          authors:["Ming Xiao","Rui Guo","Hong Xiao","Hua Xiao","Zhu Xiao","Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year:"2000",
          citations:"56",
        },
        {
          title:"Chinese couplets,computer-assistedKnowledge-rich ",
          authors:["Ming Xiao","Rui Guo","Hong Xiao","Hua Xiao","Zhu Xiao","Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year:"2021",
          citations:"1515",
        },
        {
          title:"Knowledge-rich, computer-assisted composition of Chinese couplets",
          authors:["Ming Xiao","Rui Guo","Hong Xiao","Hua Xiao","Zhu Xiao","Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year:"2018",
          citations:"156",
        },
        {
          title:" computer-assisted composition,Knowledge-rich",
          authors:["Ming Xiao","Rui Guo","Hong Xiao","Hua Xiao","Zhu Xiao","Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year:"2009",
          citations:"186",
        },
        {
          title:"Knowledge-rich, computer-assisted composition of Chinese couplets",
          authors:["Ming Xiao","Rui Guo","Hong Xiao","Hua Xiao","Zhu Xiao","Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year:"2014",
          citations:"178",
        },
        {
          title:"Chinese couplets",
          authors:["Ming Xiao","Rui Guo","Hong Xiao","Hua Xiao","Zhu Xiao","Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year:"2010",
          citations:"16",
        },
        {
          title:"Knowledge-rich, computer-assisted composition of Chinese couplets ",
          authors:["Ming Xiao","Rui Guo","Hong Xiao","Hua Xiao","Zhu Xiao","Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year:"2000",
          citations:"56",
        },
        {
          title:"Chinese couplets,computer-assistedKnowledge-rich ",
          authors:["Ming Xiao","Rui Guo","Hong Xiao","Hua Xiao","Zhu Xiao","Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year:"2021",
          citations:"1515",
        },
      ],
      chart:{
        title:"引用次数 (近十年)",
        xdata:["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
        ydata:["198","268","98","200","1","6","198","268","398","200"]
      },
      friends:[
        {
          id:"19373180",
          name:"Zuozhou Zhang",
          organization:"Software Engineering, BeiHang University",
          headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
        },
        {
          id:"19373180",
          name:"Zewan Huang",
          organization:"Software Engineering, BeiHang University",
          headImgUrl: "https://i.loli.net/2021/11/14/kId5TvGJUiDa7PW.jpg",
        },
        {
          id:"19373180",
          name:"Yu Li",
          organization:"Software Engineering, BeiHang University",
          headImgUrl: "https://i.loli.net/2021/11/14/7EMrViSdIQDvOya.jpg",
        },
        {
          id:"19373180",
          name:"Luxia Lin",
          organization:"Software Engineering, BeiHang University",
          headImgUrl: "https://i.loli.net/2021/11/14/Wenpz8IOtHG7yq4.jpg",
        },
        {
          id:"19373180",
          name:"Qin Zhou",
          organization:"Software Engineering, BeiHang University",
          headImgUrl: "https://i.loli.net/2021/11/14/GolXYjUHuZsSnqa.png",
        },
        {
          id:"19373180",
          name:"Yuning Tong",
          organization:"Software Engineering, BeiHang University",
          headImgUrl: "https://i.loli.net/2021/11/14/25FSRmioMyBgUha.jpg",
        },
        {
          id:"19373180",
          name:"Yiting Shi",
          organization:"Software Engineering, BeiHang University",
          headImgUrl: "https://i.loli.net/2021/11/14/QbNtj9B3RLMfyrv.jpg",
        }
      ]
    }
  },
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
      this.showChart();
    }, 1000);
  },
  methods: {
    AddArtNum(){
      let x=parseInt(this.artNum);
      let flag=(this.articles.length-x);
      x+=20;
      if(x>this.articles.length) x=this.articles.length;
      if(flag===0) this.$message("没有更多文章了");
      this.artNum=x;
    },
    toHim(){
      this.$message("进入了TA的主页");
    },
    showChart()
    {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById('citation-chart'))
      // 绘制图表
      myChart1.setOption({
        title: { text: this.chart.title },
        tooltip: {},
        xAxis: {
          data:this.chart.xdata,
          name: '年份'
        },
        yAxis: {
          type: 'value',
          name: '次数',
          axisLabel: {
            formatter: '{value} '
          }
        },
        dataZoom: [{
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          left: '9%',
          bottom: -5,
          start: 50,
          end: 100 //初始化滚动条
        }],
        grid: { //调整图表上下左右位置
          top:'22%',
          left: '3%',
          right: '15%',
          bottom: '8%',
          containLabel: true
        },
        series: [{
          type: 'bar',
          data:this.chart.ydata,
        }]
      });
    },
}
}
</script>

<style>
.schPortal .el-container{
  margin-left: 150px;
  margin-right: 150px;
}

.schPortal .el-main{
  text-align: left;
  margin-right: 20px;
}

.schPortal .el-aside{
  border-left: gainsboro 1px solid;
  padding-left: 30px;
  padding-top: 30px;
  text-align: left;
}

.schPortal .headImg{
  border-radius: 50%;
  width: 150px;
  height: 150px;
}

.schPortal .people-text{
  padding-top: 40px;
  padding-bottom: 20px;
}

.schPortal .people{
  padding-bottom: 10px;
  border-bottom: gainsboro solid 1px;
}

.schPortal .article{
  margin-top: 15px;
  margin-bottom: 15px;
}

.schPortal .article .art-info{
  padding-left: 2px;
}

.schPortal .friends{
  margin-top: 20px;
}

.schPortal .friends-div{
  margin-top: 3px;
  margin-bottom: 3px;
}

.schPortal .friends-div {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: #c4c4c4 solid 1px;
}

.schPortal .friends-div .el-image{
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.schPortal .el-scrollbar__wrap {
  overflow-x: hidden;
}


</style>