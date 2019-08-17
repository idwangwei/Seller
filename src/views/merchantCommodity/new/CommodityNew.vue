<template>
  <div class="new-commodity-components">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="new-form">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="适用车型" prop="carType">
            <el-select v-model="form.carType" placeholder="请选择">
              <el-option v-for="item in carTypeList" :key="item.key" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="品牌" prop="brandId">
            <el-select v-model="form.brandId" placeholder="请选择">
              <el-option v-for="item in commodityBrandList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="花纹" prop="decorativeId">
            <el-select v-model="form.decorativeId" placeholder="根据品牌选择">
              <el-option v-for="item in decorativeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="花纹深度" prop="decorativeDeep">
            <el-input v-model="form.decorativeDeep"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="尺码规格" prop="specificationId">
            <el-select v-model="form.specificationId" placeholder="根据品牌选择">
              <el-option v-for="item in specificationList" :key="item.id" :label="item.specification" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="价格" prop="price">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="使用时长" prop="usedTime">
            <el-select v-model="form.usedTime" placeholder="请选择">
              <el-option v-for="item in usedTimeList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="库存" prop="stock">
            <el-input v-model="form.stock"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="速度级别" prop="speedRank">
            <el-input v-model="form.speedRank"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否三包" prop="warranty">
            <el-select v-model="form.warranty" placeholder="请选择">
              <el-option label="是" value="Y"></el-option>
              <el-option label="否" value="N"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="额外营销信息" prop="extraDesc">
        <el-input v-model="form.extraDesc" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item prop="homePicUrl" label="图片">
        <el-input ref="homePicUrl" v-model="form.homePicUrl" name="homePicUrl" type="text" style="display:none"></el-input>
        <el-upload :action="updateImgUri" list-type="picture-card" :file-list="updateFileList" :on-preview="handlePictureCardPreview" :on-success="handlePictureCardSuccess" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="previewUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-button :loading="loading" style="width:100%" type="primary" class="register-btn" @click.native.prevent="submit">{{this.formInit?'修改':'创建'}}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { async } from 'q';
import { getCommodityDecorativeList, getCommoditySpecificationList } from "@/api/commodity";
import { add } from "@/api/merchantCommodity";
export default {
  name: "ListDetail",
  props: {},
  data() {
    return {
      dialogVisible: false,
      // speedRankList:['A1'],
      form: {
        brandId: "", // 品牌
        carType: "", // 适用车型
        decorativeDeep: "", // 条纹深度
        decorativeId: "", // 条纹
        extraDesc: "", // 额外营销信息
        homePicUrl: "", // 首页展示图片
        imageUrlList: [], // 更多图片
        mediaUrl: "", // 视频地址
        price: "", // 价格
        specificationId: "", // 尺码规格
        speedRank: "", //
        stock: "", // 库存
        title: "", // 标题
        usedTime: "", // 使用时长
        warranty: "" // 是否三包'Y'/'N'
      },
      rules: {
        brandId: [{ required: true, message: "请选择品牌", trigger: "change" }],
        carType: [{ required: true, message: "请选择适用车型", trigger: "change" }],
        // decorativeDeep: [{ required: true, message: "请输入条纹深度", trigger: "blur" }],
        decorativeId: [{ required: true, message: "请选择花纹", trigger: "change" }],
        // extraDesc: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        homePicUrl: [{ required: true, message: "请至少上传一张首页图片", trigger: "blur" }],
        // mediaUrl: [{ required: false, message: "请输入活动名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        specificationId: [{ required: true, message: "请选择尺码规格", trigger: "change" }],
        // speedRank: [{ required: true, message: "请输入速度级别", trigger: "blur" }],
        stock: [{ required: true, message: "请输入库存数量", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        usedTime: [{ required: true, message: "请选择使用时长", trigger: "blur" }],
        warranty: [{ required: true, message: "请选择是否三包", trigger: "change" }]
      },
      previewUrl: "",
      loading: false,
      specificationList: [],
      usedTimeList: ['一年', '二年', '三年', '四年', '五年及以上'],
      decorativeList: [],
      updateFileList: []
    };
  },
  computed: {
    ...mapGetters(["carTypeList", "commodityBrandList"]),
    updateImgUri() {
      return `${process.env.VUE_APP_BASE_API}/open/file/upload`;
    }
  },
  watch: {
    'form.brandId': function (val, oldVal) {
      if (!val) {
        this.specificationList = [];
        this.decorativeList = [];
        return
      }
      getCommoditySpecificationList({ brandId: this.form.brandId }).then(resp => {
        this.specificationList = resp.data;
      });
      getCommodityDecorativeList({ brandId: this.form.brandId }).then(resp => {
        this.decorativeList = resp.data;
      });
    },
  },

  created() {
    !this.commodityBrandList && this.$store.dispatch("commodity/getCommodityBrandList");
    !this.carTypeList && this.$store.dispatch("commodity/getCarTypeList");
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          handleNew();
        }
      });
    },

    handleNew() {
      this.loading = true;
      add({ ...this.form, price: this.form.price * 100 }).then(resp => {
        this.loading = false;
        this.$refs.form.resetFields();
        this.$message({
          message: '创建成功',
          type: 'success'
        });
      })
    },

    handleRemove(file, fileList) {
      const idx = this.form.imageUrlList.findIndex(v => v.indexOf(file.data.filePath) !== -1);
      this.form.imageUrlList.splice(idex, 1);
      this.form.homePicUrl = this.form.imageUrlList[0];
      this.$refs.homePicUrl.blur();
    },

    handlePictureCardSuccess(file, fileList) {
      this.form.imageUrlList.push(`${process.env.VUE_APP_BASE_API}${file.data.filePath}`);
      this.form.homePicUrl = this.form.imageUrlList[0];
      this.$refs.homePicUrl.blur();
    },
    handlePictureCardPreview(file) {
      this.previewUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.new-commodity-components {
  .new-form {
    position: relative;
    width: 800px;
    max-width: 100%;
    padding: 54px 35px 0;
    margin: auto;
    overflow: hidden;
    /deep/ .el-select {
      width: 100%;
    }
  }
  padding-bottom: 2rem;
}
</style>>

