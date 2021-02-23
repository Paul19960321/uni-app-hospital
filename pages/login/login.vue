<template>
	<view class="">
		<image class="login-bg" src="../../static/img/login_bg.png" mode=""></image>
		<view class="p-48 u-p-t-32">
			<view>
				<u-tabs
				:list="list"
				:is-scroll="false"
				:current="tabIndex"
				active-color="#3388FF"
				bar-width="270"
				bar-height="2"
				height="80"
				inactive-color="rgba(0, 0, 0, 0.85)"
				font-size="32"
				@change="handleTabChange"
				:bold="false">
				</u-tabs>
			</view>
			<view class="form-wrapper">
				<swiper style="height: 220rpx;" :autoplay="false" :current="tabIndex" @change="handleChange">
					<swiper-item>
						<view class="swiper-item">
							<u-form class="main-form" label-width="32" :model="codeForm" ref="codeForm" :error-type="['toast']">
								<u-form-item prop="username">
									<view class="input-wrapper">
										<image class="form-item-icon" src="/static/icon/mobile_grey.png" mode=""></image>
										<u-input class="form-input" :clearable="false" v-model="codeForm.username" placeholder="请输入手机号" />
									</view>	
								</u-form-item>
								<u-form-item prop="code">
									<view class="input-wrapper">
										<image class="form-item-icon" src="/static/icon/code.png" mode=""></image>
										<u-input v-model="codeForm.code" :clearable="false" placeholder="请输入验证码" />
									</view>	
									<SmsButton slot="right" :mobile="codeForm.username" :smsType="3" />
								</u-form-item>
							</u-form>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<u-form class="main-form" label-width="32" :model="pwdForm" ref="pwdForm" :error-type="['toast']">
								<u-form-item prop="mobile">
									<view class="input-wrapper">
										<image class="form-item-icon" src="/static/icon/mobile_grey.png" mode=""></image>
										<u-input type="text" :clearable="false" class="form-input" v-model="pwdForm.mobile" placeholder="请输入手机号" />
									</view>
								</u-form-item>
								<u-form-item prop="password">
									<view class="input-wrapper">
										<image class="form-item-icon" src="/static/icon/password_grey.png" mode=""></image>
										<u-input class="form-input" :clearable="false" type="password" v-model="pwdForm.password" placeholder="请输入密码" />
									</view>
								</u-form-item>
							</u-form>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view>
				<button class="default-btn circle" hover-class="default-hover" @click="login">立即登录</button>
			</view>
			<view class="space-btw u-p-t-32 u-p-b-80">
				<navigator hover-class="none" url="../pwd-find/pwd-find">忘记密码</navigator>
				<navigator hover-class="none" class="primary-txt" url="../register/register">用户注册</navigator>				
			</view>
			<view class="u-m-b-20">
				<button v-if="!!weixinToken" @click="wechatLogin()" class="auth-btn" plain type="default">
					<image src="/static/img/wechat.png" mode=""></image>
					<text>微信登录</text>
				</button>
				<button v-else @getphonenumber="wechatAuthLogin" open-type="getPhoneNumber" class="auth-btn" plain type="default">
					<image src="/static/img/wechat.png" mode=""></image>
					<text>微信登录</text>
				</button>
			</view>
			<LoginAgreement />
		</view>
	</view>
</template>

<script>
	import SmsButton from '../../components/sms-button'
	import LoginAgreement from '../../components/login-agreement/index.vue'
	export default {
		data() {
			return {
				weixinOpenId: '',
				weixinToken: '',
				pwdForm: {
					mobile: '',
					password: ''
				},
				codeForm: {
					username: '',
					code: ''
				},
				list: [{
					name: '验证码登录'
				}, {
					name: '密码登录'
				}],
				tabIndex: 0,
				pwdFormRules: {
					mobile: [
						{ 
							required: true, 
							message: '请输入账号',
							trigger: ['change']
						}
					],
					password: [
						{
							required: true,
							message: '请输入密码',
							trigger: ['change']
						}
					]
				},
				codeFormRules: {
					username: [
						{ 
							required: true, 
							message: '请输入手机号码',
							trigger: ['change']
						}
					],
					code: [
						{
							required: true,
							message: '请输入验证码',
							trigger: ['change']
						}
					]
				}
			};
		},
		components: {
			SmsButton,
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
		onLoad(options) {
			this.weixinToken = options.weixinToken || ''
			this.weixinOpenId = options.weixinOpenId || ''
		},
		onReady() {
			this.$refs.pwdForm.setRules(this.pwdFormRules)
			this.$refs.codeForm.setRules(this.codeFormRules)
		},
		methods: {
			handleChange(event) {
				const { detail } = event
				this.tabIndex = detail.current
			},
			handleTabChange(idx) {
				this.tabIndex = idx
			},
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
			},
			// 登录
			login() {
				switch(this.tabIndex) {
					case 0:
						this.smsLogin()
						break
					case 1:
						this.pwdLogin()
						break
				}
			},
			// 密码登录
			pwdLogin() {
				const _this = this
				this.$refs.pwdForm.validate(valid => {
					if (valid) {
						uni.showLoading({
							mask: true,
							success() {
								_this.$request({
									url: '/hospital/app/user/account/login',
									data: _this.pwdForm,
									method: 'post'
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
				})
			},
			// 获取用户信息
			getUserInfo() {
				this.$request({
					url: '/hospital/sys/user/info',
					method: 'get'
				}).then(res => {
					this.userInfo = res
					uni.navigateTo({
						url: '../index/index'
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			// 验证码登录
			smsLogin() {
				const _this = this
				this.$refs.codeForm.validate(valid => {
					if (valid) {
						uni.showLoading({
							mask: true,
							success() {
								_this.$request({
									url: '/hospital/sys/loginForSMS',
									data: _this.codeForm,
									method: 'post'
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
				})
			}
		},
	}
</script>

<style lang="scss">
	.login-bg {
		width: 100vw;
		height: calc(100vw * .8);
	}
	.form-wrapper {
		padding: 48rpx 0;
	}
	.auth-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 0!important;
		image {
			height: 88rpx;
			width: 88rpx;
		}
		text {
			font-size: 24rpx;
			color: rgba(0, 10, 26, 0.65);
			white-space: nowrap;
		}
	}
</style>
