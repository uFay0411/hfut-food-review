import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCatalogStore = defineStore('catalog', () => {
  const campusId = ref('feicuihu')
  const query = ref('')
  return { campusId, query }
})
