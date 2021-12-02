<template>
  <div class="block">
    <showMore
      style="margin-top: 20px"
      :showHeight="showHeight"
      :content="contenttxt"
    ></showMore>
  </div>
</template>
<script>
import showMore from "./testcomponent.vue";
export default {
  // props: {
  //   showHeight: {
  //     type: Number,
  //     required: true,
  //     default: 200,
  //   },
  //   content: {
  //     type: String,
  //     default: null,
  //   },
  // },
  components: {
    showMore,
  },
  data() {
    return {
      showHeight: 200,
      showMore: false,
      isLongContent: false,
      contenttxt: "aaa",
      contentTxt:
        " 更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这vvvv更多” 在这更多” 在这更多” 在更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这vvvv更多” 在这更多” 在这更多” 在更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这vvvv更多” 在这更多” 在这更多” 在更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这vvvv更多” 在这更多” 在这更多” 在更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这vvvv更多” 在这更多” 在这更多” 在更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这vvvv更多” 在这更多” 在这更多” 在更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这vvvv更多” 在这更多” 在这更多” 在更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这vvvv更多” 在这更多” 在这更多” 在更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这vvvv更多” 在这更多” 在这更多” 在更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这更多” 在这vvvv更多” 在这更多” 在这更多” 在这在这里为了把“显示更多” 在这里为了把“显示更多”做的更通用些，我把它封装成了一个组件，传入两个参数：showHeight用于控制显示的高度（类似上文的200px），content用于展示内容。接下来我们去ShowMore组件中看一下到底是如何把内容隐藏一部分的，上代码： 在这里为了把“显示更多”做的更通用些，我把它封装成了一个组件，传入两个参数：showHeight用于控制显示的高度（类似上文的200px），content用于展示内容。接下来我们去ShowMore组件中看一下到底是如何把内容隐藏一部分的，上代码： 在这里为了把“显示更多”做的更通用些，我把它封装成了一个组件，传入两个参数：showHeight用于控制显示的高度（类似上文的200px），content用于展示内容。接下来我们去ShowMore组件中看一下到底是如何把内容隐藏一部分的，上代码：做的更通用些，我把它封装成了一个组件，传入两个参数：showHeight用于控制显示的高度（类似上文的200px），content用于展示内容。接下来我们去ShowMore组件中看一下到底是如何把内容隐藏一部分的，上代码：",
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
.control {
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
}
</style>