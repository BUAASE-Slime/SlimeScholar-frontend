<template>
  <div class="wrapper-container">
    <!-- overflow: hidden：清除子元素相对父元素的超界溢出 -->
    <div
      style="overflow: hidden"
      :style="{ height: showMore ? 'auto' : showHeight + 'px' }"
    >
      <div ref="content">
        <slot>
          <!-- 当外界 <show-more> 标签中有元素时，使用 <show-more> 标签中的元素进行渲染，否则使用下面这个 div 进行渲染 -->
          <div v-html="content"></div>
        </slot>
      </div>
    </div>

    <div>lalalalla</div>
    <el-button type="text" @click="_toggleShowMore" v-show="isLongContent">{{
      showMore ? "收起" : "显示更多"
    }}</el-button>
    <div v-show="isLongContent" :class="{ 'show-more': showMore }">
      <el-button type="text" @click="_toggleShowMore">{{
        showMore ? "收起" : "显示更多"
      }}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showHeight: {
      type: Number,
      required: true,
      default: 200,
    },
    content: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showMore: false,
      isLongContent: false,
    };
  },
  watch: {
    // 每当内容变化时都重新计算一次高度
    content() {
      this._calculateHeight();
    },
  },
  methods: {
    refresh() {
      this._calculateHeight();
    },
    _calculateHeight() {
      // $nextTick()，等待内容获取完毕再计算高度，异步处理
      this.$nextTick().then(() => {
        let contentHeight = this.$refs.content.clientHeight;
        if (contentHeight > this.showHeight) {
          this.isLongContent = true;
        } else {
          this.isLongContent = false;
        }
      });
    },
    _toggleShowMore() {
      this.showMore = !this.showMore;
    },
  },
};
</script>
<style scoped>
.wrapper-container {
  position: relative;
  padding-bottom: 40px;
}
/* .control {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-top: 40px;
  text-align: center;
  background-image: linear-gradient(
    -180deg,
    rgba(255, 255, 255, 0) 0%,
    #fff 70%
  );
}
.show-more {
  padding-top: 0;
  background: none;
} */
</style>