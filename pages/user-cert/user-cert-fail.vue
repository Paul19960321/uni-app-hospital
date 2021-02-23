<template>
	<view class="">
		<view class="cert-steps">
			<text class="current-step">身份信息</text>
			<u-icon class="step-arrow" name="arrow-right"></u-icon>
			<text>人脸识别</text>
			<u-icon class="step-arrow" name="arrow-right"></u-icon>
			<text>认证完成</text>
		</view>
		<view class="page-content">
			<view class="result-content">
				<view class="">
					<image class="result-icon" src="/static/icons/fail.png" mode=""></image>
				</view>
				<view class="">
					<text class="result-title">实名认证失败</text>
				</view>
				<view class="result-info">
					<text>请您确保身份信息无误后再次进行认证</text>
				</view>
				<view class="main-btn-wrapper">
					<u-button type="primary" @click="handleClick">再试一次</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../user-cert/user-cert'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}
</style>
