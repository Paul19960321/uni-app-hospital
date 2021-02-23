<template>
	<view class="cell-group-wrapper">
		<u-cell-group class="cell-group" :border="false">
			<u-cell-item :arrow="false">
				<text class="cell-title" slot="title">姓名</text>
				<text>{{ userRealName.name }}</text>
			</u-cell-item>
			<u-cell-item :arrow="false">
				<text class="cell-title" slot="title">身份证号码</text>
				<text>{{ userRealName.cardNo | dp(3, 11) }}</text>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		computed: mapState(['userRealName'])
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
</style>
