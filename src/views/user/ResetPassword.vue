<!--
 * @Author: 17197
 * @Date: 2024/3/30
 * @Description: ResetPassword.vue
 * @Version: 1.0
 * @Last Modified time : 2024/3/30
-->
<script setup>
import { reactive, ref, computed } from 'vue'
import { Message } from '@arco-design/web-vue'
import { apiCheckUser, apiResetPassword, apiVerifyCode } from '@/api/user.js'
import zxcvbn from 'zxcvbn'
import router from '@/router/index.js'

const current = ref(1)
const form = reactive({
    userMobile: '',
    code: '',
    password: '',
    confirmPassword: ''
})
const formRule = {
    userMobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
        }
    ],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}
const passwordRule = {
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
    ],
    confirmPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }]
}
const formRef = ref()
const formPasswordRef = ref()
const loading = ref(false)
const codeLoading = ref(false)
const isEnabled = computed(() => {
    return formRule.userMobile[1].pattern.test(form.userMobile)
})
const isSendCode = ref(false)
const second = ref(60)

const sendCode = async () => {
    if (!isEnabled.value) return
    const res = await apiCheckUser({ type: 2, value: form.userMobile })
    if (res.status !== 200) {
        Message.error('该手机号未注册')
        return
    }
    codeLoading.value = true
    apiVerifyCode(form.userMobile).then((res) => {
        codeLoading.value = false
        if (res.status !== 200) {
            Message.error(res.msg)
            console.log('在这儿')
            return
        }
        Message.success('验证码发送成功')
        isSendCode.value = true
        const timer = setInterval(() => {
            second.value--
            if (second.value <= 0) {
                clearInterval(timer)
                isSendCode.value = false
                second.value = 60
            }
        }, 1000)
    })
}
const next = () => {
    formRef.value.validate((valid) => {
        if (valid) return
        current.value = 2
    })
}
const validateStatus = ref('')
const checkPassword = (value) => {
    // 对两次密码进行校验
    if (form.password !== value) {
        validateStatus.value = 'error'
        return
    }
    validateStatus.value = ''
}
let isPassword = ref(false)
// 密码强度检测
const passwordStrength = ref(-1)
const checkPasswordStrength = () => {
    isPassword.value = !!form.password
    // 限制最大值为4
    passwordStrength.value = Math.min(zxcvbn(form.password).score, 4)
}
const resetPassword = () => {
    formPasswordRef.value.validate((valid) => {
        if (valid) return
        loading.value = true
        apiResetPassword(form).then((res) => {
            loading.value = false
            if (res.status !== 200) {
                Message.error(res.msg)
                return
            }
            Message.success('密码重置成功')
            current.value = 3
        })
    })
}
</script>

<template>
    <a-row class="content" justify="center" align="middle">
        <a-col :span="12">
            <div class="card">
                <h3 class="content-head">找回密码</h3>
                <div class="step">
                    <a-steps type="dot" :current="current">
                        <a-step>手机号验证</a-step>
                        <a-step>重置密码</a-step>
                    </a-steps>
                </div>
                <a-form class="form" :rules="formRule" :model="form" ref="formRef" v-if="current === 1">
                    <a-form-item field="userMobile" :hide-asterisk="true">
                        <a-input v-model="form.userMobile" placeholder="手机号" />
                    </a-form-item>
                    <a-form-item field="code" :hide-asterisk="true">
                        <a-input class="code" v-model="form.code" placeholder="验证码">
                            <template #suffix>
                                <a-typography-text class="mx-1" :class="{ enabled: isEnabled }" type="text" @click="sendCode" :loading="codeLoading" v-if="!isSendCode">获取验证码 </a-typography-text>
                                <text type="primary" v-else>{{ second }}秒后重新获取</text>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <span class="btn">
                            <a-button type="primary" @click="next" :loading="loading">下一步</a-button>
                        </span>
                    </a-form-item>
                </a-form>
                <a-form class="form" :rules="passwordRule" :model="form" ref="formPasswordRef" v-else-if="current === 2">
                    <a-form-item field="password" :hide-asterisk="true">
                        <div class="password">
                            <a-input-Password v-model="form.password" placeholder="新密码" @input="checkPasswordStrength" max-length="20" />
                            <div class="strength-bar" :style="{ display: isPassword ? 'block' : 'none' }">
                                <div class="strength-bar--fill" :data-score="passwordStrength"></div>
                            </div>
                        </div>
                    </a-form-item>
                    <a-form-item field="confirmPassword" :hide-asterisk="true" :validate-status="validateStatus">
                        <a-input-Password v-model="form.confirmPassword" placeholder="确认密码" @input="(value) => checkPassword(value)" max-length="20" />
                    </a-form-item>
                    <a-form-item>
                        <span class="btn">
                            <a-button type="primary" @click="resetPassword" :loading="loading">提交</a-button>
                        </span>
                    </a-form-item>
                </a-form>
                <a-result status="success" title="密码重置成功" v-else>
                    <template #extra>
                        <a-space>
                            <a-button type="primary" @click="() => router.push('/user/login')">去登录</a-button>
                        </a-space>
                    </template>
                </a-result>
            </div>
        </a-col>
    </a-row>
</template>

<style scoped lang="scss">
.content {
    flex: 1;
}

.content-head {
    text-align: center;
    margin-bottom: 50px;
}

.card {
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;
    background-color: #fff;
}

.step {
    margin-bottom: 20px;
    margin-left: 60px;
    width: 50%;
}

.form {
    margin: 50px 0;
    width: 50%;
}

.code {
    .mx-1 {
        display: flex;
        align-items: center;
    }

    span {
        cursor: default;
        color: gray;
        transition: all 0.3s ease;
    }

    span.enabled {
        cursor: pointer;
        color: #526ecc;
    }
}
.btn {
    margin-top: 30px;
}
.password {
    width: 100%;
}

$error-color: #ff4d4f;
$warning-color: #f0ad4e;
$success-color: #5cb85c;

.strength-bar {
    position: relative;
    height: 6px;
    margin: 10px auto 6px;
    background-color: #bfbfbf; // 假设你有一个默认颜色定义
    border-radius: 6px;

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 21%;
        z-index: 10;
        background-color: transparent;
        border: 0 solid #fff;
        border-width: 0 5px;
    }

    &::before {
        left: 19%;
    }

    &::after {
        right: 19%;
    }

    &--fill {
        position: absolute;
        width: 0;
        height: 100%;
        background-color: transparent;
        border-radius: inherit;
        transition:
            width 0.5s ease-in-out,
            background 0.25s;

        &[data-score='0'] {
            width: 19%;
            background-color: #ff1a1d;
        }

        &[data-score='1'] {
            width: 39%;
            background-color: #ff4d4f;
        }

        &[data-score='2'] {
            width: 60%;
            background-color: #faad14;
        }

        &[data-score='3'] {
            width: 80%;
            background-color: #88c16c;
        }

        &[data-score='4'] {
            width: 100%;
            background-color: #52c41a;
        }
    }
}
</style>
