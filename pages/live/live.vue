<template>
	<view>
		<view style="height: 180rpx;" class="bg-main text-light pl-2" :style="'top:'+statusBarHeight+'px'">
			<text class="iconfont icon-fanhui"></text>
		</view>
		<view style="height: 1500rpx;" class="bg-grey">
			<text>{{this.statusBarHeight}}</text>
		</view>
		<view style="position:  fixed;left: 0; bottom: 0; right: 0; height: 120rpx;" class="bg-main"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
						statusBarHeight: 0, 
				}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
