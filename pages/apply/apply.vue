<template>
	<view>
		<scroll-view scroll-y="true" >
			<u-gap height="20"></u-gap>
			<view v-for="item in applyList" @click="viewDetail(item.id)" :key="item.id">
				<u-cell-group class="cell-group" :border="false">
					<u-cell-item hover-class="none" :arrow="false">
						<image class="small-icon u-m-r-16" src="../../static/icon/apply.png" slot="icon" mode=""></image>
						<view class="cell-title u-p-t-14 u-p-b-14" slot="title">
							<text class="u-line-1">申请单号【{{ item.num }}】</text>
						</view>
						<view slot="right-icon" class="primary-txt u-font-24 u-flex">
							<template v-if="item.status === 0">
								<image class="mini-icon u-m-r-4" src="../../static/icon/backlog_status1.png" mode=""></image>
								<text>待支付</text>
							</template>
							<template v-else-if="item.status === 1">
								<image class="mini-icon u-m-r-4" src="../../static/icon/backlog_status2.png" mode=""></image>
								<text>待签署</text>
							</template>
							<template v-else-if="item.status === 2">
								<image class="mini-icon u-m-r-4" src="../../static/icon/backlog_status3.png" mode=""></image>
								<text>待补缴</text>
							</template>
							<template v-else-if="item.status === 3">
								<image class="mini-icon u-m-r-4" src="../../static/icon/backlog_status4.png" mode=""></image>
								<text>待自取</text>
							</template>
							<template v-else-if="item.status === 4">
								<image class="mini-icon u-m-r-4" src="../../static/icon/backlog_status5.png" mode=""></image>
								<text>待签收</text>
							</template>
						</view>
					</u-cell-item>
					<u-cell-item hover-class="none" :arrow="false">
						<view class="space-btw">
							<view class="info-txt u-text-left">
								<view class="">患者姓名</view>
								<view class="">入院日期</view>
								<view class="">应付金额</view>
							</view>
							<view class="cell-title">
								<view class="">{{ item.name }}</view>
								<view class="">{{ item.time }}</view>
								<view class="">￥{{ item.price }}</view>
							</view>
						</view>
						<view class="" v-if="item.status === 0">
							<u-button type="primary" size="mini" plain shape="circle">立即支付</u-button>
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				applyList: [{
					num: '2020090909090909',
					name: '章明珲',
					time: '2020.09.09',
					price: '92.0',
					status: 0
				}]
			}
		},
		methods: {
			viewDetail(id) {
				uni.navigateTo({
					url: `./apply-detail?id=${id}`
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
