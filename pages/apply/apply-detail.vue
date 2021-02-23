<template>
	<view class="">
		<u-notice-bar mode="horizontal" :list="notice" speed="100" font-size="24" padding="14rpx 24rpx"></u-notice-bar>
		<u-cell-group class="cell-group addr-cell" :border="false">
			<u-cell-item :arrow="false">
				<image class="mini-icon" src="../../static/icon/addr_grey.png" slot="icon" mode=""></image>
				<view class="cell-title" slot="title">
					<text class="u-m-r-24">{{ detail.name }}</text>
					<text>{{ detail.mobile | dp(3, 4) }}</text>
				</view>
				<text slot="label">{{ detail.address }}</text>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice: ['请在18小时57分钟年内完成支付'],
				detail: {
					name: '章明珲',
					mobile: '13912340987',
					address: '广东省深圳市南山区桂湾五路深港基金小镇基金小镇44栋403'
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