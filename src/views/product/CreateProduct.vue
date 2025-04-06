<script setup lang="ts">
import { ref, defineProps, defineExpose } from 'vue';
import { ElMessage } from 'element-plus';
import {createEmptyProduct, Product, productCreate} from "../../api/product.ts";

// 接收 storeId
const props = defineProps({
  storeId: {
    type: Number,
    required: true
  }
});

// 使用 ref 直接管理 `visible`
const visible = ref(false);

// 让父组件可以调用 `open()` 方法
const open = () => {
  console.log("打开商品添加弹窗");
  visible.value = true;
};

// 关闭弹窗
const handleClose = () => {
  visible.value = false;
};

// 商品信息
const product = ref<Product>(createEmptyProduct(props.storeId));

const emit = defineEmits<{
  (event: 'productAdded'): void;
}>();

// 提交商品信息
const handleSubmit = () => {
  if (!product.value.name || !product.value.price || !product.value.storeId) {
    ElMessage.error('商品名称、价格和商店为必填项');
    return;
  }

  productCreate(product.value)
      .then(res => {
        // 假设后端返回格式为 { code: '000', msg: null, result: ... }
        if (res.data.code === '000') {
          ElMessage.success('商品添加成功');
          handleClose();
          emit('productAdded');
        } else {
          ElMessage.error('添加商品失败: ' + res.data.msg);
        }
      })
      .catch(error => {
        console.error('添加商品异常', error);
        ElMessage.error('添加商品异常');
      });
};

// 让父组件可以访问 `open()`
defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="添加商品" @close="handleClose">
    <el-form :model="product" ref="formRef" label-width="80px">
      <el-input v-model="product.storeId" type="text" style="display: none"></el-input>
      <el-form-item label="商品名称">
        <el-input v-model="product.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="product.price" placeholder="请输入商品价格" type="number"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="product.description" placeholder="请输入商品描述"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>
