<template>
	<view class="">
		<view class="cell-group-wrapper form-wrapper">
			<u-form label-width="auto" :model="changeMobileForm" ref="changeMobileForm" :error-type="['toast']">
				<u-form-item label="新手机号" prop="mobile">
					<u-input inputAlign="right" placeholder="请输入手机号码" v-model="changeMobileForm.mobile" />
				</u-form-item>
				<u-form-item label="短信验证码" prop="code" label-position="top">
					<view class="space-btw">
						<u-input placeholder="请输入6位短信验证码" v-model="changeMobileForm.code" />
						<SmsButton :mobile="changeMobileForm.mobile" :smsType="4" :btnStyle="1" />
					</view>
				</u-form-item>
			</u-form>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover" @click="handleClick">完成</button>
		</view>
	</view>
</template>

<script>
	import SmsButton from '../../components/sms-button'
	import { logout } from '../../utils/utils.js'
	export default {
		data() {
			return {
				changeMobileForm: {
					mobile: '',
					code: ''
				},
				changeMobileFormRules: {
					mobile: [{
						required: true,
						message: '请输入手机号码'
					}],
					code: [{
						required: true,
						message: '请输入短信验证码'
					}]
				}
			}
		},
		components: {
			SmsButton
		},
		onReady() {
			this.$refs.changeMobileForm.setRules(this.changeMobileFormRules)
		},
		methods: {
			// 更换手机号
			handleClick() {
				this.$refs.changeMobileForm.validate(valid => {
					if (valid) {
						const _this = this
						uni.showLoading({
							mask: true,
							success() {
								_this.$request({
									url: '/hospital/sys/user/mobile',
									method: 'post',
									data: _this.changeMobileForm
								}).then(res => {
									uni.hideLoading()
									uni.showToast({
										icon: 'none',
										title: '修改成功，请重新登录',
										duration: 2000,
										success() {
											setTimeout(() => {
												logout()
											}, 2000)
										}
									})
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
