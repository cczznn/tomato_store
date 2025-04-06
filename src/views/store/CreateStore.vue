<script setup lang="ts">
import {ref} from 'vue';
import {storeCreate, uploadStoreLogo} from "../../api/store.ts";

// 商店信息表单类型定义
interface StoreForm {
  name: string;
  address: string;
  phone: string;
  logo: string;
}

// 使用 ref 创建响应式表单
const storeForm = ref<StoreForm>({
  name: '',
  address: '',
  phone: '',
  logo: ''
});

// 上传文件时需要传递的额外数据
const uploadData = ref({
  // 你可以在这里传递一些额外的表单数据，例如商店的ID等
});

const customUpload = (uploadRequest: any) => {
  const file = uploadRequest.file;

  uploadStoreLogo(file)
      .then(res => {
        storeForm.value.logo = res.data.result;
        console.log('res :', storeForm.value.logo);
        ElMessage.success('上传成功！');
      })
      .catch(() => {
        ElMessage.error('上传异常！');
      });
};

// 限制图片格式，只允许 JPG 和 PNG 格式
const beforeLogoUpload = (file: File) => {
  const isValidFormat = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isValidFormat) {
    ElMessage.error('只能上传 JPG 或 PNG 格式的图片');
  }
  return isValidFormat;
};

// 提交表单数据并保存到 localStorage
const submitForm = () => {
  // 检查表单是否填写完整
  if (!storeForm.value.name || !storeForm.value.address || !storeForm.value.phone || !storeForm.value.logo) {
    ElMessage.error('请填写完整的商店信息（名称、地址、电话、Logo）');
    return;
  }

  storeCreate(storeForm.value)
      .then(res => {
        if (res.data.code === '000') {
          ElMessage.success('商店创建成功');
          // 重置表单数据
          storeForm.value = { name: '', address: '', phone: '', logo: '' };
        } else {
          ElMessage.error('创建失败：' + res.data.msg);
        }
      })
      .catch(error => {
        console.error('创建商店异常', error);
        ElMessage.error('创建商店异常');
      });
};
</script>

<template>
  <el-main>
    <el-form :model="storeForm" label-width="100px">
      <el-form-item label="商店名称">
        <el-input v-model="storeForm.name" placeholder="请输入商店名称"></el-input>
      </el-form-item>
      <el-form-item label="商店地址">
        <el-input v-model="storeForm.address" placeholder="请输入商店地址"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="storeForm.phone" placeholder="请输入商店电话"></el-input>
      </el-form-item>
      <el-form-item label="上传Logo">
        <el-upload
            class="upload-demo"
            :show-file-list="false"
            :http-request="customUpload"
            :before-upload="beforeLogoUpload"
            :data="uploadData"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <img v-if="storeForm.logo" :src="storeForm.logo" alt="商店Logo" style="width: 100px; margin-top: 10px" />
      </el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form>
  </el-main>
</template>

