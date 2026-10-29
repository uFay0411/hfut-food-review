<script setup lang="ts">
import { campuses } from './services/demo'
import { useCatalogStore } from './stores/catalog'
const catalog = useCatalogStore()
const navigation = [
  { to: '/', icon: '⌂', label: '发现' },
  { to: '/canteens', icon: '▤', label: '食堂' },
  { to: '/taste', icon: '♡', label: '口味' },
  { to: '/me', icon: '◎', label: '我的' },
]
</script>
<template>
  <a class="skip-link" href="#main">跳到主要内容</a>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink to="/" class="brand" aria-label="工大食鉴首页"
        ><span class="brand-mark" aria-hidden="true">食</span
        ><span
          ><strong>工大食鉴<span class="brand-dot">.</span></strong
          ><small>HFUT FOOD REVIEW</small></span
        ></RouterLink
      >
      <nav class="desktop-nav" aria-label="主导航">
        <RouterLink v-for="item in navigation" :key="item.to" :to="item.to">{{
          item.label
        }}</RouterLink>
      </nav>
      <label class="campus-select"
        ><span class="sr-only">选择校区</span><span aria-hidden="true">⌖</span
        ><select v-model="catalog.campusId">
          <option v-for="campus in campuses" :key="campus.id" :value="campus.id">
            {{ campus.name }}
          </option>
        </select></label
      >
    </div>
  </header>
  <div class="stage-notice">
    <span class="notice-dot" aria-hidden="true"></span>开发预览 ·
    菜品、价格与评价均为测试数据，非真实食堂信息
  </div>
  <main id="main" class="page-shell" tabindex="-1"><RouterView /></main>
  <footer class="site-footer">
    <span>工大食鉴 · 认真对待每一餐</span><span>第一阶段开发预览 · 暂未开放真实评价</span>
  </footer>
  <nav class="bottom-nav" aria-label="移动端主导航">
    <RouterLink v-for="item in navigation" :key="item.to" :to="item.to"
      ><span aria-hidden="true">{{ item.icon }}</span
      >{{ item.label }}</RouterLink
    >
  </nav>
</template>
