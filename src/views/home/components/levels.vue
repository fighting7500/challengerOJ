<script>
import mainLevels from '@/levels/mainLevels'
import customLevels from '@/levels/customLevels'
export default {
  name: 'SqlLevels',
  data() {
    return {
      mainLevels,
      customLevels
    }
  }
}
</script>
<template>
  <div id="levelsPage">
    <a-row :gutter="[16, 16]">
      <a-col :lg="12" :xs="24">
        <a-card title="主线关卡">
          <a-list item-layout="horizontal" :data-source="mainLevels">
            <template #renderItem="{ item: level, index }">
              <a-list-item>
                <a-list-item-meta :title="`${index + 1}、${level.title}`" />
                <template #actions>
                  <router-link :to="`/index/${level.key}`">
                    <a-button>挑战</a-button>
                  </router-link>
                </template>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
      <a-col :lg="12" :xs="24">
        <a-card title="自定义关卡">
          <a-list item-layout="horizontal" :data-source="customLevels">
            <template #renderItem="{ item: level }">
              <a-list-item>
                <a-list-item-meta :title="level.title" />
                <template #actions>
                  <router-link :to="`/index/${level.key}`">
                    <a-button>挑战</a-button>
                  </router-link>
                </template>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
