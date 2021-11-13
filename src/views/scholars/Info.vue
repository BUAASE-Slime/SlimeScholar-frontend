<template>
  <div class="scholar-info">
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
              <el-col :span="4"><el-button type="primary" style="height: 35px;text-align: center;vertical-align:middle;border-radius: 10px" icon="el-icon-message">关注</el-button></el-col>
            </el-row>
            <el-row style="font-size: medium;margin-top: 5px">{{organization}}</el-row>
            <el-row style="margin-top: 10px">
              <el-link style="margin-right: 15px;font-size: medium;color: cornflowerblue" v-for="i in fields" v-bind:key="i">{{i}}</el-link>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="article">
          <h5>这里是文献列表</h5>
        </el-row>
      </el-main>
      <el-aside width="35%">
        <el-col>
          <div class="side">
              <h5>这里是侧边栏</h5>
          </div>
        </el-col>
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
      articles:[
        {
          title:"文章1",
        },
        {
          title:"文章2",
        }
      ],
    }
  },
}
</script>

<style>
.scholar-info .el-container{
  margin-left: 150px;
  margin-right: 150px;
}

.scholar-info .el-main{
  text-align: left;
}

.scholar-info .el-aside{
  border-left: gainsboro 1px solid;
  padding-left: 10px;
}

.scholar-info .headImg{
  border-radius: 50%;
  width: 150px;
  height: 150px;
}

.scholar-info .people-text{
  padding-top: 30px;
}

.scholar-info .people{
  padding-bottom: 10px;
  border-bottom: gainsboro solid 1px;
}

</style>