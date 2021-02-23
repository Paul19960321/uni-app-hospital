<template>
	<view class="">
		<view class="cell-group-wrapper form-wrapper">
			<u-form label-width="auto" :model="setPwdForm" ref="setPwdForm" :error-type="['toast']">
				<u-form-item label="密码" prop="password">
					<u-input inputAlign="right" placeholder="请输入密码" type="password" v-model="setPwdForm.password" />
				</u-form-item>
			</u-form>
		</view>
		<view class="pwd-rule">
			<text>长度8~20位，字母/数字/标点符号至少包含2种；不允许输入空格或中文</text>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover" @click="handleClick">完成</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setPwdForm: {
					password: ''
				}
			}
		},
		methods: {
			handleClick() {}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
</style>
