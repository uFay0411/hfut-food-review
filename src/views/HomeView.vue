<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCatalogStore } from '../stores/catalog'
import { searchDemo } from '../services/demo'
import DishCard from '../components/DishCard.vue'
const catalog = useCatalogStore()
const filter = ref('全部')
const filters = ['全部', '米饭', '面食', '小炒']
function resetFilters() {
  catalog.query = ''
  filter.value = '全部'
}
const results = computed(() =>
  searchDemo(catalog.campusId, catalog.query).filter(
    (d) => filter.value === '全部' || d.tags.includes(filter.value),
  ),
)
</script>
<template>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow text-orange-800">在工大，好好吃饭</p>
      <h1>今天这顿，<br />吃点<span>合口味的。</span></h1>
      <p class="mt-4 max-w-md text-sm leading-7 text-stone-600">
        从食堂的一扇窗口开始，发现校园里的好味道。<br
          class="hidden sm:block"
        />你的口味，值得被认真对待。
      </p>
      <RouterLink to="/taste" class="button mt-6 inline-flex"
        >画出我的口味 <span aria-hidden="true">↗</span></RouterLink
      >
      <p class="mt-3 text-xs text-stone-500">自愿填写 · 仅保存在当前浏览器</p>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <div class="orbit orbit-one"></div>
      <div class="orbit orbit-two"></div>
      <img src="/images/tomato.svg" alt="" width="480" height="360" /><span class="floating-note"
        >一日三餐，也要合拍。</span
      ><span class="visual-caption">美食示意插画</span>
    </div>
  </section>
  <section class="mt-8" aria-labelledby="search-heading">
    <h2 id="search-heading" class="sr-only">搜索校园美食</h2>
    <form class="search-box" @submit.prevent>
      <span aria-hidden="true">⌕</span
      ><input
        v-model="catalog.query"
        type="search"
        maxlength="80"
        placeholder="搜一道菜、一个窗口，或一间食堂"
        aria-label="搜索菜品、窗口或食堂"
      /><button v-if="catalog.query" type="button" @click="catalog.query = ''">清除</button
      ><button type="submit" class="search-submit">搜索</button>
    </form>
  </section>
  <section class="section-head">
    <div>
      <p class="eyebrow">CAMPUS CANTEEN</p>
      <h2>从食堂开始逛</h2>
    </div>
    <RouterLink to="/canteens" class="text-link"
      >查看食堂 <span aria-hidden="true">→</span></RouterLink
    >
  </section>
  <RouterLink v-if="catalog.campusId === 'feicuihu'" to="/canteens" class="canteen-banner"
    ><span class="canteen-icon" aria-hidden="true">食</span>
    <div>
      <h3 class="font-bold">示例食堂 A <span class="tag ml-2">测试场景</span></h3>
      <p class="mt-2 text-sm text-stone-500">2 个楼层 · 3 个示例窗口 · 等你来探索</p>
    </div>
    <span class="ml-auto text-xl" aria-hidden="true">↗</span></RouterLink
  >
  <p v-else class="empty">这个校区尚未开放，先去翡翠湖校区看看测试页面吧。</p>
  <section class="section-head">
    <div>
      <p class="eyebrow">A LITTLE INSPIRATION</p>
      <h2>
        {{ catalog.query ? '搜索结果' : '今天吃什么'
        }}<span class="ml-2 text-xs font-normal text-stone-500">模拟菜品</span>
      </h2>
    </div>
    <span class="text-xs text-stone-500">热门榜将在有真实评价后开放</span>
  </section>
  <div class="mb-5 flex gap-2" role="group" aria-label="按餐食类型筛选">
    <button
      v-for="item in filters"
      :key="item"
      :aria-pressed="filter === item"
      :class="['filter-chip', { selected: filter === item }]"
      @click="filter = item"
    >
      {{ item }}
    </button>
  </div>
  <div v-if="results.length" class="dish-grid">
    <DishCard v-for="dish in results" :key="dish.id" :dish="dish" />
  </div>
  <div v-else class="empty" role="status">
    <h3>暂时没找到这道好味道</h3>
    <p>换个关键词，或选择其他分类试试。</p>
    <button class="text-link mt-3" @click="resetFilters">清空筛选</button>
  </div>
  <section class="section-head">
    <div>
      <p class="eyebrow">AROUND THE TABLE</p>
      <h2>食堂新鲜事</h2>
    </div>
    <span class="tag">评价展示示例</span>
  </section>
  <div class="review-example">
    <div class="avatar" aria-hidden="true">例</div>
    <div>
      <h3 class="font-semibold">示例评价 · 非真实用户内容</h3>
      <p class="mt-2 text-sm leading-7 text-stone-600">“番茄的酸甜很适合我的口味。”</p>
      <p class="mt-2 text-xs text-stone-500">
        仅预览评价排版，不参与评分与推荐。当前真实公开评价为 0 条。
      </p>
    </div>
  </div>
</template>
