<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CreateProduct from "../product/CreateProduct.vue";
import {Store, storeGetById} from "../../api/store.ts";
import {productListGet} from "../../api/product.ts";

// 使用ref来存储商店信息
const store = ref<Store | null>(null);
// const role = sessionStorage.getItem('role')
const roleStoreId = sessionStorage.getItem('storeId');

// 获取当前路由的参数
const route = useRoute();
const storeId = Number(route.params.id);

const products = ref<any[]>([]);

// 获取商店 ID

onMounted(() => {

  storeGetById(storeId)
      .then((res) => {
        if (res.data.code === '000') {
          store.value = res.data.result;
        } else {
          ElMessage.error('获取商店数据失败');
        }
      })
      .catch((error) => {
        console.error('获取商店数据异常', error);
        ElMessage.error('获取商店数据异常');
      });

  loadProducts();
  console.log(store.value);

});

const loadProducts = () => {
  console.log(storeId);
  productListGet(storeId)
      .then(res => {
        console.log(res);
        if (res.data.code === '000') {
          products.value = res.data.result;
        } else {
          ElMessage.error('获取产品数据失败');
        }
      })
      .catch(error => {
        console.error('获取产品数据异常', error);
        ElMessage.error('获取产品数据异常');
      });
};

//  获取组件实例
const createProductDialog = ref<InstanceType<typeof CreateProduct> | null>(null);

//  调用 `CreateProduct` 组件的 `open()` 方法
const openCreateProductDialog = () => {
  console.log("打开商品创建弹窗");
  createProductDialog.value?.open();
};
</script>

<template>
  <el-main class="main-container" v-if="store">
    <el-card class="store-card">
      <!-- 商店logo -->
      <div class="logo-container">
        <img :src="store.logo" alt="商店logo" />
      </div>

      <!-- 商店名称 -->
      <h2>{{ store.name }}</h2>

      <!-- 商店信息 -->
      <el-descriptions :column="1" border>
        <el-descriptions-item label="地址">
          {{ store.address }}
        </el-descriptions-item>
        <el-descriptions-item label="电话">
          {{ store.phone }}
        </el-descriptions-item>
      </el-descriptions>

      <!-- 添加商品按钮 -->
      <div class="add-product-button">
        <el-button v-if="roleStoreId === String(storeId)" type="primary" @click="openCreateProductDialog">添加商品</el-button>
      </div>
    </el-card>

    <el-card class="product-card" v-if="products.length">
        <h3>商品列表</h3>
        <el-card v-for="product in products" :key="product.id" class="product-list">
          <h4>{{ product.name }}</h4>
          <p>{{ product.description }}</p>
          <p>价格：￥{{ product.price }}</p>
        </el-card>
    </el-card>

    <CreateProduct
        :storeId="storeId"
        ref="createProductDialog"
        v-if="roleStoreId === String(storeId)"
        @product-Added="loadProducts"
    />
  </el-main>
  <div v-else>
    <p>商店信息加载失败或未找到。</p>
  </div>

</template>

<style scoped>

.main-container{
  display: flex;
  flex-direction: row;
  padding: 15px;
  gap: 5px;
  justify-content: center;
}

.store-card {
  width: 20%;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
}

.logo-container {
  text-align: center;
  margin-bottom: 15px;
}

.logo-container img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

h2 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bolder;
  margin-bottom: 10px;
}


.add-product-button {
  text-align: center;
  margin-top: 20px;
}

.product-card {
  width: 60%;
}

.product-list {
  height: 100%;
}
</style>


点击商店进入详情页，内有各个商品的展示列表
对于商店所属员工，应该开放创建商品界面（包含名称价格等）