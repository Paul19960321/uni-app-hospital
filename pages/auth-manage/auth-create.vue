<template>
	<view class="">
		<u-form :model="authForm" ref="authForm" :error-type="['toast']" label-width="auto">
			<view class="cell-group-wrapper form-wrapper">
				<u-form-item label="就医医院" prop="name">
					<view class="u-text-right" @click="show1 = true">
						<text v-if="!!authForm.area">{{ authForm.area }}</text>
						<text class="placeholder-txt" v-else>请选择就医医院</text>
						<u-icon class="placeholder-txt u-m-l-16" size="24" name="arrow-right"></u-icon>
					</view>
				</u-form-item>
			</view>
			<view class="cell-group-wrapper form-wrapper">
				<u-form-item label="与被授权人关系" prop="mobile">
					<view class="u-text-right" @click="show2 = true">
						<text v-if="!!authForm.area">{{ authForm.area }}</text>
						<text class="placeholder-txt" v-else>请选择与被授权人关系</text>
						<u-icon class="placeholder-txt u-m-l-16" size="24" name="arrow-right"></u-icon>
					</view>
				</u-form-item>
				<u-form-item label="被授权人手机号" prop="mobile">
					<u-input v-model="authForm.mobile" input-align="right" :clearable="false" placeholder="请输入联系手机号" />
				</u-form-item>
				<u-form-item label="被授权人证件类型" prop="area">
					<view class="u-text-right" @click="show3 = true">
						<text v-if="!!authForm.area">{{ authForm.area }}</text>
						<text class="placeholder-txt" v-else>请选择被授权人证件类型</text>
						<u-icon class="placeholder-txt u-m-l-16" size="24" name="arrow-right"></u-icon>
					</view>
				</u-form-item>
				<u-form-item label="证件号" prop="addr">
					<u-input v-model="authForm.addr" input-align="right" :clearable="false" placeholder="请输入详证件号" />
				</u-form-item>
				<u-form-item label="授权有效期" prop="addr">
					<view class="u-text-right" @click="show4 = true">
						<text v-if="!!authForm.area">{{ authForm.area }}</text>
						<text class="placeholder-txt" v-else>请选择授权有效期</text>
						<u-icon class="placeholder-txt u-m-l-16" size="24" name="arrow-right"></u-icon>
					</view>
				</u-form-item>
			</view>
			<view class="cell-group-wrapper form-wrapper">
				<u-form-item label="授权委托书">
					<view class="u-text-right">
						<u-icon class="placeholder-txt u-m-l-16" size="24" name="arrow-right"></u-icon>
					</view>
				</u-form-item>
			</view>
		</u-form>
		<view class="u-m-t-16 form-wrapper info-txt u-font-24">
			<view class="">温馨提示：</view>
			<view class="">1.如需要完成授权，需要您签署授权委托书；</view>
			<view class="">2.签署之前请检查被授权人信息是否正确；</view>
			<view class="">3.授权有效期从授权书签署成功日开始算起。</view>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover">立即签署</button>
		</view>
		<u-picker v-model="show1" mode="time"></u-picker>
		<u-picker v-model="show2" mode="time"></u-picker>
		<u-picker v-model="show3" mode="time"></u-picker>
		<u-picker v-model="show4" mode="time"></u-picker>
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
				authForm: {
					validTime: 0
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
