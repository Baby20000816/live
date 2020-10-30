<template>
	<view>
		<view class="list-item" @click="$emit('click')">
			<image
				:src="item.cover"
				style="width: 365rpx;height: 365rpx;"
				class="rounded"
				mode="aspectFill"
			></image>
			<view
				class="rounded-circle px-2 flex align-center"
				style="position: absolute;left: 15rpx; top: 15rpx;background-color: rgba(0,0,0,0.4);"
			>
				<text class="iconfont iconbizhongguanli text-warning mr-1"></text>
				<text class="text-white font">{{item.count}}</text>
			</view>
			<view
				class="rounded-circle px-2 flex align-center"
				style="position: absolute;right: 15rpx; top: 15rpx;background-color: rgba(0,0,0,0.4);"
			>
				<text class="font-sm text-white">{{item.people}}</text>
				<text class="text-white font-sm">{{item.number}}</text>
			</view>
			<view
				class="rounded-circle flex align-center"
				style="position: absolute;left: 15rpx; bottom: 15rpx;"
			>
				<text class="text-white font">{{item.title}}</text>
			</view>
			<view
				class="rounded-circle px-2 flex align-center"
				style="position: absolute;right: 15rpx; bottom: 15rpx;background-color: rgba(0,0,0,0.4);"
			>
				<text style="width: 20rpx; height: 20rpx;" class="rounded-circle mr-1" :class="iconClass"></text>
				<text class="text-white font-sm">{{item.status}}</text>
			</view>
		</view>
	</view>
</template>
 
<script>
	const icons = {
		finish: {
			color: 'bg-danger'
		},
		doing: {
			color: 'bg-success'
		},
	};
export default {
	props: {
		item: Object,
		index: [Number, String],
	},
	computed: {
		iconClass() {
			let item = icons[this.item.finish];
			return `${item.color}`;
		}
	},
	methods: {
	}
};
</script>
 
<style scoped>
	.list-item {
		width: 375rpx;
		height: 375rpx;
		padding: 5rpx;
		box-sizing: border-box;
		position: relative;
	}
</style>