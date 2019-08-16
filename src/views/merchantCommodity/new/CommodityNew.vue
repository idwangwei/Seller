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
              <el-option v-for="item in carTypeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="品牌" prop="brandId">
            <el-select v-model="form.brandId" placeholder="请选择">
              <el-option v-for="item in commodityBrandList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="花纹" prop="decorativeId">
            <el-input v-model="form.decorativeId"></el-input>
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
            <el-input v-model="form.specificationId"></el-input>
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
          <el-form-item label="使用年限" prop="usedTime">
            <el-input v-model="form.usedTime"></el-input>
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
      <el-form-item label="额外影响信息" prop="extraDesc">
        <el-input v-model="form.extraDesc" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item prop="extraDesc" label="图片">
        <el-input ref="extraDesc" v-model="form.extraDesc" name="extraDesc" type="text" style="display:none"></el-input>
        <el-upload :action="updateImgUri" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success="handlePictureCardSuccess" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="previewUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-button :loading="loading" style="width:100%" type="primary" class="register-btn" @click.native.prevent="handleNew">创建</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ListDetail',
  props: {},
  data() {
    return {
      dialogVisible: false,
      // speedRankList:['A1'],
      form: {
        brandId: '', //品牌
        carType: "", //适用车型
        decorativeDeep: '', //条纹深度
        decorativeId: '', //条纹
        extraDesc: "", //额外营销信息
        homePicUrl: "", //首页展示图片
        imageUrlList: [], //更多图片
        mediaUrl: "", //视频地址
        price: '', //价格
        specificationId: '', //尺码规格
        speedRank: "", //
        stock: '', //库存
        title: "", //标题
        usedTime: "", //使用时长
        warranty: "", //是否三包'Y'/'N'
      },
      rules: {
        brandId: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        carType: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        decorativeDeep: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        decorativeId: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        extraDesc: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        homePicUrl: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        mediaUrl: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        specificationId: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        speedRank: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        stock: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        usedTime: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        warranty: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      previewUrl: '',
      loading: false
    };
  },
  computed: {
    ...mapGetters(['carTypeList', 'commodityBrandList']),
    updateImgUri() {
      return `${process.env.VUE_APP_BASE_API}/open/file/upload`;
    }
  },
  methods: {
    handleNew() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    handleRemove(file, fileList) {
      this.form.extraDesc = "";
      this.$refs.licenseUrl.blur();
    },
    handlePictureCardSuccess(file, fileList) {
      this.form.extraDesc = `${process.env.VUE_APP_BASE_API}${file.data.filePath}`;
      this.form.imageUrlList = fileList.map(file => `${process.env.VUE_APP_BASE_API}${file.data.filePath}`);
      this.$refs.licenseUrl.blur();
    },
    handlePictureCardPreview(file) {
      this.previewUrl = file.url;
      this.dialogVisible = true;
    },
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
    overflow: hidden;
    /deep/ .el-select{
      width: 100%;
    }
  }
  padding-bottom: 2rem;
}
</style>>

