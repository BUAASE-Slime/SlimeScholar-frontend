<template>
  <div class="article-blocks">
    <el-card v-for="item in articles" :key="item" class="article-item">
      <div style="text-align: left">
        <div style="margin-bottom: 10px">
          <span style="font-size: 20px; font-weight: bold">{{item.paper_title}}</span>
        </div>
        <span v-for="(j, index) in item.authors" :key="j" style="color: #2d94d4; cursor: pointer">
                  {{j.author_name}}
                  <span v-if="index<item.authors.length-1" style="color: #A0A0A0"> / </span>
                </span>
        <span style="color:grey;"> · {{item.year}}</span>
      </div>

      <div style="text-align:left;margin-top:10px;">
        <span style="color: #A0A0A0">{{item.abstract|ellipsis}}</span>
      </div>
      <el-divider></el-divider>
      <div style="text-align:left; font-size: 15px">
        <i class="el-icon-collection" style="float:left">引用</i>
        <div v-if="flag==='searchRes'">
          <div v-if="item.is_collect" @click="collectChange(item)" style="margin-left: 30px; float:left">
            <i class="el-icon-star-on">收藏</i>
          </div>
          <div v-else @click="collectChange(item)" style="float:left"><i class="el-icon-star-off" >收藏</i></div>
        </div>
        <div v-else-if="flag==='schLib'">
        <!--  TODO: 删除图标       -->
        </div>
        <span style="float:right; text-align:right;">被引次数：{{item.reference_count}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ArticleBlocks",
  props: ['articles', 'flag'],
  methods: {
    collectChange:function(item){
      item.is_collect=!(item.is_collect);
    },
  },
  filters: {
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 400) {
        return value.slice(0,400) + "...";
      }
      return value;
    },
  }
}
</script>

<style scoped>

.article-blocks .article-item {
  margin-top:20px;
  display:flex;
}

.article-blocks .article-item >>> .el-card__body {
  width: 100%;
  padding: 25px 30px 15px;
}

.article-blocks .article-item >>> .el-divider--horizontal {
  margin: 10px 0;
}

</style>