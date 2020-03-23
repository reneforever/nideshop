import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from '../assets/config/api'
import axios from 'axios'

export default new Vuex.Store({
  state: {
    categoryIndex: 0,
    // 购物车数据
    cartTotal:{
      goodsCount: 0,
      goodsAmount: 0,
      checkedGoodsCount: 0,
      checkedGoodsAmount: 0
    },
    cartList: []
  },
  mutations: {
    setCartTotal:function(state,cartTotal){
      state.cartTotal = cartTotal
    },
    setCartList:function(state,cartList){
      state.cartList = cartList
    }
  },
  actions: {
    ajaxCartList: async function(content){
      let cartRes = await axios.get(api.CartList)
      content.commit('setCartList',cartRes.data.data.cartList)
      content.commit('setCartTotal',cartRes.data.data.cartTotal)
    }
  },
  modules: {
  }
})
