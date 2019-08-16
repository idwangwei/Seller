<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商户">
        <el-input v-model="formInline.user" placeholder="商户"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.region" placeholder="状态">
          <el-option v-for="item in commodityStatusList" :key="item.key" :label="item.label" :value="item.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      highlight-current-row
      border
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="商户名称" prop="name" width="180"></el-table-column>
      <el-table-column label="手机号码" prop="phoneNum" width="120"></el-table-column>
      <el-table-column label="联系人" prop="linkman" width="95"></el-table-column>
      <el-table-column label="法人" prop="corporate" width="95"></el-table-column>
      <el-table-column label="法人证件号" prop="corporateIdCard" width="200"></el-table-column>
      <el-table-column label="商户地址" prop="address"></el-table-column>
      <el-table-column label="商户状态" width="150">
        <template slot-scope="scope">
          <commodity-item-status
            :status="scope.row.status"
            :merchant-id="scope.row.id"
            @merchant-status-change="statusChange($event)"
          ></commodity-item-status>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <commodity-item-detail :item-data="scope.row"></commodity-item-detail>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="page.current"
        :page-sizes="page.sizeList"
        :page-size="page.size"
        :layout="layout"
        :total="page.total"
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/commodityTable";
import { Page } from "@/utils/page";
import CommodityItemDetail from "./CommodityItemDetail";
import CommodityItemStatus from "./CommodityItemStatus";
import { mapGetters } from "vuex";

export default {
    name: "CommodityTabel",
    components: { CommodityItemDetail, CommodityItemStatus },
    filters: {
        // statusFilter(status) {
        //   const statusMap = {
        //     published: 'success',
        //     draft: 'gray',
        //     deleted: 'danger'
        //   };
        //   return statusMap[status];
        // }
    },
    data() {
        return {
            list: null,
            listLoading: false,
            page: new Page(),
            layout: "total, sizes, prev, pager, next, jumper, slot"
        };
    },
    computed: {
        ...mapGetters(["commodityStatusList"])
    },
    created() {
        this.$store.dispatch("app/getCommodityStatusList");
        // this.fetchData();
    },
    methods: {
        fetchData() {
            this.listLoading = true;
            getList(this.page.getQueryParam())
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
