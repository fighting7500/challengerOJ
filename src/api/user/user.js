import request from '@/utils/request'
// 滑块验证
export function apiVerifyCaptcha(captchaVerifyParam) {
  return request({
        url: '/user/verifyCaptcha',
        method: 'post',
        data: {
            captchaVerifyParam: captchaVerifyParam
        }
  })
}

// 发送验证码
export function apiverifyCode(mobile) {
  return request({
        url: '/user/verifyCode',
        method: 'post',
        data: {
          usermobile: mobile
        }
  })
}