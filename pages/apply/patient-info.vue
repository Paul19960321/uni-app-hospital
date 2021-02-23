<template>
	<view class="">
		<view class="cell-group-wrapper">
			<u-cell-group class="cell-group" :border="false">
				<u-cell-item hover-class="none" @click="show1 = true">
					<view class="cell-title" slot="title">
						<text class="">选择医院</text>
					</view>
					<text>{{ hospital }}</text>
				</u-cell-item>
				<u-cell-item hover-class="none" :arrow="false">
					<view class="cell-title" slot="title">
						<text>业务选择</text>
					</view>
					<view class="u-m-t-12 u-text-left" slot="label">
						<text class="print-tag">住院病历</text>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="cell-group-wrapper">
			<u-cell-group class="cell-group" :border="false">
				<u-cell-item hover-class="none" @click="show2 = true">
					<view class="cell-title" slot="title">
						<text class="">申请人类型</text>
					</view>
					<text v-if="applyUser === 0">个人</text>
					<text v-else-if="applyUser === 1">待办</text>
					<text v-else-if="applyUser === 2">新生儿</text>
				</u-cell-item>
				<u-cell-item v-if="applyUser === 1" hover-class="none">
					<view class="cell-title" slot="title">
						<text class="">授权患者</text>
					</view>
					<text>个人</text>
				</u-cell-item>
				<u-cell-item hover-class="none" :arrow="false">
					<view class="">
						<view class="space-btw u-m-b-24">
							<view class="cell-title u-font-28">
								<text>复印信息</text>
							</view>
							<navigator url="./print-info" class="primary-txt info-create-btn" hover-class="none">
								<text class="u-m-r-16">复印信息</text>
								<u-icon size="36" style="vertical-align: -4rpx;" name="plus-circle-fill"></u-icon>
							</navigator>
						</view>
						<view class="grey-panel print-info-panel u-text-left" v-for="(info, index) in printInfo" :key="index">
							<view class="u-m-b-8">
								<text class="info-txt">住院号：</text>
								<text class="default-txt">{{ info.num }}</text>
							</view>
							<view class="u-m-b-8">
								<text class="info-txt">住院时间：</text>
								<text class="default-txt">{{ info.time }}</text>
							</view>
							<view
							class="space-btw"
							:class="idx !== info.use.length - 1 ? 'u-m-b-8' : ''"
							v-for="(item, idx) in info.use"
							:key="idx">
								<view class="">
									<text class="info-txt">病案用途：</text>
									<text class="print-tag">{{ item.title }}</text>
								</view>
								<text class="default-txt">{{ item.num }}份</text>
							</view>
							<u-icon class="rm-icon error-txt" name="minus-circle-fill" size="40"></u-icon>
						</view>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover" @click="handleClick">下一步</button>
		</view>
		<u-select v-model="show1" :list="hospitalList" @confirm="selHospital"></u-select>
		<u-select v-model="show2" :list="applyUserList" @confirm="selApplyUser"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show1: false,
				show2: false,
				hospitalList: [{
					value: 0,
					label: '南方医科大学'
				}, {
					value: 1,
					label: '协和医院'
				}],
				applyUserList: [{
					value: 0,
					label: '个人'
				}, {
					value: 1,
					label: '待办'
				}, {
					value: 2,
					label: '新生儿'
				}],
				applyUser: 0,
				hospital: '南方医科大学',
				printInfo: [{
					num: '234567',
					time: '2020.10.01～2020.10.31',
					use: [{
						title: '商业保险',
						num: 2
					}, {
						title: '报销',
						num: 2
					}],
				}]
			}
		},
		methods: {
			selHospital(res) {
				this.hospital = res[0].label
			},
			selApplyUser(res) {
				this.applyUser = res[0].value
			},
			handleClick() {}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.print-info-panel {
		position: relative;
	}
	.rm-icon {
		position: absolute;
		right: 36rpx;
		top: 36rpx;
	}
</style>
