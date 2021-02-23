<template>
	<view class="login-agreement" :class="fixed ? 'fixed' : ''">
		<text>登录/注册即代表同意<text class="primary-txt">《隐私政策》</text>和<text class="primary-txt">《服务条款》</text></text>
	</view>
</template>

<script>
	export default {
		props: ['fixed']
	}
</script>

<style lang="scss">
	.login-agreement {
		font-size: 24rpx;
		line-height: 36rpx;
		color: $uni-text-color-placeholder;
		text-align: center;
		&.fixed {
			position: fixed;
			bottom: 140rpx;
			width: 100vw;
			left: 0;
		}
	}
</style>
