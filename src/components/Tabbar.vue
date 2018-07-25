<template>
  <div id="tabber">
    <ul class="tabber-list">
        <li>
           <router-link to="/index/home">
             <i class="iconfont icon-home"></i>
             <p>首页</p>
            </router-link>

        </li>
        <li>
            <router-link to="/index/cart">
             <i class="iconfont icon-cart"></i>
             <p>购物车</p>
            </router-link>
        </li>
        
        <li>
            <router-link to="/index/my">
                <i class="iconfont icon-wode-active"></i>
                <p>我的</p>
            </router-link>
        </li>
    </ul>
  </div>
</template>

<script>

export default{
  data () {
    return {
     
    }
  }
}
</script>

<style lang="less">
  #tabber{
    background: #fff;
    height:1.2rem;
    .tabber-list{
        display: flex;
        justify-content: center;
        align-items: center;
        justify-items: center;
        &>li{
            flex:1;
            text-align: center;
            a{
                display: inline-block;
                color:#999;
                i{
                    display: inline-block;
                    font-size:0.4rem;
                }
                p{
                    font-size:0.26rem;
                }
                &.router-link-active{
                    color:#FC4A26 
                }
            }
        }
    }
  }
</style>
