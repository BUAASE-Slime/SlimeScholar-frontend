<template>
<div class="homepage">
  <div class="background">
    <img src="../../assets/images/3.png" class="background" alt="">
  </div>
  <LucidHeader></LucidHeader>
  <div>
  <div class="main">
    <div class="input-box-body">
      <div class="title">Make Academia Visible</div>
      <div class="input-box">
        <el-input placeholder="请输入内容"
                  v-model="searchValue"
                  class="input-with-select"
                  @keyup.enter.native="goSearch"
                  style="font-size:20px; ">
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
    </div>

    <div class="logos">
      <el-row gutter="0" justify="center" type="flex">
        <el-col :span="5"><div class="grid-content bg-purple test_a">
          <el-row>
            <el-col :span="5" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_aut.png" style="width:70px">
            </el-col>
            <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 class="sub-title">Authors</h3>
              <h2 class="sub-number">{{authornum}}</h2>
            </el-col>
          </el-row>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple test_a">
          <el-row>
            <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_art.png" style="width:70px">
            </el-col>
            <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 class="sub-title">Papers</h3>
              <h2 class="sub-number">{{papernum}}</h2>
            </el-col>
          </el-row>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple test_a">
          <el-row>
            <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_jou.png" style="width:70px">
            </el-col>
            <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 class="sub-title">Journals</h3>
              <h2 class="sub-number">{{journalnum}}</h2>
            </el-col>
          </el-row>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple test_a">
          <el-row>
            <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_org.png" style="width:70px">
            </el-col>
            <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 class="sub-title">Organizations</h3>
              <h2 class="sub-number">{{orgnum}}</h2>
            </el-col>
          </el-row>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple test_a">
          <el-row>
            <el-col :span="6" style="padding:10px; margin-right:20px">
              <img class="image" src="../../assets/images/home_fie.png" style="width:70px">
            </el-col>
            <el-col :span="5" style="padding:10px; margin-left:20px">
              <h3 class="sub-title">Field</h3>
              <h2 class="sub-number">{{fieldnum}}</h2>
            </el-col>
          </el-row>
        </div></el-col>
      </el-row>
    </div>

    <div class="top-recommend"></div>
  </div>
  </div>
</div>
</template>

<script>
import LucidHeader from "../../components/LucidHeader";
export default {
  name: "HomePage",
  components: {LucidHeader},
  data() {
    return {
      searchValue: '',
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
          value: 'title',
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
    }
  },
  created() {
    this.authornum = this.authornum.toLocaleString();
    this.papernum = this.papernum.toLocaleString();
    this.journalnum = this.journalnum.toLocaleString();
    this.orgnum = this.orgnum.toLocaleString();
  },
  methods:{
    goSearch:function() {
      let routeUrl = this.$router.resolve({
        path: '/searchRes?' + this.select + "=" + this.searchValue,
      });
      window.open(routeUrl .href, "_blank");
    }
  }
}
</script>

<style scoped>

.homepage {
  min-width: 1100px;
}

.homepage .input-box-body {
  padding-left: 10%;
  padding-right: 10%;
  text-align: left;
}

.homepage .background {
  position:absolute;
  width:100%;
  height:100%;
  left:0;
  z-index:-1;
  object-fit: cover;
}

.homepage .input-box-body .input-box {
  margin-top: 70px;
}

.homepage .input-box-body .input-box button {
  color: white;
}

.homepage .title {
  font-family: "Asap SemiBold",tahoma,arial,"Hiragino Sans GB",\5b8b\4f53, sans-serif;
  font-size: 60px;
  margin-top: 160px;
  color: white;
  font-weight: 600;
}

.homepage .sub-title {
  display:block;
  font-family: 'Courier New',serif;
  font-weight:bold;
  margin-bottom:0 !important;
  color:white;
}

.homepage .sub-number {
  display:block;
  font-family:'Courier New',serif;
  margin-top:10px;
  color:white;
}

.homepage .logos {
  margin-top: 147px;
  padding-top: 20px;
  padding-left: 5%;
  background-color: rgba(0, 0, 0, 0.2);
}

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