import $axios from './axiosBase';
// 获取轮播图列表数据
export const getBanberList = () => $axios['get']('api/tz/banner/list?key=mallName')
// 获取商品列表  
export const getGoodList = (categoryId,nameLike) => $axios['get'](`api/tz/shop/goods/list?categoryId=${categoryId}&nameLike=${nameLike}`)
// 获取所有分类列表
export const getClassList = () => $axios['get']('api/tz/shop/goods/category/all')