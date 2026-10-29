<script setup lang="ts">
import { ref, toRaw, watch } from 'vue'
import { useTasteStore, tasteDimensions } from '../stores/taste'
import type { TasteProfile } from '../types'
const taste = useTasteStore()
const draft = ref<TasteProfile>(structuredClone(toRaw(taste.profile)))
const message = ref('')
watch(
  draft,
  () => {
    message.value = ''
  },
  { deep: true },
)
function save() {
  message.value = taste.save(toRaw(draft.value)) ? '口味已保存在当前浏览器。' : ''
}
function remove() {
  if (taste.remove()) {
    draft.value = structuredClone(toRaw(taste.profile))
    message.value = '已删除本地口味画像。'
  }
}
</script>
<template>
  <p class="eyebrow">YOUR TASTE, YOUR WAY</p>
  <h1 class="page-title">好吃，是很私人的事。</h1>
  <p class="intro">告诉我们你喜欢的味道。地域不决定口味，每一项都由你自己选择。</p>
  <form class="profile-form" @submit.prevent="save">
    <div v-for="dim in tasteDimensions" :key="dim.key" class="taste-row">
      <label :for="dim.key" class="flex justify-between font-semibold"
        >{{ dim.label }}
        <span class="text-orange-700">{{ draft.preferences[dim.key] }} / 5</span></label
      ><input
        :id="dim.key"
        v-model.number="draft.preferences[dim.key]"
        type="range"
        min="1"
        max="5"
        step="1"
      />
      <div class="flex justify-between text-xs text-stone-500">
        <span>{{ dim.low }}</span
        ><span>{{ dim.high }}</span>
      </div>
    </div>
    <label for="region" class="font-semibold"
      >地域信息 <span class="text-sm font-normal text-stone-500">（自愿填写）</span></label
    ><input
      id="region"
      v-model="draft.region"
      class="text-input mt-3"
      maxlength="30"
      placeholder="可以留空"
    />
    <p class="my-5 text-sm leading-7 text-stone-500">
      临时画像只存储在此浏览器，没有上传到服务器。清理浏览器数据会丢失；当前不生成推荐或预测评分。
    </p>
    <div class="flex flex-wrap gap-3">
      <button class="button" type="submit">保存我的口味</button
      ><button class="secondary-button" type="button" @click="remove">删除本地画像</button>
    </div>
    <p class="mt-4 text-sm text-green-800" role="status">{{ message }}</p>
    <p v-if="taste.error" class="text-sm text-red-700" role="alert">{{ taste.error }}</p>
  </form>
</template>
