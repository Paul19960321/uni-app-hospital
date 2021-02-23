<template>
	<view class="p-48">
		<view class="">
			<u-form class="main-form" label-width="32" :model="pwdFindForm" ref="pwdFindForm" :error-type="['message']">
				<u-form-item prop="mobile">
					<view class="input-wrapper">
						<image class="form-item-icon" src="/static/icon/mobile_grey.png" mode=""></image>
						<u-input class="form-input" v-model="pwdFindForm.mobile" placeholder="请输入手机号" />
					</view>	
				</u-form-item>
				<u-form-item prop="code">
					<view class="input-wrapper">
						<image class="form-item-icon" src="/static/icon/code.png" mode=""></image>
						<u-input v-model="pwdFindForm.code" placeholder="请输入验证码" />
					</view>	
					<SmsButton slot="right" :mobile="pwdFindForm.mobile" :smsType="1" />
				</u-form-item>
				<u-form-item prop="password">
					<view class="input-wrapper">
						<image class="form-item-icon" src="/static/icon/password_grey.png" mode=""></image>
						<u-input class="form-input" type="password" v-model="pwdFindForm.password" placeholder="请输入密码" />
					</view>
				</u-form-item>
				<view class="pwd-rule warning-txt">
					<text>长度8~20位，字母/数字/标点符号至少包含2种；不允许输入空格或中文</text>
				</view>
			</u-form>
		</view>
		<view class="u-p-t-48 u-p-b-48">
			<button class="default-btn circle" hover-class="default-hover" @click="resetPwd">完成</button>
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
				pwdFindForm: {
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
			this.$refs.pwdFindForm.setRules(this.formRules)
		},
		methods: {
			resetPwd() {
				const _this = this
				this.$refs.pwdFindForm.validate(valid => {
					if (valid) {
						uni.showLoading({
							mask: true,
							success() {
								_this.$request({
									url: '/hospital/app/changePwd',
									method: 'post',
									data: _this.pwdFindForm
								}).then(res => {
									_this.$refs.pwdFindForm.resetFields()
									uni.navigateTo({
										url: '../result/find-pwd-success'
									})
								}).finally(() => {
									uni.hideLoading()
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
