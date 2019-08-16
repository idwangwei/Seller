<template>
  <div class="list-detail-componets">

    <el-button type="text" @click="dialogVisible = true">查看</el-button>

    <el-dialog title="商户详情" :visible.sync="dialogVisible">
      <el-row class="detail-row-item">
        <el-col :span="12">
          <el-row>
            <el-col :span="6">
              <div class="">商户名称：</div>
            </el-col>
            <el-col :span="18">
              <div class="">{{ itemData.name }}</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6">
              <div class="">商户地址：</div>
            </el-col>
            <el-col :span="18">
              <div class="">{{ itemData.address }}</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="detail-row-item">
        <el-col :span="12">
          <el-row>
            <el-col :span="6">
              <div class="">联系人：</div>
            </el-col>
            <el-col :span="18">
              <div class="">{{ itemData.linkman }}</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6">
              <div class="">电话：</div>
            </el-col>
            <el-col :span="18">
              <div class="">{{ itemData.phoneNum }}</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="detail-row-item">
        <el-col :span="12">
          <el-row>
            <el-col :span="6">
              <div class="">公司法人：</div>
            </el-col>
            <el-col :span="18">
              <div class="">{{ itemData.corporate }}</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6">
              <div class="">法人证件号：</div>
            </el-col>
            <el-col :span="18">
              <div class="">{{ itemData.corporateIdCard }}</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="detail-row-item">
        <el-col :span="12">
          <el-row>
            <el-col :span="6">
              <div class="">商户状态：</div>
            </el-col>
            <el-col :span="18">
              <div class="">{{ itemData.statusDesc }}</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6">
              <div class="">营业执照：</div>
            </el-col>
            <el-col :span="18">
              <div class="">
                <el-image style="width: 100px; height: 100px" :src="itemData.licenseUrl" :preview-src-list="srcList"></el-image>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CommodityItemDetail',
  props: {
    itemData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  computed: {
    srcList() {
      return [this.itemData.licenseUrl];
    }
  },
  methods: {
    showDetil() {

    }
  }
};
</script>

<style lang="scss" scoped>
.list-detail-componets{
  .detail-row-item{
    margin: 1rem auto;
  }
}
</style>>

