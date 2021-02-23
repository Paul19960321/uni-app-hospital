<template>
	<view class="">
		<view class="cell-group-wrapper form-wrapper">
			<u-form :model="printInfoForm" ref="addrForm" :error-type="['toast']" label-width="auto">
				<u-form-item label="住院信息" prop="name">
					<view class="u-text-right" @click="show1 = true">
						<text v-if="!!infoForm.area">{{ infoForm.area }}</text>
						<text class="placeholder-txt" v-else>请选择</text>
						<u-icon class="placeholder-txt u-m-l-16" size="24" name="arrow-right"></u-icon>
					</view>
				</u-form-item>
				<u-form-item label="住院号" prop="mobile" required>
					<u-input v-model="infoForm.mobile" input-align="right" :clearable="false" placeholder="请输入住院号" />
				</u-form-item>
				<u-form-item label="入院日期" prop="addr" required>
					<view class="u-text-right" @click="show2 = true">
						<text v-if="!!infoForm.area">{{ infoForm.area }}</text>
						<text class="placeholder-txt" v-else>请选择入院日期</text>
						<u-icon class="placeholder-txt u-m-l-16" size="28" name="calendar"></u-icon>
					</view>
				</u-form-item>
				<u-form-item label="出院日期" prop="addr" required>
					<view class="u-text-right" @click="show3 = true">
						<text v-if="!!infoForm.area">{{ infoForm.area }}</text>
						<text class="placeholder-txt" v-else>请选择出院日期</text>
						<u-icon class="placeholder-txt u-m-l-16" name="calendar"></u-icon>
					</view>
				</u-form-item>
				<u-form-item label="科室" prop="area" required>
					<u-input v-model="infoForm.name" input-align="right" :clearable="false" placeholder="请输入科室" />
				</u-form-item>
			</u-form>
		</view>
		<view class="cell-group-wrapper">
			<u-cell-group class="cell-group" :border="false">
				<u-cell-item hover-class="none" :arrow="false">
					<view class="">
						<view class="space-btw u-m-b-24">
							<view class="cell-title u-font-28">
								<text>病案用途</text>
							</view>
							<navigator url="./medical-info-use" class="primary-txt info-create-btn" hover-class="none">
								<text class="u-m-r-16">选择病案用途</text>
								<u-icon size="36" style="vertical-align: -4rpx;" name="plus-circle-fill"></u-icon>
							</navigator>
						</view>
						<view class="grey-panel print-info-panel u-text-left" v-for="(info, index) in printInfo" :key="index">
							<view class="u-m-b-8">
								<text class="info-txt">病案用途：</text>
								<text class="default-txt">{{ info.num }}</text>
							</view>
							<view class="u-m-b-8">
								<text class="info-txt">复印份数：</text>
								<text class="default-txt">{{ info.time }}份</text>
							</view>
							<view class="">
								<text class="info-txt">复印内容：</text>
								<text class="print-tag" v-for="(item, idx) in info.use" :key="idx">病案首页</text>
							</view>
							<u-icon class="rm-info-icon error-txt" name="minus-circle-fill" size="40"></u-icon>
						</view>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover" @click="handleClick">确定</button>
		</view>
		<u-select v-model="show1" :list="medicalInfoList" @confirm="selMedicalInfo"></u-select>
		<u-picker v-model="show2" mode="time"></u-picker>
		<u-picker v-model="show3" mode="time"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				printInfoForm: {},
				show1: false,
				show2: false,
				show3: false,
				medicalInfoList: [],
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
			selMedicalInfo(res) {},
			handleClick() {}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.info-create-btn {
		border-radius: 200rpx;
		border: 1px solid $uni-color-primary;
		display: inline-block;
		font-size: 28rpx;
		height: 44rpx;
		line-height: 44rpx;
		padding: 0 8rpx 0 24rpx;
	}
	.print-info-panel {
		position: relative;
	}
	.rm-info-icon {
		position: absolute;
		right: 36rpx;
		top: 36rpx;
	}
</style>
