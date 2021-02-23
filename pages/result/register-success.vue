<template>
	<view class="p-48">
		<view class="result-content">
			<view class="">
				<image class="big-icon" src="/static/img/success.png" mode=""></image>
			</view>
			<view class="">
				<text class="result-title">注册成功</text>
			</view>
			<view class="result-info">
				<text>后续您可以直接使用手机号码进行登录，为了您更好的使用服务，请及时完成实名认证</text>
			</view>
			<view class="btn-wrapper">
				<button class="default-btn circle" hover-class="default-hover" @click="handleClick">去实名认证</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		onLoad(options) {
			this.username = options.username
			this.password = options.password
		},
		methods: {
			handleClick() {
				this.$request({
					url: '/hospital/sys/login',
					method: 'post',
					data: {
						username: this.username,
						password: this.password
					}
				}).then(res => {
					uni.navigateTo({
						url: '../user-cert/user-cert'
					})
				})
			}
		}
	}
</script>

<style>
</style>
