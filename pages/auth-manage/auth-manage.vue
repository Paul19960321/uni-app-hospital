<template>
	<view>
		<u-row class="tabs-wrapper">
			<u-col span="6" offset="3">
				<u-tabs-swiper
				:current="current"
				:bold="false"
				:active-color="activeColor"
				:inactive-color="inactiveColor"
				:list="list"
				ref="uTabs"
				@change="tabsChange"
				bar-height="2"
				font-size="28"
				:is-scroll="false"></u-tabs-swiper>
			</u-col>
		</u-row>
		<swiper class="auth-swiper" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(tab, index) in list" :key="index">
				<scroll-view scroll-y class="auth-list">
					<u-gap height="1"></u-gap>
					<view class="cell-group-wrapper" v-for="item in authList" :key="item.id">
						<view class="patient-cell-item" @click="viewDetail(item.id)" :class="item.status !== 0 ? 'unauth' : ''">
							<view class="">
								<image class="auth-icon" v-if="item.status === 0" src="../../static/icon/auth_icon.png" mode=""></image>
								<image class="auth-icon" v-else src="../../static/icon/auth_icon_grey.png" mode=""></image>
							</view>
							<view class="item-info">
								<view class="u-font-32">
									{{ item.name }} （{{ item.mobile | dp(3, 4) }}）
								</view>
								<view class="u-font-24">
									授权有效期至：{{ item.endTime }}
								</view>
								<view class="u-font-24">
									{{ item.hospital }}
								</view>
							</view>
							<image class="auth-mark" v-if="item.status === 0" src="../../static/icon/auth.png" mode=""></image>
							<image class="auth-mark" v-else src="../../static/icon/auth_grey.png" mode=""></image>
						</view>
					</view>
					<view class="p-48">
						<button class="default-btn circle" hover-class="default-hover" @click="toAuthCreate">新增授权</button>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				swiperCurrent: 0,
				inactiveColor: 'rgba(0, 0, 0, 0.45)',
				activeColor: '#3388FF',
				list: [{
					name: '授权我的'
				}, {
					name: '我授权的'
				}],
				authList: [{
					id: 1,
					name: '章明鸿',
					mobile: '13912340987',
					endTime: '2020.09.09',
					hospital: '南方医科大学深圳附属医院',
					status: 0
				}, {
					id: 2,
					name: '章明鸿',
					mobile: '13912340987',
					endTime: '2020.09.09',
					hospital: '南方医科大学深圳附属医院',
					status: 1
				}]
			}
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			transition(e) {
				let dx = e.detail.dx
				this.$refs.uTabs.setDx(dx)
			},
			animationfinish(e) {
				let current = e.detail.current
				this.$refs.uTabs.setFinishCurrent(current)
				this.swiperCurrent = current
				this.current = current
			},
			viewDetail(id) {
				uni.navigateTo({
					url: `./auth-detail?id=${id}`
				})
			},
			toAuthCreate() {
				uni.navigateTo({
					url: './auth-create'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.auth-swiper, .auth-list {
		height: calc(100vh - 80rpx);
	}
</style>
