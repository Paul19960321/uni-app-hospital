<template>
	<view class="p-48">
		<view class="result-content">
			<view class="">
				<image class="big-icon" src="/static/img/success.png" mode=""></image>
			</view>
			<view class="">
				<text class="result-title">授权成功</text>
			</view>
			<view class="btn-wrapper">
				<button class="default-btn circle" hover-class="default-hover" @click="handleClick">返回授权管理</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			handleClick() {
				uni.redirectTo({
					url: '../auth-manage/auth-manage'
				})
			}
		}
	}
</script>

<style>
</style>
