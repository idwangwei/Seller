<template>
  <el-popover v-model="visible" placement="top" width="160">

    <template v-if="mapData.key === 'WAIT_AUDIT'">
      <div>
        <p>处理商户申请</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="refuse">拒绝</el-button>
          <el-button type="primary" size="mini" @click="pass">通过</el-button>
        </div>
      </div>
    </template>
    <template v-else-if="mapData.key === 'AUDIT_REFUSED'">
      <div>
        <p>通过商户申请</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible=false">取消</el-button>
          <el-button type="primary" size="mini" @click="pass">通过</el-button>
        </div>
      </div>
    </template>
    <template v-else-if="mapData.key === 'AUDIT_PASS'">
      <div>
        <p>封禁商户</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible=false">取消</el-button>
          <el-button type="primary" size="mini" @click="banner">封禁</el-button>
        </div>
      </div>
    </template>
    <template v-else-if="mapData.key === 'BANNED'">
      <div>
        <p>允许商户运营</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible=false">取消</el-button>
          <el-button type="primary" size="mini" @click="pass">允许</el-button>
        </div>
      </div>
    </template>
    <el-button slot="reference" :type="mapData.type">{{ mapData.label }}</el-button>
  </el-popover>
</template>

<script>
import { mapGetters } from 'vuex';
import { refuse, pass, banner } from '@/api/merchantTable';
export default {
  name: 'ListStatus',
  props: {
    status: {
      type: String,
      required: true
    },
    merchantId: {
      type: String,
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
      'statusList'
    ]),
    mapData() {
      const findtype = this.statusList.find(v => v.key === this.status);
      return findtype || {};
    }
  },
  methods: {
    pass() {
      this.visible = false;
      pass({ merchantId: this.merchantId }).then(resp => {
        console.log('pass');
        this.$emit('merchant-status-change', { id: this.merchantId, status: 'AUDIT_PASS' });
      });
    },
    refuse() {
      this.visible = false;
      refuse({
        merchantId: this.merchantId,
        reason: '拒绝没商量'
      }).then(resp => {
        console.log('refuse');
        this.$emit('merchant-status-change', { id: this.merchantId, status: 'AUDIT_REFUSED' });
      });
    },
    banner() {
      this.visible = false;
      banner({
        merchantId: this.merchantId,
        reason: '封禁没商量'
      }).then(resp => {
        console.log('refuse');
        this.$emit('merchant-status-change', { id: this.merchantId, status: 'BANNED' });
      });
    }

  }
};
</script>

<style>
</style>
