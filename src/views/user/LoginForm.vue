<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Captcha from './Captcha.vue'
import { apiverifyCode, apiLogin } from '@/api/user'
import '@/styles/login.scss'
import { setToken } from '@/utils/auth'
import { useUserStore } from '@/store/userStore'
const userStore = useUserStore()

const router = useRouter()
const queryForm = reactive({
    account: '',
    password: '',
    usermobile: '',
    code: '',
    remember: true
})
const loginRule = {
    account: [{ required: true, message: '请输入邮箱/用户名/手机号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const codeRule = {
    usermobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, message: '手机号格式不正确', trigger: 'blur' }
    ],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}
const captchaBtn = ref('captcha-button')
const accountForm = ref()
const codeForm = ref()
const activeName = ref('1')
const isSendCode = ref(false)
const second = ref(60)
const loading = ref(false)
const btnLoading = ref(false)
const getCode = () => {
    if (isSendCode.value) return
    isSendCode.value = true
    apiverifyCode(queryForm.usermobile).then((res) => {
        btnLoading.value = false
        if (res.status != 200) {
            ElMessage.error(res.msg)
            return
        }
        ElMessage.success('验证码发送成功')
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
    if (activeName.value == '1') {
        // 做表单校验
        accountForm.value.validate((valid) => {
            if (valid) {
                captchaBtn.value.click()
            }
        })
    } else {
        if (!queryForm.usermobile) {
            ElMessage.error('请输入手机号')
            return
        }
        btnLoading.value = true
        captchaBtn.value.click()
    }
}

const login = () => {
    loading.value = true
    if (activeName.value == '1') {
        // 做表单校验
        accountForm.value.validate((valid) => {
            if (valid) {
                const param = reactive({
                    isCode: activeName.value,
                    account: queryForm.account,
                    password: queryForm.password
                })
                apiLogin(param).then((res) => {
                    loading.value = false
                    if (res.status != 200) {
                        ElMessage.error(res.msg)
                        return
                    }
                    localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
                    ElMessage.success('登录成功')
                    userStore.setToken(res.data.token)
                    userStore.setUserInfo(res.data.userInfo)
                    setToken(res.data.token)
                    queryForm.account = ''
                    queryForm.password = ''
                    router.push('/')
                })
            }
        })
    } else {
        codeForm.value.validate((valid) => {
            if (!valid) return
            const param = reactive({
                isCode: activeName.value,
                usermobile: queryForm.usermobile,
                code: queryForm.code
            })
            apiLogin(param).then((res) => {
                loading.value = false
                if (res.status != 200) {
                    ElMessage.error(res.msg)
                    return
                }
                ElMessage.success('登录成功')
                setToken(res.data.token)
                userStore.setToken(res.data.token)
                userStore.setUserInfo(res.data.userInfo)
                queryForm.usermobile = ''
                queryForm.code = ''
                router.push('/')
            })
        })
    }
}

const routePush = () => {
    router.push('/login/register')
}
</script>

<template>
    <el-row class="content" align="middle">
        <el-col :span="5" :offset="14">
            <div class="form">
                <el-tabs v-model="activeName">
                    <el-tab-pane class="tab-pane" label="账号密码登录" name="1">
                        <el-form :model="queryForm" :rules="loginRule" ref="accountForm">
                            <el-form-item prop="account">
                                <el-input class="input" v-model="queryForm.account" placeholder="输入邮箱/用户名/手机号"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" v-model="queryForm.password" placeholder="请输入密码" show-password></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="login" @click="verify" :loading="loading">登 录</el-button>
                                <div class="forget">
                                    <el-checkbox v-model="queryForm.remember">记住我</el-checkbox>
                                    <el-link href="">忘记密码</el-link>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane class="tab-pane" label="手机号登录" name="2">
                        <el-form :model="queryForm" :rules="codeRule" ref="codeForm">
                            <el-form-item prop="usermobile">
                                <el-input v-model="queryForm.usermobile" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item prop="code" class="code">
                                <el-input v-model="queryForm.code" placeholder="请输入验证码">
                                    <template #append>
                                        <el-button type="primary" @click="verify" :disabled="isSendCode" :loading="btnLoading">{{ isSendCode ? `${second}秒后重新获取` : '获取验证码' }}</el-button>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="login" @click="login" :loading="loading">登 录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
                <button ref="captchaBtn" id="captcha-button" style="display: none"></button>
                <Captcha :activeName="activeName" @login="login" @getCode="getCode"></Captcha>
                <!-- 注册 -->
                <div class="sign-in" @click="routePush">
                    <p>注册</p>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.content {
    flex: 1;
    display: flex;
    background: url('../../../assets/login.jpg') no-repeat center;
    background-size: 100% auto;
    text-align: center;
    box-shadow:
        0 1px 29px 0 rgba(0, 0, 0, 0.09),
        0 10px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px 0 rgba(0, 0, 0, 0.02);
}

.form {
    width: 100%;
    // 设置高度
    height: 400px;
    position: relative;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow:
        0 1px 29px 0 rgba(0, 0, 0, 0.09),
        0 10px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px 0 rgba(0, 0, 0, 0.02);
}

.sign-in {
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 70px;
    border-radius: 0 10px 0 0;
    background-image: url('../../../assets/70-70.svg');
    cursor: pointer;

    p {
        position: absolute;
        top: 10px;
        right: 5px;
        color: #fff;
        font-size: 16px;
    }
}

.tab-pane {
    margin-top: 30px;
}

.login {
    margin-top: 30px;
    width: 100%;
    height: 42px;
}

.forget {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.class {
    height: 100px;
}
</style>
