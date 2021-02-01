<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar" />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="userInfoRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号码"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-button
            class="send-sms-btn"
            size="small"
            round
            @click="onSendSms"
            native-type="button"
            v-show="showSmsBtn"
            >获取验证码</van-button
          >
          <!-- time倒计时时间 -->
          <van-count-down
            :time="time"
            format="ss s"
            v-show="!showSmsBtn"
            ref="countDownRef"
            @finish="countDownFinish"
            :auto-start="false"
          />
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      time: 60000,
      showSmsBtn: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit: async function() {
      // 获取表单数据
      //   const user = JSON.stringify(this.user)
      const userInfo = this.user
      // 表单验证
      // 提交表单请求登录
      //   console.log(user)
      //   console.log(JSON.stringify(user))
      //   console.log(user === JSON.stringify(user))
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，默认时间2s，0表示持续展示不停止，直到成功或失败
        forbidClick: true, // 是否禁止背景点击（forbid：禁止）
        message: '登录中...' // 提示消息
      })
      try {
        const res = await login(userInfo)
        // const res = await login(JSON.stringify(userInfo))
        console.log('登陆成功', res)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登录失败', err)
          this.$toast.fail('登录失败，手机号或验证码错误')
        } else {
          console.log('登录失败，请稍候重试', err)
          this.$toast.fail('登录失败，手机号或验证码错误')
        }
      }
      //   login(user)
      //     .then(res => console.log(res))
      //     .catch(e => e)
      // 根据请求响应结果进行后续处理
    },
    onSendSms: async function() {
      // 校验手机号
      try {
        await this.$refs.userInfoRef.validate('mobile')
        console.log('验证通过')
      } catch (error) {
        // return console.log('验证失败', error)
        return this.$toast.fail(error.message)
      }
      // 倒计时
      this.showSmsBtn = false
      // this.time = 60000
      this.$refs.countDownRef.reset()
      this.$refs.countDownRef.start()
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.showSmsBtn = true
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    },
    countDownFinish: function() {
      this.showSmsBtn = true
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    background-color: #ededed;
    width: 158px;
    height: 46px;
    line-height: 46px;
    font-size: 22px !important;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
