<template>
	<view class="">
		<web-view v-if="url" :src="url" @message="handleMessage"></web-view>
	</view>
</template>

<script>
	let redir
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			if (options.url) {
				this.url = decodeURIComponent(options.url)
			}
		},
		methods: {
			handleMessage(event) {
				const resultMsg = event.detail.data[0].msg
				if (resultMsg === 'success') {
					uni.redirectTo({
						url: '../result/user-cert-suceess'
					})
				} else if (resultMsg === 'fail') {
					uni.redirectTo({
						url: '../result/user-cert-fail'
					})
				}
			}
		}
	}
</script>

<style>
</style>
