<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <!-- <commodity-new></commodity-new> -->
        <el-button type="primary" @click="goToCreate">创建商品</el-button>
      </el-col>
      <el-col :span="12">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品状态">
            <el-select v-model="formInline.type" placeholder="所有状态">
              <el-option label="全部" :value="null"></el-option>
              <el-option v-for="(item, index) in commodityStatusList" :key="index" :label="item.label" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-divider></el-divider>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" highlight-current-row>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="首页图片" width="180">
        <template slot-scope="scope">
          <el-image style="width: 100%; height: 100%" :src="scope.row.homePicUrl" fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="产品标题" prop="title"></el-table-column>
      <el-table-column label="产品名称" prop="productName" width="150"></el-table-column>
      <el-table-column label="价格" prop="price" width="95"></el-table-column>
      <el-table-column label="适用车型" prop="carTypeName" width="100"></el-table-column>
      <el-table-column label="创建日期" prop="createTime" width="160"></el-table-column>
      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          <commodity-item-status :status="scope.row.status" :commodity-id="scope.row.id" @commodity-status-change="statusChange($event)"></commodity-item-status>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <commodity-item-detail :item-data="scope.row"></commodity-item-detail>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination :current-page="page.current" :page-sizes="page.sizeList" :page-size="page.size" :layout="layout" :total="page.total" :hide-on-single-page="true" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/merchantCommodity';
import { Page } from '@/utils/page';
// import CommodityNew from '../components/CommodityNew';
import CommodityItemDetail from '../components/CommodityItemDetail';
import CommodityItemStatus from '../components/CommodityItemStatus';
import { mapGetters } from 'vuex';

export default {
  name: 'MerchantCommodityTabel',
  components: { CommodityItemDetail, CommodityItemStatus },
  filters: {},
  data() {
    return {
      list: [],
      formInline: { type: null },
      listLoading: true,
      page: new Page(),
      layout: "total, sizes, prev, pager, next, jumper, slot"
    };
  },
  computed: {
    ...mapGetters([
      'commodityStatusList'
    ])
  },
  created() {
    this.$store.dispatch("commodity/getCommodityStatusList");
    this.$store.dispatch("commodity/getCommodityBrandList");
    this.$store.dispatch("commodity/getCarTypeList");
    this.fetchData();
  },
  methods: {
    fetchData(type) {
      this.listLoading = true;
      getList({ role: 'MERCHANT', status: type, ...this.page.getQueryParam() }).then(resp => {
        this.list = resp.data.list;
        this.page.setTotal(resp.data.total);
      }).finally(() => {
        this.listLoading = false;
      });
    },

    goToCreate(){
      this.$router.push({ path: "/merchantCommodity/new" });
    },

    onSubmit() {
      this.fetchData(this.formInline.type);
    },
    handleSizeChange(val) {
      this.page.setSize(val);
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.page.setCurrent(val);
      this.fetchData();
    },
    statusChange(data) {
      const item = this.list.find(v => v.id === data.id);
      item.status = data.status;
      item.statusDesc = this.commodityStatusList.find(v => v.key === data.status).label;
    }
  }
};
</script>
