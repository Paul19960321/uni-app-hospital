<template>
	<view class="p-48">
		<view class="result-content">
			<view class="">
				<image class="big-icon" src="/static/img/success.png" mode=""></image>
			</view>
			<view class="">
				<text class="result-title">更换手机号成功</text>
			</view>
			<view class="result-info">
				<text>后续您可使用新手机号进行登录</text>
			</view>
			<view class="btn-wrapper">
				<button class="default-btn circle" hover-class="default-hover" @click="handleClick">返回个人中心</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			handleClick() {
				uni.switchTab({
					url: '../user/user'
				})
			}
		}
	}
</script>

<style>
</style>
