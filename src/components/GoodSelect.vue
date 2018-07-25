<template>
  <div id="goods-select">
    <div class="select-list">
      <div class="select-items">
        <div class="select-item">
          <i class="iconfont icon-weixin"></i>
          <p class="wx">微信</p>
        </div>
        <div class="select-item" style="padding-right:0.24rem;">
          <span class="goods-num" v-show="goodsNum">({{goodsNum}})</span>
          <i class="iconfont icon-cart-empty" :class="{have: goodsNum}"></i>
          <p class="cart" :class="{have: goodsNum}">购物车</p>  
        </div> 
      </div>
      <div class="select-items">
        <x-button type="warn" action-type="button" @click.native="_addCart">加入购物车</x-button>
      </div>
       <div class="select-items">
        <x-button type="primary" action-type="button"  @click.native="_buyNow">立即购买</x-button>
      </div>
    </div>
    <div class="goods-add" v-if="!isHide">
       <x-icon type="ios-close" size="30" class="close" @click="isHide = true"></x-icon>
      <div class="goods-class">
        <div class="left">
          <img :src="goodsInfo.pic" alt="">
        </div>
        <div class="right">
          <p calss="goods-name">{{goodsInfo.name}}</p>
          <p calss="goods-price" style="padding-top:0.2rem;color:#FC4A26">￥{{goodsInfo.minPrice}}</p>
        </div>
      </div>
      <div class="properties" v-if="properties">
         <div v-for="item in properties" :key="item.id">
            <p class="properties-name">{{item.name}}</p>
            <ul class="properties-list">
              <li class="properties-item" v-for="(i,index) in item.childsCurGoods" 
              :key="i.id" @click="_selectClass(item.childsCurGoods,i,index)"
              :class="{selected : i.remark }"
               >
                {{i.name}}
              </li>
            </ul>
         </div>
      </div>
      <div class="buy">
        <div class="title">
          购买数量
        </div>
        <div class="handle">
           <inline-x-number width="50px" :min=1 v-model="num"></inline-x-number>
        </div>
      </div>
      <div class="handle" :style="{background:handelColor}">{{handelStr}}</div>
    </div>
    <div class="zz"  v-if="!isHide"></div>
   
  </div>
</template>

<script>
import {XButton,InlineXNumber  } from 'vux';
import {getSessionStorage,setSessionStorage} from '@/utils/index.js'
export default {
  props:['goodsInfo','properties'],
  data () {
    return {
      isHide: true,
      num:1,
      handelStr:'加入购物车',
      handelColor:'#E64340',
      currentIndex:'',
      goodsNum: getSessionStorage('shopCarInfo') ? parseInt(getSessionStorage('shopCarInfo').shopNum) : 0
    }
  },
  components:{
    XButton,
    InlineXNumber
  },
  methods:{
    // 加入购物车
    _addCart(){
      this.isHide = false
      this.handelStr = "加入购物车"
      this.handelColor = "#E64340"
    },
    // 立刻购买
    _buyNow(){
      this.isHide = false
      this.handelStr = "立刻购买"
      this.handelColor = "#1AAD19"
    },
    _selectClass(list,item,index) {
      list.forEach((element,i) => {
        if (index == i) {
          element.remark =  true;
        }else{
          element.remark =  false;
        }
      });
      console.log(this.goodsInfo)
      
    }
  }
}
</script>

<style lang="less">
  #goods-select{
    box-shadow: 0 0 2px #ddd;
    .select-list{
      height:1rem;
      display: flex;
      &>.select-items{
        text-align: center;
        flex:1;
        display: flex;
        button{
          line-height: 0;
        }
        &>.select-item{
          position: relative;
          flex:1;
          .goods-num{
            position: absolute;
            right:0.16rem;
            font-size:0.22rem;
            color:#FC4A26;
          }
          i{
            font-size:0.4rem;
            display: inline-block;
            &.icon-weixin{
              color:#1AAD19
            }
          }
          p{
            font-size:0.22rem;
            line-height: 0.22rem;
            &.wx{
              color:#1AAD19
            }
          }
          .have{
            color:#FC4A26
          }
        }
      }
    }
    .goods-add{
      position: absolute;
      width:100%;
      z-index: 1111;
      background: #fff;
      bottom:0;
      left:0;
      .close{
        position: absolute;
        right:0.2rem;
        top:0.2rem;
      }
      .goods-class{
        text-align: left;
        display: flex;
        padding:0.2rem;
        border-bottom:1px solid #f9f9f9;
        .left{
          width:1.2rem;
          height:1.2rem;
          img{
            width:1.2rem;
            height:1.2rem;
          }
        }
        .right{
          flex:1;
          padding-left:0.2rem;
        }
      }
      .properties{
        padding:0.2rem;
        .properties-name{
          padding-bottom:0.2rem;
        }
        .properties-list{
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 0.4rem;
          &:last-child{
            margin-bottom: 0.2rem;
          }
          .properties-item{
            text-align: center;
            width:14%;
            height:0.6rem;
            border:1px solid #ddd;
            border-radius: 0.1rem;
            line-height: 0.6rem;
            margin-right: 0.2rem;
            &.selected{
               border:1px solid #FC4A26;
               color:#FC4A26;
            }
          }
        }
      }
      .buy{
        display: flex;
        padding:0.2rem;
        &>div{
          flex: 1;
          &.handle{
            text-align: right;
          }
        }
      }
      .handle{
        text-align: center;
        height:1rem;
        line-height: 1rem;
        color:#fff;
        font-size:0.3rem;
      }
    }
    .zz{
      position: fixed;
      background: rgba(0,0,0,.5);
      width:100%;
      height:100%;
      top:0;
      left:0;
    }
  }
</style>
