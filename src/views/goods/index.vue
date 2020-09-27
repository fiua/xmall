<template>
  <div class="goods">
    <div class="nav">
      <div class="w">
        <a
          @click="handlesort(i)"
          :class="{active:isindex==i}"
          href="javascript:;"
          v-for="(item,i) in navlist"
          :key="i"
        >{{item.title}}</a>
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="min" />
          <span style="margin: 0 5px">-</span>
          <input type="number" placeholder="价格" v-model="max" />
          <el-button type="primary" size="small" style="margin-left: 10px;" @click="reset">确定</el-button>
        </div>
      </div>
    </div>
    <div>
      <div class="goods-box w">
        <goods v-for="item in allgoods" :key="item.id" :goods="item"></goods>
      </div>
      <div class="w">
        <el-pagination
          style="float:right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[8, 20, 40, 80]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import goods from "@/components/goods";
export default {
  data() {
    return {
      max: "",
      min: "",
      navlist: [
        {
          title: "综合排序",
        },
        {
          title: "价格由低到高",
        },
        {
          title: "价格由高到低",
        },
      ],
      isindex: 0,
      page: 1,
      size: 20,
      sort: "",
      allgoods: [],
      total: "",
    };
  },
  components: {
    goods,
  },
  watch: {
    $route: "getallgoods", //如果路由发生变化，就监听这个方法
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.getallgoods();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getallgoods();
    },
    pricesort(v) {
      this.sort = v;
      this.getallgoods();
    },
    reset() {
      this.sort = "";
      this.page = 1;
      this.getallgoods();
    },
    handlesort(i) {
      this.isindex = i;
      switch (i) {
        case 0:
          //综合排序
          this.reset();
          break;
        case 1:
          //正序
          this.pricesort(1);
          break;
        case 2:
          //倒叙
          this.pricesort(-1);
          break;
        default:
          break;
      }
    },
    async getallgoods() {
      let url = this.$route.query.cid
        ? `api/goods/allgoods?page=${this.page}&size=${this.size}&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}&cid=${this.$route.query.cid}`
        : `api/goods/allgoods?page=${this.page}&size=${this.size}&sort=${this.sort}&priceGt=${this.min}&priceLte=${this.max}`;
      try {
        const res = await this.$http.get(url);
        console.log(res);
        this.allgoods = res.data.data;
        this.total = res.data.total;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getallgoods();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";
@import "../../assets/style/theme";

.nav {
  height: 60px;
  line-height: 60px;
  > div {
    display: flex;
    align-items: center;
    a {
      padding: 0 30px 0 0;
      height: 100%;
      @extend %block-center;
      font-size: 12px;
      color: #999;
      &.active {
        color: #5683ea;
      }
      &:hover {
        color: #5683ea;
      }
    }
    input {
      @include wh(80px, 30px);
      border: 1px solid #ccc;
    }
    input + input {
      margin-left: 10px;
    }
  }
  .price-interval {
    padding: 0 15px;
    @extend %block-center;
    input[type="number"] {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
  }
}

.goods-box {
  overflow: hidden;
  > div {
    float: left;
    border: 1px solid #efefef;
  }
}

.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}

.img-item {
  display: flex;
  flex-direction: column;
}

.el-pagination {
  align-self: flex-end;
  margin: 3vw 10vw 2vw;
}

.section {
  padding-top: 8vw;
  margin-bottom: -5vw;
  width: 1218px;
  align-self: center;
}

.recommend {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}
</style>