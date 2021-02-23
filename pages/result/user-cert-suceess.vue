<template>
	<view class="p-48">
		<view class="result-content">
			<view class="">
				<image class="big-icon" src="/static/img/success.png" mode=""></image>
			</view>
			<view class="">
				<text class="result-title">实名认证成功</text>
			</view>
			<view class="btn-wrapper">
				<button class="default-btn circle" hover-class="default-hover" @click="handleClick">返回首页{{ countdown }}s</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				countdown: 3
			}
		},
		onLoad() {
			let timer = setInterval(() => {
				if (this.countdown > 0) {
					this.countdown -= 1
				} else {
					this.handleClick()
					clearInterval(timer)
				}
			}, 1000)
			this.$once('hook:beforeDestroy', () => {
				clearInterval(timer)
			})
		},
		methods: {
			async handleClick() {
				try {
					const userInfo = await this.$request({
						url: '/hospital/app/user',
						method: 'get'
					})
					this.$store.commit('updateUserInfo', userInfo)
					uni.switchTab({
						url: '../index/index'
					})
				} catch(err) {
					uni.showToast({
						icon: 'none',
						title: err
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
</style>
