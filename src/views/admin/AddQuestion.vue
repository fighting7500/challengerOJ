<!--
 * @Author: 17197
 * @Date: 2024/4/5
 * @Description: AddQuestion.vue
 * @Version: 1.0
 * @Last Modified time : 2024/4/5
-->
<script setup>
import { ref, onMounted } from 'vue'
import { useWindowHeight } from '@/utils/composables.js'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { apiAddProblem } from '@/api/admin.js'
import { apiCategories } from '@/api/question.js'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const current = ref(1)
const height = useWindowHeight(50)
const setCurrent = (index) => {
    current.value = index
}
const form = ref({
    name: '',
    difficulty: '',
    category: '',
    source: '',
    author: '',
    content: ''
})
const categoryList = ref([])
const init = async () => {
    const res = await apiCategories({ admin: 1 })
    if (res.status !== 200) {
        Message.error(res.msg)
        return
    }
    categoryList.value = res.data
}
onMounted(() => {
    init()
})
const sourceList = ref([])
const changeCurrent = (step) => {
    current.value += step
}
const sampleRows = ref([
    [
        {
            inputLabel: '示例输入1',
            sampleInput: '',
            outputLabel: '示例输出1',
            sampleOutput: '',
            remarkLabel: '示例备注1',
            remark: ''
        }
    ]
])

const addSample = () => {
    const lastRow = sampleRows.value[sampleRows.value.length - 1]
    if (lastRow.length < 3 || sampleRows.value.length === 1) {
        lastRow.push({
            inputLabel: `示例输入${lastRow.length + 1}`,
            sampleInput: '',
            outputLabel: `示例输出${lastRow.length + 1}`,
            sampleOutput: '',
            remarkLabel: `示例备注${lastRow.length + 1}`,
            remark: ''
        })
    } else {
        sampleRows.value.unshift([
            {
                inputLabel: `示例输入1`,
                sampleInput: '',
                outputLabel: `示例输出1`,
                sampleOutput: '',
                remarkLabel: '示例备注1',
                remark: ''
            }
        ])
    }
}

const deleteSample = (rowIndex, colIndex) => {
    sampleRows.value[rowIndex].splice(colIndex, 1)
    if (sampleRows.value[rowIndex].length === 0) {
        sampleRows.value.splice(rowIndex, 1)
    }
    sampleRows.value.forEach((row, index) => {
        row.forEach((item, colIndex) => {
            item.inputLabel = `示例输入${index * 3 + colIndex + 1}`
            item.outputLabel = `示例输出${index * 3 + colIndex + 1}`
            item.remarkLabel = `示例备注${index * 3 + colIndex + 1}`
        })
    })
}

const testList = ref([[{ inputLabel: '用例输入1', outputLabel: '预期输出1', input: '', expectedOutput: '' }]])
const addTest = () => {
    const lastRow = testList.value[testList.value.length - 1]
    if (lastRow.length < 3 || testList.value.length === 1) {
        lastRow.push({
            inputLabel: `用例输入${lastRow.length + 1}`,
            outputLabel: `预期输出${lastRow.length + 1}`,
            input: '',
            expectedOutput: ''
        })
    } else {
        testList.value.unshift([{ inputLabel: `用例输入1`, outputLabel: `预期输出1`, input: '', expectedOutput: '' }])
    }
}

const deleteTest = (rowIndex, colIndex) => {
    testList.value[rowIndex].splice(colIndex, 1)
    if (testList.value[rowIndex].length === 0) {
        testList.value.splice(rowIndex, 1)
    }
    testList.value.forEach((row, index) => {
        row.forEach((item, colIndex) => {
            item.inputLabel = `用例输入${index * 3 + colIndex + 1}`
            item.outputLabel = `预期输出${index * 3 + colIndex + 1}`
        })
    })
}

const submit = async () => {
    // 将示例输入输出和测试用例输入输出分别存储到sampleInputs、sampleOutputs、testInputs、testOutputs中
    const sampleInputs = []
    const sampleOutputs = []
    const sampleRemarks = []
    sampleRows.value.forEach((row) => {
        row.forEach((item) => {
            sampleInputs.push(item.sampleInput)
            sampleOutputs.push(item.sampleOutput)
            sampleRemarks.push(item.remark)
        })
    })
    const testInputs = []
    const testExpectedOutputs = []
    testList.value.forEach((row) => {
        row.forEach((item) => {
            testInputs.push(item.input)
            testExpectedOutputs.push(item.expectedOutput)
        })
    })
    let data = {
        sampleInputs: JSON.stringify(sampleInputs),
        sampleOutputs: JSON.stringify(sampleOutputs),
        sampleRemarks: JSON.stringify(sampleRemarks),
        testInputs: JSON.stringify(testInputs),
        testExpectedOutputs: JSON.stringify(testExpectedOutputs)
    }
    const res = await apiAddProblem(JSON.stringify(form.value), data)
    if (res.status !== 200) {
        Message.error(res.msg)
        return
    }
    Message.success('添加成功')
    router.push('/admin/question-list')
}
</script>

<template>
    <a-steps class="steps" :current="current" @change="setCurrent" changeable>
        <a-step>题目信息</a-step>
        <a-step>题目内容</a-step>
        <a-step>测试用例</a-step>
    </a-steps>
    <div :style="{ height: height + 'px' }">
        <div class="step1" v-if="current === 1">
            <a-form class="form" :model="form" :label-col-props="{ span: 4 }" :wrapper-col-props="{ span: 14 }">
                <a-form-item field="name" label="名称">
                    <a-input v-model="form.name" />
                </a-form-item>
                <a-form-item field="difficulty" label="难度">
                    <a-select v-model="form.difficulty">
                        <a-option value="easy">简单</a-option>
                        <a-option value="medium">中等</a-option>
                        <a-option value="hard">困难</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="category" label="分类">
                    <a-select v-model="form.category">
                        <a-option v-for="item in categoryList" :key="item.id" :value="item.id">{{ item.name }} </a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="source" label="来源">
                    <a-select v-model="form.source" allow-clear allow-create>
                        <a-option v-for="item in sourceList" :key="item.id" :value="item.id">{{ item.name }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="作者">
                    <a-input v-model="form.author" />
                </a-form-item>
                <a-form-item>
                    <a-button long type="primary" @click="changeCurrent(1)">下一步</a-button>
                </a-form-item>
            </a-form>
        </div>
        <div class="step2" v-else-if="current === 2">
            <MdEditor v-model="form.content" />
            <a-space class="btns">
                <a-button type="primary" @click="changeCurrent(-1)">上一步</a-button>
                <a-button type="primary" @click="changeCurrent(1)">下一步</a-button>
            </a-space>
        </div>
        <div v-else>
            <a-space direction="vertical" size="medium" fill>
                <a-row v-for="(row, rowIndex) in sampleRows" :key="rowIndex" :gutter="24">
                    <a-col class="a-row" v-for="(item, colIndex) in row" :key="colIndex" :span="8">
                        <a-space direction="vertical" fill>
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ item.inputLabel }}</span>
                                <icon-delete size="18" style="color: #a08f8f; cursor: pointer" v-if="!(rowIndex === 0 && colIndex === 0)" @click="deleteSample(rowIndex, colIndex)" />
                            </div>
                            <a-textarea v-model="item.sampleInput" :max-length="200" allow-clear show-word-limit />
                            <span>{{ item.outputLabel }}</span>
                            <a-textarea v-model="item.sampleOutput" :max-length="200" allow-clear show-word-limit />
                            <span>{{ item.remarkLabel }}</span>
                            <a-textarea v-model="item.remark" :max-length="200" allow-clear show-word-limit />
                        </a-space>
                    </a-col>
                </a-row>
                <a-button type="primary" @click="addSample">添加示例</a-button>
                <a-row v-for="(row, rowIndex) in testList" :key="rowIndex" :gutter="24">
                    <a-col class="a-row" v-for="(item, colIndex) in row" :key="colIndex" :span="8">
                        <a-space direction="vertical" fill>
                            <div style="display: flex; justify-content: space-between">
                                <span>{{ item.inputLabel }}</span>
                                <icon-delete size="18" style="color: #a08f8f; cursor: pointer" v-if="!(rowIndex === 0 && colIndex === 0)" @click="deleteTest(rowIndex, colIndex)" />
                            </div>
                            <a-textarea v-model="item.input" :max-length="200" allow-clear show-word-limit />
                            <span>{{ item.outputLabel }}</span>
                            <a-textarea v-model="item.expectedOutput" :max-length="200" allow-clear show-word-limit />
                        </a-space>
                    </a-col>
                </a-row>
                <a-button type="primary" @click="addTest">添加测试用例</a-button>
                <a-space class="btns">
                    <a-button type="primary" @click="changeCurrent(-1)">上一步</a-button>
                    <a-button type="primary" @click="submit">提交</a-button>
                </a-space>
            </a-space>
        </div>
    </div>
</template>

<style scoped lang="scss">
.steps {
    margin: 0 50px 30px;
}

.step1 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .form {
        width: 50%;
        margin: 0 auto;
    }
}

.step2 {
    margin: 0 auto;
}

.btns {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

.a-row {
    margin-top: 20px;
}
</style>
