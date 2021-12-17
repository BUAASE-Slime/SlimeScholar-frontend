<template>
  <div class="articles">
    <div class="articles-body">
      <div v-for="(article, index) in articles" v-bind:key="index">
        <div style="text-align: left">
          <div style="margin-bottom: 10px">
            <span class="paper-title" @click="gotoPaper(article.paper_id)">{{article.paper_title}}</span>
          </div>
          <span v-for="(j, index) in article.authors" :key="j" class="author-name">
                  <span @click="gotoSch(j.author_id)">{{j.author_name}}</span>
                  <span v-if="index<article.authors.length-1" style="color: #A0A0A0; font-size: 14px"> / </span>
                </span>
          <span class="publish-year"> · {{article.year}}</span>
        </div>

        <div style="text-align:left;margin-top:10px;">
          <span class="abstract">{{article.abstract|ellipsis}}</span>
        </div>

        <div class="citation-count">
          <span>{{ article.collect_num }}&nbsp;被收藏</span>
          <span>&nbsp;·&nbsp;{{ article.citation_count }}&nbsp;被引用</span>
        </div>

        <el-divider v-if="index<articles.length-1"></el-divider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Articles",
  props: ["articles"],
  methods: {
    gotoSch(author_id) {
      let routeUrl = this.$router.resolve({
        path: '/schPortal',
        query: { v: author_id }
      });
      window.open(routeUrl .href, "_self");
    },
    gotoPaper(paper_id) {
      let routeUrl = this.$router.resolve({
        path: '/article',
        query: { v: paper_id }
      });
      window.open(routeUrl .href, "_self");
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

</style>