<template>
	<view class="">
		<view class="cell-group-wrapper">
			<u-cell-group class="cell-group" :border="false">
				<u-cell-item hover-class="none" :arrow="false">
					<view class="cell-title" slot="title">
						<text class="">患者证件</text>
					</view>
					<text class="grey-txt">居民身份证</text>
				</u-cell-item>
				<u-cell-item hover-class="none" :arrow="false">
					<view class="space-btw idcard-upload-panel">
						<view class="">
							<view class="upload-title">
								人面像
							</view>
							<view class="upload-info">
								请上传您的身份证人像面，请保证图像清晰
							</view>
						</view>
						<image class="idcard" src="../../static/img/idcard_front.png" mode=""></image>
					</view>
					<view class="space-btw idcard-upload-panel">
						<view class="">
							<view class="upload-title">
								国徽面
							</view>
							<view class="upload-info">
								请上传您的身份证国徽面，请保证图像清晰
							</view>
						</view>
						<image class="idcard" src="../../static/img/idcard_back.png" mode=""></image>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="cell-group-wrapper">
			<u-cell-group class="cell-group" :border="false">
				<u-cell-item hover-class="none" :arrow="false">
					<view class="cell-title" slot="title">
						<text class="">姓名</text>
					</view>
					<text class="">{{ name }}</text>
				</u-cell-item>
				<u-cell-item hover-class="none" :arrow="false">
					<view class="cell-title" slot="title">
						<text class="">身份证号码</text>
					</view>
					<text>{{ idCard }}</text>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover" @click="handleClick">下一步</button>
		</view>
	</view>
</template>

<script>
	let redir
	export default {
		data() {
			return {
				name: '',
				idCard: ''
			}
		},
		onLoad(options) {
			redir = options.redir
		},
		methods: {
			handleClick() {
				const _this = this
				this.$refs.certForm.validate(valid => {
					if (valid) {
						uni.showLoading({
							mask: true,
							success() {
								_this.$request({
									url: '/passport/sys/user/realname/save',
									method: 'post',
									data: _this.certForm
								}).then(res => {
									if (res && res.url) {
										const url = encodeURIComponent(res.url)
										uni.hideLoading()
										uni.navigateTo({
											url: `../external/cert?url=${url}&redir=${redir}`
										})
									}
								})
							}
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
</style>
