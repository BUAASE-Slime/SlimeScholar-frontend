<template>
  <div class="advSearch">
    <el-col class="retrieval" :span="18" :offset="3">
      <el-row :class="{'category-first':!index, 'category': index}" v-for="(item, index) in searchValue" :key="index">
        <el-col :span="21">
          <el-input placeholder="请输入内容" v-model="item.content" class="input-with-select">
            <el-select v-if="index>0" v-model="item.logic" slot="prepend" style="width: 80px; margin-right: 10px">
              <el-option
                  v-for="(item, index) in logics"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="item.category" slot="prepend" style="width: 120px">
              <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button  v-if="index" circle icon="el-icon-minus" @click="deleteCategory(index)"></el-button>
          <el-button :class="{'button_right': !index}" circle icon="el-icon-plus" @click="addCategory(index)"></el-button>
        </el-col>
      </el-row>
      <el-row class="time">
        <span style="color: #8f9298; font-size: 14px; margin-right: 47px">发表日期</span>
        <el-date-picker
            v-model="timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-row>
      <el-row class="button">
        <el-button type="success" icon="el-icon-search">&nbsp;检&nbsp;索</el-button>
      </el-row>
    </el-col>

  </div>
</template>

<script>
export default {
  name: "AdvSearch",
  data() {
    return {
      searchValue: [
        {
          category: '1',
          content: "",
          logic: '1',
        },
        {
          category: '2',
          content: "",
          logic: '1',
        },
        {
          category: '3',
          content: "",
          logic: '1',
        },
      ],
      timeRange: '',
      options: [
        {
          value: '1',
          label: '主题',
        }, {
          value: '2',
          label: '篇关摘'
        }, {
          value: '3',
          label: '作者'
        }, {
          value: '4',
          label: '文献来源'
        },  {
          value: '5',
          label: 'DOI'
        },
      ],
      logics: [
        {
          value: '1',
          label: 'AND',
        }, {
          value: '2',
          label: 'OR'
        }, {
          value: '3',
          label: 'NOT'
        },
      ],
    }
  },
  methods: {
    deleteCategory: function (index) {
      this.searchValue.splice(index, 1)
      this.$message({
        message: '该检索项已被删除',
      });
    },
    addCategory: function (index) {
      if (this.searchValue.length >= 10) {
        this.$message.error('添加失败！检索项必须在10条以内！')
        return
      }
      this.searchValue.push({
        category: this.searchValue[index].category,
        content: '',
        logic: this.searchValue[index].logic,
      })
      this.$message({
        message: '新的检索项已添加至末尾',
        type: 'success'
      });
    }
  }
}
</script>

<style scoped>
.advSearch {
  width: 100%;
  height: 100%;
}

.retrieval {
  background-color: white;
  margin-top: 100px;
  padding: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04);
}

.category {
  margin-top: 20px;
}

.category-first {
  margin-left: 70px;
  padding-right: 1%;
}

.button_right {
  margin-left: 50%;
}

.time {
  float: left;
  margin-top: 20px;
  padding-left: 88px;
}

.button {
  display: block;
  margin-top: 20px;
  margin-left: 696px;
}

</style>