<template>
	<view class="cell-group-wrapper">
		<u-cell-group class="cell-group" :border="false">
			<u-cell-item @click="navigateTo('/pages/acct-safty/mobile')" :arrow="false">
				<image class="mini-icon" src="../../static/icon/mobile.png" slot="icon" mode=""></image>
				<text class="cell-title" slot="title">绑定手机号</text>
				<text>{{ userInfo.mobile | dp(3, 4) }}</text>
				<image class="mini-icon u-m-r-0 u-m-l-16" src="../../static/icon/edit.png" slot="right-icon" mode=""></image>
			</u-cell-item>
			<u-cell-item @click="navigateTo('/pages/acct-safty/password')">
				<image class="mini-icon" src="../../static/icon/password.png" slot="icon" mode=""></image>
				<text class="cell-title" slot="title">登录密码</text>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		computed: mapState(['userInfo']),
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
