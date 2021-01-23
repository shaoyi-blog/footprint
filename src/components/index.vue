<template>
      <el-container>
  <el-header>
      <addInfo></addInfo>
  </el-header>
  <el-main>
      <footmap></footmap>
  </el-main>
</el-container>
</template>

<script>
import addInfo from "./addInfo";
import footmap from "./footmap";
export default {
  name: 'index',
  components: {
    footmap,addInfo
  },
}
</script>

<style type="text/css">
/*
	找到html标签、body标签，和挂载的标签
	都给他们统一设置样式
*/
  html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }
</style>
