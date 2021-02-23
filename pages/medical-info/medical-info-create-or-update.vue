<template>
	<view class="">
		<view class="cell-group-wrapper form-wrapper">
			<u-form :model="infoForm" ref="infoForm" :error-type="['toast']" label-width="auto">
				<u-form-item label="就医医院" prop="name">
					<view class="u-text-right" @click="show1 = true">
						<text v-if="!!infoForm.area">{{ infoForm.area }}</text>
						<text class="placeholder-txt" v-else>请选择就医医院</text>
						<u-icon class="placeholder-txt u-m-l-16" size="24" name="arrow-right"></u-icon>
					</view>
				</u-form-item>
				<u-form-item label="住院号" prop="mobile">
					<u-input v-model="infoForm.mobile" input-align="right" :clearable="false" placeholder="请输入住院号" />
				</u-form-item>
				<u-form-item label="科室" prop="area">
					<u-input v-model="infoForm.name" input-align="right" :clearable="false" placeholder="请输入科室" />
				</u-form-item>
				<u-form-item label="入院日期" prop="addr">
					<view class="u-text-right" @click="show2 = true">
						<text v-if="!!infoForm.area">{{ infoForm.area }}</text>
						<text class="placeholder-txt" v-else>请选择入院日期</text>
						<u-icon class="placeholder-txt u-m-l-16" size="28" name="calendar"></u-icon>
					</view>
				</u-form-item>
				<u-form-item label="出院日期" prop="addr">
					<view class="u-text-right" @click="show3 = true">
						<text v-if="!!infoForm.area">{{ infoForm.area }}</text>
						<text class="placeholder-txt" v-else>请选择出院日期</text>
						<u-icon class="placeholder-txt u-m-l-16" name="calendar"></u-icon>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover" @click="handleClick">确定</button>
		</view>
		<view class="u-p-l-48 u-p-r-48" v-if="!!infoForm.id">
			<u-button shape="circle" type="error" @click="handleDel">删除</u-button>
		</view>
		<u-picker v-model="show1" mode="region"></u-picker>
		<u-picker v-model="show2" mode="time"></u-picker>
		<u-picker v-model="show3" mode="time"></u-picker>
		<u-modal v-model="show4" :show-title="false" :show-cancel-button="true" @cancel="show4 = false" @confirm="handleConfirm">
			<view class="slot-content">
				<image class="confirm-img" src="../../static/img/modal_confirm.png" mode=""></image>
				<view class="u-text-left u-m-t-48 u-m-b-8">
					该住院信息已被授权，更新后授权将会失效
				</view>
				<view class="error-txt u-font-28 u-text-left">
					确定更新吗？
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				infoForm: {
					name: '',
					mobile: '',
					area: '',
					addr: ''
				},
				infoFormRules: {
					name: [{
						required: true,
						message: '请输入收货人姓名'
					}],
					mobile: [{
						required: true,
						message: '请输入联系手机号'
					}],
					area: [{
						required: true,
						message: '请选择所在地区'
					}],
					addr: [{
						required: true,
						message: '请输入详细地址'
					}]
				}
			}
		},
		onLoad(options) {
			if (options.id) {
				this.infoForm.id = options.id
				uni.setNavigationBarTitle({
					title: '编辑住院信息'
				})
			}
		},
		onReady() {
			this.$refs.infoForm.setRules(this.infoFormRules)
		},
		methods: {
			handleClick() {
				this.$refs.infoForm.validate(valid => {
					if (valid) {
						if (this.infoForm.id) {
							this.show4 = true
						} else {
							this.formSubmit()
						}
					}
				})
			},
			handleDel() {
				
			},
			handleConfirm() {
				this.show4 = false
				this.formSubmit()
			},
			formSubmit() {
				const _this = _this
				uni.showLoading({
					mask: true,
					success() {
						this.$request({
							url: ''
						}).then(res => {
							
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
	page {
		background-color: $uni-bg-color-grey;
	}
	.confirm-img {
		height: 204rpx;
		width: 332rpx;
	}
</style>
