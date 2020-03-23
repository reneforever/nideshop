<template>
  <div id="categoryList"> 
    <van-tabs v-model="tabActive">
      <van-tab v-for="(item1, index1) in clist" :key="index1" :title="item1.name">
        <div class="categoryTitle">
          <h3>{{item1.name}}</h3>
          <p>{{item1.front_name}}</p>
        </div>
        <!-- 宫格展示 -->
        <div class="categoryDetail">
          <van-grid :column-num="2">
            <van-grid-item v-for="(item2, index2) in goodsList" :key="index2" :to="'/product/'+item2.id">
                <van-image :src="item2.list_pic_url" lazy-load/>
                <h3>{{item2.name}}</h3>
                <p>￥{{item2.retail_price}}</p>
            </van-grid-item>
          </van-grid>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import api from '../assets/config/api'
export default {
  props:['id'],
  data () {
    return {
      tabActive: 0,
      clist: [],
      goodsListData: []
    }
  },
  computed: {
    currentCategory: function(){
      if(this.goodsCategory.length !== 0){
        return this.goodsCategory.currentCategory
      } else {
        return []
      }
    },
    goodsList: function(){
      if(this.goodsListData !== 0){
        return this.goodsListData.data
      } else {
        return []
      }
    }
  },
  watch: {
    // 监听tabActive
    tabActive:async function(index){
      // console.log(index)
      let id = this.clist[index].id
      // console.log(this.clist)
      // console.log(id)
      let page = 1
      // let size = 20
      // 手动传值拼接url
      let goodsResData = await axios.get(`${api.GoodsList}?categoryId=${id}&page=${page}&size=20`)
      // console.log(goodsResData.data.data)
      this.goodsListData = goodsResData.data.data
      // console.log(this.goodsListData.goodsList)

   }
  },
  components:	{},
  methods: {
  },
  async mounted(){
    // console.log(this.id)
    let id = this.id
    let res = await axios.get(api.GoodsCategory,{params:{id}})
    // console.log(res.data.data)
    this.goodsCategory = res.data.data
    // 分类banner标题请求
    this.clist = res.data.data.brotherCategory
      
      // 首次加载0页goodList数据
      let Firstid = this.clist[0].id
      // console.log(this.clist)
      // console.log(id)
      let page = 1
      // let size = 20
      // 手动传值拼接url
      let goodsResData = await axios.get(`${api.GoodsList}?categoryId=${Firstid}&page=${page}&size=20`)
      // console.log(goodsResData.data.data)
      this.goodsListData = goodsResData.data.data
    
    // 运用vuex调用index显示不同的页面
      let activeNum = this.$store.state.categoryIndex
      // console.log(activeNum)
      this.tabActive = activeNum
      // console.log(this.tabActive)
  },
}
</script>

<style lang='less' scoped>
  #categoryList{
    .categoryTitle{
      position: absolute;
      width: 375.2px;
      background-color: #ecf0f1;
      height: 90px;
      h3{
        margin: 0;
        margin-top: 25px;
        font-size: 18px;
      }
      p{
        margin: 0;
        margin-top: 8px;
        font-size: 14px;
        color: #bdc3c7;
      }
    }
    .categoryDetail{
      position: absolute;
      top: 134px;
      width: 372.5px;
      .van-grid-item{
        h3{
          margin: 0;
          font-size: 14px; 
          font-weight: light; 
        }
        p{
          margin: 0;
          color: #c0392b;
        }
      }
    }
  }
</style>