<template>
  <div class="h-full flex-col flex font-500">
    <a-split
      :style="{
        height: '100%',
        width: '100%',
      }"
      :max="0.8"
      :min="0.2"
    >
      <template #first>
        <div class="py-4">
          <div class="mb-4">使用 cURL2Func 提供的变量，自定义模板代码</div>
          <div class="pr-4 flex">
            <a-space
              class="border border-dashed border-blue-200 w-full p-2 flex flex-wrap"
            >
              <a-button status="success" class="mb-2">Method</a-button>
              <a-button status="success" class="mb-2">Url</a-button>
              <a-button status="success" class="mb-2">Params</a-button>
              <a-button status="success" class="mb-2">ParamsType</a-button>
              <a-button status="success" class="mb-2">FunctionName</a-button>
            </a-space>
          </div>
          <Codemirror
            :options="{ mode: 'text/javascript' }"
            border
            ref="cmRef"
            height="400"
            width="600"
          >
          </Codemirror>
        </div>
      </template>
      <template #second>
        <a-split direction="vertical" style="height: 70%">
          <template #first>
            <div class="h-full">
              <a-textarea
                placeholder="复制 cURL 到此处"
                allow-clear
                v-model="curlStr"
                class="h-full"
              />
            </div>
          </template>
          <template #second> </template>
        </a-split>
      </template>
    </a-split>
  </div>
</template>

<script lang="ts" setup>
import "codemirror/mode/javascript/javascript.js";
import Codemirror from "codemirror-editor-vue3";
import { ref } from "vue";
const curlStr = ref("");
</script>

<style scoped lang="less"></style>
