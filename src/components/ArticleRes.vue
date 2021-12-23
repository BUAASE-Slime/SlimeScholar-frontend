<template>
  <div class="article-result">
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

              <div class="publish-year sub-block" v-if="mode!=='advance'">
                <div class="check-box-title">
                  <span style="color: #303133">发表年份</span>
                </div>
                <div style="text-align: left; font-size: 13px">
                  <span>范围：</span>
                  <span style="color: #0274B3; margin-top:2px" class="year-input">
                    <el-input size="mini" v-model="year[0]" @change="changeYear"></el-input>
                    &nbsp;~&nbsp;
                    <el-input size="mini" v-model="year[1]" @change="changeYear"></el-input>
                  </span>
                </div>
<!--                <div style="margin-top: 20px; margin-bottom: 30px">-->
<!--                  <el-slider v-model="year" range :min=minYear :max=maxYear @change="changeYear" @input="yearHandler"></el-slider>-->
<!--                </div>-->
              </div>

              <el-divider v-if="mode!=='advance'"></el-divider>

              <div class="publish-type sub-block">
                <div class="check-box-title">
                  <span>类型</span>
                </div>
                <el-checkbox-group v-for="(o,index) in aggregation.doctype"
                                   :key="index"
                                   style="margin-bottom: 15px; text-align: left"
                                   v-model="checkDoctypeList"
                                   @change="selectSearch">
                  <div v-for="(val, key) in o" :key="key">
                    <el-checkbox :label=key>
                      <span>{{ key|ellipsis_25 }}&nbsp;({{ val }})</span>
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>

              <el-divider></el-divider>

              <div class="publish-journal sub-block">
                <div class="check-box-title">
                  <span>期刊</span>
                </div>
                <el-checkbox-group v-for="(o,index) in aggregation.journal"
                                   :key="index"
                                   style="margin-bottom: 15px; text-align: left"
                                   v-model="checkJournalList"
                                   @change="selectSearch">
                  <el-checkbox :label=o.name>
                    <el-tooltip class="item" effect="dark" :content="o.name" placement="right">
                      <span>{{ o.name|ellipsis_25 }}&nbsp;({{ o.count }})</span>
                    </el-tooltip>
                  </el-checkbox>
                </el-checkbox-group>
              </div>

              <el-divider></el-divider>

              <div class="publish-journal sub-block">
                <div class="check-box-title">
                  <span>会议</span>
                </div>
                <el-checkbox-group v-for="(o,index) in aggregation.conference"
                                   :key="index"
                                   style="margin-bottom: 15px; text-align: left"
                                   v-model="checkConferenceList"
                                   @change="selectSearch">
                  <el-checkbox :label=o.name>
                    <el-tooltip class="item" effect="dark" :content="o.name" placement="right">
                      <span>{{ o.name|ellipsis_25 }}&nbsp;({{ o.count }})</span>
                    </el-tooltip>
                  </el-checkbox>
                </el-checkbox-group>
              </div>

              <el-divider></el-divider>

              <div class="publish-type sub-block">
                <div class="check-box-title">
                  <span>出版商</span>
                </div>
                <el-checkbox-group v-for="(o,index) in aggregation.publisher"
                                   :key="index"
                                   style="margin-bottom: 15px; text-align: left"
                                   v-model="checkPublisherList"
                                   @change="selectSearch">
                  <div v-for="(val, key) in o" :key="key">
                    <el-checkbox :label=key>
                      <el-tooltip class="item" effect="dark" :content="key" placement="right">
                        <span>{{ key|ellipsis_25 }}&nbsp;({{ val }})</span>
                      </el-tooltip>
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </el-card>
          </div>
          </el-col>

          <el-col :span="16"><div class="grid-content bg-purple">
            <div>
              <el-row>
                <el-col :span="17">
                  <span style="display:flex; font-size:16px; margin-top:10px;color: #A0A0A0">论文 ({{total_hits_str}})</span>
                </el-col>
                <el-col :span="2">
                  <div style="margin-top:10px">
                    <span style="font-size:16px;color: #A0A0A0">排序</span>
                  </div>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="sorter"
                             placeholder="请选择"
                             style="float:right; height:30px; margin-bottom:5px"
                             @change="selectSearch">
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

            <ArticleBlocks :articles="articles"
                           @changeCollect="changeCollect"
                           flag="searchRes"></ArticleBlocks>

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
        <el-empty :image-size="200" description="暂无相关文献数据" v-else></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import ArticleBlocks from "./ArticleBlocks";

export default {
  name: "ArticleRes",
  components: { ArticleBlocks },
  props: [
      "header_select", "input", "mode", "conditions", "min_date", "max_date",
      "total_hits", "total_hits_str", "aggregation", "articles"
  ],
  data() {
    return {
      pageIdx: 1,
      size: 10,

      select: '1',
      queue: [
        {
          value: 1,
          label: "按匹配程度递减",
        },
        {
          value: 3,
          label: "按被引用量递减",
        },
        {
          value: 4,
          label: "按被引用量递增",
        },
        {
          value: 5,
          label: "按发表时间递减",
        },
        {
          value: 6,
          label: "按发表时间递增",
        }
      ],
      sorter: 1,
      minYear: 1900,
      maxYear: 2021,
      year: [1900, 2021],

      checkDoctypeList: [],
      checkJournalList: [],
      checkConferenceList: [],
      checkPublisherList: [],
    }
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.selectSearch();
    },
    handleCurrentChange(val) {
      this.pageIdx = val;
      this.selectSearch();
    },
    changeCollect(data) {
      this.$emit('changeCollect', data);
    },
    yearHandler() {
    },
    changeYear() {
      this.selectSearch();
    },
    getContactData() {
      // 文献期刊数据提取
      var journals = [];
      for (var i = 0; i < this.checkJournalList.length; i++)
        for (var j = 0; j < this.aggregation.journal.length; j++)
          if (this.checkJournalList[i] === this.aggregation.journal[j].name)
            journals.push(this.aggregation.journal[j].journal_id);

      // 文献会议数据提取
      var conferences = [];
      for (var k = 0; k < this.checkConferenceList.length; k++)
        for (var l = 0; l < this.aggregation.conference.length; l++)
          if (this.checkConferenceList[k] === this.aggregation.conference[l].name)
            conferences.push(this.aggregation.conference[l].conference_id);
      let data = {
        page: this.pageIdx,
        size: this.size,
        doctypes: JSON.stringify(this.checkDoctypeList),
        journals: JSON.stringify(journals),
        conferences: JSON.stringify(conferences),
        publishers: JSON.stringify(this.checkPublisherList),
        sort_type: Math.ceil(this.sorter/2),
        sort_ascending: this.sorter%2===0,
      };
      if (this.mode === 'normal') {
        data[this.header_select] = this.input;
        data["min_year"] = this.year[0];
        data["max_year"] = this.year[1];
      } else if (this.mode === 'advance') {
        data["conditions"] = JSON.stringify(this.conditions);
        data["min_date"] = this.min_date;
        data["max_date"] = this.max_date;
      }
      return qs.stringify(data);
    },
    getContactUrl() {
      if (this.mode === 'normal')
        return '/es/select/paper/' + this.header_select;
      else if (this.mode === 'advance')
        return '/es/select/paper/advanced';
    },
    selectSearch() {
      let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});

      this.$axios({
        method: 'post',
        url: this.getContactUrl(),
        data: this.getContactData()
      })
      .then(res => {
        _loadingIns.close();
        switch (res.data.status) {
          case 200:
            let data = {
              articles: res.data.details,
              total_hits: res.data.total_hits,
              total_hits_str: res.data.total_hits.toLocaleString()
            }
            this.updateTime(res.data.aggregation);
            if (res.data.total_hits === 10000)
              this.total_hits_str = "10000+";
            this.$emit('high', data);
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
    updateTime(aggregation) {
      this.minYear = aggregation.min_year;
      this.maxYear = aggregation.max_year;
      this.year[0] = this.minYear;
      this.year[1] = this.maxYear;
    }
  },

  watch: {
    aggregation: {
      deep: true,
      handler: function (val) {
        this.updateTime(val);
      }
    }
  },

  filters: {
    //超过20位显示 ...
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 400) {
        return value.slice(0,400) + "...";
      }
      return value;
    },
    ellipsis_25: function(value) {
      if (!value) return "";
      if (value.length > 25) {
        return value.slice(0,25) + "...";
      }
      return value;
    }
  },
}
</script>

<style scoped>

.article-result >>> .el-pager li{
  width:40px;
  height:40px;
  padding: 7px;
}

.article-result >>> .el-pagination .btn-prev .el-icon{
  font-size: 15px;
  margin: 15px;
}

.article-result >>> .el-pagination .btn-next .el-icon{
  font-size: 15px;
  margin: 15px;
}

.article-result .main-body {
  padding: 0 40px 20px 80px;
}

.article-result .header {
  margin-bottom: 40px;
}

.article-result .box-card {
  padding: 20px;
}

.article-result .box-card .sub-block {
  margin-bottom: 20px;
}

.article-result .year-input >>> .el-input--mini .el-input__inner {
  font-size: 13px;
  color: #0274B3;
}

.article-result .year-input >>> .el-input__inner {
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
}

.article-result .year-input >>> .el-input--mini {
  width: 45px;
  text-align: center;
}

.article-result >>> .el-pagination__editor.el-input .el-input__inner {
  height: 40px;
}

.article-result >>> .el-pagination__jump{
  font-size: 15px;
}

.article-result .box-card .check-box-title {
  text-align: left;
  font-size: 17px;
  margin-bottom: 20px;
}

</style>