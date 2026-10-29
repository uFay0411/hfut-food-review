<script setup lang="ts">
import { computed } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { searchDemo } from '../services/demo'
import DishCard from '../components/DishCard.vue'
const catalog = useCatalogStore()
const results = computed(() => searchDemo(catalog.campusId))
</script>
<template>
  <p class="eyebrow">CAMPUS CANTEEN</p>
  <h1 class="page-title">逛逛校园食堂</h1>
  <p class="intro">从一扇窗口，找到今天想吃的那一口。</p>
  <template v-if="results.length"
    ><div class="canteen-banner my-6">
      <span class="canteen-icon" aria-hidden="true">食</span>
      <div>
        <h2 class="text-xl font-bold">示例食堂 A</h2>
        <p class="mt-2 text-sm text-stone-500">测试场景 · 一层 / 二层 · 所有价格均为模拟价格</p>
      </div>
    </div>
    <div class="dish-grid"><DishCard v-for="dish in results" :key="dish.id" :dish="dish" /></div
  ></template>
  <div v-else class="empty">该校区暂未开放，暂无食堂数据。</div>
</template>
