<template>
	<view class="cell-group-wrapper">
		<u-cell-group class="cell-group" :border="false">
			<u-cell-item @click="navigateTo('/pages/user-info/cert-info')">
				<image class="mini-icon" src="../../static/icon/cert_info.png" slot="icon" mode=""></image>
				<text class="cell-title" slot="title">实名认证信息</text>
			</u-cell-item>
			<u-cell-item @click="navigateTo('/pages/user-info/user-info')">
				<image class="mini-icon" src="../../static/icon/user_base_info.png" slot="icon" mode=""></image>
				<text class="cell-title" slot="title">个人基本信息</text>
			</u-cell-item>
			<u-cell-item @click="navigateTo('/pages/user-info/express-addr')">
				<image class="mini-icon" src="../../static/icon/addr.png" slot="icon" mode=""></image>
				<text class="cell-title" slot="title">收件地址</text>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
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
