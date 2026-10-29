<script setup lang="ts">
import type { Dish } from '../types'
defineProps<{ dish: Dish }>()
</script>
<template>
  <RouterLink :to="`/dishes/${dish.id}`" class="dish-card group">
    <div class="dish-art">
      <img
        :src="dish.image"
        :alt="`${dish.name}示意插画`"
        loading="lazy"
        width="480"
        height="360"
      /><span class="image-label">测试菜品</span>
    </div>
    <div class="p-4">
      <p class="eyebrow">{{ dish.floor }} · {{ dish.stall }}</p>
      <h3 class="mt-1 text-lg font-bold">{{ dish.name }}</h3>
      <div class="my-3 flex flex-wrap gap-2">
        <span v-for="tag in dish.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="flex items-center justify-between gap-2">
        <span class="price">¥{{ dish.price }}<small> / 份</small></span
        ><span class="text-xs text-stone-500">暂无真实评分</span>
      </div>
      <p v-if="dish.status !== 'available'" class="mt-2 text-xs text-amber-800">
        暂停供应 · 模拟状态
      </p>
    </div>
  </RouterLink>
</template>
