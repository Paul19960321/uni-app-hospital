<template>
	<view class="p-48">
		<view class="">
			<u-form class="main-form" label-width="32" :model="regForm" ref="regForm" :error-type="['toast']">
				<u-form-item prop="mobile">
					<view class="input-wrapper">
						<image class="form-item-icon" src="/static/icon/mobile_grey.png" mode=""></image>
						<u-input class="form-input" :clearable="false" v-model="regForm.mobile" placeholder="请输入手机号" />
					</view>	
				</u-form-item>
				<u-form-item prop="code">
					<view class="input-wrapper">
						<image class="form-item-icon" src="/static/icon/code.png" mode=""></image>
						<u-input v-model="regForm.code" :clearable="false" placeholder="请输入验证码" />
					</view>	
					<SmsButton slot="right" :mobile="regForm.mobile" :smsType="0" />
				</u-form-item>
				<u-form-item prop="password">
					<view class="input-wrapper">
						<image class="form-item-icon" src="/static/icon/password_grey.png" mode=""></image>
						<u-input class="form-input" :clearable="false" type="password" v-model="regForm.password" placeholder="请输入密码" />
					</view>
				</u-form-item>
				<view class="pwd-rule warning-txt">
					<text>长度8~20位，字母/数字/标点符号至少包含2种；不允许输入空格或中文</text>
				</view>
			</u-form>
		</view>
		<view class="u-p-t-48 u-p-b-48">
			<button class="default-btn circle" hover-class="default-hover" @click="register">完成</button>
		</view>
		<view class="u-text-center primary-txt">
			<navigator hover-class="none" url="../login/login">已有账号，立即登录</navigator>
		</view>
	</view>
</template>

<script>
	import { pwdValid } from '@/utils/validate.js'
	import SmsButton from '../../components/sms-button'
	export default {
		data() {
			var validatePwd = (rule, value, callback) => {
			  if (value === '') {
				callback(new Error('登录密码不能为空'))
			  } else if (!pwdValid(value)) {
				callback(new Error('长度8~20位，字母/数字/标点符号至少包含2种；不允许输入空格或中文'))
			  } else {
				callback()
			  }
			}
			return {
				regForm: {
					mobile: '',
					code: '',
					password: ''
				},
				formRules: {
					mobile: [
						{
							required: true, 
							message: '请输入手机号',
							trigger: ['change']
						}
					],
					code: [
						{
							required: true, 
							message: '请输入验证码',
							trigger: ['change']
						}
					],
					password: [
						{
							required: true, 
							message: '请输入密码',
							trigger: ['change']
						}, {
							validator: validatePwd,
							trigger: 'change'
						}
					]
				}
			}
		},
		components: {
			SmsButton
		},
		onReady() {
			this.$refs.regForm.setRules(this.formRules)
		},
		methods: {
			register() {
				const _this = this
				this.$refs.regForm.validate(valid => {
					if (valid) {
						uni.showLoading({
							mask: true,
							success() {
								_this.$request({
									url: '/hospital/app/user/account/register',
									method: 'post',
									data: _this.regForm
								}).then(res => {
									uni.navigateTo({
										url: `../result/register-success?username=${_this.regForm.mobile}&password=${_this.regForm.password}`
									})
								}).finally(() => {
									uni.hideLoading()
								})
							}
						})
					}
				})
			},
			toLogin() {
				uni.redirectTo({
					url: '../login/login'
				})
			}
		}
	}
</script>

<style>

</style>
