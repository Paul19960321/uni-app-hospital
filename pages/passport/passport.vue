<template>
	<view class="u-text-center">
		<image class="page-bg-img" src="/static/img/passport_bg.png" mode=""></image>
		<view class="logo-wrapper">
			<image class="default-icon u-m-b-30" src="../../static/img/logo.png" mode=""></image>
			<view class="">
				<text>麦昇智慧健康档案</text>
			</view>
		</view>
		<view class="p-48 u-p-t-0">
			<button v-if="!!weixinToken" @click="wechatLogin()" class="default-btn circle" hover-class="default-hover">
				<image class="small-icon btn-icon" src="../../static/icon/wechat.png" mode=""></image>微信登录
			</button>
			<button v-else @getphonenumber="wechatAuthLogin" open-type="getPhoneNumber" class="default-btn circle" hover-class="default-hover">
				<image class="small-icon btn-icon" src="../../static/icon/wechat.png" mode=""></image>微信登录
			</button>
		</view>
		<view class="primary-txt u-font-32">
			<navigator hover-class="none" :url="`../login/login?token=${weixinToken}&openId=${weixinOpenId}`">手机号登录/注册</navigator>
		</view>
		<LoginAgreement :fixed="true" />
	</view>
</template>

<script>
	import LoginAgreement from '../../components/login-agreement/index.vue'
	export default {
		data() {
			return {
				weixinToken: '',
				weixinOpenId: ''
			}
		},
		components: {
			LoginAgreement
		},
		computed: {
			userInfo: {
				get() {
					return this.$store.state.userInfo
				},
				set(val) {
					this.$store.commit('updateUserInfo', val)
				}
			}
		},
		onLoad() {
			const _this = this
			// 服务器是否已保存用户信息
			uni.showLoading({
				mask: true,
				success() {
					uni.login({
						provider: 'weixin',
						success(res) {
							const weixinCode = res.code
							if (weixinCode) {
								_this.$request({
									url: '/hospital/wx/Sentinel/login?code=' + weixinCode,
									method: 'post'
								}).then(res => {
									if (res.code && res.code === 201) {
										_this.weixinOpenId = res.data
									} else {
										_this.weixinToken = res
									}
								}).finally(() => {
									uni.hideLoading()
								})
							}
						}
					})
				}
			})
		},
		methods: {
			wechatLogin() {
				const _this = this
				uni.setStorage({
					key: 'token',
					data: _this.weixinToken,
					success() {
						_this.getUserInfo()
					}
				})
			},
			// 获取用户信息
			getUserInfo() {
				this.$request({
					url: '/hospital/app/user',
					method: 'get'
				}).then(res => {
					this.userInfo = res
					uni.switchTab({
						url: '../index/index'
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			// 微信授权登录
			wechatAuthLogin(e) {
				if (e.detail.iv && e.detail.encryptedData) {
					const _this = this
					uni.showLoading({
						mask: true,
						success() {
							_this.$request({
								url: '/hospital/wx/Sentinel/register',
								method: 'post',
								data: {
									openId: _this.weixinOpenId,
									mobileEncryptedData: e.detail.encryptedData,
									mobileIv: e.detail.iv,
								}
							}).then(res => {
								uni.setStorage({
									key: 'token',
									data: res.token,
									success() {
										_this.getUserInfo()
									}
								})
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.logo-wrapper {
		padding: 300rpx 0;
		text {
			font-size: 16px;
			line-height: 22px;
			letter-spacing: 4rpx;
		}
	}
</style>
