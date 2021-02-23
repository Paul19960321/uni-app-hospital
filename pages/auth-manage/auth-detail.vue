<template>
	<view class="">
		<view class="cell-group-wrapper panel">
			<view class="u-font-32">被授权人信息</view>
			<view class="space-btw u-font-28">
				<view class="info-txt">
					<view class="">关系：</view>
					<view class="">被授权人姓名：</view>
					<view class="">被授权人手机号：</view>
					<view class="">被授权人证件号：</view>
				</view>
				<view class="u-text-right">
					<view class="">{{ detail.rel }}</view>
					<view class="">{{ detail.name }}</view>
					<view class="">{{ detail.mobile | dp(3, 4) }}</view>
					<view class="">{{ detail.idCard | dp(3, 11) }}</view>
				</view>
			</view>
		</view>
		<view class="cell-group-wrapper panel">
			<view class="space-btw">
				<view class="u-font-32">
					授权委托书
				</view>
				<image class="auth-status" v-if="detail.status === 0" src="../../static/icon/auth.png" mode=""></image>
				<image class="auth-status" v-else-if="detail.status === 1" src="../../static/icon/auth_grey.png" mode=""></image>
				<image class="auth-status" v-else-if="detail.status === 2" src="../../static/icon/auth_await.png" mode=""></image>
			</view>
			<view class="space-btw u-font-28">
				<view class="info-txt">
					<view class="">办理医院</view>
					<view class="">授权有效期至</view>
					<view class="">发起委托书签署时间</view>
					<view class="">授权委托书</view>
				</view>
				<view class="u-text-right">
					<view class="">{{ detail.hospital }}</view>
					<view class="">{{ detail.endTime }}</view>
					<view class="">{{ detail.signTime }}</view>
					<view class="primary-txt">
						<image src="../../static/icon/check.png" class="mini-icon check-icon" mode=""></image>
						<text>立即查看</text>
					</view>
				</view>
			</view>
		</view>
		<view class="p-48">
			<button class="default-btn circle u-m-b-38" hover-class="default-hover">签署授权书</button>
			<button class="default-btn plain circle"><text class="error-txt">取消授权</text></button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {
					rel: '亲人',
					mobile: '13912340987',
					name: '章明珲',
					idCard: '610123456789010987',
					hospital: '南方医科大学深圳附属医院',
					endTime: '2020.09.09',
					signTime: '2020.09.09 09:09:09',
					status: 0
				}
			}
		},
		onLoad(options) {
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.cell-title {
		display: flex;
		justify-content: space-between;
		align-items: top;
	}
	.auth-status {
		height: 96rpx;
		width: 96rpx;
	}
	.check-icon {
		vertical-align: -4rpx;
		margin-right: 4rpx;
	}
</style>
