<template>
  <a-layout class="main">
    <a-layout-sider  style="width: 180px; z-index: 50">
      <a-menu
        style="width: 180px !important; height: 100%"
        breakpoint="xl"
        v-model:selected-keys="selectedKeys"
        @menu-item-click="onMenuClick"
      >
        <a-menu-item  v-for="item in menus" :key="item.path">
          {{ item.name  }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content class="container p-4">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { setupPlugin } from "@/plugin/";

const router = useRouter();
const menus = computed(() => router.getRoutes().filter((item) => item.components));
const onMenuClick = (key: string) => {
  console.log(key);
  
  router.push(key)
};
const selectedKeys = ref(["/home"]);


setupPlugin();
</script>
<style scoped lang="less">
:deep(.arco-layout-sider-children) {
  width: 100%;
}
.main {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  & > .container {
    position: relative;
    height: 100%;
    width: 100%;
  }
}
</style>
