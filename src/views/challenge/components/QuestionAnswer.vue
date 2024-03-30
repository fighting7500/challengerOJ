<!--
 * @Author: 17197
 * @Date: 2024/3/28
 * @Description: QuestionAnswer.vue
 * @Version: 1.0
 * @Last Modified time : 2024/3/28
-->
<script setup>
import FoldList from '@/components/FoldList.vue'

const adoptionList = [
    { value: '1', lable: '点赞最多' },
    { value: '2', lable: '热度最高' },
    { value: '3', lable: '最新发布' },
    { value: '4', lable: '最早发布' }
]
const handleSelect = (value) => {
    console.log(value)
}

const names = ['Socrates', 'Balzac', 'Plato']
const avatarSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp'
]
const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp'
]
const dataSource = new Array(15).fill(null).map((_, index) => {
    return {
        index: index,
        avatar: avatarSrc[index % avatarSrc.length],
        title: names[index % names.length],
        description:
            'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
        imageSrc: imageSrc[index % imageSrc.length]
    }
})

const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `Total ${total} items`
}

const reachBootom = () => {
    console.log('reach bottom')
}
</script>

<template>
    <div class="answer">
        <a-input :style="{ width: '100%' }" placeholder="Please enter something" allow-clear>
            <template #prefix>
                <icon-search />
            </template>
            <!--<template #suffix>-->
            <!--    <a-select :unmount-on-close="true">-->
            <!--        <template #label="{ data }">-->
            <!--               <a-button type="text">-->
            <!--                    <i class="iconfont icon-paixu"></i>-->
            <!--                    排序-->
            <!--                </a-button>-->
            <!--            </template>-->
            <!--        <a-option v-for="item in adoptionList" :value="item.value" :key="item.value">{{ item.lable }}</a-option>-->
            <!--    </a-select>-->
            <!--</template>-->
        </a-input>
        <fold-list />
        <div class="publish-solution">
            <div class="publish-solution-left">
                <!--                <a-button>-->
                <!--                    <template #icon>-->
                <icon-edit />
                <!--                    </template>-->
                <!--                </a-button>-->
                <span>你需要先通过题目才能发布题解</span>
            </div>
            <a-button status="success" shape="round" size="mini">
                <template #icon>
                    <icon-pen />
                </template>
                发布题解
            </a-button>
        </div>
        <!--列表-->
        <a-list class="list-demo-action-layout" :bordered="false" :data="dataSource" max-height="65vh" @reach-bottom="reachBootom" :bottom-offset="20">
            <template #item="{ item }">
                <a-list-item class="list-demo-item" action-layout="vertical">
                    <template #actions>
                        <span><icon-heart />83</span>
                        <span><icon-star />{{ item.index }}</span>
                        <span><icon-message />Reply</span>
                    </template>
                    <a-list-item-meta :title="item.title" :description="item.description">
                        <template #avatar>
                            <a-avatar shape="circle">
                                <img alt="avatar" :src="item.avatar" />
                            </a-avatar>
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>

<style scoped lang="scss">
.answer {
    padding: 0 20px;
    height: 100%;
}
.publish-solution {
    margin-top: 20px;
    padding: 5px 15px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    .publish-solution-left {
        span {
            margin-left: 10px;
        }
    }
}
.list-demo-action-layout {
    margin-top: 20px;
}
.list-demo-action-layout .list-demo-item {
    padding: 20px 0;
    border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
    width: 100%;
}
.list-demo-action-layout .arco-list-item-action .arco-icon {
    margin: 0 4px;
}
</style>
