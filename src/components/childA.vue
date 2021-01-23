<template>
  <div class="childA">
    <p>我是子组件A</p>
    <!-- 组件A通过时间向组件B传参 -->
    <button @click="sendToB">点击传参B</button>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
  data() {
    return {
      msg:"组件A的数据过来了"
    };
  },
  methods: {
    sendToB(){

      eventBus.$emit("eventDataA",this.msg);
    }
  }
}
</script>
<style scoped>
.childA {
  margin:  0 auto;
  width: 400px;
  height: 400px;
  border: 1px solid #000;
}
</style>
