<template>
  <el-popover v-model="visible" placement="top" width="160">

    <template v-if="mapData.key === 'WAIT_AUDIT'">
      <div>
        <p>新建商品上架申请</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="refused">拒绝</el-button>
          <el-button type="primary" size="mini" @click="pass">通过</el-button>
        </div>
      </div>
    </template>
    <template v-else-if="mapData.key === 'SELLING'">
      <div>
        <p>下架正在售卖中的商品</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible=false">取消</el-button>
          <el-button type="primary" size="mini" @click="soldOut">下架</el-button>
        </div>
      </div>
    </template>
    <el-button slot="reference" :type="mapData.type" :disabled="disabled">{{ mapData.label }}</el-button>
  </el-popover>
</template>

<script>
import { mapGetters } from 'vuex';
import { refused, pass, soldOut } from '@/api/operatorCommodity';
export default {
  name: 'ListStatus',
  props: {
    status: {
      type: String,
      required: true
    },
    commodityId: {
      type: Number || String,
      required: true
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    ...mapGetters([
      'commodityStatusList'
    ]),
    mapData() {
      debugger;
      const findtype = this.commodityStatusList.find(v => v.key === this.status);
      return findtype || {};
    },
    disabled() {
      const disabledStatus = ['NEW', 'AUDIT_REFUSED', 'MERCHANT_SOLD_OUT', 'MANAGER_SOLD_OUT'];
      return disabledStatus.indexOf(this.status) !== -1;
    }
  },
  methods: {
    refused() {
      this.visible = false;
      refused({ commodityId: this.commodityId }).then(resp => {
        console.log('pass');
        this.$emit('commodity-status-change', { id: this.commodityId, status: 'AUDIT_REFUSED' });
      });
    },
    pass() {
      this.visible = false;
      pass({ commodityId: this.commodityId }).then(resp => {
        console.log('pass');
        this.$emit('commodity-status-change', { id: this.commodityId, status: 'SELLING' });
      });
    },
    soldOut() {
      this.visible = false;
      soldOut({
        commodityId: this.commodityId
      }).then(resp => {
        console.log('refuse');
        this.$emit('commodity-status-change', { id: this.commodityId, status: 'OPERATOR_SOLD_OUT' });
      });
    }
  }
};
</script>

<style>
</style>
