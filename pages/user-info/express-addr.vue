<template>
	<view class="">
		<view class="cell-group-wrapper" v-for="item in addrList" :key="item.id">
			<u-cell-group class="cell-group" :border="false">
				<u-cell-item @click="eidtAddr(item.id)" :arrow="false">
					<image class="mini-icon" src="../../static/icon/addr_grey.png" slot="icon" mode=""></image>
					<view class="cell-title" slot="title">
						<text class="u-m-r-24">{{ item.receiverName }}</text>
						<text>{{ item.receiverPhone | dp(3, 4) }}</text>
					</view>
					<text slot="label">{{ `${item.province}${item.city}${item.area}${item.address}` }}</text>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover" @click="toCreateAddr">新增收货地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addrList: []
			}
		},
		onShow() {
			this.getAddrList()
		},
		methods: {
			getAddrList() {
				const _this = this
				uni.showLoading({
					mask: true,
					success() {
						_this.$request({
							url: '/hospital/app/user/address',
							method: 'get'
						}).then(res => {
							_this.addrList = res || []
						}).finally(() => {
							uni.hideLoading()
						})
					}
				})
			},
			eidtAddr(id) {
				uni.navigateTo({
					url: `./express-addr-create?id=${id}`
				})
			},
			toCreateAddr() {
				uni.navigateTo({
					url: './express-addr-create'
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
