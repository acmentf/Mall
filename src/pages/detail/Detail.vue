<template>
  <div id="detail" v-if="goodDetailInfo.basicInfo">
    <div class="detail-wrap">
      <x-header :left-options="{backText: ''}">商品详情</x-header>
      <div class="banner-warp">
        <div v-if="!isVideo">
          <swiper height="7.48rem" dots-position="center" auto >
            <swiper-item  v-for="item in goodDetailInfo.pics" :key="item.id">
              <div class="img-wrap">
                <img :src="item.pic" style="width:100%"/>
              </div>
            </swiper-item>
          </swiper>
        </div>
        <div v-if="isVideo&& videoUrl">
          <video width="100%" controls  autoplay="autoplay" loop="loop">
            <source :src="videoUrl" type="video/mp4">
          </video>
        </div>
      </div>
      <div class="goods-info">
        <p class="info-title">{{goodDetailInfo.basicInfo.name}}</p>
        <p class="info-content">
          <span class="info-price">￥{{goodDetailInfo.basicInfo.minPrice}}</span>
          <span class="info-num">购买{{goodDetailInfo.basicInfo.numberOrders}}次</span>
          <span class="info-rep">共收到{{goodDetailInfo.basicInfo.numberGoodReputation}}次好评</span>
        </p>
      </div>
      <div class="goods-content">
        <p class="content-title">商品介绍</p>
        <p v-html="goodDetailInfo.content" class="content-detail"></p>
      </div>
      <div class="goods-reputation">
        <p class="content-title">大家评价<span class="red-text"> ({{reputationList.length}}) </span></p>
        <ul class="reputation-list">
          <li v-for="(item,index) in reputationList" :key="index" class="reputation-item">
            <div class="list-left">
              <img :src="item.user.avatarUrl" alt="" width="100%">
              <p class="center-txt">{{item.goods.goodReputationStr}}</p>
            </div>
            <div class="list-right">
              <p>{{item.goods.goodReputationRemark}}</p>
              <p class="time">{{item.goods.dateReputation}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="detail-footer">
      <GoodSelect goodsNum="3" :goodsInfo="goodDetailInfo.basicInfo" :properties="goodDetailInfo.properties"/>
    </div>
  </div>
</template>

<script>
import GoodSelect from '@/components/GoodSelect.vue'
import {getGoodsDetail,getGoodsVideo,getReputationList} from '@/service/detail'
import {Swiper ,SwiperItem,XHeader} from 'vux';

export default {
  name: 'detail',
  data () {
    return {
      id: this.$route.query.id,
      goodDetailInfo:{}, //商品详情信息
      videoUrl:'',
      reputationList:[]
    }
  },
  components: {
   Swiper,
   SwiperItem,
   XHeader,
   GoodSelect
  },
  created(){
    // 获取商品详情信息
    this._getGoodsDetail();
    this._getReputationList();
  },
  computed:{
    isVideo(){
      if (this.goodDetailInfo.basicInfo) {
        if (this.goodDetailInfo.basicInfo.videoId) {
          this._getGoodsVideo(this.goodDetailInfo.basicInfo.videoId)
          return true
        }
      }
    }
  },
  mounted(){
     
  },
  methods:{
   async _getGoodsDetail(){
     this.goodDetailInfo = await getGoodsDetail(this.id);
   },
   async _getGoodsVideo(videoId){
     let videoObj = await getGoodsVideo(videoId);
     this.videoUrl = videoObj.ldMp4
   },
   async _getReputationList(){
    this.reputationList = await getReputationList(this.id);
   },
   
  }
}
</script>

<style lang="less">
  #detail{
    .detail-wrap{
      padding-bottom:1rem;
      .goods-info{
        margin-top:0.1rem;
        background: #fff;
        padding:0.2rem 0.3rem;
        .info-title{
          font-size:0.3rem;
        }
        .info-content{
          line-height: 0.4rem;
          padding-top:0.1rem;
          &>span{
            display: inline-block;
            margin-right:0.6rem;
            color:#999;
            font-weight: bold;
            &.info-price{
              color:#FC4A26;
            }
          }
        }
      }
      .content-title{
        padding:0.3rem;
      }
      .goods-content{
        background: #fff;
        margin-top:0.2rem;
        .content-detail{
          padding:0 0.1rem;
          img{
            width:100%;
          }
        
        }
      }
      .goods-reputation{
        background: #fff;
        margin-top:0.2rem;
        .reputation-list{
          padding: 0.2rem 0.1rem;
          .reputation-item{
            display: flex;
            border-bottom:1px solid #f2f2f2;
            margin-bottom:.4rem;
            padding-bottom:0.1rem;
            &:last-child{
              border:none;
            }
            .list-left{
              width:1.2rem;
            }
            .list-right{
              flex:1;
              padding-left:0.4rem;
              &>.time{
                padding-top:0.3rem;
              }
            }
          }
        }
        
      }
    }  
    .detail-footer{
      position: fixed;
      bottom:0;
      left:0;
      width:100%;
      background: #fff;
    }
  }
</style>
