<template>
	<view class="">
		<view class="cell-group-wrapper form-wrapper">
			<u-form label-width="auto">
				<u-form-item label="原手机号">
					<u-input inputAlign="right" :clearable="false" disabled placeholder="请输入手机号码"
					:value="userInfo.mobile | dp(3, 4)" />
				</u-form-item>
				<u-form-item label="短信验证码" label-position="top">
					<view class="space-btw">
						<u-input :clearable="false" placeholder="请输入6位短信验证码" v-model="code" />
						<SmsButton :mobile="userInfo.mobile" :smsType="4" :btnStyle="1" />
					</view>
				</u-form-item>
			</u-form>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover" @click="handleClick">下一步</button>
		</view>
		<view class="u-text-center primary-txt">
			<text @click="userCert">无法接收短信？</text>
		</view>
	</view>
</template>

<script>
	import SmsButton from '../../components/sms-button'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				code: ''
			}
		},
		components: {
			SmsButton
		},
		computed: mapState(['userInfo', 'userRealName']),
		methods: {
			// 验证短信验证码
			handleClick() {
				if (!this.code) {
					uni.showToast({
						icon: 'none',
						title: '请输入短信验证码',
					})
					return
				}
				const _this = this
				uni.showLoading({
					mask: true,
					success() {
						_this.$request({
							url: '/hospital/sms/verification',
							method: 'post',
							data: {
								mobile: _this.userInfo.mobile,
								content: _this.code,
								msgType: 4
							}
						}).then(res => {
							uni.navigateTo({
								url: './mobile-new'
							})
						})
					}
				})
			},
			// 用户身份认证
			userCert() {
				const _this = this
				uni.showLoading({
					mask: true,
					success() {
						_this.$request({
							url: '/hospital/sys/user/realname/save',
							method: 'post',
							data: {
								name: _this.userRealName.name,
								idCard: _this.userRealName.idCard
							}
						}).then(res => {
							if (res) {
								const url = encodeURIComponent(res)
								uni.hideLoading()
								uni.navigateTo({
									url: `../external/cert?url=${url}&redir=mobile`
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
</style>
