<template>
  <div class="collect-dialog">
    <el-dialog
        title="收藏"
        :visible.sync="dialogVisible"
        @close="closeDialog"
        width="30%">
      <el-divider></el-divider>
      <div style="text-align:left; padding-left: 10px; padding-right: 10px">
        <el-tag
            :key="tag"
            v-for="tag in tagData"
            closable
            :disable-transitions="false"
            @close="handleCloseTag(tag)"
            @click.native="chooseTag(tag)"
            :effect=tag.tagState
            style="margin-top:10px; margin-bottom: 10px; cursor: pointer">
          {{tag.tag_name}}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="sureCollect">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import user from "../store/user";
import qs from "qs";

export default {
  name: "CollectDialog",
  props: ["curPaper", "showCollect"],
  watch: {
    showCollect(newVal, oldVal) {
      this.dialogVisible = newVal;
      if (this.dialogVisible === true) {
        // 收藏 - 获取tags，打开dialog，供用户选择
        const userInfo = user.getters.getUser(user.state());
        this.getTags(userInfo.user.userId).then(() => {
          this.dialogVisible = true;
        });
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      tagData: [
        {
          tag_id: 1,
          tag_name: "默认",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00",
          tagState:"plain",
        },
        {
          tag_id: 2,
          tag_name: "CV",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00",
          tagState:"plain",
        }
      ],
      inputVisible: false,
      inputValue: '',
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeChildDialog');
    },
    //删除标签函数
    handleCloseTag(tag) {
      const userInfo = user.getters.getUser(user.state());
      let tagName = tag.tag_name;
      if (tagName === '默认') {
        this.$message.error("无法删除默认收藏夹！");
        return;
      }
      if (tagName) {
        this.$axios({
          method: 'post',
          url: '/social/delete/tag',
          data: qs.stringify({
            user_id: userInfo.user.userId,
            tag_name: tagName,
          })
        })
        .then(res => {
          switch (res.data.status) {
            case 200:
              this.tagData.splice(this.tagData.indexOf(tag), 1);
              break;
            case 400:
              this.$userNotFound();
              break;
            case 403:
              this.$message.error("标签不存在！");
              break;
            case 404:
              this.$userNotFound();
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    chooseTag(tag) {
      // TIP: 数据层次多导致没有触发 render 进行自动更新，需要手动调用
      this.$forceUpdate();
      if (tag.tagState === "plain")
        tag.tagState = "dark";
      else tag.tagState = "plain";
    },
    //新建标签函数
    handleInputConfirm() {
      const userInfo = user.getters.getUser(user.state());
      const user_id = userInfo.user.userId;
      let newTagName = this.inputValue;
      if (newTagName && newTagName !== '') {
        this.$axios({
          method: 'post',
          url: '/social/create/tag',
          data: qs.stringify({
            user_id: user_id,
            tag_name: newTagName,
          })
        })
        .then(res => {
          switch (res.data.status) {
            case 200:
              this.getTags(user_id);
              break;
            case 400:
              this.$userNotFound();
              break;
            case 402:
              this.$message.error("无法建立重复标签！");
              break;
            case 404:
              this.$userNotFound();
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    sureCollect() {
      const userInfo = user.getters.getUser(user.state());
      let tag_name = '';
      for (let i = 0; i < this.tagData.length; i++)
        if (this.tagData[i].tagState === 'dark')
          tag_name += this.tagData[i].tag_name + '-<^_^>-';
      if (tag_name === '') {
        this.$message.warning("请选择收藏的标签！");
        return;
      }
      this.doCollect(this.curPaper, userInfo.user.userId, tag_name);
    },
    // 收藏（与后端交互）
    doCollect(item, user_id, tag_name) {
      this.$axios({
        url: '/social/collect/paper',
        method: 'post',
        data: qs.stringify({
          user_id: user_id,
          paper_id: item.paper_id,
          tag_name: tag_name
        })
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            let data = { paper: item, newStatus: true };
            this.$emit('changeCollect', data);
            this.closeDialog();
            this.$message.success("收藏成功！");
            this.$emit("collectSuccess");
            break;
          case 400:
            this.$userNotFound();
            break;
          case 403:
            this.$message.error("文献已收藏！");
            break;
          case 404:
            this.$userNotFound();
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    async getTags(userId) {
      // 获取用户所有标签
      this.$axios({
        method: 'post',
        url: '/social/get/tags',
        data: qs.stringify({
          user_id: userId
        })
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            this.tagData = res.data.data;
            this.initTag(); // 在 tagData 中添加前端选中字段属性
            break;
          case 400:
            this.$userNotFound();
            break;
          case 403:
            this.$message.error("获取标签失败！");
            break;
          case 404:
            this.$userNotFound();
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    initTag() {
      for (let i = 0; i < this.tagData.length; i++)
        this.tagData[i]["tagState"] = "plain";
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
  }
}
</script>

<style scoped>

.collect-dialog .el-tag {
  margin-right: 10px;
}
.collect-dialog .button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 10px;
  margin-bottom: 10px;
}
.collect-dialog .input-new-tag {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90px;
  vertical-align: bottom;
}
.collect-dialog >>> .el-dialog__body{
  padding-top: 0 !important;
}
.collect-dialog >>> .el-dialog__body .el-divider--horizontal{
  margin-top:5px;
}

</style>