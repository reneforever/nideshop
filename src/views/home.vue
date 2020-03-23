<template>
  <div id="home">
    <!-- 顶部搜索栏 -->
    <van-search 
    v-model="searchData" 
    placeholder="商品搜索 , 共239款好物" 
    input-align="center"
    @focus="searchFocus"
    @blur="searchBlur"
    />
    <!-- 首页轮播图 -->
    <div class="swiper">
      <van-swipe :autoplay="3000" width='375' height='200'>
        <van-swipe-item class="swipeitem" v-for="(image, index) in images" :key="index">
          <img class="swiperimg" v-lazy="image.image_url" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 5宫格导航 -->
    <div class="grid">
      <van-grid :column-num='5'>
        <van-grid-item icon="shop" text="居家" />
        <van-grid-item icon="fire" text="餐厨" />
        <van-grid-item icon="cluster" text="配件" />
        <van-grid-item icon="gift-card" text="服装" />
        <van-grid-item icon="gem" text="志趣" />
      </van-grid>
    </div>
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
    <!-- 品牌制造商直供 -->
    <div class="brandlist">
      <van-panel title="品牌制造商直供">
        <van-grid :column-num="2">
          <van-grid-item v-for="(item1, index1) in brandList" :key="index1">
            <van-image :src="item1.new_pic_url" lazy-load />
            <h4 class="title" v-if="item1">{{item1.name}}</h4>
            <p class="price" v-if="item1">{{item1.floor_price}}元起</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- 新品首发 -->
    <div class="newgoods">
      <van-panel title="周一周四 · 新品首发">
        <van-grid  :column-num="2" :border='false'>
          <van-grid-item v-for="(item2, index2) in newGoodsList" :key="index2">
            <van-image :src="item2.list_pic_url" lazy-load />
            <h4 class="title" v-if="item2">{{item2.name}}</h4>
            <p class="price" v-if="item2">￥{{item2.retail_price}}</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- 人气推荐 -->
    <div class="hotlist">
      <van-panel title="人气推荐">
        <van-card v-for="(item3, index3) in hotGoodsList" :key="index3"
          :price="item3.retail_price"
          :desc="item3.goods_brief"
          :title="item3.name"
          :thumb="item3.list_pic_url"
        />
      </van-panel>
    </div>
    <!-- 专题精选 -->
    <div class="handpick">
      <van-panel title="专题精选">
        <van-swipe width='375' height='280' :show-indicators="false" :autoplay="8000">
          <van-swipe-item class="swipeitem" v-for="(item4, index4) in topicList" :key="index4">
            <img class="swipeitemimg"  :src="item4.item_pic_url" alt="">
            <h4 class="swipeitemtitle" v-if="item4">{{item4.title}}</h4>
            <p class="read" v-if="item4"><img src="../assets/topic-icon/爱心.png">{{item4.read_count}}</p>
            <p class="subtitle" v-if="item4">{{item4.subtitle}}</p>
          </van-swipe-item>
        </van-swipe>
      </van-panel>
    </div>
    <!-- 居家 -->
    <div class="homesupplies">
      <van-panel title="居家">
        <van-grid  :column-num="2" :border='false'>
          <van-grid-item v-for="(item5, index5) in categoryListHome" :key="index5">
            <van-image class="img" :src="item5.list_pic_url" />
            <p class="title" v-if="item5">{{item5.name}}</p>
            <p class="price" v-if="item5">￥{{item5.retail_price}}</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- 餐厨 -->
    <div class="kitchen">
      <van-panel title="餐厨">
        <van-grid  :column-num="2" :border='false'>
          <van-grid-item v-for="(item6, index6) in categoryListKitchen" :key="index6">
            <van-image class="img" :src="item6.list_pic_url" />
            <p class="title" v-if="item6">{{item6.name}}</p>
            <p class="price" v-if="item6">￥{{item6.retail_price}}</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- 配件 -->
    <div class="parts">
      <van-panel title="配件">
        <van-grid  :column-num="2" :border='false'>
          <van-grid-item v-for="(item7, index7) in categoryListParts" :key="index7">
            <van-image class="img" :src="item7.list_pic_url" />
            <p class="title" v-if="item7">{{item7.name}}</p>
            <p class="price" v-if="item7">￥{{item7.retail_price}}</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- 服装 -->
    <div class="cloth">
      <van-panel title="服装">
        <van-grid  :column-num="2" :border='false'>
          <van-grid-item v-for="(item8, index8) in categoryListCloth" :key="index8">
            <van-image class="img" :src="item8.list_pic_url" />
            <p class="title" v-if="item8">{{item8.name}}</p>
            <p class="price" v-if="item8">￥{{item8.retail_price}}</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
    <!-- 志趣 -->
    <div class="funny">
      <van-panel title="志趣">
        <van-grid  :column-num="2" :border='false'>
          <van-grid-item v-for="(item9, index9) in categoryListFunny" :key="index9">
            <van-image class="img" :src="item9.list_pic_url" />
            <p class="title" v-if="item9">{{item9.name}}</p>
            <p class="price" v-if="item9">￥{{item9.retail_price}}</p>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../assets/config/api'
export default {
  data () {
    return {
      searchData: '',
      resData: {},
      active: 0,
    }
  },
  computed: {
    images: function(){
      if(this.resData.banner) {
        return this.resData.banner
      } else {
        return []  
      }
    },
    brandList: function(){
      if(this.resData.brandList) {
        return this.resData.brandList
      } else {
        return []
      }
    },
    newGoodsList: function(){
      if(this.resData.newGoodsList) {
        return this.resData.newGoodsList
      } else {
        return []
      }
    },
    hotGoodsList: function(){
      if(this.resData.hotGoodsList) {
       return this.resData.hotGoodsList
      } else {
        return []
      }
    },
    topicList: function(){
      if(this.resData.topicList) {
        return this.resData.topicList
      } else {
        return []
      }
    },
    categoryListHome: function(){
      if(this.resData.categoryList) {
        return this.resData.categoryList[0].goodsList
      } else {
        return []
      }
    },
    categoryListKitchen: function(){
      if(this.resData.categoryList) {
        return this.resData.categoryList[1].goodsList
      } else {
        return []
      }
    },
    categoryListParts: function(){
      if(this.resData.categoryList) {
        return this.resData.categoryList[3].goodsList
      } else {
        return []
      }
    },
    categoryListCloth: function(){
      if(this.resData.categoryList) {
        return this.resData.categoryList[4].goodsList
      } else {
        return []
      }
    },
    categoryListFunny: function(){
      if(this.resData.categoryList) {
        return this.resData.categoryList[8].goodsList
      } else {
        return []
      }
    }
  },
  async mounted(){
    let res = await axios.get(api.IndexUrl)
    this.resData = res.data.data
    console.log(this.resData)
  },
  components:	{},
  methods: {
    // 输入框placeholder焦点失去焦点显示
    searchFocus(e){
      e.target.placeholder = ''
    },
    searchBlur(e){
      e.target.placeholder = '商品搜索 , 共239款好物'
    }
  }
}
</script>

<style lang="less" scoped>
  #home{
    background: #ecf0f1;
    // 间隔防抖
    /deep/.van-swipe{
      transform: translateZ(0);
    }
    .swiperimg{
      width: 375px;
      height: 200px;
    }
    .brandlist{
      margin-top: 5px;
     /deep/ .van-grid-item__content{
        padding: 1.5px;
      }
      .title{
        position: absolute;
        top: 5px;
        left: 10px;
        font-size: 13px;
      }
      .price{
        position: absolute;
        top: 35px;
        left: 10px;
        font-size: 10px;
        color: #999;
      }
    }
    .newgoods{
      margin-top: 5px;
      /deep/ .van-grid-item__content{
        padding: 1.5px;
      }
      .title{
        font-size: 14px;
        text-align: center;
        margin-top: -5px;
      }
      .price{
        color: #c0392b;
        font-weight: 500;
        margin-top: -16px;
      }
    }
    .hotlist{
      margin-top: 5px;
      .van-card__title{
        text-align: left;
        font-size: 13px;
        font-weight: 600;
        margin-top: 12px;
      }
      .van-card__desc{
        text-align: left;
        font-size: 10px;
        color: #7f8c8d;
        margin-top: 2px;
      }
      .van-card__bottom{
        text-align: left;
        position: absolute;
        margin-top: 55px;
      }
      .van-card__price,.van-card__price-integer{
        font-size: 12px;
        color: #c0392b;
        font-weight: 600;
      }
    }
    .handpick{
      margin-top: 5px;
      .swipeitem{
        margin-top: 5px;
        .swipeitemimg{
          width: 350px;
          height: 200px;
        }
        .swipeitemtitle{
          text-align: left;
          padding-left: 12.5px;
          font-size: 15px;
          margin-top: 10px;
          margin-bottom: 5px;
        }
        .read{
          position: fixed;
          z-index: 100;
          top: 200px;
          left: 210px;
          img{
            width: 13px;
            height: 13px;
            margin-right: 2px;
          }
        }
        .subtitle{
          text-align: left;
          padding-left: 12.5px;
          font-size: 14px;
          margin-top: 0;
        }
      }
    }
    .homesupplies{
      margin-top: 5px;
      /deep/.van-grid-item__content{
        padding: 0;
      }
      .van-grid-item{
        width: 184.8px;
        height: 245.8px;
      }
      .title{
        font-size: 14px;
        margin: 0;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .price{
        color: #c0392b;
        font-weight: 600;
        margin-top: 5px;
      }
    }
    .kitchen{
      margin-top: 5px;
      /deep/.van-grid-item__content{
        padding: 0;
      }
      .title{
        font-size: 14px;
        margin: 0;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .price{
        color: #c0392b;
        font-weight: 600;
        margin-top: 5px;
      }
    }
    .parts{
      margin-top: 5px;
      /deep/.van-grid-item__content{
        padding: 0;
      }
      .van-grid-item{
        width: 187.6;
        height: 248.6;
        overflow: hidden;
      }
      .title{
        font-size: 14px;
        margin: 0;
        white-space: nowrap;
      }
      .price{
        color: #c0392b;
        font-weight: 600;
        margin-top: 5px;
      }
    }
    .cloth{
      margin-top: 5px;
      /deep/.van-grid-item__content{
        padding: 0;
      }
      .title{
        font-size: 14px;
        margin: 0;
      }
      .price{
        color: #c0392b;
        font-weight: 600;
        margin-top: 5px;
      }
    }
    .funny{
      margin-top: 5px;
      /deep/.van-grid-item__content{
        padding: 0;
      }
      /deep/.van-image__img{
        width: 187.2px;
        height: 187.2px;
      }
      /deep/.van-grid-item{
        width: 187.8px;
        height: 245.8px;
        overflow: hidden;
      }
      .title{
        font-size: 14px;
        margin: 0;
      }
      .price{
        color: #c0392b;
        font-weight: 600;
        margin-top: 5px;
      }
    }
  }
</style>