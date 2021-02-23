<template>
	<view class="">
		<image class="index-bg" src="/static/img/index_bg.png"></image>
		<view class="u-p-t-32 u-p-l-30 u-p-r-30">
			<view class="u-text-center" v-if="backlog.length === 0">
				<image class="backlog-empty-img" src="../../static/img/backlog_empty.png" mode=""></image>
				<view class="">
					<text>暂无待办</text>
				</view>
			</view>
			<template v-else>
				<view class="backlog-item" v-for="item in backlog" :key="item.id">
					<image class="small-icon" src="../../static/icon/backlog.png" mode=""></image>
					<text class="u-line-1">{{ item.title }}</text>
					<view class="backlog-status primary-txt u-text-center u-font-24">
						<template v-if="item.state === 0">
							<view class="">
								<image class="mini-icon u-m-r-0" src="../../static/icon/backlog_status1.png" mode=""></image>
							</view>
							<view class="">
								待支付
							</view>
						</template>
						<template v-else-if="item.state === 1">
							<view class="">
								<image class="mini-icon u-m-r-0" src="../../static/icon/backlog_status2.png" mode=""></image>
							</view>
							<view class="">
								待签署
							</view>
						</template>
						<template v-else-if="item.state === 2">
							<view class="">
								<image class="mini-icon u-m-r-0" src="../../static/icon/backlog_status3.png" mode=""></image>
							</view>
							<view class="">
								待补缴
							</view>
						</template>
						<template v-else-if="item.state === 3">
							<view class="">
								<image class="mini-icon u-m-r-0" src="../../static/icon/backlog_status4.png" mode=""></image>
							</view>
							<view class="">
								待自取
							</view>
						</template>
						<template v-else-if="item.state === 4">
							<view class="">
								<image class="mini-icon u-m-r-0" src="../../static/icon/backlog_status5.png" mode=""></image>
							</view>
							<view class="">
								待签收
							</view>
						</template>
					</view>
				</view>
				<view class="u-text-center primary-txt u-font-28">
					<navigator url="../backlog/backlog" hover-class="none">更多待办...</navigator>
				</view>
			</template>
		</view>
		<Tabbar />
	</view>
</template>

<script>
	import Tabbar from '../../components/tabbar/index.vue'
	export default {
		data() {
			return {
				backlog: [{
					id: '1',
					title: 'asdadad',
					state: 1
				}]
			}
		},
		components: {
			Tabbar
		},
		computed: {
			userInfo: {
				get() {
					return this.$store.state.userInfo
				},
				set(val) {
					this.$store.commit('updateUserInfo', val)
				}
			},
			userRealName: {
				get() {
					return this.$store.state.userRealName
				},
				set(val) {
					this.$store.commit('updateUserRealName', val)
				}
			}
		},
		async onLoad() {
			const token = uni.getStorageSync('token')
			if (!token) {
				uni.redirectTo({
					url: '../passport/passport'
				})
				return
			}
			if (!this.userInfo) {
				try {
					this.userInfo = await this.$request({
						url: '/hospital/app/user',
						method: 'get'
					})
				} catch (err) {
					return
				}
			}
			if (!this.userInfo.userRealName || (this.userInfo.userRealName && !this.userInfo.userRealName.verification)) {
				uni.redirectTo({
					url: '../user-cert/index'
				})
				return
			}
			// this.getBacklog()
		},
		methods: {
			getBacklog() {
				const _this = this
				uni.showLoading({
					mask: true,
					success() {
						_this.$request({
							url: '/hospital/app/user/fund/query',
							method: 'post',
							data: {
								page: 1,
								limit: 2
							}
						}).then(res => {
							_this.backlog = res.list
						}).finally(() => {
							uni.hideLoading()
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.index-bg {
		height: calc(100vw * .8);
		width: 100vw;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.backlog-item {
		box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.06);
		border-radius: 12px;
		padding: 24rpx 32rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 32rpx;
		.backlog-status {
			padding: 12rpx 0 12rpx 32rpx ;
			border-left: 1px solid #F2F3F5;
			margin-left: auto;
		}
	}
	.backlog-empty-img {
		width: 280rpx;
		height: 200rpx;
	}
</style>
