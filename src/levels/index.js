import mainLevels from './mainLevels'
import customLevels from './customLevels'

// 全部关卡
export const allLevels = [...mainLevels, ...customLevels]

// 根据关卡key获取关卡
export const getLevelByKey = (levelKey) => {
  return allLevels.find((level) => level.key === levelKey) || allLevels[0]
}

// 获取当前关卡位置
export const getCurrentLevelNum = (currentLevel) => {
  return allLevels.findIndex((level) => level.key === currentLevel)
}

// 上一关
export const getPrevLevel = (currentLevel) => {
  const num = getCurrentLevelNum(currentLevel)
  console.log('当前关卡位置：', num)
  if (num <= 0) {
    return
  }
  return allLevels[num - 1]
}

// 下一关
export const getNextLevel = (currentLevel) => {
  const num = getCurrentLevelNum(currentLevel)
  if (num >= allLevels.length - 1) {
    return
  }
  return allLevels[num + 1]
}
