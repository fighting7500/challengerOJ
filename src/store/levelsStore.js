import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLevelByKey, allLevels } from '@/levels'

export const useLevelStore = defineStore('useLevel', () => {
  const levelKey = ref('level1')
  const level = ref(allLevels[0])
  const setLevelKey = (levelKeyStr) => {
    console.log('levelStore更新了')
    if (levelKeyStr === '') {
      levelKeyStr = 'level1'
    }
    levelKey.value = levelKeyStr

    level.value = getLevelByKey(levelKey.value)
  }
  return {
    levelKey,
    level,
    setLevelKey
  }
})
