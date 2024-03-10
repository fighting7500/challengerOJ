<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { apiverifyCode, apiCheckUser, apiRegister } from '@/api/user'
import zxcvbn from 'zxcvbn'

const router = useRouter()

const form = reactive({
	userName: '',
	email: '',
	userMobile: '',
	code: '',
	password: '',
	checkPassword: '',
	agree: false
})
const formRef = ref(null)
// 表单校验规则
const formRule = {
	userName: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ min: 3, message: '用户名长度不能小于3位', trigger: 'blur' },
		{ pattern: /^\s*[\u4e00-\u9fa5a-zA-Z0-9_]+\s*$/, message: '用户名只能包含中文、英文、数字和下划线', trigger: 'blur' }
	],
	email: [
		{ required: true, message: '请输入邮箱', trigger: 'blur' },
		{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
	],
	userMobile: [
		{ required: true, message: '请输入手机号', trigger: 'blur' },
		{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
	],
	code: [
		{ required: true, message: '请输入验证码', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
	],
	checkPassword: [
		{ required: true, message: '请再次输入密码', trigger: 'blur' },
		{
			validator: (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'))
				} else if (value !== form.password) {
					callback(new Error('两次输入密码不一致'))
				} else {
					callback()
				}
			}, trigger: 'blur'
		}
	],
	agree: [
		{ required: true, message: '请同意用户协议', trigger: 'change' }
	]
}
// 提交表单
const onSubmit = () => {
	if (!form.agree) {
		ElMessage.error('请同意用户协议')
		return
	}
	loading.value = true
	// 对表单进行校验
	formRef.value.validate((valid) => {
		if (valid) {
			// 校验通过，发送请求
			apiRegister(form).then(res => {
				loading.value = false
				if (res.status != 200) {
					ElMessage.error(res.msg)
					return
				}
				// 注册成功，点击去登录
				ElMessage.success('注册成功')
				router.push({ path: '/login' })
			})
		} else {
			return false
		}
	})
}
// 重置表单
const reset = () => {
	formRef.value.resetFields()
}

const loading = ref(false)
const isSendCode = ref(false)
const second = ref(60)
const codeLoading = ref(false)
// 对手机号进行正则校验
const isEnabled = computed(() => {
	return formRule.userMobile[1].pattern.test(form.userMobile)
})
// 发送验证码
const sendCode = async () => {
	if (!isEnabled.value) return
	const res = await verify('2', form.userMobile)
	console.log(res);
	if (!res) return
	codeLoading.value = true
	apiverifyCode(form.userMobile).then(res => {
		codeLoading.value = false
		if (res.status != 200) {
			ElMessage.error(res.msg);
			return
		}
		ElMessage.success('验证码发送成功');
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
// 校验用户名、邮箱、手机号是否已存在
const verify = async (type, value) => {
	const res = await apiCheckUser({ type, value })
	if (res.status != 200) {
		ElMessage.error(res.msg)
		return false
	}
	return true
}

// 密码强度检测
const passwordStrength = ref(-1)
const checkPasswordStrength = () => {
	// 限制最大值为4
	passwordStrength.value = Math.min(zxcvbn(form.password).score, 4)
}
</script>

<template>
	<el-row class="content" justify="center" align="middle">
		<el-col :span="12">
			<div class="card">
				<div class="content-head">
					<h3>注册</h3>
					<!-- 已有账号，去登录 -->
					<div>
						<span>已有账号，</span>
						<router-link to="/login">去登录</router-link>
					</div>
				</div>
				<el-divider />
				<el-form class="form" :rules="formRule" :model="form" label-width="auto" ref="formRef">
					<el-form-item prop="userName">
						<el-input v-model="form.userName" @change="(value) => verify(1, value)" placeholder="用户名" maxlength="12"/>
					</el-form-item>
					<el-form-item prop="email">
						<el-input v-model="form.email" @change="(value) => verify(3, value)" placeholder="邮箱" />
					</el-form-item>
					<el-form-item prop="userMobile">
						<el-input v-model="form.userMobile" placeholder="手机号" />
					</el-form-item>
					<el-form-item prop="code">
						<el-input class="code" v-model="form.code" placeholder="验证码">
							<template #suffix>
								<el-text class="mx-1" :class="{ enabled: isEnabled }" type="primary" @click="sendCode"
									:loading="codeLoading" v-if="!isSendCode">获取验证码</el-text>
								<el-text class="mx-1" type="primary" v-else>{{ second }}秒后重新获取</el-text>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<div class="password">
							<el-input v-model="form.password" placeholder="密码" show-password
								@input="checkPasswordStrength" maxlength="20" />
							<div class="strength-bar">
								<div class="strength-bar--fill" :data-score="passwordStrength"></div>
							</div>
						</div>
					</el-form-item>
					<el-form-item prop="checkPassword">
						<el-input v-model="form.checkPassword" placeholder="确认密码" show-password />
					</el-form-item>
					<el-form-item prop="agree">
						<el-checkbox v-model="form.agree">我已阅读并同意</el-checkbox>
						<el-link type="primary" :underline="false">CodeChallenger隐私政策</el-link>
					</el-form-item>
					<el-form-item>
						<span class="btn">
							<el-button type="primary" @click="onSubmit" :loading="loading">注册</el-button>
							<el-button type="primary" @click="reset">重置</el-button>
						</span>
					</el-form-item>
				</el-form>
			</div>
		</el-col>
	</el-row>
</template>

<style lang="scss" scoped>
.content {
	flex: 1;
	background-color: #efefef;
}

.content-head {
	display: flex;
	justify-content: space-between;
	align-items: center;

	a {
		color: #526ecc;
	}
}

.card {
	padding: 20px;
	margin-top: 20px;
	border-radius: 10px;
	background-color: #fff;
}

.form {
	margin: 0 auto;
	width: 50%;
}

.code {
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
	width: 100%;
	// 居中有间隔
	display: flex;
	justify-content: center;
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
		width: 19%;
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
		transition: width 0.5s ease-in-out, background 0.25s;

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
