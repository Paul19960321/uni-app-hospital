<template>
	<view class="p-48">
		<view class="result-content">
			<view class="">
				<image class="big-icon" src="/static/img/fail.png" mode=""></image>
			</view>
			<view class="">
				<text class="result-title">实名认证失败</text>
			</view>
			<view class="btn-wrapper">
				<button class="default-btn circle" hover-class="default-hover" @click="handleClick">重新认证</button>
			</view>
			<view class="result-info">
				<text>人脸识别遇到问题？</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			handleClick() {
				uni.redirectTo({
					url: '../user-cert/user-cert'
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
