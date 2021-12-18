<template>
  <div class="cite-dialog">
    <el-dialog
        title="引用"
        :visible.sync="dialogVisible"
        @close="closeDialog"
        width="40%">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(ins, index) in citation_msg" v-bind:key="index" :label="ins.name" :name="ins.id">
          <div class="cite-input">
            <el-input @click.native="$event.target.select()" :value="ins.content"></el-input>
          </div>
          <div class="cite-button">
            <el-button type="primary" style="padding: 8px 16px" icon="el-icon-document-copy" @click="copyVal(ins.content)">&nbsp;复制</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "CiteDialog",
  props: ["paper_id", "showQuote"],
  data() {
    return {
      dialogVisible: false,
      activeName: 1,
      citation_msg: [
        {
          id: 1,
          name: "GB/T 7714",
          content: "Victoriano Perruca AlbadalejoLos peligros de atentado relativos al tráfico bélico rodado[M].Consejo General del Poder Judicial,2006:417-440."
        },
        {
          id: 2,
          name: "APA",
          content: "Victoriano Perruca AlbadalejoLos peligros de atentado relativos al tráfico bélico rodado[M].Consejo General del Poder Judicial,2006:417-440."
        }
      ]
    }
  },
  watch: {
    showQuote(newVal, oldVal) {
      this.dialogVisible = newVal;
      if (this.dialogVisible === true)
        this.getCita();
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    copyVal(val) {
      let aux = document.createElement("input");
      aux.setAttribute("value", val);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      if (val !== null) {
        this.$message.success("引用已复制至剪贴板");
      } else {
        this.$message.error("引用格式为空");
      }
    },
    closeDialog() {
      this.$emit('closeChildDialog');
    },
    getCita() {
      this.$axios({
        method: 'post',
        url: '/scholar/cite_paper',
        data: qs.stringify({
          paper_id: this.paper_id
        })
      })
      .then(res => {
        if (res.data.success) {
          this.citation_msg = res.data.detail;
        } else {
          this.$message.error("获取失败！");
          this.dialogVisible = false;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>

.cite-dialog {
  text-align: left;
}

.cite-dialog >>> .el-dialog__body {
  padding-top: 0;
  padding-bottom: 24px;
}

.cite-input {
  margin-top: 8px;
}

.cite-button {
  margin-top: 18px;
  /*text-align: center;*/
}

</style>