<template>
  <div class="list-detail-componets">
    <el-button type="text" @click="dialogVisible = true">查看</el-button>

    <el-dialog title="商品详情" :visible.sync="dialogVisible">
      <el-row v-for="(row, index) in items" :key="index" class="detail-row-item">
        <el-col v-for="(item, idx) in row" :key="idx" :span="12">
          <el-row>
            <el-col :span="6">
              <div class>{{ item.label }}：</div>
            </el-col>
            <el-col :span="18">
              <div class>{{ itemData[item.prop] }}</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="detail-row-item">
        <el-col :span="24">
          <el-row>
            <el-col :span="6">
              <div class>额外营销信息或商品说明：</div>
            </el-col>
            <el-col :span="18">
              <div class>{{ itemData.extraDesc }}</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="detail-row-item">
        <el-col :span="24">
          <el-row>
            <el-col :span="6">
              <div class>商品图片：</div>
            </el-col>
            <el-col :span="18">
              <div class>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="itemData.homePicUrl"
                  :preview-src-list="srcList"
                ></el-image>
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
    name: "CommodityItemDetail",
    props: {
        itemData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            dialogVisible: false,
            items: [
                [
                    { label: "商品标题", prop: "title" },
                    { label: "商品名称", prop: "productName" }
                ],
                [
                    { label: "品牌名称", prop: "brandName" },
                    { label: "适用车型", prop: "carTypeName" }
                ],
                [
                    { label: "收藏次数", prop: "collectTime" },
                    { label: "联系次数", prop: "connectionTime" }
                ],
                [
                    { label: "花纹深度", prop: "decorativeDeep" },
                    { label: "宽度", prop: "section" }
                ],
                [
                    { label: "花纹", prop: "decorativeName" },
                    { label: "商品状态", prop: "statusDesc" }
                ],
                [
                    { label: "轮廓直径", prop: "felloe" },
                    { label: "扁平比", prop: "flat" }
                ],
                [
                    { label: "审核上架时间", prop: "passTime" },
                    { label: "申请上架时间", prop: "putWayTime" }
                ],
                [
                    { label: "尺码规格", prop: "specification" },
                    { label: "速度级别", prop: "speedRank" }
                ],
                [
                    { label: "库存", prop: "stock" },
                    { label: "价格", prop: "price" }
                ],
                [
                    { label: "使用时间", prop: "usedTime" },
                    { label: "是否三包", prop: "warranty" }
                ]
            ]
        };
    },
    computed: {
        srcList() {
            if (this.itemData.imageUrlList) {
                return [...this.itemData.imageUrlList];
            } else {
                return [];
            }
        }
    },
    methods: {
        showDetil() {}
    }
};
</script>

<style lang="scss" scoped>
.list-detail-componets {
    .detail-row-item {
        margin: 1rem auto;
    }
}
</style>>

