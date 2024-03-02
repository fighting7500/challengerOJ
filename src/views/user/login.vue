<script setup>
import '@/styles/login.scss'
import Footer from '@/views/home/components/footer.vue'
import { reactive, ref } from 'vue'
import Captcha from './components/Captcha.vue'
import { apiverifyCode } from '@/api/user/user'
const formLoading = ref(false)
const tabListNoTitle = [
	{
		key: 'accountLogin',
		tab: '账号密码登录'
	},
	{
		key: 'mobileLogin',
		tab: '手机号登录'
	}
]
const data = reactive(['账号密码登录', '手机号登录'])
const value = ref(data[0])
// tab切换
// const isCount = ref(true)
// const noTitleKey = ref('accountLogin')
// const onTabChange = (value) => {
// 	noTitleKey.value = value
// 	isCount.value = value === 'accountLogin'
// }

// // 滑块验证
// const sliderVerify = () => {
// 	if (!formState.usermobile) {
// 		message.error('请输入手机号');
// 		return;
// 	}
// 	document.getElementById('captcha-button').click()
// }

// // 账号登录input值
// const account = ref('')

// const formState = reactive({
// 	email: '',
// 	username: '',
// 	password: '',
// 	usermobile: '',
// 	code: '',
// 	remember: true
// })
// // 判断
// const verify = () => {
// 	// 判断是否是账号登录
// 	console.log(isCount.value);
// 	if (!isCount.value) {
// 		if (!formState.usermobile) {
// 			message.error('请输入手机号');
// 			return;
// 		}
// 		if (!formState.code) {
// 			message.error('请输入验证码');
// 			return;
// 		}
// 		login();
// 		return;
// 	}
// 	if (!account.value) {
// 		message.error('请输入账号');
// 		return;
// 	}
// 	if (!formState.password) {
// 		message.error('请输入密码');
// 		return;
// 	}
// 	formState.email = '';
// 	formState.username = '';
// 	formState.usermobile = '';
// 	// 判断account属于手机号，邮箱，用户名
// 	const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
//     const phoneRegex = /^1[3-9]\d{9}$/;
//     const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
// 	if (emailRegex.test(account.value)) {
// 		formState.email = account.value;
// 	} else if (phoneRegex.test(account.value)) {
// 		formState.usermobile = account.value;
// 	} else if (usernameRegex.test(account.value)) {
// 		formState.username = account.value;
// 	} else {
// 		message.error('请输入正确的用户名/手机号/邮箱');
// 		return;
// 	}
// 	document.getElementById('captcha-button').click()
// 	// formLoading.value = true;
// 	// setTimeout(() => {
// 	// 	formLoading.value = false;
// 	// }, 2000);
// }

// const isLogin = ref(false)
// const second = ref(60)
// const getCode = () => {
// 	if (isLogin.value) return
// 	isLogin.value = true;
// 	// apiverifyCode(formState.usermobile).then(res => {
// 	// 	if (res.status != 200) {
// 	// 		message.error(res.msg);
// 	// 	}
// 	// 	message.success('验证码发送成功');
// 	// 	const timer = setInterval(() => {
// 	// 		second.value--
// 	// 		if (second.value <= 0) {
// 	// 			clearInterval(timer)
// 	// 			isLogin.value = false
// 	// 			second.value = 60
// 	// 		}
// 	// 	}, 1000)
// 	// })
// }

// const login = () => {
// 	console.log('登录')
// }
</script>

<template>
	<div class="container">
		<a-row>
			<a-col :span="24">
				<div class="head">
					<div class="logo">
						<router-link to="/">
							<img src="@/assets/logo.png" alt="MySQL自学网站" title="MySQL自学网站" />
						</router-link>
					</div>
				</div>
			</a-col>
		</a-row>
		<a-row class="content" align="middle">
			<a-col :span="6" offset="14">
				<!-- <a-card :loading="formLoading" :tab-list="tabListNoTitle" :active-tab-key="noTitleKey" @tabChange="key => onTabChange(key)">
					<div v-show="noTitleKey === 'accountLogin'">
						<div class="account">
							<a-input v-model:value="account" placeholder="输入用户名/手机号/邮箱" />
						</div>
						<div class="password">
							<a-input-password v-model:value="formState.password" :visibility-toggle="false" placeholder="请输入密码" />
						</div>
						<div class="lable">
							<a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
							<a href="" style="float: right;">忘记密码</a>
						</div>
						<div class="submit">
						</div>
					</div>
					<div v-show="noTitleKey !== 'accountLogin'">
						<div class="account">
							<a-input v-model:value="formState.usermobile" placeholder="输入手机号" />
						</div>
						<div class="code">
							<a-input v-model:value="formState.code" :visibility-toggle="false" placeholder="验证码" />
							<a-button :disabled="isLogin" @click="sliderVerify">{{ isLogin ? second + '秒后获取' : '获取验证码' }}</a-button>
						</div>
					</div>
					<a-button type="primary" class="btn" @click="verify">登录</a-button>
					<Captcha btnId="captcha-button" :isCount="isCount" @login="login" @getCode="getCode"></Captcha>
					<a-button ref="captchaButton" id="captcha-button" style="display: none;"></a-button>
					<template #extra>
						<div class="signup">
							<router-link to="/register">
								注册
							</router-link>
						</div>
					</template>
				</a-card> -->
				<a-segmented v-model:value="value" block :options="data" />
			</a-col>
		</a-row>
		<a-row>
			<a-col :span="24">
				<Footer></Footer>
			</a-col>
		</a-row>
	</div>
</template>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

.logo {
	margin: 0 15px;
	width: 150px;

	img {
		width: 100%;
	}
}

.content {
	flex: 1;
	display: flex;
	background: url('../../assets/login.jpg') no-repeat center;
	background-size: 100% auto;
	padding: 0 35px;
	text-align: center;
	box-shadow: 0 1px 29px 0 rgba(0, 0, 0, 0.09), 0 10px 6px -1px rgba(0, 0, 0, 0.02),
		0 2px 4px 0 rgba(0, 0, 0, 0.02);
}

.account {
	margin-top: 30px;
}

.code {
	display: flex;
	width: 100%;

	:where(.css-dev-only-do-not-override-1hsjdkk).ant-btn {
		height: 39px;
		margin-left: 10px;
		line-height: 30px;
	}
}

:where(.css-dev-only-do-not-override-1hsjdkk).ant-input {
	line-height: 30px;
	margin-bottom: 30px;
}

:where(.css-dev-only-do-not-override-1hsjdkk).ant-input-password {
	line-height: 30px;
	margin-bottom: 5px;
}

.lable {
	text-align: left;
	margin-bottom: 40px;
}

.btn {
	width: 100%;
	height: 36px;
	font-size: 16px;
}

.signup {
	position: absolute;
	top: 0;
	right: 0;
	width: 70px;
	height: 70px;
	background-image: url('../../assets/70-70.svg');
	cursor: pointer;

	a {
		position: absolute;
		top: 5px;
		right: 5px;
		color: #fff;
		font-size: 16px;
	}
}
</style>