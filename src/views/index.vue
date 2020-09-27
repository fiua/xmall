<template>
  <div>
    <myheader></myheader>
    <router-view></router-view>
  </div>
</template>
<script>
import myheader from "@/common/MHeader";
export default {
  name: "index",
  components: {
    //组件
    myheader,
  },
};
</script>
<style lang="sass" scoped>

</style>