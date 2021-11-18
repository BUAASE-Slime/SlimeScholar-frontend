<template>
  <div class="schLib">
    <el-container>
      <el-header>

      </el-header>

      <el-main>
      <el-container style="height: 750px; border: 1px solid #eee; width: 80%; margin-left: auto;
    margin-right: auto;">
        <el-aside style="background-color: rgb(238, 241, 246)" width="200px">
          <el-menu :default-openeds="['2', '3']">
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>标签</template>
              <el-menu-item-group>
                <el-menu-item key="all">全部标签</el-menu-item>
                <template v-for="label in labelList">
                  <el-menu-item :key="label">{{ label }}</el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>
            <el-divider/>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-menu"></i>发布时间</template>
              <el-menu-item-group>
                <el-menu-item index="0" @click="changeTimeRange(0)">全部时间</el-menu-item>
                <el-menu-item index="1" @click="changeTimeRange(1)">近一年</el-menu-item>
                <el-menu-item index="3" @click="changeTimeRange(3)">近三年</el-menu-item>
                <el-menu-item index="5" @click="changeTimeRange(5)">近五年</el-menu-item>
                <el-menu-item index="42" @click="changeTimeRange(42)">
                  自定义时间范围
                  <div v-if="time.type === 42">
                    <el-input
                        v-model="time.start"
                        placeholder="开始"
                        style="width:65px"
                        type="year">
                    </el-input>
                    至
                    <el-input
                        v-model="time.end"
                        placeholder="结束"
                        style="width:65px"
                        type="year">
                    </el-input>
                  </div>
                  <el-button v-if="time.type === 42" plain size="mini" type="primary">
                    检索
                  </el-button>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main style="padding-left: 30px">
          <div v-for="(item,index) in articles" :key="index" class="article">
            <el-col :span="19" class="art-info">
              <el-row style="color: #157dec;font-size: larger; height : 120% ;margin: 2px; text-align:left;"
                      type="flex">
                {{ item.title }}
              </el-row>
              <el-row style="color: #486e44;font-size: small;padding-left: 2px" type="flex">
              <span v-for="(p,idx) in item.authors" v-bind:key="p" style="padding-right: 3px">
                {{ p }}{{ idx === item.authors.length - 1 ? "" : ',' }}
              </span> -
                <span style="padding-left: 2px; ">
                {{ item.journalName }}  {{ item.journalVolume }}  {{ item.journalPages }}
              </span>
              </el-row>
              <el-row style="color: #252424;font-size: small;height: 110%; padding-left: 2px; text-align:left"
                      type="flex">
                <el-col :span="18">
                  {{ item.abstract }}
                </el-col>
              </el-row>
              <el-row style="color: #252424;font-size: small;padding-left: 2px; padding-top: 5px; text-align:left"
                      type="flex">
                <el-button class="collection-edit" plain type="primary" @click="citedPaper=item;citeDialogOn=true;">
                  <i class="el-icon-share"> 生成引用 </i>
                </el-button>
                <el-button class="collection-edit" plain type="primary">
                  <i class="el-icon-collection-tag">编辑标签</i>
                  <!-- TODO: 编辑标签 -->
                </el-button>
                <el-button class="collection-edit" plain type="primary">
                  <i class="el-icon-delete"> 删除 </i>
                </el-button>
              </el-row>
            </el-col>
          </div>

        </el-main>
      </el-container>
      </el-main>
    </el-container>
    <CitationDialog :citeDialogOn="citeDialogOn" :citedPaper="citedPaper" :handleClose="closeCiteDialog"/>

  </div>


</template>

<script>
import CitationDialog from "@/components/CitationDialog";

export default {
  name: "SchLib",
  components: {CitationDialog},
  data() {
    return {
      curSelect: "collection",
      labelList: ['kernel', 'Network', 'Linux'],
      articles: [
        {
          title: "An empirical process approach to the uniform consistency of kernel-type function estimators ",
          authors: ["Uwe Einmahl", "David M. Mason",],
          journalName: "Journal of Theoretical Probability",
          abstract: "We use general empirical process methods to determine under mild regularity conditions exact rates of uniform strong consistency of kernel-type function estimators. In the process a useful new bound on the expectation of the supremum of the empirical process is obtained.",
          publisher: 'Springer',
          journalVolume: "13",
          journalPages: "1–37",
          year: "2000",
          citations: "96",
        },
        {
          title: " computer-assisted composition,Knowledge-rich",
          authors: ["Ming Xiao", "Rui Guo", "Hong Xiao", "Hua Xiao", "Zhu Xiao", "Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year: "2009",
          citations: "186",
        },
        {
          title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
          authors: ["Ming Xiao", "Rui Guo", "Hong Xiao", "Hua Xiao", "Zhu Xiao", "Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year: "2014",
          citations: "178",
        },
        {
          title: "Chinese couplets",
          authors: ["Ming Xiao", "Rui Guo", "Hong Xiao", "Hua Xiao", "Zhu Xiao", "Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year: "2010",
          citations: "16",
        },
        {
          title: "Knowledge-rich, computer-assisted composition of Chinese couplets ",
          authors: ["Ming Xiao", "Rui Guo", "Hong Xiao", "Hua Xiao", "Zhu Xiao", "Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year: "2000",
          citations: "56",
        },
        {
          title: "Chinese couplets,computer-assistedKnowledge-rich ",
          authors: ["Ming Xiao", "Rui Guo", "Hong Xiao", "Hua Xiao", "Zhu Xiao", "Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year: "2021",
          citations: "1515",
        },
        {
          title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
          authors: ["Ming Xiao", "Rui Guo", "Hong Xiao", "Hua Xiao", "Zhu Xiao", "Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year: "2018",
          citations: "156",
        },
        {
          title: " computer-assisted composition,Knowledge-rich",
          authors: ["Ming Xiao", "Rui Guo", "Hong Xiao", "Hua Xiao", "Zhu Xiao", "Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year: "2009",
          citations: "186",
        },
        {
          title: "Knowledge-rich, computer-assisted composition of Chinese couplets",
          authors: ["Ming Xiao", "Rui Guo", "Hong Xiao", "Hua Xiao", "Zhu Xiao", "Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year: "2014",
          citations: "178",
        },
        {
          title: "Chinese couplets",
          authors: ["Ming Xiao", "Rui Guo", "Hong Xiao", "Hua Xiao", "Zhu Xiao", "Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year: "2010",
          citations: "16",
        },
        {
          title: "Knowledge-rich, computer-assisted composition of Chinese couplets ",
          authors: ["Ming Xiao", "Rui Guo", "Hong Xiao", "Hua Xiao", "Zhu Xiao", "Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year: "2000",
          citations: "56",
        },
        {
          title: "Chinese couplets,computer-assistedKnowledge-rich ",
          authors: ["Ming Xiao", "Rui Guo", "Hong Xiao", "Hua Xiao", "Zhu Xiao", "Zhang Xiao"],
          journalName: "DSH",
          journalVolume: "31",
          journalPages: "152-163",
          year: "2021",
          citations: "1515",
        },],
      time: {
        type: 42,
        start: 2019,
        end: 2021,
      },
      citeDialogOn: false,
      citedPaper: {
        title: "An empirical process approach to the uniform consistency of kernel-type function estimators ",
        authors: ["U Einmahl", "David M. Mason",],
        journalName: "Journal of Theoretical Probability - Springer",
        abstract: "We use general empirical process methods to determine under mild regularity conditions exact rates of uniform strong consistency of kernel-type function estimators. In the process a useful new bound on the expectation of the supremum of the empirical process is obtained.",
        journalVolume: "13",
        journalPages: "1–37",
        year: "2000",
        citations: "96",
      },
    }
  },
  methods: {
    changeTimeRange(type) {
      this.time.type = parseInt(type)
    },
    closeCiteDialog() {
      this.citeDialogOn = false;
    }
  },
}
</script>

<style scoped>
.schLib {
  width: 100%;
  height: 100%;
}

.article {
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.article .art-info {
  padding-left: 2px;
}

.collection-edit {
  padding: 3px;
  font-size: small;
  color: #131d83;
}

</style>