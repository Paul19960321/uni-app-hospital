<template>
	<view class="u-text-center">
		<image class="cert-img" src="../../static/img/cert_img.png" mode=""></image>
		<view class="result-info">
			为了您更好的使用服务，请尽快完成实名认证
		</view>
		<view class="p-48">
			<button class="default-btn circle" @click="navigateTo" hover-class="default-hover">去实名认证</button>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			navigateTo() {
				uni.navigateTo({
					url: './user-cert'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.cert-img {
		height: 280rpx;
		width: 240rpx;
		margin-top: 160rpx;
		margin-bottom: 32rpx;
	}
</style>
