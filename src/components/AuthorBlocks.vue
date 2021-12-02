<template>
  <div class="author-blocks">
    <el-card class="author-items">
      <div class="author-item" v-for="(item,index) in authors" :key="index">
        <el-row style="width: 100%; font-size: 14px">
          <el-col :span="3">
            <el-image :src="item.avatar"></el-image>
          </el-col>
          <el-col :span="16" style="padding-left: 10px; text-align: left">
            <div class="author-name">{{ item.author_name }}</div>
            <div>{{ item.affiliation }}</div>
            <div style="margin-top: 3px; margin-bottom: 3px">{{ item.main_areas }}</div>
          </el-col>
          <el-col :span="5">
            <div class="article-count">文献数量：<span style="color: #2d94d4">{{ item.article_count }}</span>
            </div>
          </el-col>
        </el-row>
        <el-divider v-if="index<authors.length-1"></el-divider>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AuthorBlocks",
  props: ['authors'],

}
</script>

<style scoped>

.author-blocks .author-items {
  margin-top: 20px;
  padding: 20px 10px;
}

.author-blocks .author-item >>> .el-image{
  height: 70px;
  width: 70px;
  border-radius: 50%;
}

.author-blocks .author-item >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}

.author-blocks .author-items .author-name {
  color: black;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
}

.author-blocks .author-items .article-count {
  margin-top: 55px;
}

</style>