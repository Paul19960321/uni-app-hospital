<template>
	<view class="">
		<web-view v-if="url" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			this.url = decodeURIComponent(options.url)
		}
	}
</script>

<style>
</style>
