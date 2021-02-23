<template>
	<view>
		<scroll-view scroll-y="true" class="backlog-scroll-box">
			<u-gap height="20"></u-gap>
			<u-cell-group class="cell-group" :border="false">
				<u-cell-item hover-class="none" v-for="item in backlog" :key="item.id" :arrow="false">
					<image class="small-icon" src="../../static/icon/backlog.png" slot="icon" mode=""></image>
					<view class="cell-title u-p-t-14 u-p-b-14" slot="title">
						<text class="u-line-1">{{ item.title }}</text>
					</view>
					<view slot="right-icon" class="primary-txt u-text-center u-font-24">
						<template v-if="item.status === 0">
							<view class="">
								<image class="mini-icon u-m-r-0" src="../../static/icon/backlog_status1.png" mode=""></image>
							</view>
							<view class="">
								待支付
							</view>
						</template>
						<template v-else-if="item.status === 1">
							<view class="">
								<image class="mini-icon u-m-r-0" src="../../static/icon/backlog_status2.png" mode=""></image>
							</view>
							<view class="">
								待签署
							</view>
						</template>
						<template v-else-if="item.status === 2">
							<view class="">
								<image class="mini-icon u-m-r-0" src="../../static/icon/backlog_status3.png" mode=""></image>
							</view>
							<view class="">
								待补缴
							</view>
						</template>
						<template v-else-if="item.status === 3">
							<view class="">
								<image class="mini-icon u-m-r-0" src="../../static/icon/backlog_status4.png" mode=""></image>
							</view>
							<view class="">
								待自取
							</view>
						</template>
						<template v-else-if="item.status === 4">
							<view class="">
								<image class="mini-icon u-m-r-0" src="../../static/icon/backlog_status5.png" mode=""></image>
							</view>
							<view class="">
								待签收
							</view>
						</template>
					</view>
				</u-cell-item>
			</u-cell-group>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backlog: [{
					id: '1',
					title: '【123456】病案复印申请',
					status: 0
				}, {
					id: '2',
					title: '【123456】病案复印申请',
					status: 1
				}, {
					id: '3',
					title: '【123456】病案复印申请',
					status: 2
				}, {
					id: '4',
					title: '【123456】病案复印申请',
					status: 3
				}, {
					id: '5',
					title: '【123456】病案复印申请',
					status: 4
				}]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.backlog-scroll-box {
		height: 100vh;
	}
</style>
