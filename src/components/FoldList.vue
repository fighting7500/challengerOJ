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
</script>

<template>
    <div class="tags">
        <div class="reactive" :style="{ flexWrap: isWrap ? 'wrap' : 'nowrap' }">
            <div class="tag" v-for="(index, item) in 50" :key="index" @click="() => getDetail(item)">
                <a href="">
                    <span>数组</span>
                    <span>928</span>
                </a>
            </div>
        </div>
        <div class="end" @click="() => (isWrap = !isWrap)">
            <span class="end-start"></span>
            <span class="end-end">
                <span>展开</span>
                <i class="iconfont" :class="isWrap ? 'icon-chevronsup' : 'icon-chevronsdown'"></i>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tags {
    display: flex;
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
        bottom: 10px;
        display: flex;
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
            background-color: #f3f9fb;
        }
    }
}
</style>
