<template>
  <div id="father">
    <div>
      父组件
      <childA ></childA>


      <childB ></childB>
    </div>
  </div>
</template>

<script>
import childA from '@/components/childA'
import childB from '@/components/childB'
export default {
  data() {
    return {

    };
  },
  components: { childA,childB},

}
</script>
