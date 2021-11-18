<template>
  <div class="schLib">
    <el-header style="height: 50px; width: 80%; margin-left: auto; margin-right: auto;">
      <el-row style="padding: 5px;justify-content: space-between; " type="flex">
        <span style="align-self: flex-start; font-size: x-large; font-family: 'PingFang SC',serif; font-weight: bolder">
           {{ curRendition === "Collections" ? "个人图书馆" : "浏览记录" }}
          </span>
        <el-row>
          <span>
            <el-button round @click="curRendition='History'"> <i class="el-icon-time"/> 浏览记录 </el-button>
          </span>
          <span style="padding-left: 5px">
            <el-button round @click="curRendition='Collections'"><i class="el-icon-collection"/> 个人图书馆 </el-button>
          </span>
        </el-row>
      </el-row>
    </el-header>
    <Collections v-if="curRendition==='Collections'"/>
    <History v-if="curRendition==='History'"/>
  </div>


</template>

<script>
import Collections from "@/components/Collections";
import History from "@/components/History";

export default {
  name: "SchLib",
  components: {Collections, History},
  data() {
    return {
      curRendition: "Collections",
    }
  },
  methods: {}
}
</script>

<style scoped>
.schLib {
  width: 100%;
  height: 100%;
}


</style>