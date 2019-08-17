<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-search" :loading="connectionLoading" @click="getMaxConnectionList">获取联系最多</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-search" :loading="interestLoading" @click="getMaxInterestList">获取收藏最多</el-button>
      </el-col>
      <el-col :span="12">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品状态">
            <el-select v-model="formInline.type" placeholder="所有状态">
              <el-option label="全部" :value="null"></el-option>
              <el-option v-for="(item, index) in commodityStatusList" :key="index" :label="item.label" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指定商家">
            <el-input v-model="formInline.merchantId" placeholder="商家Id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchData">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-divider></el-divider>

    <el-table v-loading="connectionLoading||interestLoading||listLoading" :data="list" element-loading-text="Loading" highlight-current-row>
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
          <operator-commodity-status :status="scope.row.status" :commodity-id="scope.row.id" @commodity-status-change="statusChange($event)"></operator-commodity-status>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <commodity-item-detail :commodity-id="scope.row.id"></commodity-item-detail>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination :current-page="page.current" :page-sizes="page.sizeList" :page-size="page.size" :layout="layout" :total="page.total" :hide-on-single-page="true" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getMaxConnectionList, getMaxInterestList, getListByMerchantId } from "@/api/operatorCommodity";
import { Page } from "@/utils/page";
import CommodityItemDetail from "@/components/commodity/CommodityItemDetail";
import OperatorCommodityStatus from "../components/OperatorCommodityStatus";
import { mapGetters } from "vuex";

export default {
  name: "OperatorCommodityTabel",
  components: { CommodityItemDetail, OperatorCommodityStatus },
  filters: {},
  data() {
    return {
      list: [],
      formInline: { type: null, merchantId: null },
      listLoading: true,
      connectionLoading: false,
      interestLoading: false,
      page: new Page(),
      layout: "total, sizes, prev, pager, next, jumper, slot"
    };
  },
  computed: {
    ...mapGetters(["commodityStatusList"])
  },
  created() {
    this.$store.dispatch("commodity/getCommodityStatusList");
    this.$store.dispatch("commodity/getCommodityBrandList");
    this.$store.dispatch("commodity/getCarTypeList");
    this.fetchData();
  },
  methods: {
    getMaxConnectionList(type) {
      this.connectionLoading = true;
      getMaxConnectionList(this.page.getQueryParam())
        .then(resp => {
          this.list = resp.data.list;
          this.page.setTotal(resp.data.total);
        })
        .finally(() => {
          this.connectionLoading = false;
        });
    },

    getMaxInterestList() {
      this.interestLoading = true;
      getMaxInterestList(this.page.getQueryParam())
        .then(resp => {
          this.list = resp.data.list;
          this.page.setTotal(resp.data.total);
        })
        .finally(() => {
          this.interestLoading = false;
        });
    },

    fetchData() {
      this.page.unset();
      this.listLoading = true;

      getListByMerchantId({
        ...this.formInline,
        ...this.page.getQueryParam()
      })
        .then(resp => {
          this.list = resp.data.list;
          this.page.setTotal(resp.data.total);
        })
        .finally(() => {
          this.listLoading = false;
        });
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
      item.statusDesc = this.commodityStatusList.find(
        v => v.key === data.status
      ).label;
    }
  }
};
</script>
