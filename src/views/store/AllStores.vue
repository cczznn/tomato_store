<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {router} from "../../router";
import {Store, storeListGet} from "../../api/store.ts";

// 使用 ref 创建一个响应式数据
const storesData = ref<Store[]>([]);

// 路由到对应商店页面，并且把StoreId传入
const goToStoreDetail = (storeId: number) => {
  router.push({ name: 'StoreDetail', params: { id: storeId } });
};


// 页面加载时获取商店数据
onMounted(() => {
  // 使用 storeListGet 调用后端接口
  storeListGet()
      .then(res => {
        // 假设后端返回的数据格式为 { data: Store[] }，根据实际情况调整
        storesData.value = res.data.result;
      })
      .catch(error => {
        console.error('获取商店列表失败', error);
      });
});
</script>

<template>
  <el-main class="all-stores">
    <el-table :data="storesData" style="width: 100%" height="600">
      <el-table-column prop="name" label="商店名称" width="180"></el-table-column>
      <el-table-column prop="address" label="商店位置" width="180"></el-table-column>
      <el-table-column prop="phone" label="联系方式" width="180"></el-table-column>

      <!-- 新增的列：展示商店的 logo -->
      <el-table-column label="商店 Logo">
        <template #default="{ row }">
          <el-image :src="row.logo" alt="商店 Logo" class="store-logo"></el-image>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="goToStoreDetail(row.id)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<style scoped>
.all-stores {
  width: 80%;
  display: flex;
  margin: auto;
}


.store-logo {
  width: 100px;
  height: 100px;
  object-fit: cover;  /* 保持比例并裁剪 */
}
</style>
