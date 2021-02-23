<template>
	<view class="">
		<view class="cell-group-wrapper" @click="eidtMedicalInfo(item.id)" v-for="item in medicalInfoList" :key="item.id">
			<u-cell-group class="cell-group" :border="false">
				<u-cell-item hover-class="none" :arrow="false">
					<image class="mini-icon" src="../../static/icon/hospital_logo.png" slot="icon" mode=""></image>
					<view class="cell-title" slot="title">
						<text class="">{{ item.name }}</text>
					</view>
					<image class="mini-icon" src="../../static/icon/edit.png" slot="right-icon" mode=""></image>
				</u-cell-item>
				<u-cell-item hover-class="none" :arrow="false">
					<view class="space-btw">
						<view class="info-txt u-text-left">
							<view class="">住院号</view>
							<view class="">科室</view>
							<view class="">入院日期</view>
							<view class="">出院日期</view>
						</view>
						<view class="cell-title">
							<view class="">{{ item.num }}</view>
							<view class="">{{ item.room }}</view>
							<view class="">{{ item.enterTime }}</view>
							<view class="">{{ item.outTime }}</view>
						</view>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover" @click="toCreateMedicalInfo">新增住院信息</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				medicalInfoList: [{
					id: '1',
					name: '南方医科大学深圳附属医院',
					num: 11231313,
					room: '外科',
					enterTime: '2020.09.09',
					outTime: '2020.09.09'
				}]
			}
		},
		onLoad() {
			this.getMedicalInfoList()
		},
		methods: {
			getMedicalInfoList() {
				const _this = this
				uni.showLoading({
					mask: true,
					success() {
						_this.$request({
							url: '/hospital/app/user/hospitalized',
							method: 'get'
						}).then(res => {
							_this.medicalInfoList= res || []
						}).finally(() => {
							uni.hideLoading()
						})
					}
				})
			},
			eidtMedicalInfo(id) {
				uni.navigateTo({
					url: `./medical-info-create-or-update?id=${id}`
				})
			},
			toCreateMedicalInfo() {
				uni.navigateTo({
					url: './medical-info-create-or-update'
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
