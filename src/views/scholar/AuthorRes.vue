<template>
  <div class="author-result">
    <PageHeader :showSearch="showSearch" :tag="tag" :options="authorOptions" :select="header_select" :input="input"></PageHeader>
    <div class="main-body">
      <el-row class="header">
        <span style="float:left; font-size: 22px; color: #A0A0A0">
        为您查询到
        <span style="color: #525455">&nbsp;{{ total_hits_str }}&nbsp;</span>
        条结果
        </span>
      </el-row>

      <div class="content-select-result">
        <el-row :gutter="0" v-if="total_hits!==0">
          <el-col :span="7"><div class="grid-content bg-purple" style="margin-right:50px">
            <span style="display:flex; margin-bottom:24px; margin-top:10px; font-size:16px; color: #A0A0A0">筛选</span>
            <el-card class="box-card">
<!--              <div class="author-area sub-block">-->
<!--                <div class="check-box-title">-->
<!--                  <span>领域</span>-->
<!--                </div>-->
<!--                <el-checkbox-group v-for="(o,index) in aggregation.areas"-->
<!--                                   :key="o"-->
<!--                                   style="margin-bottom: 15px; text-align: left"-->
<!--                                   v-model="checkAreaList" @change="getAuthorRes">-->
<!--                  <el-checkbox :label=o.name>-->
<!--                    <el-tooltip class="item" effect="dark" :content="o.name" placement="right">-->
<!--                      <span>{{ o.name|ellipsis_30 }}&nbsp;({{ o.paper_count }})</span>-->
<!--                    </el-tooltip>-->
<!--                  </el-checkbox>-->
<!--                </el-checkbox-group>-->
<!--              </div>-->

<!--              <el-divider></el-divider>-->

              <div class="author-affiliation sub-block">
                <div class="check-box-title">
                  <span>机构</span>
                </div>
                <el-checkbox-group v-for="(o,index) in aggregation.affiliations"
                                   :key="o"
                                   style="margin-bottom: 15px; text-align: left"
                                   @change="getAuthorRes"
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

          <el-col :span="16"><div class="grid-content bg-purple">
            <div>
              <el-row>
                <el-col span="17">
                  <span style="display:flex; font-size:16px; margin-top:10px;color: #A0A0A0">学者 ({{ total_hits_str }})</span>
                </el-col>
                <el-col span="2">
                  <div style="margin-top:10px">
                    <span style="font-size:16px;color: #A0A0A0">排序</span>
                  </div>
                </el-col>
                <el-col span="5">
                  <el-select v-model="sortValue"
                             placeholder="请选择"
                             style="float:right; height:30px; margin-bottom:5px"
                             @change="getAuthorRes">
                    <el-option
                        v-for="item in queue"
                        :key="item"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </div>

            <AuthorBlocks
                :authors="authors"
                :author_avatars="author_avatars"
            ></AuthorBlocks>

            <div>
              <el-row>
                <el-col :span="5" style="text-align:right">
                  <div >
                    <span>每页</span>
                    <el-input-number style="width:100px; margin: 22px 15px 15px;" el-input-number v-model="size" controls-position="right" @change="handleSizeChange" :min="1" :max="20"></el-input-number>
                    <!-- height:34px; -->
                    <span>条</span>
                  </div>
                </el-col>
                <el-col :span="15">
                  <el-pagination layout="prev, pager, next, jumper"
                                 background
                                 :current-page="pageIdx"
                                 :page-size="size"
                                 :total="total_hits"
                                 @size-change="handleSizeChange"
                                 @current-change="handleCurrentChange"
                                 style="margin: 20px">
                  </el-pagination>
                </el-col>
              </el-row>
            </div>

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
import qs from "qs";
import avatarApi from "../../utils/avatarApi";
export default {
  name: "authorRes",
  components: {PageHeader, AuthorBlocks},
  mixins: [avatarApi],
  data() {
    return {
      total_hits_str: '0',
      total_hits: 0,
      showSearch: true,
      tag: 'authorRes',
      header_select: 'name',
      authorOptions: [{
        value: 'name',
        label: '姓名'
      }, {
        value: 'affiliation',
        label: '机构'
      }],
      input: '',

      pageIdx: 1,
      size: 10,

      queue: [
        {
          value: 1,
          label: "按匹配程度递减"
        },
        {
          value: 3,
          label: "按文献数量递减"
        },
        {
          value: 4,
          label: "按文献数量递增"
        },
        {
          value: 5,
          label: "按被引次数递减"
        },
        {
          value: 6,
          label: "按被引次数递增"
        }
      ],
      sortValue: 1,

      authors: [
        // {
        //   affiliation_name: "Beihang University",
        //   author_id: "2736235158",
        //   name: "Z Huang",
        //   main_areas: "Computer Vision, Computer Graphics",
        //   fields: ["Computer Vision", "Computer Graphics"],
        //   citation_count: 1234,
        //   paper_count: 132,
        //   avatar: "https://i.loli.net/2021/11/13/39PJtQWi7nrHMXu.jpg"
        // },
      ],
      author_avatars: [],

      aggregation: {
        areas: [
          {
            paper_count: 12,
            name: "Computer Vision"
          },
          {
            paper_count: 32,
            name: "Computer Graphics"
          },
          {
            paper_count: 12,
            name: "Computer Vision"
          },
        ],
        affiliations: [
          {
            "affiliation_id": "157773358",
            "citation_count": "2015885",
            "count": 3,
            "grid_id": "grid.12981.33",
            "id": "157773358",
            "iso_code": "CN",
            "name": "Sun Yat-sen University",
            "official_page": "http://www.sysu.edu.cn/",
            "paper_count": "140227",
            "rank": "7026",
            "wiki_page": "http://en.wikipedia.org/wiki/Sun_Yat-sen_University"
          },
          {
            "affiliation_id": "1304085615",
            "citation_count": "168111",
            "count": 2,
            "grid_id": "grid.474379.a",
            "id": "1304085615",
            "iso_code": "US",
            "name": "Nvidia",
            "official_page": "http://www.nvidia.com/",
            "paper_count": "7955",
            "rank": "9512",
            "wiki_page": "http://en.wikipedia.org/wiki/Nvidia"
          },
          {
            "affiliation_id": "149594827",
            "citation_count": "367935",
            "count": 2,
            "grid_id": "grid.440736.2",
            "id": "149594827",
            "iso_code": "CN",
            "name": "Xidian University",
            "official_page": "http://www.xidian.edu.cn/",
            "paper_count": "44656",
            "rank": "8429",
            "wiki_page": "http://en.wikipedia.org/wiki/Xidian_University"
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

    this.getAuthorRes();
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.getAuthorRes();
    },
    handleCurrentChange(val) {
      this.pageIdx = val;
      this.getAuthorRes();
    },
    getContactData() {
      var affiliations = [];
      for (let k = 0; k < this.checkAffiliationList.length; k++)
        for (let l = 0; l < this.aggregation.affiliations.length; l++)
          if (this.checkAffiliationList[k] === this.aggregation.affiliations[l].name)
            affiliations.push(this.aggregation.affiliations[l].affiliation_id);

      let data = {
        affiliation_name: this.input,
        author_name: this.input,
        sort_type: Math.ceil(this.sortValue/2)-1,
        sort_ascending: this.sortValue%2===0,
        page: this.pageIdx,
        size: this.size,
        affiliations: JSON.stringify(affiliations)
      };
      return qs.stringify(data);
    },
    getAuthorRes() {
      let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      this.$axios({
        method: 'post',
        url: '/es/query/author/' + this.header_select,
        data: this.getContactData()
      })
      .then(res => {
        _loadingIns.close();
        switch (res.data.status) {
          case 200:
            this.authors = res.data.details;
            this.total_hits = res.data.total_hits;
            this.total_hits_str = res.data.total_hits.toLocaleString();
            this.aggregation = res.data.aggregation;
            if (res.data.total_hits === 10000)
              this.total_hits_str = "10000+";
            // 获取学者头像
            this.getAuthorAvatars();
            break;
          case 404:
            this.total_hits = 0;
            this.total_hits_str = '0';
            break;
          case 500:
            this.$message.error("系统发生错误，请联系管理员！");
            setTimeout(() => {
              this.$router.push("/");
            }, 1500);
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    getAuthorAvatars() {
      let author_ids = [];
      for (let i = 0; i < this.authors.length; i++)
        author_ids.push(this.authors[i].author_id);
      this.getAvatars(author_ids, this.author_avatars);
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
  padding: 0 40px 20px 80px;
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

.author-result >>> .el-pager li{
  width:40px;
  height:40px;
  padding: 7px;
}

.author-result >>> .el-pagination .btn-prev .el-icon{
  font-size: 15px;
  margin: 15px;
}

.author-result >>> .el-pagination .btn-next .el-icon{
  font-size: 15px;
  margin: 15px;
}

.author-result >>> .el-pagination__editor.el-input .el-input__inner {
  height: 40px;
}

.author-result >>> .el-pagination__jump{
  font-size: 15px;
}

.author-result .box-card .check-box-title {
  text-align: left;
  font-size: 17px;
  margin-bottom: 20px;
}

</style>