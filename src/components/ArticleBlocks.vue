<template>
  <div class="article-blocks">
    <el-card v-for="item in articles" :key="item" class="article-item">
      <div style="text-align: left">
        <div style="margin-bottom: 10px">
          <div v-html="item.paper_title" class="paper-title" @click="openDetail(item.paper_id)"></div>
          <!-- <span class="paper-title" @click="openDetail(item.paper_id)">{{item.paper_title}}</span> -->
        </div>
        <!-- <span v-for="(j, index) in item.authors" :key="j" class="author-name">
                  <span @click="gotoSch(j.author_id)">{{j.author_name}}</span>
                  <span v-if="index<item.authors.length-1"> / </span>
                </span> -->
        <div v-for="(j, index) in item.authors" :key="j" class="author-name" style="display:inline-block">
          <div v-html="j.author_name" @click="gotoSch(j.author_id)" style="display:inline-block"></div>
          <span v-if="index<item.authors.length-1">&nbsp;/&nbsp;</span>
        </div>
        <span class="publish-year">
          <span class="publish-year"> · {{item.year}}</span>
<!--            <span v-if="item.publisher"> · {{item.publisher}}</span>-->
<!--            <span v-if="item.journal_id !== ''"> · {{item.journal_id}}</span>-->
<!--            <span v-else-if="item.conference_id !== ''"> · {{item.conference_id}}</span>-->
<!--            <span v-if="item.last_page!==''&&item.first_page!==''&&item.volume!==''">-->
<!--                        {{ item.volume }}, {{ item.first_page }}-{{ item.last_page }}-->
<!--                      </span>-->
<!--        <span v-else-if="item.first_page!==''&&item.volume!==''">-->
<!--                        {{ item.volume }}, {{ item.first_page }}-->
<!--                      </span>-->
        </span>
      </div>
      
      <div style="text-align:left;margin-top:10px;">
        <div v-html="item.abstract" class="abstract" style="display:-webkit-box; text-overflow:ellipsis; -webkit-line-clamp:3; overflow: hidden; -webkit-box-orient: vertical;"></div>
        <!-- <span class="abstract">{{item.abstract|ellipsis}}</span> -->
      </div>
      <div id="fields">
        <el-row>
        <div v-for="item1 in item.fields" :key="item1" style="display:inline-block;margin-top:15px; margin-right:10px; float:left;">
          <div
            style="border-style:solid; border-width:1px; border-radius:5px; padding: 3px 5px;font-size: 14px; cursor: pointer" 
            @click="searchField(item1.name, item1.field_id)">
            <i class="el-icon-menu" style="display:inline-block"></i>
            <div v-html="item1.name" style="display:inline-block"></div>
          </div>
          <!-- <span style="border-style:solid; border-width:1px; border-radius:5px; padding: 3px 5px;font-size: 14px; cursor: pointer" @click="searchField(item1.name, item1.field_id)">
            <i class="el-icon-menu"></i>
            &nbsp;{{item1.name}}
          </span> -->
        </div>
        </el-row>
      </div>
      <el-divider></el-divider>
      <el-row style="text-align:left; color: #787777; font-size: 15px; font-weight: 500;">
        <el-col :span="0.5" style="cursor: pointer">
          <span @click="quote(item)">
            <svg t="1638969144886" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8428" width="18" height="18"><path d="M679.90453419 156.78038289L900.62352078 156.78038289C952.35453358 156.78038289 993.73934243 201.61392593 993.73934244 253.34493874l0 220.7189852c0 51.7310128-41.38481023 93.11582166-93.11582166 93.11582305l-220.71898659 0c-51.7310128 0-93.11582166-41.38481023-93.11582165-93.11582305L586.78871254 253.34493874c0-51.7310128 41.38481023-96.56455585 93.11582165-96.56455585zM128.10706982 156.78038289l220.71898658 0c51.7310128 0 93.11582166 41.38481023 93.11582167 93.11582168l0 220.7189852c0 51.7310128-41.38481023 93.11582166-93.11582167 93.11582303l-220.71898658 0c-51.7310128 0-93.11582166-41.38481023-93.11582165-93.11582303L34.99124817 253.34493874c-3.4487342-51.7310128 41.38481023-96.56455585 93.11582165-96.56455585z" fill="#7dc5eb" p-id="8429"></path><path d="M997.18807662 339.56329203S1059.26529198 874.11708547 790.26402819 874.11708547l0-113.80822677s82.7696191 41.38481023 82.76961909-251.7575929c-10.34620256-200.02658146 124.15442932-168.98797378 124.15442934-168.98797377zM441.94187808 339.56329203S504.01909344 874.11708547 235.01782962 874.11708547l0-113.80822677s82.7696191 41.38481023 82.7696191-251.7575929c-3.4487342-200.02658146 124.15442932-168.98797378 124.15442936-168.98797377z" fill="#7dc5eb" p-id="8430"></path></svg>
          </span>
        </el-col>
        <el-col :span="2">
          <span style="cursor: pointer" @click="quote(item)">&nbsp;引用</span>
        </el-col>
        <el-col :span="0.5" v-if="flag==='searchRes'" style="cursor: pointer">
          <span v-if="item.is_collect" @click="collectChange(item)">
            <span>
              <svg t="1638969513632" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9307" width="18" height="18"><path d="M335.008 916.629333c-35.914667 22.314667-82.88 10.773333-104.693333-25.557333a77.333333 77.333333 0 0 1-8.96-57.429333l46.485333-198.24a13.141333 13.141333 0 0 0-4.021333-12.864l-152.16-132.586667c-31.605333-27.52-35.253333-75.648-8.234667-107.733333a75.68 75.68 0 0 1 51.733333-26.752L354.848 339.2c4.352-0.362667 8.245333-3.232 10.026667-7.594667l76.938666-188.170666c16.032-39.2 60.618667-57.92 99.52-41.461334a76.309333 76.309333 0 0 1 40.832 41.461334l76.938667 188.16c1.781333 4.373333 5.674667 7.253333 10.026667 7.605333l199.712 16.277333c41.877333 3.413333 72.885333 40.458667 69.568 82.517334a76.938667 76.938667 0 0 1-26.08 51.978666l-152.16 132.586667c-3.541333 3.082667-5.141333 8.074667-4.021334 12.853333l46.485334 198.24c9.621333 41.013333-15.36 82.336-56.138667 92.224a75.285333 75.285333 0 0 1-57.525333-9.237333l-170.976-106.24a11.296 11.296 0 0 0-12.010667 0l-170.986667 106.24z" p-id="9308" fill="#7dc5eb"></path></svg>
            </span>
          </span>
          <span v-else @click="collectChange(item)">
            <span>
              <svg t="1638970266570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9978" width="18" height="18"><path d="M335.008 916.629333c-35.914667 22.314667-82.88 10.773333-104.693333-25.557333a77.333333 77.333333 0 0 1-8.96-57.429333l46.485333-198.24a13.141333 13.141333 0 0 0-4.021333-12.864l-152.16-132.586667c-31.605333-27.52-35.253333-75.648-8.234667-107.733333a75.68 75.68 0 0 1 51.733333-26.752L354.848 339.2c4.352-0.362667 8.245333-3.232 10.026667-7.594667l76.938666-188.170666c16.032-39.2 60.618667-57.92 99.52-41.461334a76.309333 76.309333 0 0 1 40.832 41.461334l76.938667 188.16c1.781333 4.373333 5.674667 7.253333 10.026667 7.605333l199.712 16.277333c41.877333 3.413333 72.885333 40.458667 69.568 82.517334a76.938667 76.938667 0 0 1-26.08 51.978666l-152.16 132.586667c-3.541333 3.082667-5.141333 8.074667-4.021334 12.853333l46.485334 198.24c9.621333 41.013333-15.36 82.336-56.138667 92.224a75.285333 75.285333 0 0 1-57.525333-9.237333l-170.976-106.24a11.296 11.296 0 0 0-12.010667 0l-170.986667 106.24z" p-id="9979" fill="#cdcdcd"></path></svg>
            </span>
          </span>
        </el-col>
        <el-col :span="0.5" v-if="flag==='searchRes'" style="cursor: pointer"><span @click="collectChange(item);">&nbsp;收藏</span></el-col>
        <el-col :span="0.5" v-if="flag==='schLib'" style="cursor: pointer">
          <span @click="delFromTag(item)">
            <span>
              <svg t="1638971387775" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3017" width="18" height="18"><path d="M959.04 192.256h-35.84V958.72a64 64 0 0 1-63.936 63.872H160.64a63.872 63.872 0 0 1-63.872-63.872V192.256h-31.872a31.872 31.872 0 1 1 0-63.872h223.552V32.64c0-17.664 14.272-31.936 31.936-31.936h383.168c17.664 0 32 14.272 32 32v95.68h223.488a32 32 0 0 1 0 64z m-287.424-127.744h-319.36v63.872h319.36v-63.872z m191.68 191.616v-63.872H160.64v734.592a32 32 0 0 0 32 31.936h638.72a32 32 0 0 0 31.936-32V256.192z m-191.68 143.744h63.936v407.168h-63.936V399.872zM480.064 336H544v470.976h-63.872v-471.04z m-191.616 63.872h63.872v407.168h-63.872V399.872z" fill="#7dc5eb" p-id="3018"></path></svg>
            </span>
          </span>
        </el-col>
        <el-col :span="0.5" v-if="flag==='schLib'" style="cursor: pointer"><span @click="delFromTag(item)">&nbsp;删除</span></el-col>
        <span style="float:right; text-align:right;">
          被引次数：
          <span style="color: #2d94d4;">
            {{item.citation_count.toLocaleString()}}
          </span>
        </span>
      </el-row>
    </el-card>
    <div>
      <el-dialog
        title="收藏"
        :visible.sync="dialogVisible"
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
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureCollect">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import user from "../store/user";
import qs from "qs";

export default {
  name: "ArticleBlocks",
  props: ['articles', 'flag'],
  data() {
    return {
      isShowTip: false,
      input:'',
      dialogVisible: false,

      curPaper: '',
      
      inputVisible: false,
      inputValue: '',
      tagData: [
        // {
        //   tag_id: 1,
        //   tag_name: "默认",
        //   user_id: 2,
        //   username: "",
        //   create_time: "2021-11-18T17:22:27+08:00",
        //   tagState:"plain",
        // },
        // {
        //   tag_id: 2,
        //   tag_name: "CV",
        //   user_id: 2,
        //   username: "",
        //   create_time: "2021-11-18T17:22:27+08:00",
        //   tagState:"plain",
        // }
      ]
    }
  },
  methods: {
    collectChange(item) {
      const userInfo = user.getters.getUser(user.state());
      if (!userInfo) {
        this.$userNotLogin(false);
        return;
      }
      if (!item.is_collect) {
        // 收藏 - 获取tags，打开dialog，供用户选择
        this.getTags(userInfo.user.userId).then(() => {
          this.curPaper = item;
          this.dialogVisible = true;
        });
      } else {
        // 取消收藏
        this.doDelCollect(item, userInfo.user.userId);
      }
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
    // 从个人图书馆中删除
    delFromTag(item) {
      this.$emit('delArticle', item);
    },

    // 引用
    quote(item) {
      this.$message.success("引用" + item.paper_id + " " + item.paper_title);
    },
    // 查看文献详情
    openDetail(paper_id) {
      let routeUrl = this.$router.resolve({
        path: '/article',
        query: { v: paper_id }
      });
      window.open(routeUrl .href, "_blank");
    },
    // 查看领域下的文献
    searchField(field_name, field_id) {
      let routeUrl = this.$router.resolve({
        path: '/searchRes',
        query: { field: field_name }
      });
      window.open(routeUrl .href, "_self");
    },
    // 查看作者门户
    gotoSch(author_id) {
      let routeUrl = this.$router.resolve({
        path: '/schPortal',
        query: { v: author_id }
      });
      window.open(routeUrl .href, "_blank");
    },
    // 取消收藏（与后端交互）
    doDelCollect(item, user_id) {
      this.$axios({
        url: '/social/delete/collect/paper',
        method: 'post',
        data: qs.stringify({
          user_id: user_id,
          paper_id: item.paper_id
        })
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            let data = { paper: item, newStatus: false };
            this.$forceUpdate();
            this.$emit('changeCollect', data);
            this.$message.success("成功取消收藏！");
            break;
          case 400:
            this.$userNotFound();
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
            this.$message.success("收藏成功！");
            this.dialogVisible = false;
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
    initTag() {
      for (let i = 0; i < this.tagData.length; i++)
        this.tagData[i]["tagState"] = "plain";
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

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
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
    chooseTag(tag) {
      // TIP: 数据层次多导致没有触发 render 进行自动更新，需要手动调用
      this.$forceUpdate();
      if (tag.tagState === "plain")
        tag.tagState = "dark";
      else tag.tagState = "plain";
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
  },
}
</script>

<style scoped>

@import "../styles/article.css";

.article-blocks .article-item {
  margin-top:20px;
  display:flex;
}

.article-blocks .article-item >>> .el-card__body {
  width: 100%;
  padding: 25px 30px 15px;
}

.article-blocks .article-item >>> .el-divider--horizontal {
  margin: 10px 0;
}

.article-blocks .el-tag {
  margin-right: 10px;
}
.article-blocks .button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 10px;
  margin-bottom: 10px;
}
.article-blocks .input-new-tag {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90px;
  vertical-align: bottom;
}
.article-blocks >>> .el-dialog__body{
  padding-top: 0 !important;
}
.article-blocks >>> .el-dialog__body .el-divider--horizontal{
  margin-top:5px;
}
</style>