<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { dishes } from '../services/demo'
const route = useRoute()
const dish = computed(() => dishes.find((d) => d.id === route.params.id))
</script>
<template>
  <RouterLink to="/" class="text-link">← 回到发现</RouterLink>
  <article v-if="dish" class="detail-layout mt-6">
    <img
      class="detail-image"
      :src="dish.image"
      :alt="`${dish.name}示意插画`"
      width="480"
      height="360"
    />
    <div>
      <span class="tag">测试数据 · 非真实食堂信息</span>
      <h1 class="page-title mt-4">{{ dish.name }}</h1>
      <p class="intro">翡翠湖校区 / {{ dish.canteen }} / {{ dish.floor }} / {{ dish.stall }}</p>
      <p class="price my-5">¥{{ dish.price }} <small>参考价（模拟）</small></p>
      <p class="text-xs text-stone-500">测试价格更新时间：{{ dish.priceUpdatedAt }}</p>
      <p class="my-5 leading-8 text-stone-600">{{ dish.description }}</p>
      <div class="flex gap-2">
        <span v-for="tag in dish.tags" :key="tag" class="tag">{{ tag }} · 示例标签</span>
      </div>
      <p class="mt-5 font-medium">
        {{ dish.status === 'available' ? '在售' : '暂停供应' }}（模拟状态）
      </p>
      <div class="mt-6 rounded-2xl bg-orange-50 p-5">
        <h2 class="font-bold">等待第一份真实体验</h2>
        <p class="mt-2 text-sm leading-7">
          真实评价 0 条，综合评分与感知口味数据不足。身份认证和审核上线后才会开放评价。
        </p>
      </div>
      <button class="button mt-5" disabled>评价暂未开放</button>
    </div>
  </article>
  <div v-else class="empty">
    <h1>没有找到这道菜</h1>
    <RouterLink to="/" class="text-link">返回首页</RouterLink>
  </div>
</template>
