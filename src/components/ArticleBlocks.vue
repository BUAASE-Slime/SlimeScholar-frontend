<template>
  <div class="article-blocks">
    <el-card v-for="item in articles" :key="item" class="article-item">
      <div style="text-align: left">
        <div style="margin-bottom: 10px">
          <span class="paper-title" @click="openDetail(item.paper_id)">{{item.paper_title}}</span>
        </div>
        <span v-for="(j, index) in item.authors" :key="j" class="author-name">
                  {{j.author_name}}
                  <span v-if="index<item.authors.length-1"> / </span>
                </span>
        <span class="publish-year">
          <span class="publish-year"> · {{item.year}}</span>
<!--            <span v-if="item.publisher"> · {{item.publisher}}</span>-->
<!--            <span v-if="item.journal_id !== ''"> · {{item.journal_id}}</span>-->
<!--            <span v-else-if="item.conference_id !== ''"> · {{item.conference_id}}</span>-->
<!--            <span v-if="item.last_page!==''&&item.first_page!==''&&item.volume!==''">-->
<!--                        {{ item.volume }}, {{ item.first_page }}-{{ item.last_page }}-->
<!--                      </span>-->
<!--        <span v-else-if="item.first_page!==''&&item.volume!==''">-->
<!--                        {{ item.volume }}, {{ item.first_page }}-->
<!--                      </span>-->
        </span>
      </div>
      
      <div style="text-align:left;margin-top:10px;">
        <span class="abstract">{{item.abstract|ellipsis}}</span>
      </div>
      <div id="fields">
        <el-row>
        <div v-for="item1 in item.fields" :key="item1" style="display:inline-block;margin-top:15px; margin-right:10px; float:left;">
          <span style="border-style:solid; border-width:1px; border-radius:5px; padding: 3px 5px;font-size: 14px; cursor: pointer" @click="searchField(item1.name, item1.field_id)">
            <i class="el-icon-menu"></i>
            &nbsp;{{item1.name}}
          </span>
        </div>
        </el-row>
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
        <span style="float:right; text-align:right;">
          被引次数：
          <span style="color: #2d94d4;">
            {{item.citation_count.toLocaleString()}}
          </span>
        </span>
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
    openDetail(paper_id) {
      let routeUrl = this.$router.resolve({
        path: '/article',
        query: { v: paper_id }
      });
      window.open(routeUrl .href, "_blank");
    },
    searchField(field_name, field_id) {
      // TODO:
    }
  },
  filters: {
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 300) {
        return value.slice(0,300) + "...";
      }
      return value;
    },
  }
}
</script>

<style scoped>

@import "../styles/article.css";

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