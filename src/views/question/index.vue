<script setup>
import { ref, reactive, onMounted, computed, watchEffect } from 'vue'
import FoldList from '@/components/FoldList.vue'
import { apiCategories, apiGetProblemList, apiGetSources, apiGetStatistics, apiGetRankList } from '@/api/question.js'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/store/userStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const query = ref({
    source: '',
    level: '',
    status: '',
    tag: ''
})
let categoryList = ref([])
let data = ref([])
const isLogin = computed(() => userStore.isLogin)

// 获取分类列表
const getCategoryList = async () => {
    const res = await apiCategories({ admin: 0 })
    if (res.status !== 200) {
        Message.error(res.msg)
        return
    }
    categoryList.value = res.data.Rows
}
// 获取题目列表
const getQuestionList = async () => {
    const res = await apiGetProblemList({
        pageNum: pagination.value.current,
        pageSize: pagination.value.pageSize,
        problemName: input4.value,
        categoryId: query.value.tag,
        difficulty: query.value.level,
        userID: userStore.userInfo?.id,
        sourceId: query.value.source,
        status: query.value.status
    })
    if (res.status !== 200) {
        Message.error(res.msg)
        return
    }
    data.value = res.data.Rows
    pagination.value.total = res.data.total
}

const search = (categoryId) => {
    pagination.value.current = 1
    query.value.tag = categoryId
    getQuestionList()
}
const input4 = ref('')
const sourceList = ref([])
const getSources = async () => {
    const res = await apiGetSources()
    if (res.status !== 200) {
        Message.error(res.msg)
        return
    }
    sourceList.value = res.data
}
const levelList = reactive([
    { value: 'easy', label: '简单' },
    { value: 'medium', label: '中等' },
    { value: 'hard', label: '困难' }
])
const statusList = reactive([
    { value: '0', label: '未开始' },
    { value: '1', label: '未通过' },
    { value: '2', label: '已完成' }
])
const columns = [
    { title: '状态', dataIndex: 'status', key: 'status', width: '80', slotName: 'status', align: 'center' },
    { title: '题目', dataIndex: 'name', key: 'name', slotName: 'name', width: '180' },
    { title: '题解', dataIndex: 'solution', key: 'solution', width: '80', align: 'center' },
    { title: '通过率', dataIndex: 'pass_rate', key: 'pass_rate', width: '80', align: 'center' },
    {
        title: '难度',
        dataIndex: 'difficulty',
        key: 'difficulty',
        width: '100',
        slotName: 'difficulty',
        align: 'center'
    },
    { title: '人数', dataIndex: 'user_count', key: 'user_count', width: '80', align: 'center' }
]
const pagination = ref({
    pageSize: 10,
    current: 1,
    total: 0,
    showTotal: true,
    showPageSize: true,
    pageSizeOptions: [10, 20, 50, 100],
    showJumper: true
})
const userStatistics = ref({
    passRate: 0,
    problemCount: 0,
    totalTime: 0
})
const getStatistics = async () => {
    const res = await apiGetStatistics({ userId: userStore.userInfo.id })
    if (res.status !== 200) {
        Message.error(res.msg)
        return
    }
    userStatistics.value = res.data
}
const rankList = ref([])
const getRankList = async () => {
    const res = await apiGetRankList()
    if (res.status !== 200) {
        Message.error(res.msg)
        return
    }
    rankList.value = res.data
}

const toDetail = (id) => {
    router.push({ name: '挑战', params: { id } })
}

watchEffect(() => {
    if (isLogin.value) {
        getStatistics()
    }
})
onMounted(() => {
    getCategoryList()
    getQuestionList()
    getSources()
    getRankList()
})
</script>

<template>
    <div ref="background" class="back-ground-container">
        <div class="container">
            <a-row justify="space-between" align="middle">
                <a-col :span="8" class="head-left">
                    <div>
                        <b>编程闯关</b>
                        <div>CodeChallenger等你来战</div>
                    </div>
                </a-col>
                <a-col :span="6" class="head-right">
                    <img src="../../assets/challger.png" alt="" />
                </a-col>
            </a-row>
            <a-row class="content" justify="space-between">
                <a-col :span="17" class="content-left">
                    <a-row>
                        <a-col>
                            <fold-list :isQuestion="true" :categoryList="categoryList" @searchComponent="(categoryId) => search(categoryId)" />
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col style="display: flex; gap: 10px; margin: 10px 0">
                            <a-select v-model="query.source" placeholder="来源" style="width: 130px" @change="() => search()" allow-clear>
                                <a-option v-for="item in sourceList" :key="item.id" :label="item.name" :value="item.id" />
                            </a-select>
                            <a-select v-model="query.level" placeholder="难度" style="width: 100px" @change="() => search()" allow-clear>
                                <a-option v-for="item in levelList" :key="item.value" :label="item.label" :value="item.value" />
                            </a-select>
                            <a-select v-model="query.status" placeholder="状态" style="width: 100px" :disabled="!isLogin" @change="() => search()" allow-clear>
                                <!--                                <template #option>12</template>-->
                                <a-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></a-option>
                            </a-select>
                            <!--<a-select v-model="query.tag" placeholder="标签" style="width: 100px" @change="() => search()" allow-clear>-->
                            <!--<a-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />-->
                            <!--</a-select>-->
                            <a-input v-model="input4" style="width: 160px" placeholder="搜索题目" size="small">
                                <template #prefix>
                                    <i class="iconfont icon-sousuo"></i>
                                </template>
                            </a-input>
                        </a-col>
                        <a-col style="display: flex; flex-direction: column; align-items: center">
                            <a-table class="table" :columns="columns" :data="data" :pagination="pagination" style="width: 100%" :bordered="false">
                                <template #name="{ record }">
                                    <a href="#" @click="toDetail(record.id)">{{ record.name }}</a>
                                </template>
                                <template #difficulty="{ record }">
                                    <a-tag :color="record.difficulty === 'easy' ? 'green' : record.difficulty === 'medium' ? 'orange' : 'red'">
                                        {{ record.difficulty === 'easy' ? '简单' : record.difficulty === 'medium' ? '中等' : '困难' }}
                                    </a-tag>
                                </template>
                            </a-table>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="6" :offset="1" style="position: sticky; top: 20px">
                    <div class="analyst">
                        <img src="../../assets/analyst.png" />
                        <div>
                            <h3>我的刷题统计</h3>
                        </div>
                        <div class="analyst-flex">
                            <div class="statistics">
                                <div class="num">{{ userStatistics.passRate || 0 }}</div>
                                <div class="span">通过率(%)</div>
                            </div>
                            <div class="statistics">
                                <div class="num">{{ userStatistics.problemCount || 0 }}</div>
                                <div class="span">刷题数</div>
                            </div>
                            <div class="statistics">
                                <div class="num">{{ userStatistics.totalTime || 0 }}</div>
                                <div class="span">累计时长(h)</div>
                            </div>
                        </div>
                    </div>
                    <div class="ranking">
                        <img src="../../assets/ranking.png" alt="" />
                        <div class="ranking-item" v-for="(item, index) in 10" :key="index">
                            <span class="index">{{ index + 1 }}</span>
                            <span class="name" v-if="rankList[index]">
                                <img :src="rankList[index].avatar" alt="" />
                                <span>{{ rankList[index].username }}</span>
                            </span>
                            <span class="num" v-if="rankList[index]">{{ rankList[index].count }}题</span>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.back-ground-container {
    width: 100%;
    position: relative;
    z-index: 0;
    overflow: hidden;
}

//.back-ground-container::before {
//    transition: opacity 0.3s ease-out 0s;
//}

//.back-ground-container::before {
//    content: '';
//    height: 800px;
//    position: absolute;
//    // inset: 0px;
//    // background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), var(--background-url);
//    // background-position: 50% 17%;
//    // opacity: 0.2;
//    // background-size: cover;
//    // filter: blur(20px);
//    // z-index: -1;
//    top: 0;
//    right: 0;
//    bottom: 0;
//    left: 0;
//    background-image: linear-gradient(to bottom, rgba(0, 255, 255, 0.289), rgb(255, 255, 255));
//    opacity: 0.2;
//    filter: blur(20px);
//    z-index: -1;
//}
a {
    color: #3574f0;
    text-decoration: none;
}
.container {
    width: 1200px;
    padding: 32px 90px;
    margin: 0 auto;
}

.head-left {
    b {
        font-size: 30px;
        font-weight: 500;
        color: #000000;
        letter-spacing: 4px;
        margin-right: 20px;
        line-height: 50px;
    }

    div {
        line-height: 50px;
        font-size: 16px;
        color: #000000;
    }
}

.head-right {
    // width: 350px;
    height: 100px;

    img {
        //width: 100%;
        height: 100%;
    }
}

.content {
    margin-top: 30px;

    p {
        font-size: 20px;
        font-weight: 500;
        color: #1a1a1abf;
    }

    .link {
        font-size: 14px;
    }

    .content-left-head {
        margin-bottom: 15px;
    }

    .card-group {
        display: flex;
        flex-wrap: wrap;
    }

    .card {
        width: 32%;
        height: 88px;
        padding: 5px;
        margin-right: 8px;
        margin-bottom: 20px;
        background-color: #fff;
        border-radius: 8px;
        display: flex;
        cursor: pointer;
        box-shadow:
            0 0 #0000,
            0 0 #0000,
            0 0 #0000,
            0 0 #0000,
            0 2px 6px #0000000a,
            0 4px 8px #00000005,
            0 6px 12px #00000005;
        box-sizing: border-box;
        transition: all 0.3s;

        &:hover {
            // 往上偏移
            transform: translateY(-4px);
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        }

        img {
            flex: 1;
            border-radius: 5px;
            box-sizing: border-box;
        }

        .card-right {
            flex: 4;
            padding: 8px;

            p {
                font-size: 14px;
                line-height: 20px;
                font-weight: 500;
            }

            .text {
                margin-top: 10px;
                color: #52525299;
                font-size: 12px;
                line-height: 16px;
                // 两行
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }

    .card:nth-child(3n) {
        margin-right: 0;
    }
}

.table {
    margin: 5px 0 20px;
    border-radius: 10px;
}

.analyst {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    // 阴影
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

    img {
        position: absolute;
        top: 10px;
        right: 0;
        width: 40%;
    }

    .analyst-flex {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;

        .statistics {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .num {
            font-size: 18px;
        }

        .span {
            font-size: 12px;
        }
    }
}

.ranking {
    margin-top: 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    // 阴影
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

    img {
        height: 18px;
    }

    .ranking-item {
        margin-top: 20px;
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #5f6368;

        .index {
            width: 20px;
            text-align: center;
        }

        .name {
            flex: 1;
            margin-left: 20px;
            display: flex;
            align-items: center;
            font-size: 14px;

            img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-right: 5px;
            }
        }

        .num {
            margin-left: 10px;
            font-size: 14px;
            font-weight: 600;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
    }
}
</style>
