<template>
  <div id="product">
      <van-nav-bar
        title="商品详情"
        left-arrow
        @click-left="onClickLeft"
      />
      <!-- 轮播图 -->
      <div class="swiper">
          <van-swipe :autoplay="4000">
          <van-swipe-item v-for="(item1, index1) in gallery" :key="index1">
            <img v-lazy="item1.img_url" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 无忧退货标语 -->
      <div class="message">
        <ul>
          <li><span class="point">.</span>30天无忧退货</li>
          <li><span class="point">.</span>40小时快速退货</li>
          <li><span class="point">.</span>满88元免邮费</li>
        </ul>
      </div>
      <!-- 商品信息 -->
      <div class="goodsinfo">
        <h1 v-if="info">{{info.name}}</h1>
        <h5 v-if="info">{{info.goods_brief}}</h5>
        <p v-if="info">￥{{info.retail_price}}</p>
      </div>
      <!-- 选择规格弹窗 -->
      <div class="cell">
        <van-cell title="请选择规格数量" is-link />
      </div>
      <!-- 商品参数 -->
      <div class="goodssize">
        <van-panel title="商品参数">
          <div class="content" v-for="(item2, index2) in attribute" :key="index2">
            <span class="name">{{item2.name}}</span>
            <p class="value">{{item2.value}}</p>
          </div>
        </van-panel>
      </div>
      <!-- 商品详情 -->
      <div class="detail" v-if="info" v-html="info.goods_desc">
      </div>
      <!-- 底部导航栏 -->
      <div class="bottomnav">
        <van-goods-action>
           <van-goods-action-icon  icon="star-o" text="收藏"/>
          <van-goods-action-icon :info="$store.state.cartTotal.goodsCount==0?'':$store.state.cartTotal.goodsCount" icon="cart-o" text="购物车" to="/cart"/>
          <van-goods-action-button type="warning" text="加入购物车" @click="addCardClick"/>
          <van-goods-action-button type="danger" text="立即购买" @click="buyClick"/>
        </van-goods-action>
      </div>
      <!-- 选择商品规格 -->
      <div class="choose">
        <van-sku v-if="info"
          v-model="show"
          :sku="sku"
          :goods="goods"
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked"
        />
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../assets/config/api'

// sku对象结构
let sku = {
  tree: [
    {
      k: '颜色', // skuKeyName：规格类目名称
      v: [
          {
            id: '30349', // skuValueId：规格值 id
            name: '红色', // skuValueName：规格值名称
          },
          {
            id: '1215',
            name: '蓝色',
          }
        ],
        k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
    }
  ],
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
          {
            id: 1181000, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            's1': '1', // 规格类目 k_s 为 s1 的对应规格值 id
            's2': '3', // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 60 // 当前 sku 组合对应的库存
          },
          {
            id: 1181000, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            "s1": '2', // 规格类目 k_s 为 s1 的对应规格值 id
            "s2": '4', // 规格类目 k_s 为 s2 的对应规格值 id
            stock_num: 40 // 当前 sku 组合对应的库存
          },
        ],
  price: '1.00', // 默认价格（单位元）
  stock_num: 100, // 商品总库存
}

export default {
  props:['id'],
  data () {
    return {
      productData: [],
      show: false,
      sku: sku,
      goods: {
        title:'',
        // 默认商品 sku 缩略图
        picture: ''
      }
    }
  },
  computed: {
    gallery:function(){
      if(this.productData.gallery !== 0){
        return this.productData.gallery
      } else {
        return []
      }
    },
    info:function(){
      if(this.productData.info !== 0){
        return this.productData.info
      } else {
        return []
      }
    },
    attribute:function(){
      if(this.productData.attribute !== 0){
        return this.productData.attribute
      } else {
         return []
      }
    }
  },
  components:	{},
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    buyClick(){
      this.show = true
    },
    addCardClick(){
      this.show = true
    },
    onBuyClicked(){
      this.show = false
    },
    async onAddCartClicked(skuData){
      this.show = false
      // console.log(skuData)
      let chooseContent = skuData.selectedSkuComb.s1+'_'+skuData.selectedSkuComb.s2
      // console.log(chooseContent)
      let resPro = this.productData.productList.filter((item) => {
        if(item.goods_specification_ids == chooseContent){
          return true
        } else {
          return false
        }
      })
      console.log(resPro)
      // 提交购物车数据
      let cartRes = await axios.post(api.CartAdd,{
        goodsId: resPro[0].goods_id,
        number: skuData.selectedNum,
        productId: resPro[0].id
      })
      let data = cartRes.data.data
      console.log(cartRes)
      
      this.$store.commit('setCartTotal',data.cartTotal)
      this.$store.commit('setCartList',data.cartList)
    }
  },
  async mounted() {
    this.$store.dispatch('ajaxCartList')

    let id = this.id
    let res = await axios.get(api.GoodsDetail,{params:{id}})
    // console.log(res.data.data)
    this.productData = res.data.data
    // 加载点开购物车时info中的数据
    this.goods.picture = this.productData.info.primary_pic_url
    this.goods.title = this.productData.info.name
    this.sku.price = this.productData.info.retail_price
    this.sku.stock_num = this.productData.info.goods_number
    // 创建sku数据
    // console.log(this.productData.specificationList)
    let tree = []
    this.productData.specificationList.forEach((item1)=>{
      let arr = []
      item1.valueList.forEach((item2)=>{
        arr.push({
          id: item2.id,
          name: item2.value
        })
      })
      tree.push({
        k: item1.name, // skuKeyName：规格类目名称
        v: arr,
        k_s: "s"+item1.specification_id
      })
    })
    this.sku.tree = tree
    // console.log(tree)
  },
}
</script>

<style lang='less' scoped>
  #product{
    background: #ecf0f1;
    .swiper{
      .van-swipe{
        width: 375.2px;
        height: 380px;
        transform: translateZ(0);
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .message{
      width: 375.2px;
      height: 40px;
      background: #f5f6fa;
        ul{
          line-height: 40px;
          display: flex;
          justify-content: space-around;
          li{
            width: 125px;
            font-size: 14px;
            .point{
              width: 10px;
              height: 10px;
              position: absolute;
              color: #c0392b;
              font-size: 35px;
              margin-left: -12px;
              margin-top: -10px;
            }
          }
        }
    }
    .goodsinfo{
      background-color: #fff;
      width: 372.5px;
      height: 145px;
      position: relative;
      h1{
        font-size: 21px;
        margin: 0;
        padding-top: 15px;
      }
      h5{
        font-weight: 400;
        font-size: 15px;
        color: #bdc3c7;
        margin-top: 5px;
      }
      p{
        color: #c0392b;
        font-weight: 600;
      }
    }
    .cell{
      .van-cell__title{
        text-align: left;
        span{
          font-size: 16px;
        }
      }
    }
    .goodssize{
      margin-top: 10px;
      .van-cell__title{
        text-align: left;
        span{
          font-size: 18px;
        }
      }
      .van-panel__content{
        padding-bottom: 10px;
        .content{
          width: 350px;
          height: 40px;
          background-color:#ecf0f1;
          margin: 5px auto;
          line-height: 40px;
          overflow: hidden;
          border-radius: 3px;
          .name{
            float: left;
            margin-left: 5px;
            font-size: 14px;
            color: #b2bec3;
          }
          .value{
            height: 40px;
            width: 280px;
            margin-top: 0;
            margin-left: 60px;
            text-align: left;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }
    .detail{
      margin-top: 0;
      /deep/p{
        width: 375.2px;
        display: flex;
        margin: 0;
        padding: 0;
        /deep/img{
          width: 100%;
        }
      }
    }
    .bottomnav{

    }
    .choose{
      .van-popup--bottom.van-popup--round{
        border-radius: 0;
        /deep/.van-sku-header__goods-info{
          text-align: left;
          .van-sku__goods-price::before{
            content:'价格:    ';
            font-size: 14px;
          }
          .van-sku__goods-price{
            line-height: 19.2px;
            color: #2d3436;
            .van-sku__price-symbol{
              font-size: 14px;
            }
            .van-sku__price-num{
              font-size: 14px;
            }
          }
          .van-sku-header-item{
              margin-top: 5px;
          }
        }
      }
    }
  }
</style>