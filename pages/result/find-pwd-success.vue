<template>
	<view class="p-48">
		<view class="result-content">
			<view class="">
				<image class="big-icon" src="/static/img/success.png" mode=""></image>
			</view>
			<view class="">
				<text class="result-title">重置密码成功</text>
			</view>
			<view class="result-info">
				<text>为保证您的账户安全，请重新登录</text>
			</view>
			<view class="btn-wrapper">
				<button class="default-btn circle" hover-class="default-hover" @click="handleClick">立即登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../login/login'
				})
			}
		}
	}
</script>

<style>
</style>
