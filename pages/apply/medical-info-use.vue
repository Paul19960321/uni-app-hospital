<template>
	<view class="">
		<view class="cell-group-wrapper">
			<u-cell-group class="cell-group" :border="false">
				<u-cell-item hover-class="none" @click="show1 = true">
					<view class="cell-title" slot="title">
						<text class="">病案用途</text>
					</view>
					<text v-if="applyUser === 0">个人</text>
					<text v-else-if="applyUser === 1">待办</text>
					<text v-else-if="applyUser === 2">新生儿</text>
				</u-cell-item>
				<u-cell-item v-if="applyUser === 1" hover-class="none">
					<u-input placeholder="请输入病案用途"></u-input>
				</u-cell-item>
				<u-cell-item hover-class="none" :arrow="false">
					<view class="u-text-left">
						<view class="cell-title u-font-28">
							<text>复印内容</text>
						</view>
						<view class="print-tips">
							<view class="">温馨提示：</view>
							<view class="">1.病案报告不同用途所对应的复印内容仅供参考；</view>
							<view class="">2.请根据实际需求选择复印内容。</view>
						</view>
						<view class="grey-panel u-text-left">
							<u-checkbox-group @change="checkboxGroupChange" size="26">
								<u-checkbox 
									class="use-checkbox"
									@change="checkboxChange" 
									v-model="item.checked" 
									label-size="26"
									v-for="(item, index) in list" :key="index" 
									:name="item.name"
								>{{item.name}}</u-checkbox>
							</u-checkbox-group>
							<u-input
							v-model="value"
							:border="true"
							:type="textarea"
							placeholder="请输入复印内容名称，多个名称之间用“；”隔开"
							:clearable="false"
							class="panel-textarea" />
						</view>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="cell-group-wrapper">
			<u-cell-group class="cell-group" :border="false">
				<u-cell-item hover-class="none" :arrow="false">
					<view class="cell-title" slot="title">
						<text class="">复印份数</text>
					</view>
					<u-number-box :min="1" v-model="printNum"></u-number-box>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="p-48">
			<button class="default-btn circle" hover-class="default-hover" @click="handleClick">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				printNum: 1,
				list: [{
					name: '病案首页'
				}, {
					name: '入院记录'
				}, {
					name: '出院记录'
				}, {
					name: '死亡记录'
				}, {
					name: '24小时出入院记录'
				}, {
					name: '24小时死亡记录'
				}, {
					name: '首次病程'
				}, {
					name: '术后病程'
				}, {
					name: '体温单'
				}, {
					name: '医嘱单'
				}, {
					name: '化验单'
				}, {
					name: '医学影响报告单'
				}, {
					name: '手术记录'
				}, {
					name: '病理报告'
				}, {
					name: '分娩记录'
				}, {
					name: '护理记录'
				}, {
					name: '手术同意书'
				}, {
					name: '麻醉同意书'
				}, {
					name: '住院证'
				}, {
					name: '改名审批单'
				}, {
					name: '高风险医材使用登记表(植入耗材)'
				}, {
					name: '病危通知书'
				}, {
					name: '其他'
				}]
			}
		},
		methods: {
			checkboxGroupChange() {}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
	.print-tips {
		line-height: 36rpx;
		font-size: 24rpx;
		margin: 16rpx 0;
	}
</style>
