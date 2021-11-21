<template>
  <div class="citationDialog">
    <el-dialog
        :visible.sync="citeDialogOn"
        title="生成引用"
        width="35%">

      <el-row>
        <el-col :span="4">
          MLA:
        </el-col>
        <el-col :span="20" style="text-align: left">
          <div v-html="getMLA()"></div>
        </el-col>
      </el-row>
      <!-- TODO: 其他引用格式 -->
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "citationDialog",
  props: ['citeDialogOn', "citedPaper", "handleClose"],
  data() {
    return {

    }
  },
  methods: {
    getMLA() {
      let citedPaper = this.$props.citedPaper;
      let author1 = citedPaper.authors[0].split(" ");
      let authorStr = author1.length === 1 ? author1[0] : author1[author1.length - 1] + ", " + author1[0];
      if (citedPaper.authors.length === 2) {
        authorStr += ", and " + citedPaper.authors[1];
      } else if (citedPaper.authors.length > 2) {
        authorStr += ", et al"
      }
      authorStr += ". ";
      authorStr += '"' + citedPaper.title + '". ';
      authorStr += '<i>' + citedPaper.journalName + '</i> ';
      authorStr += citedPaper.journalVolume;
      authorStr += " (" + citedPaper.year + "): ";
      authorStr += citedPaper.journalPages + ".";
      return authorStr;
    }
  },
}
</script>

<style scoped>

</style>