<template>
  <div class="search-res">
    <div class="main-body">
      <el-row class="header">
        <span style="float:left; font-size: 22px">
        为您查询到
        <span>&nbsp;{{ resNum }}&nbsp;</span>
        条结果
        </span>
      </el-row>
      <div class="content-select-result">
        <el-row :gutter="0">
          <el-col :span="7"><div class="grid-content bg-purple" style="margin-right:50px">
            <span style="display:flex; margin-bottom:30px; margin-top:5px; font-size:16px;">筛选</span>
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
                <div style="float:left; width:100%; display:flex; margin:20px"><span>
                类型
              </span></div>
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
                  <span style="display:flex; font-size:16px; margin-top:5px">论文 ({{totalPaper}})</span>
                </el-col>
                <el-col span="2">
                  <div style="margin-top:5px">
                    <span style="font-size:16px">排序</span>
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
            <el-card v-for="item in articles" :key="item" id="the_item" style="margin-top:20px;display:flex">
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
                <span style="float:right; text-align:right;color:#66b1ff;">{{item.reference_num}}</span>
                <span style="float:right; text-align:right;">被引次数：</span>
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
        resNum:45112,
        select: '1',
        year:["2008","2009","2021"],
        journals:["所有","会议","期刊","书籍"],
        fields:["计算机视觉","计算机图形学","人工智能"],
        queue:["发表时间","引用次数"],
        value2:"发表时间",
        totalPaper:288,
        minYear:1928,
        maxYear:2021,
        value1:2021,
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
    this.resNum = this.resNum.toLocaleString();
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
        if (value.length > 500) {
          return value.slice(0, 500) + "...";
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

.search-res #the_item {
  height: 300px;
}

</style>