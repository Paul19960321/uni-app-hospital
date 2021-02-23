<template>
	<view>
		<scroll-view scroll-y class="patient-list">
			<u-gap height="1"></u-gap>
			<view class="cell-group-wrapper" @click="patientConfirm(item.id)" v-for="item in patientList" :key="item.id">
				<view class="patient-cell-item" :class="item.status !== 0 ? 'unauth' : ''">
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
				</view>
			</view>
			<view class="p-48">
				<button class="default-btn circle" hover-class="default-hover" @click="toPatientCreate">选择其他患者</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				patientList: [{
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
			patientConfirm(id) {
				uni.navigateTo({
					url: `./patient-info?id=${id}`
				})
			},
			toPatientCreate() {}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.patient-list {
		height: 100vh;
	}
</style>
