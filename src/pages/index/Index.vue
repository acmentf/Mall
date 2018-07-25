<template>
  <div id="index">
    <div class="tabber-wrap">
      <router-view/>
      <div class="tabbar-wrap">
        <Tabbar/>
      </div>
    </div>
  </div>
</template>

<script>


import Tabbar from '@/components/Tabbar.vue'
export default {
  name: 'index',
  data () {
    return {
      tabIndex: 1
    }
  },
  components: {
    Tabbar
  },
  created(){
   
  },
  methods:{
    
  }
}
</script>

<style lang="less">
  #index{
    .tabbar-wrap{
      position: fixed;
      bottom:0;
      left:0;
      width: 100%;
    }
  }
</style>
