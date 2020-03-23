<template>
  <div id="category">
     <!-- 顶部搜索栏 -->
      <van-search 
      v-model="searchData" 
      placeholder="商品搜索 , 共239款好物" 
      input-align="center"
      @focus="searchFocus"
      @blur="searchBlur"
      />
    <!-- 底部导航栏 -->
    <div class="tabbar">
      <van-tabbar v-model="active" active-color='#c0392b'>
        <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="label-o">专题</van-tabbar-item>
        <van-tabbar-item icon="apps-o" replace to="/category">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact">我的</van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- 分类选择 -->
    <div class="selector">
      <van-tree-select
        :items="items"
        :main-active-index.sync="activeIndex"
        @click-nav="changeRight"
      >
        <template slot="content">
          <div class="banner">
            <img :src="bannerImg" alt="">
            <p>{{bannerText}}</p>
          </div>
          <van-grid :border="false" :column-num="3">
            <van-grid-item v-for="(item1, index1) in subCategoryList" @click="changeIndex(index1)" :icon="item1.banner_url" :text="item1.name" :key="index1"  :to="'/categoryList'+item1.id">
            </van-grid-item>
          </van-grid>
        </template>
      </van-tree-select>
     </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../assets/config/api'
export default {
  data () {
    return {
      resData: [],
      categoryData: [],
      subCategoryList: [],
      active: 2,
      searchData: '',
      activeIndex: 0,
      bannerImg: '',
      bannerText: ''
    }
  },
  watch:{
    activeIndex: async function(){
      if(this.items.length!==0){
        let id = this.items[this.activeIndex].id
        // console.log(id)
        let res = await axios.get(api.CatalogCurrent,{params:{id}})
        this.subCategoryList = res.data.data.currentCategory.subCategoryList
        // console.log(res.data.data.currentCategory.subCategoryList)
        this.bannerImg = this.resData.categoryList[this.activeIndex].banner_url
        this.bannerText = this.resData.categoryList[this.activeIndex].front_name
      } else {
        this.subCategoryList = []
      }
    },

  },
  computed: {
    categoryList: function(){
      if(this.resData.categoryList){
        return this.resData.categoryList
      } else {
        return []
      }
    },
    items: function(){
      if(this.resData.categoryList){
        let arr = []
        this.resData.categoryList.forEach((item)=>{
          item.text = item.name
          arr.push(item)       
        })
        // console.log(arr)
        return arr
      } else {
        return []
      }
    },
  },
  components:	{},
  methods: {
    // 输入框placeholder焦点失去焦点显示
    searchFocus(e){
      e.target.placeholder = ''
    },
    searchBlur(e){
      e.target.placeholder = '商品搜索 , 共239款好物'
    },
    // 侧边栏点击事件
    changeRight(index){
      this.activeIndex = index
      // console.log(this.activeIndex)
    },
    // 点击打开细分商品栏传递index到vuex
    changeIndex(index1){
      this.$store.state.categoryIndex = index1
    }
  },
  async mounted(){
    // 分类表请求
    let listRes = await axios.get(api.CatalogList)
    this.resData = listRes.data.data
    // console.log(listRes.data.data)
    this.bannerImg = this.resData.categoryList[this.activeIndex].banner_url
    // 预加载第一面内容
    this.subCategoryList = this.resData.categoryList[0].subCategoryList
    this.bannerText = this.resData.categoryList[0].front_name
  }
}
</script>

<style lang='less' scoped>
  #category{
    .sidebar{
      .van-sidebar-item{
        font-size: 15px;
      }
      .van-sidebar-item--select{
        color: #c0392b;
        border-color: #c0392b;
        font-weight: bold;
      }
    }
    .selector{
      .van-sidebar{
        height: 396px;
        .van-sidebar-item--select{
          border-color: #c0392b;
          color: #c0392b;
          font-weight: bold;
        }
      }
      .van-tree-select__content{
        height: 600px;
        .banner{
          width: 220px;
          height: 90px;
          margin-left: 5px;
          padding: 10px;
          img{
            width: 100%;
            height: 100%;
          }
          p{
            position: fixed;
            width: 250px;
            z-index: 100;
            top: 85px;
            left: 125px;
            color: #ffffff;
            font-size: 15px;
          }
        }
      }
      
    }
  }
</style>