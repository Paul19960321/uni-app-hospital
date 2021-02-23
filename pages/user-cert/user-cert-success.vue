<template>
	<view class="page-content">
		<view class="result-content">
			<view class="">
				<image class="result-icon" src="/static/icons/success.png" mode=""></image>
			</view>
			<view class="">
				<text class="result-title">实名认证完成</text>
			</view>
			<view class="result-info">
				<text>欢迎使用麦昇科技的产品服务，如您需要正常使用平台服务，请仔细阅读</text>
				<view style="display: inline;" @click="viewContract">
					<text class="primary-txt">《个人信息授权书》</text>
				</view>
				<text>并完成签名授权，授权成功后，平台服务正式启用！</text>
			</view>
			<view class="main-btn-wrapper">
				<u-button type="primary" @click="refreshSignStatus" v-if="signMsg">已完成签署</u-button>
				<u-button type="primary" @click="handleClick" v-else>去签署授权书</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				signMsg: false,
				contractInfo: null
			}
		},
		methods: {
			// 跳转签署个人授权书
			handleClick() {
				const _this = this
				uni.showLoading({
					mask: true,
					success() {
						_this.$request({
							url: '/operate/contract/sendcontractb2c',
							method: 'get'
						}).then(res => {
							uni.hideLoading()
							uni.showToast({
								icon: 'none',
								title: '已发送签署短信，请注意查收签署',
								duration: 2000
							})
							_this.contractInfo = res
							_this.signMsg = true
							_this.signCallback()
						})
					}
				})
			},
			// 查看合同文件
			viewContract() {
				uni.downloadFile({
					url: 'http://winksign-test.oss-cn-shenzhen.aliyuncs.com/4cc380d77f524e3e9c37536053658e36.pdf',
					success: function (res) {
					    var filePath = res.tempFilePath;
					    uni.openDocument({
							filePath: filePath
					    })
					}
				})
			},
			// 签署回调
			signCallback () {
				this.$request({
					url: '/passport/sys/user/info',
					method: 'get'
				}).then(res => {
					if (res.signAuth) {
						uni.showToast({
							icon: 'none',
							title: '签署完成',
							duration: 2000,
							success() {
								setTimeout(function() {
									uni.redirectTo({
										url: '../result/user-auth-success'
									})
								}, 2000)
							}
						})
					} else {
						setTimeout(() => {
						  this.signCallback()
						}, 2000)
					}
				}).catch(() => {
					setTimeout(() => {
					  this.signCallback()
					}, 2000)
				})
			},
			// 刷新签署状态
			refreshSignStatus () {
				if (!this.contractInfo) return
				this.$request({
					url: `/operate/contract/refresh/${this.contractInfo.id}`,
					method: 'get'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}
</style>
