<template>
  <div class="childB">
    <p>我是子组件B</p>
    <p>组件A传过来的参数为： {{msg}}</p>
    <button @click="sendToA">点击传参A</button>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
  data() {
    return {
      msg:""
    };
  },
  mounted(){
    this.getChildAData()
  },
  methods: {
    getChildAData(){
      let that = this //这个this是vue的实例 重新声明一下 好区分evevntBus中的vue实例
      eventBus.$on('eventDataA', (e) => {
        that.msg = e
        console.log(e);
      })
    },
    sendToA(){

    }
  }
}
</script>
<style scoped>
.childB{
  margin:  0 auto;
  width: 400px;
  height: 400px;
  border:5px solid #000;
}
</style>
