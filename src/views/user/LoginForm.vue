<script setup>
import { reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import Captcha from './components/Captcha.vue'
import { apiVerifyCode, apiLogin } from '@/api/user.js'
import '@/styles/login.scss'
import { useUserStore } from '@/store/userStore.js'
import { Message, Notification } from '@arco-design/web-vue'

const userStore = useUserStore()

const router = useRouter()
const queryForm = reactive({
    account: 'admin',
    password: '123123',
    userMobile: '',
    code: '',
    remember: true
})
const loginRule = {
    account: [{ required: true, message: '请输入邮箱/用户名/手机号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const codeRule = [
    {
        userMobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {
                pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
                message: '手机号格式不正确',
                trigger: 'blur'
            }
        ]
    },
    { code: [{ required: true, message: '请输入验证码', trigger: 'blur' }] }
]
const captchaBtn = ref('captcha-button')
const accountForm = ref()
const codeForm = ref()
let activeName = ref('1')
const isSendCode = ref(false)
const second = ref(60)
const loading = ref(false)
const btnLoading = ref(false)
const getCode = () => {
    if (isSendCode.value) return
    isSendCode.value = true
    apiVerifyCode(queryForm.userMobile).then((res) => {
        btnLoading.value = false
        if (res.status != 200) {
            Message.error(res.msg)
            return
        }
        Message.success('验证码发送成功')
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
const verify = () => {
    console.log('verify', activeName.value)
    if (activeName.value === '1') {
        // 做表单校验
        accountForm.value.validate((valid) => {
            if (valid) return
            captchaBtn.value.click()
        })
    } else {
        console.log(queryForm.userMobile)
        if (!queryForm.userMobile) {
            Message.error('请输入手机号')
            return
        }
        btnLoading.value = true
        captchaBtn.value.click()
    }
}

const login = () => {
    const form = activeName.value === '1' ? accountForm.value : codeForm.value
    const param = reactive({
        isCode: activeName.value,
        account: queryForm.account,
        password: queryForm.password,
        usermobile: queryForm.userMobile,
        code: queryForm.code
    })

    form.validate((valid) => {
        if (valid) return
        loading.value = true

        apiLogin(param).then((res) => {
            loading.value = false
            if (res.status !== 200) {
                Message.error(res.msg)
                return
            }
            Message.success('登录成功')
            userStore.setUserInfo(res.data)
            if (res.data.recordInfo) {
                res.data.recordInfo.forEach((item) => {
                    Notification.success({
                        title: `${item.description}`,
                        content: `+${item.points}`
                        // icon: `icon-jinbi`
                    })
                })
            }
            form.resetFields()
            router.push('/')
        })
    })
}

const routePush = () => {
    router.push('/user/register')
}
const tabClick = (key) => {
    activeName.value = key
}
</script>

<template>
    <div id="login-form">
        <div></div>
        <div class="form">
            <a-tabs type="text" :active-key="activeName" :animation="true" @tab-click="(key) => tabClick(key)">
                <a-tab-pane key="1" title="账号密码登录">
                    <a-form ref="accountForm" :model="queryForm" :rules="loginRule" class="login-form" layout="vertical" @submit="verify">
                        <a-form-item field="account" hide-label :hide-asterisk="true">
                            <a-input v-model="queryForm.account" placeholder="输入邮箱/用户名/手机号">
                                <template #prefix>
                                    <icon-user />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item field="password" :hide-asterisk="true">
                            <a-input-password v-model="queryForm.password" placeholder="请输入密码" allow-clear>
                                <template #prefix>
                                    <icon-lock />
                                </template>
                            </a-input-password>
                        </a-form-item>
                        <a-space :size="16" direction="vertical">
                            <div class="login-form-password-actions">
                                <!--                                <a-checkbox checked="rememberPassword" :value="queryForm.remember"> 记住我</a-checkbox>-->
                                <div></div>
                                <router-link to="/user/forget">忘记密码</router-link>
                            </div>
                            <a-button class="login" type="primary" long :loading="loading" html-type="submit">登 录 </a-button>
                        </a-space>
                    </a-form>
                </a-tab-pane>
                <a-tab-pane key="2" title="手机号登录">
                    <a-form :model="queryForm" :rules="codeRule" class="login-form" ref="codeForm" layout="vertical">
                        <a-form-item field="userMobile">
                            <a-input v-model="queryForm.userMobile" placeholder="请输入手机号">
                                <template #prefix>
                                    <icon-mobile />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item field="code">
                            <a-input v-model="queryForm.code" placeholder="请输入验证码">
                                <template #append>
                                    <a-button type="text" @click="verify" :disabled="isSendCode" :loading="btnLoading">
                                        {{ isSendCode ? `${second}秒后重新获取` : '获取验证码' }}
                                    </a-button>
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-button type="primary" long :loading="loading" @click="login">登 录</a-button>
                    </a-form>
                </a-tab-pane>
            </a-tabs>
            <button ref="captchaBtn" id="captcha-button" style="display: none"></button>
            <Captcha :activeName="activeName" @login="login" @getCode="getCode"></Captcha>
            <!-- 注册 -->
            <div class="sign-in" @click="routePush">
                <p>注册</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#login-form {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff url('../../assets/login.jpg') no-repeat;
    background-size: 90% 100%;
}

.form {
    width: 350px;
    height: 420px;
    padding: 30px;
    position: relative;
    background-color: #fff;
    border-radius: 10px;
    box-shadow:
        0 1px 29px 0 rgba(0, 0, 0, 0.09),
        0 10px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px 0 rgba(0, 0, 0, 0.02);

    .login-form {
        margin-top: 30px;
    }

    .login-form-password-actions {
        display: flex;
        justify-content: space-between;
    }
}

.sign-in {
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 70px;
    border-radius: 0 10px 0 0;
    background-image: url('../../assets/70-70.svg');
    cursor: pointer;

    p {
        position: absolute;
        top: 10px;
        right: 5px;
        color: #fff;
        font-size: 16px;
    }
}

//.login {
//    margin-top: 10px;
//}

.forget {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.class {
    height: 100px;
}
</style>
