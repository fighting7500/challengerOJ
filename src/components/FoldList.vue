<!--
 * @Author: 17197
 * @Date: 2024/3/28
 * @Description: FoldList.vue
 * @Version: 1.0
 * @Last Modified time : 2024/3/28
-->
<script setup>
import { ref } from 'vue'

const isWrap = ref(false)
defineProps({
    isQuestion: {
        type: Boolean,
        default: false
    },
    categoryList: {
        type: Array,
        default: () => []
    }
})
</script>

<template>
    <div class="tags">
        <div class="reactive" :style="{ flexWrap: isWrap ? 'wrap' : 'nowrap' }">
            <div class="tag" v-for="item in categoryList" :key="item.id" @click="() => getDetail(item)">
                <a href="">
                    <span>{{ item.name }}</span>
                    <span>{{ item.count }}</span>
                </a>
            </div>
        </div>
        <div class="end" :style="{ bottom: isQuestion ? '8px' : '10px' }" @click="() => (isWrap = !isWrap)" v-if="categoryList.length > 10">
            <span class="end-start" :style="{ backgroundImage: 'linear-gradient(to left, #f5f5f5, #fff0)' }"></span>
            <span class="end-end" :style="{ backgroundColor: '#fff' }">
                <span>{{ isWrap ? '收起' : '展开' }}</span>
                <i class="iconfont" :class="isWrap ? 'icon-chevronsup' : 'icon-chevronsdown'"></i>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tags {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;

    .reactive {
        overflow: hidden;
        display: flex;

        .tag {
            margin: 10px;
            margin-left: 0;
            display: flex;
            align-items: center;
            font-size: 14px;

            a {
                white-space: nowrap;
            }

            span:nth-child(2) {
                padding: 0 4px;
                margin-left: 5px;
                color: #3c3c4399;
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                background-color: #000a200d;
                border-radius: 10px;
            }
        }
    }

    .end {
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        align-self: flex-end;
        color: #3c3c4399;
        z-index: 1;

        .end-start {
            z-index: 2;
            width: 20px;
            height: 20px;
        }

        .end-end {
            height: 20px;
            font-weight: 400;
            display: flex;
            align-items: center;
            cursor: pointer;
        }
    }
}
</style>
