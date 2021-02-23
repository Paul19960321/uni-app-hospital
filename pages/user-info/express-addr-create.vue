<template>
	<view class="">
		<view class="cell-group-wrapper form-wrapper">
			<u-form :model="addrForm" ref="addrForm" :error-type="['toast']" label-width="auto">
				<u-form-item label="收件人姓名" prop="receiverName" required>
					<u-input v-model="addrForm.receiverName" input-align="right" :clearable="false" placeholder="请输入收件人姓名" />
				</u-form-item>
				<u-form-item label="联系手机号" prop="receiverPhone" required>
					<u-input v-model="addrForm.receiverPhone" input-align="right" :clearable="false" placeholder="请输入联系手机号" />
				</u-form-item>
				<u-form-item label="所在地区" required>
					<view class="u-text-right" @click="show = true">
						<text v-if="!!region">{{ `${region.province}${region.city}${region.area}` }}</text>
						<text class="placeholder-txt" v-else>请选择所在地区</text>
						<u-icon class="placeholder-txt u-m-l-16" size="24" name="arrow-right"></u-icon>
					</view>
				</u-form-item>
				<u-form-item label="详细地址" prop="address" label-position="top" required>
					<u-input v-model="addrForm.address" :clearable="false" placeholder="请输入详细地址" />
				</u-form-item>
			</u-form>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover" @click="handleClick">确定</button>
		</view>
		<view class="u-p-l-48 u-p-r-48" v-if="!!infoForm.id">
			<u-button shape="circle" type="error" @click="handleDel">删除</u-button>
		</view>
		<u-picker v-model="show" mode="region" @confirm="selRegion"></u-picker>
	</view>
</template>

<script>
	import assign from 'lodash/assign'
	export default {
		data() {
			return {
				show: false,
				region: null,
				addrForm: {
					receiverName: '',
					receiverPhone: '',
					address: ''
				},
				addrFormRules: {
					receiverName: [{
						required: true,
						message: '请输入收货人姓名'
					}],
					receiverPhone: [{
						required: true,
						message: '请输入联系手机号'
					}],
					address: [{
						required: true,
						message: '请输入详细地址'
					}]
				}
			}
		},
		onLoad(options) {
			if (options.id) {
				this.addrForm.id = options.id
				uni.setNavigationBarTitle({
					title: '修改地址'
				})
			}
		},
		onReady() {
			this.$refs.addrForm.setRules(this.addrFormRules)
		},
		methods: {
			handleDel() {},
			handleClick() {
				if (!this.region) {
					uni.showToast({
						icon: 'none',
						title: '请选择所在地区'
					})
					return
				}
				this.$refs.addrForm.validate(valid => {
					if (valid) {
						const _this = this
						uni.showLoading({
							mask: true,
							success() {
								_this.$request({
									url: '/hospital/app/user/address/save',
									method: 'post',
									data: assign({}, _this.addrForm, _this.region)
								}).then(res => {
									uni.showToast({
										icon: 'none',
										title: '添加成功',
										mask: true,
										duration: 2000,
										success() {
											setTimeout(() => {
												uni.navigateBack()
											})
										}
									})
								}).finally(() => {
									uni.hideLoading()
								})
							}
						})
					}
				})
			},
			selRegion(res) {
				this.region = {
					province: res.province.label,
					city: res.city.label,
					area: res.area.label,
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
</style>
