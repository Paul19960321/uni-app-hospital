<template>
	<view>
		<image class="user-bg" src="../../static/img/user_bg.png" mode=""></image>
		<view class="user-info-panel">
			<image class="avatar" v-if="userType === 0" src="../../static/img/patient_avatar.png" mode=""></image>
			<image class="avatar" v-else src="../../static/img/doctor_avatar.png" mode=""></image>
			<view class="user-info">
				<view class="user-name">
					<text>{{ userInfo.userName }}</text>
				</view>
				<view class="user-mobile">
					<text>{{ userInfo.mobile | dp(3, 4) }}</text>
				</view>
			</view>
		</view>
		<view class="u-p-l-32 u-p-r-32">
			<view class="user-main-menu">
				<u-row slot="body">
					<u-col span="4" text-align="center">
						<navigator url="" hover-class="none">
							<view class="">
								<image class="menu-icon" src="../../static/img/scan.png" mode=""></image>
							</view>
							<view class="">
								<text class="menu-title">扫码取件</text>
							</view>
						</navigator>
					</u-col>
					<u-col span="4" text-align="center">
						<navigator url="../apply/apply" hover-class="none">
							<view class="">
								<image class="menu-icon" src="../../static/img/apply.png" mode=""></image>
							</view>
							<view class="">
								<text class="menu-title">我的申请</text>
							</view>
						</navigator>
					</u-col>
					<u-col span="4" text-align="center">
						<navigator url="../backlog/backlog" hover-class="none">
							<view class="">
								<image class="menu-icon" src="../../static/img/event.png" mode=""></image>
							</view>
							<view class="">
								<text class="menu-title">我的代办</text>
							</view>
						</navigator>
					</u-col>
				</u-row>
			</view>
		</view>
		<u-cell-group :border="false" class="cell-group">
			<u-cell-item @click="navigateTo('/pages/user-info/index')">
				<image class="mini-icon" src="../../static/icon/user_info.png" slot="icon" mode=""></image>
				<text class="cell-title" slot="title">个人信息</text>
			</u-cell-item>
			<u-cell-item @click="navigateTo('/pages/acct-safty/index')">
				<image class="mini-icon" src="../../static/icon/acct_safty.png" slot="icon" mode=""></image>
				<text class="cell-title" slot="title">账户安全</text>
			</u-cell-item>
			<u-cell-item @click="navigateTo('/pages/medical-info/medical-info')">
				<image class="mini-icon" src="../../static/icon/medical_info.png" slot="icon" mode=""></image>
				<text class="cell-title" slot="title">我的住院信息</text>
			</u-cell-item>
			<u-cell-item @click="navigateTo('/pages/auth-manage/auth-manage')">
				<image class="mini-icon" src="../../static/icon/auth_manage.png" slot="icon" mode=""></image>
				<text class="cell-title" slot="title">授权管理</text>
			</u-cell-item>
		</u-cell-group>
		<view class="u-m-t-40 u-p-l-32 u-p-r-32">
			<button class="default-btn plain circle" @click="logout"><text class="error-txt u-font-32">退出登录</text></button>
		</view>	
		<Tabbar />
	</view>
</template>

<script>
	import Tabbar from '../../components/tabbar/index.vue'
	import { mapState } from 'vuex'
	import { logout } from '../../utils/utils.js'
	export default {
		components: {
			Tabbar
		},
		computed: mapState(['userType', 'userInfo']),
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			logout: logout
		}
	}
</script>

<style lang="scss">
	.user-bg {
		width: 100vw;
		position: fixed;
		z-index: -1;
		left: 0;
		top: 0;
		height: 510rpx;
	}
	.avatar {
		height: 160rpx;
		width: 160rpx;
		margin-right: 32rpx;
	}
	.user-info-panel {
		margin-top: calc(var(--status-bar-height) + 30rpx);
		padding: 72rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		.user-info {
			display: flex;
			flex-direction: column;
			color: #FFFFFF;
			.user-name {
				font-size: 36rpx;
				line-height: 56rpx;
			}
			.user-mobile {
				font-size: 28rpx;
				line-height: 44rpx;
			}
		}
	}
	.user-main-menu {
		background-color: #FFFFFF;
		text-align: center;
		padding: 50rpx;
		border-radius: 24rpx;
		margin-bottom: 36rpx;
		box-shadow: 0px 2px 32rpx rgba(0, 0, 0, 0.08);
		.menu-icon {
			height: 64rpx;
			width: 64rpx;
		}
		.menu-title {
			color: $uni-text-color-placeholder;
			font-size: 24rpx;
			line-height: 36rpx;
		}
	}
</style>
