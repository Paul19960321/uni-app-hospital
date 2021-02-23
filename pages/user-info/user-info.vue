<template>
	<view class="">
		<view class="cell-group-wrapper">
			<u-cell-group class="cell-group" :border="false">
				<u-cell-item @click="show1 = true">
					<text class="cell-title" slot="title">性别</text>
					<text v-if="userInfo.sexName">{{ userInfo.sexName }}</text>
					<text v-else>请选择</text>
				</u-cell-item>
				<u-cell-item @click="show2 = true">
					<text class="cell-title" slot="title">出生日期</text>
					<text v-if="userInfo.birthday">{{ userInfo.birthday }}</text>
					<text v-else>请选择出生日期</text>
				</u-cell-item>
				<u-cell-item @click="show3 = true">
					<text class="cell-title" slot="title">出生地</text>
					<text v-if="userInfo.birthAddress">{{ userInfo.birthAddress }}</text>
					<text v-else>请选择</text>
				</u-cell-item>
				<u-cell-item @click="show4 = true">
					<text class="cell-title" slot="title">籍贯</text>
					<text v-if="userInfo.nativePlace">{{ userInfo.nativePlace }}</text>
					<text v-else>请选择</text>
				</u-cell-item>
				<u-cell-item @click="show5 = true">
					<text class="cell-title" slot="title">民族</text>
					<text v-if="userInfo.nation">{{ userInfo.nation }}</text>
					<text v-else>请选择</text>
				</u-cell-item>
				<u-cell-item @click="show6 = true">
					<text class="cell-title" slot="title">婚姻状况</text>
					<text v-if="userInfo.maritalStatusName">{{ userInfo.maritalStatusName }}</text>
					<text v-else>请选择</text>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="p-48">
			<button class="default-btn circle" @click="handleClick" hover-class="default-hover">确定</button>
		</view>
		<u-select v-model="show1" :list="gender" @confirm="selGender"></u-select>
		<u-picker v-model="show2" mode="time" @confirm="selBirthday" :default-time="userInfo.birthday"></u-picker>
		<u-picker v-model="show3" mode="region" @confirm="selBornPlace"></u-picker>
		<u-picker v-model="show4" mode="region" @confirm="selNativePlace"></u-picker>
		<u-select v-model="show5" :list="nation" @confirm="selNation"></u-select>
		<u-select v-model="show6" :list="marriage" @confirm="selMarriage"></u-select>
	</view>
</template>

<script>
	import assign from 'lodash/assign'
	const nation = require('@/static/nation.json')
	export default {
		data() {
			return {
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				show6: false,
				gender: [{
					value: 0,
					label: '女'
				}, {
					value: 1,
					label: '男'
				}],
				nation: nation,
				marriage: [{
					value: 0,
					label: '未婚'
				}, {
					value: 1,
					label: '已婚'
				}],
				userInfo: null
			}
		},
		onLoad() {
			this.userInfo = assign({}, this.$store.state.userInfo)
		},
		methods: {
			handleClick() {
				
			},
			selGender(res) {
				this.userInfo.sex = res[0].value
				this.userInfo.sexName = res[0].label
			},
			selBirthday(res) {
				this.userInfo.birthday = `${res.year}-${res.month}-${res.day}`
			},
			selBornPlace(res) {
				this.userInfo.birthAddress = `${res.province.label}${res.city.label}${res.area.label}`
			},
			selNativePlace(res) {
				this.userInfo.nativePlace = `${res.province.label}${res.city.label}${res.area.label}`
			},
			selNation(res) {
				this.userInfo.nation = res[0].label
			},
			selMarriage(res) {
				this.userInfo.maritalStatus = res[0].value
				this.userInfo.maritalStatusName = res[0].label
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}
</style>
