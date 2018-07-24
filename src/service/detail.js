import $axios from './axiosBase';
// 获取商品详情
export const getGoodsDetail = (id) => $axios['get'](`api/tz/shop/goods/detail?id=${id}`)
// 获取视频资源
export const getGoodsVideo = (videoId) => $axios['get'](`api/tz/media/video/detail?videoId=${videoId}`)

// 评价列表 
export const getReputationList = (goodsId) => $axios['get'](`api/tz/shop/goods/reputation?goodsId=${goodsId}`)