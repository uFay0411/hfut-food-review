<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getHealth } from '../services/api'
const state = ref<'loading' | 'ok' | 'error'>('loading')
async function check() {
  state.value = 'loading'
  try {
    await getHealth()
    state.value = 'ok'
  } catch {
    state.value = 'error'
  }
}
onMounted(check)
</script>
<template>
  <p class="eyebrow">MY SPACE</p>
  <h1 class="page-title">我的食鉴</h1>
  <div class="panel mt-6">
    <h2 class="text-lg font-bold">你好，校园探索者</h2>
    <p class="intro">当前以游客身份浏览。邮箱登录与服务端会话将在下一阶段接入，评价暂未开放。</p>
    <RouterLink to="/taste" class="button mt-5 inline-flex">管理临时口味画像 →</RouterLink>
  </div>
  <div class="panel mt-5">
    <h2 class="font-bold">服务连接状态</h2>
    <p class="mt-3 text-sm" role="status">
      {{
        state === 'loading'
          ? '正在连接 Worker…'
          : state === 'ok'
            ? 'Worker API 已连接 · 第一阶段基础服务'
            : '连接失败，请确认本地 Worker 已启动。'
      }}
    </p>
    <button v-if="state === 'error'" class="text-link mt-3" @click="check">重试连接</button>
  </div>
</template>
