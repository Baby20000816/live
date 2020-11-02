<template>
	<view>
		<view>
			<image src="../../static/pic/18.jpeg" class="img" style="width: 750rpx; height: 350rpx;"></image>
		</view>
<!-- 		<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="200"
			style="width: 750rpx;height: 250rpx;"
		>
			<swiper-item>
				<image src="../../static/banner/1.jpg" style="width: 750rpx; height: 250rpx;"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/banner/2.jpg" style="width: 750rpx; height: 250rpx;"></image>
			</swiper-item>
		</swiper> -->
		<view class="flex flex-wrap">
			<fList 	v-for="(item, index) in list"
			:key="index"
			:item="item"
			@click="openLive(item)"
			:index="index"></fList>
		</view>
		
		<!-- <tab></tab> -->
	</view>
</template>

<script>
import fList from '@/components/common/f-list.vue';
export default {
	components: {
		fList
	},
	onLoad() {},
	methods: {
		openLive() {
			uni.navigateTo({
				url: '../live/live'
			});
		}
	},
	data(){
		return{
			list:[
				{
					cover:"../../static/pic/1.jpeg",
					url:'https://live-stream.utools.club/live/ywGsr3DyvZPJQLoxcpWH.flv?sign=1604329020-cd9285356a4a08c822f8ed9fe12a39db',
					count:1,
					people:"人气",
					number:1,
					title:"一只小团团",
					finish:"finish",
					status:"已结束"
				},
				{
					cover:"../../static/pic/2.jpeg",
					count:2,
					people:"人气",
					number:3,
					title:"斗鱼张大仙",
					finish:"doing",
					status:"直播中"
				},
				{
					cover:"../../static/pic/3.jpeg",
					count:1,
					people:"人气",
					number:5,
					title:"卢本伟",
					finish:"finish",
					status:"已结束"
				},
				{
					cover:"../../static/pic/4.jpeg",
					count:0,
					people:"人气",
					number:0,
					title:"PDD",
					finish:"finish",
					status:"已结束"
				},
				{
					cover:"../../static/pic/5.jpeg",
					count:1000,
					people:"人气",
					number:10,
					title:"大司马",
					finish:"doing",
					status:"直播中"
				},
			]
		}
	}
};
</script>

<style scoped>

</style>
