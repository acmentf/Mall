<template>
  <div id="home">
    <!-- 图片轮播 -->
    <x-header :left-options="{showBack: false}">天使童装</x-header>
    <div class="banner-warp"> 
      <swiper height="5.4rem" dots-position="center" auto >
        <swiper-item  v-for="item in bannerList" :key="item.id">
          <div class="img-wrap">
            <img :src="item.picUrl" style="width:100%"/>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <tab bar-active-color="#FC4A26" :line-width="2" active-color="#FC4A26">
      <tab-item selected @on-item-click="_filterGoodList('')">全部</tab-item>
      <tab-item v-for="item in classList" :key="item.id"  @on-item-click="_filterGoodList(item.id)">{{item.name}}</tab-item>
    </tab>
    <div class="goodList-wrap">
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1/2" v-for="item in goodList" :key="item.id" @click.native="_detail(item.id)">
           <div class="content-item">
             <div class="img-wrap">
                 <img :src="item.pic" alt="">
             </div>
             <div class="content-txt">
               <p class="name">{{item.name}}</p>
               <p class="price">{{item.minPrice}}￥</p>
             </div>
           </div>
        </flexbox-item>
      </flexbox>
      <p class="notice">没有更多数据了</p>
    </div>
  </div>
</template>

<script>
import { getBanberList, getGoodList,getClassList } from '@/service/home.js'
import { Tab, TabItem ,Swiper ,SwiperItem,Flexbox, FlexboxItem, XHeader  } from 'vux'
export default {
  name: 'home',
  data () {
    return {
     bannerList:[],
     goodList:[],
     classList:[],
     categoryId:'',
     nameLike:''
    }
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Flexbox, 
    FlexboxItem,
    XHeader
  },
  created(){
    
  },
  mounted(){
    this._getBanberList();
    this._getGoodList();
    this._getClassList();
  },
  methods:{
    async _getBanberList(){
      this.bannerList = await getBanberList();
    },
    async _getGoodList(){
      this.goodList = await getGoodList(
        this.categoryId,
        this.nameLike
      );
    },
    async _getClassList(){
      this.classList = await getClassList();
    },
    _filterGoodList(categoryId){
      this.categoryId = categoryId;
      this._getGoodList();
    },
    // 跳转到详情页面
    _detail(id){
      this.$router.push({
          path: `/detail?id=${id}`,
      })
    }
  }
}
</script>

<style lang="less">
  #home{
    background: #f2f2f2;
    padding-bottom:1.4rem;
    .banner-warp{
      .vux-swiper{
        height:5.4rem;
      }
    }
    .goodList-wrap{
      margin-top:0.15rem;
      padding: 0 0.1rem;
      .content-item{
        background: #fff;
        padding:0 0.1rem;
        margin-bottom:0.2rem;
        .img-wrap{
          height:3.44rem;
          overflow: hidden;
          img{
            width:100%;
          }
        }
        .content-txt{
          p{
            color:#000;
            line-height: 0.6rem;
            padding-left:0.1rem;
            &.price{
              color:#FC4A26;
            }
          }
          
        }
      }
      .notice{
        text-align: center;
      }
    }
  }
</style>
