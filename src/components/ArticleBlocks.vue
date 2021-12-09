<template>
  <div class="article-blocks">
    <el-card v-for="item in articles" :key="item" class="article-item">
      <div style="text-align: left">
        <div style="margin-bottom: 10px">
          <span class="paper-title" @click="openDetail(item.paper_id)">{{item.paper_title}}</span>
        </div>
        <span v-for="(j, index) in item.authors" :key="j" class="author-name">
                  <span @click="gotoSch(j.author_id)">{{j.author_name}}</span>
                  <span v-if="index<item.authors.length-1"> / </span>
                </span>
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
        <span class="abstract">{{item.abstract|ellipsis}}</span>
      </div>
      <div id="fields">
        <el-row>
        <div v-for="item1 in item.fields" :key="item1" style="display:inline-block;margin-top:15px; margin-right:10px; float:left;">
          <span style="border-style:solid; border-width:1px; border-radius:5px; padding: 3px 5px;font-size: 14px; cursor: pointer" @click="searchField(item1.name, item1.field_id)">
            <i class="el-icon-menu"></i>
            &nbsp;{{item1.name}}
          </span>
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
        <el-col :span="0.5" v-if="flag==='searchRes'" style="cursor: pointer"><span @click="collectChange(item)">&nbsp;收藏</span></el-col>

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
      tagData: [
        {
          tag_id: 1,
          tag_name: "默认",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00"
        },
        {
          tag_id: 2,
          tag_name: "CV",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00"
        },
        {
          tag_id: 2,
          tag_name: "CV",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00"
        },
        {
          tag_id: 2,
          tag_name: "CV",
          user_id: 2,
          username: "",
          create_time: "2021-11-18T17:22:27+08:00"
        }
      ]
    }
  },
  methods: {
    collectChange(item) {
      const userInfo = user.getters.getUser(user.state());
      if (!userInfo) {
        this.$userApi.userNotLogin(false);
        return;
      }
      if (!item.is_collect) {
        // 收藏
        this.collect(item, userInfo.user.userId);
      } else {
        // 取消收藏
        this.$axios({
          url: '/social/delete/collect/paper',
          method: 'post',
          data: qs.stringify({
            user_id: userInfo.user.userId,
            paper_id: item.paper_id
          })
        })
        .then(res => {
          switch (res.data.status) {
            case 200:
              let data = { paper: item, newStatus: false };
              this.$emit('changeCollect', data);
              break;
            case 400:
              this.$userApi.userInvalid();
              break;
            case 404:
              this.$userApi.userNotFound();
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    // 从个人图书馆中删除
    delFromTag(item) {
      this.$emit('delArticle', item);
    },
    quote(item) {
      this.$message.success("引用" + item.paper_id + " " + item.paper_title);
    },
    openDetail(paper_id) {
      let routeUrl = this.$router.resolve({
        path: '/article',
        query: { v: paper_id }
      });
      window.open(routeUrl .href, "_blank");
    },
    searchField(field_name, field_id) {
      // TODO:
    },
    gotoSch(author_id) {
      let routeUrl = this.$router.resolve({
        path: '/schPortal',
        query: { v: author_id }
      });
      window.open(routeUrl .href, "_blank");
    },
    doCollect(item, paper_id, user_id, tag_name) {
      this.$axios({
        url: '/social/collect/paper',
        method: 'post',
        data: qs.stringify({
          user_id: user_id,
          paper_id: paper_id,
          tag_name: tag_name
        })
      })
      .then(res => {
        switch (res.data.status) {
          case 200:
            item.is_collect = true;
            break;
          case 400:
            this.$message.error("用户登录信息已失效，请重新登录！");
            this.$store.dispatch('clear');
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000);
            break;
          case 403:
            this.$message.error("文献已收藏！");
            break;
          case 404:
            this.$message.error("用户信息获取失败，请尝试重新登录！");
            this.$store.dispatch('clear');
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000);
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    collect(item, userId) {
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
            // TODO: 打开标签弹窗供用户选择

            // 选择后向后端发送收藏请求
            let tag_name = '';
            this.doCollect(item, item.paper_id, userId, tag_name);
            break;
          case 400:
            this.$message.error("用户登录信息已失效，请重新登录！");
            this.$store.dispatch('clear');
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000);
            break;
          case 403:
            this.$message.error("获取标签失败！");
            break;
          case 404:
            this.$message.error("用户信息获取失败，请尝试重新登录！");
            this.$store.dispatch('clear');
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000);
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
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

</style>