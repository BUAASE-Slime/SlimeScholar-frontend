<template>
  <div class="search-author">
    <div class="background">
      <img src="../../assets/images/background2.png" class="background" alt="">
    </div>
    <LucidHeader></LucidHeader>
    <div>
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
    </div>
  </div>
</template>

<script>
import LucidHeader from "../../components/LucidHeader";

export default {
  name: "searchAut",
  components: { LucidHeader },
  data() {
    return {
      searchValue: '',
      select: 'name',
      options: [{
        value: 'name',
        label: '姓名'
      }, {
        value: 'affiliation',
        label: '机构'
      }, {
        value: 'main_area',
        label: '领域'
      }],
    }
  },
  methods: {
    goSearch() {
      let routeUrl = this.$router.resolve({
        path: '/authorRes?' + this.select + "=" + this.searchValue,
      });
      window.open(routeUrl .href, "_blank");
    }
  }
}
</script>

<style scoped>

.search-author {
  min-width: 1100px;
}

.search-author .input-box-body {
  padding-left: 7%;
  padding-right: 10%;
  text-align: left;
}

.search-author .background {
  position:absolute;
  width:100%;
  height:100%;
  left:0;
  z-index:-1;
  object-fit: cover;
}

.search-author .input-box-body .input-box {
  margin-top: 70px;
}

.search-author .input-box-body .input-box button {
  color: white;
}

.search-author .input-with-select{
  height: 60px;
  width: 800px;
}

.search-author .title {
  font-family: "Asap SemiBold",tahoma,arial,"Hiragino Sans GB",\5b8b\4f53, sans-serif;
  font-size: 60px;
  margin-top: 160px;
  color: white;
  font-weight: 600;
}

.search-author >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.search-author >>> .el-input__inner{
  height: 60px !important;
  border:none;
}
.search-author >>> .el-input-group__append {
  /* border-radius: inherit; */
  background-color: rgb(43, 124, 245);
}
.search-author >>> .el-input-group__prepend {
  /* border-radius: inherit; */
  background-color: white;
}
.search-author >>> .el-row--flex {
  display: flex;
  /* margin-top: 100px !important; */
}
.search-author .pre >>> .el-input__inner::placeholder {
  color: black;
  font-size: 18px;
  text-align: center;
}
/* 谷歌 */
.search-author .pre >>> .el-input__inner::-webkit-input-placeholder {
  color: black;
  font-size: 18px;
  text-align: center;
}
/* 火狐 */
.search-author .pre >>> .el-input__inner:-moz-placeholder {
  color: black;
  font-size: 18px;
  text-align: center;
}
/*ie*/
.search-author .pre >>> .el-input__inner:-ms-input-placeholder {
  color: black;
  font-size: 18px;
  text-align: center;
}

</style>