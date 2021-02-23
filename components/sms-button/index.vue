<template>
	<view class="sms-btn-wrapper">
		<button
		size="mini"
		@click="getSms"
		:disabled="smsCountDown > 0"
		plain
		class="input-right-btn"
		type="default"
		v-if="btnStyle === 0">
		{{smsCountDown > 0 ? `剩余${smsCountDown}s` : '获取验证码'}}
		</button>
		<u-button
		size="mini"
		@click="getSms"
		:disabled="smsCountDown > 0"
		type="primary"
		plain
		v-if="btnStyle === 1">
		{{smsCountDown > 0 ? `剩余${smsCountDown}s` : '获取验证码'}}
		</u-button>
	</view>
</template>

<script>
	import { isMobile } from '../../utils/validate.js'
	import request from '../../utils/httpRequest.js'
	let timer
	export default {
		data() {
			return {
				smsCountDown: 0
			}
		},
		props: {
			mobile: String,
			btnStyle: {
				type: Number,
				default: 0
			},
			smsType: Number // 0: 注册，1: 修改密码，2: 验证法人手机号， 3: 验证码登录，4: 更换手机号
		},
		methods: {
			// 获取短信验证码
			getSms() {
				const _this = this
				if (!this.mobile) {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					})
					return
				}
				if (!isMobile(this.mobile)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					})
					return
				}
				uni.showLoading({
					mask: true,
					success() {
						request({
							url: '/hospital/sms/send',
							method: 'post',
							data: {
								mobile: _this.mobile,
								msgType: _this.smsType
							}
						}).then(res => {
							uni.showToast({
								icon: 'none',
								title: '发送成功'
							})
							_this.smsCountDown = 120
							timer = setInterval(() => {
								if (_this.smsCountDown > 0) {
									_this.smsCountDown -= 1
								} else {
									clearInterval(timer)
								}
							}, 1000)
							_this.$once('hook:beforeDestroy', () => {
								clearInterval(timer)
							})
							uni.hideLoading()
						})
					}
				})
			}
		}
	}
</script>

<style>
	.sms-btn-wrapper {
		display: flex;
		align-items: center;
	}
</style>
