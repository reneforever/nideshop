<template>
  <div id="cart">
    <!-- 购物车导航栏 -->
    <van-nav-bar
      title="购物车"
      left-arrow
      @click-left="onClickLeft"
    />
      <!-- 商品列表 -->
      <div class="list">
        <div class="cartitem" v-for="(item1,index1) in cartList" :key="index1">
          <van-checkbox @change="checkEvent($event,item1)" v-model="item1.checked"></van-checkbox>
          <van-image
            width="100"
            height="100"
            :src="item1.list_pic_url"
          />
          <div class="proInfo">
            <div class="title" v-if="cartList">{{item1.goods_name}}<span class="num">{{item1.number}}</span> </div>
            <div class="brief" v-if="cartList">{{item1.goods_specifition_name_value}}</div>
            <div class="price" v-if="cartList">{{item1.retail_price}}</div>
          </div>
        </div>
      </div>
      <!-- 提交订单 -->
      <div class="submit">
        <van-submit-bar
          :price="cartTotal.checkedGoodsAmount*100"
          button-text="提交订单"

          @submit="onSubmit"
        >
          <van-checkbox v-model="checkedAll" >全选</van-checkbox>
        </van-submit-bar>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../assets/config/api'
// 引入mapstate辅助函数
import {mapState} from 'vuex'
let mapStateObj = mapState(['cartTotal','cartList'])
export default {
  data () {
    return {
      checked: 0,
    }
  },
  computed: {
    // 解构mapState
    ...mapStateObj,
    // 全选
    checkedAll:{
      set(val){
        console.log(val)
      },
      get(){
        if(this.cartTotal.goodsCount == this.cartTotal.checkedGoodsCount){
          return true
        } else {
          return false
        }
        
    }
  },
  },
  components:	{
    
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    onSubmit(){
      console.log(1)
    },
    async checkEvent(event,item1){
      console.log(event)
      console.log(item1)

      let res = await axios.post(api.CartChecked,{
        isChecked: Number(event),
        productIds: item1.product_id
      })
      console.log(res)
      let data = res.data.data
      this.$store.commit('setCartList',data.cartList),
      this.$store.commit('setCartTotal',data.cartTotal)
    }
  },
  async created() {
    this.$store.dispatch('ajaxCartList')
  },
  mounted() {
    console.log(this.cartList)
    console.log(this.cartTotal)
  },
}
</script>

<style lang="less" scoped>
  #cart{
    .cartitem{
      height: 100px;
      border-bottom: 1px solid #ecf0f1;
      .van-checkbox{
        width: 20px;
        position: absolute;
        margin-top: 40px;
        margin-left: 20px;
        /deep/.van-checkbox__icon--checked .van-icon{
          background-color:#c0392b;
          border-color: #c0392b;
        }
      }
      .van-image{
        margin-left: -190px;
      }
      .proInfo{
        margin-top: -80px;
        margin-left: 150px;
        width: 230px;
        text-align: left;
        .title{
          font-size: 15px;
          .num::before{
            content:'x';
          }
          .num{
            width: 30px;
            height: 15px;
            float: right;
            text-align: left;
            margin-top: 2px;
            margin-right: 5px;
          }
        }
        .brief{
          font-size: 13px;
          color: #7f8c8d;
        }
        .price::before{
          content:'￥';
        }
        .price{
          font-size: 15px;
          margin-left: -2px;
          margin-top: 10px;
        }
      }
    }
  }
</style>