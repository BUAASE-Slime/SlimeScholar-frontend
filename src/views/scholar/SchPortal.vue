<template>
  <div class="schPortal">
    <el-row class="info-div">
          <el-col :span="4">
            <el-image class="headImg" :src="headImgUrl">
            </el-image>
          </el-col>
          <el-col class="people-text" :span="17">
            <el-row style="color: black ;font-weight: bold;font-size:28px">
              <el-col>{{ name }}</el-col>
            </el-row>
            <el-row style="font-size: medium;margin-top: 15px">
              <i class="el-icon-office-building" style="margin-right: 5px"></i>
              {{organization}}
            </el-row>
            <el-row style="margin-top: 10px">
              <i class="el-icon-tickets" style="margin-right: 10px"></i>
              <el-link style="font-size: medium;color:#00b1fd;" v-for="i in fields" v-bind:key="i">
                {{i}}<span style="margin-left: 4px;margin-right: 4px">/</span>
              </el-link>
            </el-row>
          </el-col>
          <el-col class="like-button" :span="2">
            <el-button style="margin-left:5px;margin-top:50px;height: 35px;width: 80px;text-align: center;vertical-align:middle;border-radius: 10px;padding: 10px" icon="el-icon-message">
              关注
            </el-button>
          </el-col>
        </el-row>
    <el-row class="main-div">
      <el-col class="data-div" span="18">
        <el-tabs v-model="activeNameOut" >
          <el-tab-pane label="发表文献" name="article" style="text-align: left">
            <el-row style="font-size: 16px ;font-weight: bold;color: #747474">
              <el-col span="19" style="font-size: 16px">
                文章
              </el-col>
              <el-col span="3">
                引用次数
              </el-col>
              <el-col span="2">
                年份
              </el-col>
            </el-row>
            <div class="article-body" v-for="(item,index) in articles" v-bind:key="index">
              <el-row  v-if="index < artNumInit">
                <el-row class="art-div" >
                  <el-col class="art-info" span="19">
                    <el-row style="color: #217ad9;font-size: 16px;margin: 2px">
                      {{item.title}}
                    </el-row>
                    <el-row style="color: #999999;font-size: small;padding-left: 2px">
                      <span v-bind:key="p" v-for="p in item.authors" style="padding-right: 3px">{{p}}</span>
                    </el-row>
                    <el-row style="color: #999999;font-size: small;padding-left: 2px">
                      <span>{{item.journalName}}  {{item.journalVolume}}  {{item.journalPages}}</span>
                    </el-row>
                  </el-col>
                  <el-col class="art-citation" span="2" style="padding-top: 5px;text-align: center; font-size: 14px">
                    <span>{{item.citations}}</span>
                  </el-col>
                  <el-col class="art-year" span="3" style="padding-top: 5px;text-align: center;padding-left: 4px;font-size: 14px">
                    <span>{{item.year}}</span>
                  </el-col>
                </el-row>
              </el-row>
            </div>
            <el-row style="text-align: center;color: #999999; font-size: small">
              文章  <span style="padding-left: 3px"> 1 - {{ artNumInit }}</span>
              <el-button
                  icon="el-icon-arrow-down"
                  type="text"
                  style="margin-left: 50px;font-size: 13px"
                  class="unfold"
                  :disabled="flag"
                  @click="AddArtNum"
              >展开</el-button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="数据分析" name="analyse" class="dataChart">
            <el-tabs v-model="activeNameChart">
              <el-tab-pane label="被引用量" name="citations">
                <span slot="label">
                  <span class="span-box">
                    <i class="el-icon-s-data"></i>
                    <span style="margin-left: 5px">被引用量</span>
                  </span>
                </span>
                <el-row class="citationChart">
                  <el-row style="font-size: 17px;font-weight: bold;">
                    总被引用 {{ totalCitations }} 次，被关注 {{totalAttention}} 人
                  </el-row>
                  <el-row>
                    <div id="citation-chart" style="width:500px;height: 400px;margin-left: 150px"></div>
                  </el-row>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="专家关系网络" name="relation">
                <span slot="label">
                  <span class="span-box">
                    <i class="el-icon-share"></i>
                    <span style="margin-left: 5px">专家关系网络</span>
                  </span>
                </span>
                <el-row>
                  <div id="relation-chart" style="width: 500px;height: 300px;margin-left: 190px"></div>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col class="friends-div" >
        <el-row style="font-size: 17px;font-weight: bold;margin-bottom: 20px;margin-top: 10px">
            合著作者
          </el-row>
        <el-scrollbar style="height: 395px">
            <el-row class="friends-item" v-for="(i,index) in friends" :key="index">
              <el-col :span="4">
                <el-image :src="i.headImgUrl"></el-image>
              </el-col>
              <el-col :span="17" style="padding-left: 10px">
                <el-row style="color: black ;font-weight: bold;font-size:small">
                  <el-col :span="20" style="padding-bottom: 1px">{{i.name}}</el-col>
                </el-row>
                <el-row style="font-size: xx-small">{{i.organization}}</el-row>
              </el-col>
              <el-col :span="2" style="padding-top: 17px;padding-left: 7px;color: #409EFF">
                <i class="el-icon-right" @click="toHim()"></i>
              </el-col>
            </el-row>
          </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "schPortal.vue",
  data(){
    return{
      id:"19373180",
      name:"Rui Guo",
      organization:"Software Engineering, BeiHang University",
      headImgUrl: "https://i.loli.net/2021/11/13/39PJtQWi7nrHMXu.jpg",
      fields: ["Software Engineering","Visualizing Program","Software Engineering","OpenCV","Visualizing Program"],
      artNumInit:"6",
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
      ciaChart:{
        years:["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
        cia:["198","268","98","200","1","6","198","268","398","200"]
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
      ],
      totalCitations:"80",
      totalAttention:"90",
      flag: false,
      activeNameOut: "article",
      activeNameChart:"citations",
    }
  },
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
      this.showCiaChart();
      this.showRelChart();
    }, 1000);
  },
  methods: {
    AddArtNum(){
      let x=parseInt(this.artNumInit);
      this.flag=(this.articles.length-x);
      x+=20;
      if(x>this.articles.length) x=this.articles.length;
      this.artNumInit=x;
    },
    toHim(){
      this.$message("进入了TA的主页");
    },
    showCiaChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById('citation-chart'))
      // 绘制图表
      myChart1.setOption({
        title: { text: this.ciaChart.title },
        tooltip: {},
        xAxis: {
          data:this.ciaChart.years,
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
          bottom: -6,
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
          data:this.ciaChart.cia,
        }]
      });
    },
    showRelChart(){
    },
    /**
     * 数据集合
     */
    dataEChart(){
      let data = [
        {
          name: '张1',
          symbolSize:"50",
          id: '1',
        },
        {
          name: '张2',
          id: '2',
        },
        {
          name: '张3',
          id: '3',
        },
        {
          name: '张4',
          id: '4',
        },
        {
          name: '张5',
          id: '5',
        },
        {
          name: '张6',
          id: '6',
        },
        {
          name: '张7',
          id: '7',
        },
        {
          name: '张6',
          id: '8',
        },
      ];
      return data;
    },
    /**
     * 关系数据集合
     */
    linkEChart(){
      let dataLink=[
        {value: "同事",source: "1",target: "2"},
        {value: "同事",source: "1",target: "3"},
        {value: "同事",source: "1",target: "4"},
        {value: "同学",source: "1",target: "5"},
        {value: "同学",source: "1",target: "6"},
        {value: "同学",source: "1",target: "7"},
        {value: "爸爸",source: "1",target: "8"},
      ];
      return dataLink;
    },
}
}
</script>

<style scoped>

.schPortal .info-div {
  background-color: white;
  padding-top: 25px;
  padding-left: 45px;
  padding-bottom: 25px;
  margin-left: 170px;
  margin-top: 40px;
  width: 80%;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

.schPortal .main-div{
  width: 80%;
  margin-left: 170px;
  margin-top: 22px;
}

.schPortal .headImg{
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-left: 10px;
}

.schPortal .people-text{
  padding-top: 25px;
}

.schPortal .data-div{
  padding: 10px 30px 20px;
  margin-bottom: 30px;
  min-height: 500px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

.schPortal .article-body{
  margin-top: 15px;
  margin-bottom: 15px;
}

.schPortal .article-body .art-info{
  padding-left: 2px;
}

.schPortal >>> .el-tabs__item{
  padding-left: 20px;
  height: 45px;
  font-size: medium;
}

.schPortal >>> .el-tabs__item.is-active{
  color: #00b1fd;
  font-weight: 650;
}

.schPortal >>> .el-tabs__active-bar{
  transition: all 0.3s;
  background-color: #00b1fd;
}

.schPortal >>> .dataChart .el-tabs__item{
  padding-left: 20px;
  height: 45px;
  font-size: small;
}

.schPortal .dataChart >>> .el-tabs__item.is-active{
  color: #00b1fd;
  font-weight: 500;
}

.schPortal .dataChart >>> .el-tabs__active-bar{
  transition: all 0.3s;
  background-color: rgba(0, 177, 253, 0);
}

.schPortal .dataChart >>> .el-tabs__nav-wrap::after{
  height: 0;
}

.schPortal .dataChart{
  padding-left: 30px;
  padding-top: 7px;
}

.schPortal .friends-div{
  text-align: left;
  padding: 10px 10px 5px 15px;
  min-height: 500px;
  width: 280px;
  margin-left: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

.schPortal .friends-item{
  padding-bottom: 13px;
  margin-top: 18px;
  border-bottom: #e2e2e2 solid 1px;
}

.schPortal .friends-item >>> .el-image{
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.schPortal >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}


</style>