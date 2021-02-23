<template>
	<view class="">
		<view class="cell-group-wrapper">
			<u-cell-group class="cell-group" :border="false">
				<u-cell-item hover-class="none" @click="show = true">
					<view class="cell-title" slot="title">
						<text class="">证件类型</text>
					</view>
					<text class="grey-txt" v-if="realNameInfo.cardType === 0">身份证</text>
					<text class="grey-txt" v-else-if="realNameInfo.cardType === 1">护照</text>
					<text class="grey-txt" v-else-if="realNameInfo.cardType === 2">户口簿</text>
					<text class="grey-txt" v-else-if="realNameInfo.cardType === 3">出生证</text>
				</u-cell-item>
				<u-cell-item hover-class="none" :arrow="false">
					<view class="space-btw idcard-upload-panel">
						<view class="">
							<view class="upload-title">
								<text>人面像</text>
							</view>
							<view class="upload-info">
								<text>请上传您的身份证人像面</text>
							</view>
						</view>
						<view class="idcard" v-if="!!realNameInfo.a">
							<image class="idcard u-m-l-0" @click="previewImg(realNameInfo.a)" :src="realNameInfo.a" mode=""></image>
							<u-icon name="close-circle" class="rm-icon" size="40" @click="realNameInfo.a = ''"></u-icon>
						</view>
						<image class="idcard" v-else @click="handleUpload('a')" src="../../static/img/idcard_front.png" mode=""></image>
					</view>
					<view class="space-btw idcard-upload-panel">
						<view class="">
							<view class="upload-title">
								<text>国徽面</text>
							</view>
							<view class="upload-info">
								<text>请上传您的身份证国徽面</text>
							</view>
						</view>
						<view class="idcard" v-if="!!realNameInfo.b">
							<image class="idcard u-m-l-0" @click="previewImg(realNameInfo.b)" :src="realNameInfo.b" mode=""></image>
							<u-icon name="close-circle" class="rm-icon" size="40" @click="realNameInfo.b = ''"></u-icon>
						</view>
						<image class="idcard" v-else @click="handleUpload('b')" src="../../static/img/idcard_back.png" mode=""></image>
					</view>
					<view class="space-btw idcard-upload-panel">
						<view class="">
							<view class="upload-title">
								<text>手持证件人像面</text>
							</view>
							<view class="upload-info">
								<text>请上传本人手持身份证人像面的照片</text>
							</view>
						</view>
						<view class="idcard" v-if="!!realNameInfo.c">
							<image class="idcard u-m-l-0" @click="previewImg(realNameInfo.c)" :src="realNameInfo.c" mode=""></image>
							<u-icon name="close-circle" class="rm-icon" size="40" @click="realNameInfo.c = ''"></u-icon>
						</view>
						<image class="idcard" v-else @click="handleUpload('c')" src="../../static/img/idcard_with_person.png" mode=""></image>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="cell-group-wrapper form-wrapper">
			<u-form :model="realNameInfo" ref="realNameForm" :error-type="['toast']" label-width="auto">
				<u-form-item label="姓名" prop="name" required>
					<u-input v-model="realNameInfo.name" input-align="right" :clearable="false" placeholder="请输入姓名" />
				</u-form-item>
				<u-form-item label="身份证号码" prop="cardNo" required>
					<u-input v-model="realNameInfo.cardNo" input-align="right" :clearable="false" placeholder="请输入身份证号码" />
				</u-form-item>
			</u-form>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover" @click="handleClick">下一步</button>
		</view>
		<u-select v-model="show" :list="list" @confirm="handleConfirm"></u-select>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { isIdCard } from '../../utils/validate.js'
	import { uploadFile } from '../../utils/httpRequest.js'
	import pick from 'lodash/pick'
	export default {
		data() {
			return {
				show: false,
				list: [{
					value: 0,
					label: '身份证'
				}, {
					value: 1,
					label: '护照'
				}, {
					value: 2,
					label: '户口簿'
				}, {
					value: 3,
					label: '出生证'
				}],
				realNameInfo: {
					cardType: 0,
					name: '',
					cardNo: '',
					a: '',
					b: '',
					c: ''
				},
				realNameFormRules: {
					name: [{
						required: true,
						message: '请输入姓名'
					}],
					cardNo: [{
						required: true,
						message: '请输入身份证号码'
					}, {
						validator: (rule, value, callback) => {
							return isIdCard(value)
						},
						message: '请输入正确的身份证号'
					}]
				}
			}
		},
		computed: mapState(['userInfo']),
		onLoad() {
			this.getRealNameInfo()
		},
		onReady() {
			this.$refs.realNameForm.setRules(this.realNameFormRules)
		},
		methods: {
			// 获取实名信息
			getRealNameInfo() {
				const _this = this
				uni.showLoading({
					mask: true,
					success() {
						_this.$request({
							url: `/hospital/app/user/realname/realinfo/${_this.userInfo.id}`,
							method: 'post'
						}).then(res => {
							if (!!res) {
								_this.realNameInfo = pick(res, ['cardType', 'a', 'b', 'c', 'name', 'cardNo', 'url'])
							}
						}).finally(() => {
							uni.hideLoading()
						})
					}
				})
			},
			// 上传证件
			handleUpload(type) {
				const _this = this
				uni.chooseImage({
					count: 1,
					success(res) {
						uni.showLoading({
							mask: true,
							success() {
								uploadFile({
									filePath: res.tempFilePaths[0],
									name: 'file'
								}).then(res => {
									_this.realNameInfo[type] = res.url
								}).finally(() => {
									uni.hideLoading()
								})
							}
						})
					}
				})
			},
			// 预览证件
			previewImg(url) {
				uni.previewImage({
					urls: [url],
					indicator: 'none'
				})
			},
			handleClick() {
				const _this = this
				if (!_this.realNameInfo.a) {
					uni.showToast({
						icon: 'none',
						title: '请上传证件正面'
					})
					return
				}
				if (!_this.realNameInfo.b) {
					uni.showToast({
						icon: 'none',
						title: '请上传证件背面'
					})
					return
				}
				if (!_this.realNameInfo.c) {
					uni.showToast({
						icon: 'none',
						title: '请上传手持证件照'
					})
					return
				}
				_this.$refs.realNameForm.validate(valid => {
					if (valid) {
						if (_this.realNameInfo.url) {
							const url = encodeURIComponent(_this.realNameInfo.url)
							uni.navigateTo({
								url: `../external/cert?url=${url}`
							})
						} else {
							uni.showLoading({
								mask: true,
								success() {
									_this.$request({
										url: '/hospital/app/user/realname/apply',
										method: 'post',
										data: _this.realNameInfo
									}).then(res => {
										if (res && res.url) {
											const url = encodeURIComponent(res.url)
											uni.hideLoading()
											uni.navigateTo({
												url: `../external/cert?url=${url}`
											})
										}
									}).finally(() => {
										uni.hideLoading()
									})
								}
							})
						}
					}
				})
			},
			handleConfirm(res) {
				this.realNameInfo.cardType = res[0].value
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.idcard {
		height: 218rpx;
		width: 334rpx;
		flex-shrink: 0;
		margin-left: 24rpx;
		position: relative;
	}
	.idcard-upload-panel {
		padding: 24rpx;
		background-color: rgb(250, 250, 250);
		border-radius: 16rpx;
		text-align: left;
		&:not(:last-of-type) {
			margin-bottom: 20rpx;
		}
		.upload-title {
			color: $uni-text-color-grey;
			font-size: 28rpx;
			line-height: 44rpx;
			margin-bottom: 8rpx;
		}
		.upload-info {
			color: $uni-text-color-placeholder;
			font-size: 24rpx;
			line-height: 36rpx;
		}
		> view {
			align-self: flex-start;
		}
	}
</style>
