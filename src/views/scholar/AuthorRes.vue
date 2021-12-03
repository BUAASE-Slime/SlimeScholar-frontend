<template>
  <div class="author-result">
    <PageHeader :showSearch="showSearch" :tag="tag" :options="authorOptions" :select="header_select" :input="input"></PageHeader>
    <div class="main-body">
      <el-row class="header">
        <span style="float:left; font-size: 22px; color: #A0A0A0">
        为您查询到
        <span style="color: #525455">&nbsp;{{ authors.length }}&nbsp;</span>
        条结果
        </span>
      </el-row>

      <div class="content-select-result">
        <el-row :gutter="0" v-if="authors.length!==0">
          <el-col :span="7"><div class="grid-content bg-purple" style="margin-right:50px">
            <span style="display:flex; margin-bottom:24px; margin-top:10px; font-size:16px; color: #A0A0A0">筛选</span>
            <el-card class="box-card">
              <div class="author-area sub-block">
                <div class="check-box-title">
                  <span>领域</span>
                </div>
                <el-checkbox-group v-for="(o,index) in aggregation.areas"
                                   :key="o"
                                   style="margin-bottom: 15px; text-align: left"
                                   v-model="checkAreaList">
                  <el-checkbox :label=o.name>
                    <el-tooltip class="item" effect="dark" :content="o.name" placement="right">
                      <span>{{ o.name|ellipsis_30 }}&nbsp;({{ o.count }})</span>
                    </el-tooltip>
                  </el-checkbox>
                </el-checkbox-group>
              </div>

              <el-divider></el-divider>

              <div class="author-affiliation sub-block">
                <div class="check-box-title">
                  <span>机构</span>
                </div>
                <el-checkbox-group v-for="(o,index) in aggregation.affiliations"
                                   :key="o"
                                   style="margin-bottom: 15px; text-align: left"
                                   v-model="checkAffiliationList">
                  <el-checkbox :label=o.name>
                    <el-tooltip class="item" effect="dark" :content="o.name" placement="right">
                      <span>{{ o.name|ellipsis_30 }}&nbsp;({{ o.count }})</span>
                    </el-tooltip>
                  </el-checkbox>
                </el-checkbox-group>
              </div>

            </el-card>
          </div>
          </el-col>

          <el-col :span="15"><div class="grid-content bg-purple">
            <div>
              <el-row>
                <el-col span="17">
                  <span style="display:flex; font-size:16px; margin-top:10px;color: #A0A0A0">学者 ({{authors.length}})</span>
                </el-col>
                <el-col span="2">
                  <div style="margin-top:10px">
                    <span style="font-size:16px;color: #A0A0A0">排序</span>
                  </div>
                </el-col>
                <el-col span="5">
                  <el-select v-model="sortValue" placeholder="请选择" style="float:right; height:30px; margin-bottom:5px">
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

            <AuthorBlocks :authors="authors"></AuthorBlocks>

          </div></el-col>
        </el-row>
        <el-empty :image-size="200" description="暂无相关学者数据" v-else></el-empty>
      </div>

    </div>
  </div>
</template>

<script>
import AuthorBlocks from "../../components/AuthorBlocks";
import PageHeader from "../../components/PageHeader";
export default {
  name: "authorRes",
  components: {PageHeader, AuthorBlocks},
  data() {
    return {
      showSearch: true,
      tag: 'authorRes',
      header_select: 'name',
      authorOptions: [{
        value: 'name',
        label: '姓名'
      }, {
        value: 'affiliation',
        label: '机构'
      }, {
        value: 'main_area',
        label: '领域'
      }],
      input: '',

      queue: ["匹配程度", "文献数量", "被引次数"],
      sortValue: "匹配程度",

      authors: [
        {
          affiliation_name: "Beihang University",
          author_id: "2736235158",
          author_name: "Z Huang",
          main_areas: "Computer Vision, Computer Graphics",
          fields: ["Computer Vision", "Computer Graphics"],
          citation_count: 1234,
          paper_count: 132,
          avatar: "https://i.loli.net/2021/11/13/39PJtQWi7nrHMXu.jpg"
        },
        {
          affiliation_name: "Beihang University",
          author_id: "2736235158",
          author_name: "Z Huang",
          main_areas: "Computer Vision, Computer Graphics",
          fields: ["Computer Vision", "Computer Graphics"],
          citation_count: 1234,
          paper_count: 132,
          avatar: "https://i.loli.net/2021/11/13/39PJtQWi7nrHMXu.jpg"
        },
        {
          affiliation_name: "Beihang University",
          author_id: "2736235158",
          author_name: "Z Huang",
          main_areas: "Computer Vision, Computer Graphics",
          fields: ["Computer Vision", "Computer Graphics"],
          citation_count: 1234,
          paper_count: 132,
          avatar: "https://i.loli.net/2021/11/13/39PJtQWi7nrHMXu.jpg"
        },
      ],

      aggregation: {
        areas: [
          {
            count: 12,
            name: "Computer Vision"
          },
          {
            count: 32,
            name: "Computer Graphics"
          },
          {
            count: 12,
            name: "Computer Vision"
          },
        ],
        affiliations: [
          {
            count: 21,
            name: "Beihang University"
          },
          {
            count: 21,
            name: "Beihang University"
          },
          {
            count: 21,
            name: "Beihang University"
          },
        ]
      },

      checkAreaList: [],
      checkAffiliationList: [],
    }
  },

  created() {
    let _query = this.$route.query;
    let _search_key = Object.keys(_query)[0];
    let _search_value = _query[_search_key];

    this.header_select = _search_key;
    this.input = _search_value;
  },
  methods: {
    getAuthorRes() {

    }
  },

  filters: {
    ellipsis_30: function(value) {
      if (!value) return "";
      if (value.length > 30) {
        return value.slice(0,30) + "...";
      }
      return value;
    }
  },
}
</script>

<style scoped>

.author-result .main-body {
  padding: 0 100px 30px;
}

.author-result .header {
  margin-bottom: 40px;
}

.author-result .box-card {
  padding: 20px;
}

.author-result .box-card .sub-block {
  margin-bottom: 20px;
}

.author-result .box-card .check-box-title {
  text-align: left;
  font-size: 17px;
  margin-bottom: 20px;
}

</style>