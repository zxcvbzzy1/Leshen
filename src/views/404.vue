<script setup>
import router from "@/router";
import {theme} from "ant-design-vue";
</script>

<template>
<div class="imgBox">
  <img class="img-fluid" src="/public/404.png" style="width: 40%;">
  <a-typography-title type="secondary" level="4">你访问的页面尚不存在</a-typography-title>
  <a-config-provider
      :theme="{
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary: '#0cbeb1',
      },
    }"
  >
  <a-button type="primary" @click="()=>{ router.go(-1)}" size="large">返回上一页</a-button>
  </a-config-provider>
</div>
</template>

<style scoped>
.imgBox{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>