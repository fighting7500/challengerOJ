<!--
 * @Author: 17197
 * @Date: 2024/3/28
 * @Description: content.vue
 * @Version: 1.0
 * @Last Modified time : 2024/3/28
-->
<script setup>
import { ref } from 'vue'
import md from './README.md?raw'
import QuestionAnswer from './QuestionAnswer.vue'
import SubmitRecord from './SubmitRecord.vue'
import CodeEditor from '@/components/codeEditor.vue'
import TestResult from '@/views/challenge/components/TestResult.vue'

const language = ref('javascript')
const languageList = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
    { value: 'c++', label: 'C++' }
]
const text = ref(md)
</script>

<template>
    <a-split class="split" min="400" max="1400">
        <template #first>
            <a-typography-paragraph>
                <a-tabs type="text" size="large" class="left-tabs">
                    <a-tab-pane key="1" title="题目描述" class="tabs-item">
                        <template #title> <i class="iconfont icon-timu"></i> 题目描述 </template>
                        <div class="question">
                            <a-scrollbar style="height: 85vh; overflow: auto">
                                <v-md-preview :text="text"></v-md-preview>
                            </a-scrollbar>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2" title="Tab 2">
                        <template #title> <i class="iconfont icon-daanjiexi"></i> 题解 </template>
                        <question-answer />
                    </a-tab-pane>
                    <a-tab-pane key="3" title="Tab 3">
                        <template #title> <i class="iconfont icon-jilu" /> 提交记录 </template>
                        <submit-record />
                    </a-tab-pane>
                </a-tabs>
            </a-typography-paragraph>
        </template>
        <!--分隔条-->
        <template #resize-trigger-icon>
            <span class="trigger"></span>
        </template>
        <!--右边-->
        <template #second>
            <div style="flex: 1">
                <a-split direction="vertical" class="right" default-size="500" min="150" max="600">
                    <!--右上-->
                    <template #first>
                        <a-typography-paragraph>
                            <div class="right-top">
                                <header><i class="iconfont icon-code"></i>代码</header>
                                <div class="option">
                                    <a-select v-model="language" :style="{ width: '120px' }" :bordered="false">
                                        <a-option v-for="item of languageList" :value="item.value" :label="item.label" :key="item.value" />
                                    </a-select>
                                    <icon-refresh size="20" />
                                </div>
                                <code-editor style="flex: 1" />
                                <div class="right-top-footer">
                                    <a-button type="text">运行</a-button>
                                    <a-button type="primary" class="submit">提交</a-button>
                                </div>
                            </div>
                        </a-typography-paragraph>
                    </template>
                    <!--分隔条-->
                    <template #resize-trigger-icon>
                        <span class="trigger-right"></span>
                    </template>
                    <!--右下-->
                    <template #second>
                        <a-typography-paragraph>
                            <a-tabs type="text" size="large">
                                <a-tab-pane key="1" title="测试用例">
                                    <template #title> <i class="iconfont icon-ceshi"></i> 测试用例 </template>
                                    <div class="test-record">
                                        <code-editor style="height: 100%" />
                                    </div>
                                </a-tab-pane>
                                <a-tab-pane key="2" title="测试结果">
                                    <template #title> <i class="iconfont icon-jieguo"></i> 测试结果 </template>
                                    <test-result />
                                </a-tab-pane>
                            </a-tabs>
                        </a-typography-paragraph>
                    </template>
                </a-split>
            </div>
        </template>
    </a-split>
</template>

<style scoped lang="scss">
.split {
    height: 100%;
    box-sizing: border-box;
}
.left-tabs {
    height: 100%;
}
.right {
    height: calc(100vh - 58px);
}
.trigger {
    width: 10px;
    &:before {
        content: '';
        display: block;
        width: 5px;
        height: 25px;
        background-color: #dddddd;
        border-radius: 5px;
        margin: 0 auto;
    }
}
.trigger-right {
    height: 10px;
    position: relative;
    &:before {
        content: '';
        display: block;
        width: 25px;
        height: 5px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #dddddd;
        border-radius: 5px;
    }
}
.right-top {
    padding: 5px 20px;
    display: flex;
    height: 100%;
    flex-direction: column;
    header {
        display: flex;
        align-items: center;
    }
    .option {
        color: #737373;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .code-editor {
        flex: 1;
    }
    .right-top-footer {
        text-align: right;
        .submit {
            margin-left: 20px;
        }
    }
}
.icon-code {
    color: #02b128;
    font-weight: 500;
    font-size: 20px;
    margin-right: 5px;
}
.test-record {
    height: 180px;
}
</style>
