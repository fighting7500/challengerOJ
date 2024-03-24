<template>
	<div id="captcha-element"></div>
</template>

<script>
import { apiVerifyCaptcha } from '@/api/user';
export default {
	props: {
		getCode: {
			type: Function,
			default: () => {},
		},
		activeName: {
			type: String,
			default: '',
		},
		login: {
			type: Function,
			default: () => {},
		}
	},
	data() {
		return {
			captcha: null,
			captchaButton: null,
		};
	},
	mounted() {
		this.captchaButton = document.getElementById('captcha-button');

		window.initAliyunCaptcha({
			SceneId: '1q6cx5mm', // 场景ID。根据步骤二新建验证场景后，您可以在验证码场景列表，获取该场景的场景ID
			prefix: '1bg5jh', // 身份标。开通阿里云验证码2.0后，您可以在控制台概览页面的实例基本信息卡片区域，获取身份标
			mode: 'popup', // 验证码模式。popup表示要集成的验证码模式为弹出式, embed
			element: '#captcha-element', // 页面上预留的渲染验证码的元素，与原代码中预留的页面元素保持一致。
			button: '#captcha-button', // 触发验证码弹窗的元素。button表示单击登录按钮后，触发captchaVerifyCallback函数。您可以根据实际使用的元素修改element的值
			captchaVerifyCallback: this.captchaVerifyCallback, // 业务请求(带验证码校验)回调函数
			onBizResultCallback: this.onBizResultCallback, // 业务请求结果回调函数
			getInstance: this.getInstance, // 绑定验证码实例函数
			slideStyle: {
				width: 320,
				height: 40,
			}, // 滑块验证码样式，支持自定义宽度和高度，单位为px。其中，width最小值为320 px
			language: 'cn', // 验证码语言类型，支持简体中文（cn）、繁体中文（tw）、英文（en）
			immediate: false, // 是否立即渲染验证码，为true时立即渲染，为false时不渲染，需要手动调用captcha.show()方法
		});
	},
	beforeUnmount() {
		this.captchaButton = null;

		// 必须删除相关元素，否则再次mount多次调用 initAliyunCaptcha 会导致多次回调 captchaVerifyCallback
		document.getElementById('aliyunCaptcha-mask')?.remove();
		document.getElementById('aliyunCaptcha-window-popup')?.remove();
	},
	
	methods: {
		getInstance(instance) {
			this.captcha = instance;
		},
		async captchaVerifyCallback(captchaVerifyParam) {
			// 1.向后端发起业务请求，获取验证码验证结果和业务结果
			const result = await apiVerifyCaptcha(captchaVerifyParam);
			console.log('返回的结果为：', result);
			// return {
			//  captchaResult: true, // 验证码验证是否通过，boolean类型，必选
			//  bizResult: true, // 业务验证是否通过，boolean类型，可选；若为无业务验证结果的场景，bizResult可以为空
			// }
			// console.log(captchaVerifyParam);
			if (result.status == 200) {
				console.log('验证通过');
				return {
					captchaResult: true,
					bizResult: true,
				}
			}
			this.$message.error(result.msg);
			return {
				captchaResult: false,
				bizResult: false,
			}
		},
		// 验证通过后调用
		onBizResultCallback() {
			if (this.activeName == '1') {
				this.$emit('login');
				return;
			}
			this.$emit('getCode');
		},
		// 弹出验证框，popupId为组件id，用于支持验证通过后继续触发业务逻辑
		// popup(popupId) {
		// 	this.popupId = popupId;
		// 	this.captchaButton.click();
		// },
	},
};
</script>

<style>
#captcha-element {
	width: 100%;
}
</style>