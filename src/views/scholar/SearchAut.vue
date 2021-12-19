<template>
  <div class="search-author">
    <div class="background">
      <img src="../../assets/images/background2.jpg" class="background" alt="">
    </div>
    <PageHeader mode="white"></PageHeader>
    <div>
      <div class="input-box-body">
        <div class="title">Access Experts</div>
        <div class="input-box">
          <el-input placeholder="请输入内容"
                    v-model="searchValue"
                    class="input-with-select"
                    @keyup.enter.native="goSearch"
                    style="width: 750px; font-size: 17px">
            <el-select v-model="select" slot="prepend" placeholder="检索依据" style="width: 130px">
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
import PageHeader from "../../components/PageHeader";

export default {
  name: "searchAut",
  components: {PageHeader},
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
      }],
    }
  },
  methods: {
    goSearch() {
      if (this.searchValue === '')
        return;
      let routeUrl = this.$router.resolve({
        path: '/authorRes?' + this.select + "=" + this.searchValue,
      });
      window.open(routeUrl .href, "_self");
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

.search-author .input-box {
  margin-top: 60px;
}
.search-author .input-box >>> .el-input.is-active .el-input__inner, .el-input__inner:focus {
  border: 5px solid #409EFF;
}
.search-author .input-box >>> .el-input__inner {
  height: 50px;
}
.search-author .input-box >>> .el-input-group__append {
  background-color: #409EFF;
  color: white;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: none;
  border-radius: 0 6px 6px 0;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
}
.search-author .input-box >>> .el-input-group__append:hover {
  background-color: #52a9ff;
}
.search-author .input-box >>> .el-input-group--prepend {
  border-radius: 6px 0 0 6px;
}
.search-author .input-box-body .input-box button {
  color: white;
}

.search-author .title {
  font-family: "Asap SemiBold",tahoma,arial,"Hiragino Sans GB",\5b8b\4f53, sans-serif;
  font-size: 60px;
  margin-top: 200px;
  color: #2f2e2e;
  font-weight: 600;
}


</style>