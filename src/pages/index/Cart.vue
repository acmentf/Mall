<template>
  <div id="cart">
    <x-header :left-options="{backText: ''}">购物车</x-header>
    <!-- 购物车为空 -->
    <div class="cart-empty" v-if="!shopCarInfo.shopNum">
      <i class="iconfont icon-cart cart"></i>
      <p>购物车空空如也~</p>
      <button @click="_goHome">去逛逛</button>
    </div>
    <!-- 购物车列表 -->
    <div class="car-wrap" v-if="shopCarInfo.shopNum">
      <div class="car-header">
        <div class="car-title">购物车列表</div>
        <div class="car-handle">
          <span v-if="!handleButtonState" @click="_all">全选</span>
          <span v-if="handleButtonState"  @click="_allCancel">取消全选</span>
        </div>
      </div>
      <div class="cart-list">
         <swipeout>
           <swipeout-item  transition-mode="follow" v-for="(item,index) in shopCarInfo.shopList" :key="item.id">
            <div slot="right-menu">
              <swipeout-button @click.native="_delete(index)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content">
              <div class="cart-content">
                 <div class="checkout">
                   <check-icon :value.sync="item.active" ></check-icon>
                 </div>
                 <img :src="item.pic" alt="">
                 <div class="cart-txt">
                   <p class="goods-name">{{item.name}}</p>
                   <p class="goods-label">{{item.label}}</p>
                   <div>
                     <p class="goods-price red-text">￥{{item.price}}</p>
                     <div class="handle-box">
                        <number-select :min= 1 v-model="item.number"></number-select>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </swipeout-item>
         </swipeout>
      </div>
      <div class="cart-footer">
         <div class="footer-content">
            <check-icon :value.sync="handleButtonState" >全选</check-icon>
            <p><span v-show="totle">合计:￥{{totle}} + {{allScore}}积分</span></p>
            <div class="button" :class="{ disabled: totle === 0}">去结账</div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader,Swipeout, SwipeoutItem, SwipeoutButton,CheckIcon } from 'vux';
import {getSessionStorage,setSessionStorage} from '@/utils/index.js'
import NumberSelect from '@/components/NumberSelect'
export default {
  name: 'cart',
  data () {
    return {
      shopCarInfo:'',
      handleButtonState: false,
      number:1,
      totle:0,
      allScore:0
    }
  },
  components:{
    XHeader,
    Swipeout, 
    SwipeoutItem,
    SwipeoutButton,
    CheckIcon,
    NumberSelect
  },
  created(){
    this._getData();
  },
  watch:{
    shopCarInfo:{
      handler(shopCarInfo){
        // 判断是否全选
        this._handleButtonState(shopCarInfo,shopCarInfo.shopList);
        // 实时缓存
        this._setSessionStorage(shopCarInfo);
      },
      deep:true
    },
    handleButtonState(newValue){
      if (newValue) {
        this._all()
      }else{
         this._allCancel()
      }
    }
  },
  methods:{
    _handleButtonState(shopCarInfo,shopList){
      let flag = false
      shopList.forEach(item=>{
        if (!item.active) {
          flag = true;
        }
      })
      if (flag) {
        this.handleButtonState = false;
      } else{
        this.handleButtonState = true;
      }
    },
    _setSessionStorage(shopCarInfo){
      let shopNum = 0;
      this.totle = 0;
      this.allScore = 0;
      shopCarInfo.shopList.forEach(item=>{
        shopNum += item.number;
        if (item.active) {
          this.totle += item.price*item.number
          this.allScore += item.score*item.number
        }

      })
      shopCarInfo.shopNum = shopNum;
      setSessionStorage('shopCarInfo',shopCarInfo)
    },
    _goHome(){
       this.$router.push({
          path: `/index/home`,
      })
    },
    // 从缓存中拿数据
    _getData(){
      this.shopCarInfo = getSessionStorage('shopCarInfo');
    },
    // 删除
    _delete(index){
      this.shopCarInfo.shopList.splice(index,1)
    },
    _all(){
      this.shopCarInfo.shopList.forEach(item=>{
         item.active = true
         this.handleButtonState = true
      })
    },
    _allCancel(){
      this.shopCarInfo.shopList.forEach(item=>{
         item.active = false
         this.handleButtonState = false
      })
    }
  }
}
</script>

<style lang="less">
  #cart{
    .cart-empty{
      text-align: center;
      position: absolute;
      width: 100%;
      padding-top:5rem;
      .cart{
        font-size:1rem;
        color:#ddd;
      }
      &>button{
        width:2.5rem;
        height:0.75rem;
        color:#fff;
        background: #FC4A26;
        border-radius: 0.1rem;
        margin-top:0.2rem;
      }
    }
    .car-wrap{
      .car-header{
        display: flex;
        height:0.8rem;
        background: #fff;
        line-height: 0.8rem;
        padding: 0 0.25rem;
        margin-bottom: 0.2rem;
        &>div{
          flex:1;
          &.car-handle{
            text-align: right;
          }
        }
      }
    }
    .cart-list{
      .cart-content{
        padding:0.2rem;
        display: flex;
        align-items: center;
        border-bottom:1px solid #f2f2f2;
        .checkout{
          width:0.8rem;
        }
        img{
          width:1.4rem;
          height:1.4rem;
        }
        .cart-txt{
          flex:1;
          padding-left:0.2rem;
           &>div{
             display: flex;
             .handle-box{
               flex:1;
               &>div{
                 float: right;
               }
             }
           }
        }
      }
    }
    .cart-footer{
      height:1rem;
      background: #fff;
      position: fixed;
      width:100%;
      bottom:1.2rem;
      left:0;
      border-bottom:1px solid #f2f2f2;
      .footer-content{
        display: flex;
        line-height: 1rem;
        &>p{
          width:50%;
          text-align: center;
          color:#FC4A26;
        }
        .button{
          float: right;
          background: #FC4A26;
          flex: 1;
          text-align: center;
          color:#fff;
          font-size:.3rem;
          &.disabled{
             background: #ddd;
          }
        }
      }
    }
  }
</style>
