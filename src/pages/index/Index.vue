<template>
  <div id="index">
    <div class="tabber-wrap">
      <router-view/>
      <div class="tabbar-wrap">
         <tabbar @on-index-change="changeIndex" >
          <tabbar-item  link="/index/home" :selected="tabIndex == 1">
            <i class="iconfont icon-home" slot="icon"></i>
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item  link="/index/cart" :selected="tabIndex == 2">
            <i class="iconfont icon-cart" slot="icon"></i>
            <span slot="label">购物车</span>
          </tabbar-item>
          <tabbar-item  link="/index/my" :selected="tabIndex == 3">
             <i class="iconfont icon-wode-active" slot="icon"></i>
            <span slot="label">我的</span>
          </tabbar-item>
       </tabbar>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import {getSessionStorage,setSessionStorage} from '@/utils/index.js'
export default {
  name: 'index',
  data () {
    return {
      tabIndex: 1
    }
  },
  components: {
    Tabbar,
    TabbarItem
  },
  created(){
    this._getTabIndex()
  },
  methods:{
    changeIndex(index){
      this._setTabIndex(index+1)
    },
    //获取当前路由下标
    _getTabIndex(){
      this.tabIndex = getSessionStorage('tabIndex') ? getSessionStorage('tabIndex') : 1;
    },
     //设置当前路由下标
    _setTabIndex(tabIndex){
      this.tabIndex = setSessionStorage('tabIndex',tabIndex);
    }
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
