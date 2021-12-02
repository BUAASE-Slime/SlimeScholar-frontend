<template>
  <div class="articles">
    <div class="articles-body">
      <div v-for="(article, index) in articles" v-bind:key="index">
        <div style="text-align: left">
          <div style="margin-bottom: 10px">
            <span class="paper-title">{{article.paper_title}}</span>
          </div>
          <span v-for="(j, index) in article.authors" :key="j" class="author-name">
                  {{j.author_name}}
                  <span v-if="index<article.authors.length-1" style="color: #A0A0A0; font-size: 14px"> / </span>
                </span>
          <span class="publish-year"> · {{article.year}}</span>
        </div>

        <div style="text-align:left;margin-top:10px;">
          <span class="abstract">{{article.abstract|ellipsis}}</span>
        </div>

        <div class="citation-count">{{ article.citation_count }}&nbsp;被引用</div>

        <el-divider v-if="index<articles.length-1"></el-divider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Articles",
  props: ["articles"],
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

</style>