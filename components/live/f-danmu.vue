<template>
	<view style="position: fixed;bottom: 120rpx;left: 0;right: 0;">
		<!-- 使用动画纵向滚动，将scrollInToView方法的返回值绑定到scroll-into-view属性上 -->
		<scroll-view
			scroll-y="true"
			style="width: 520rpx;height: 300px;"
			scroll-with-animation
			class="pl-3"
			:scroll-into-view="scrollInToView"
		>
			<view
				:id="'danmu' + item.id"
				class="flex justify-start align-start rounded p-2 mb-2"
				style="background-color: rgba(255,255,255,0.125);"
				v-for="(item, index) in list"
				:key="index"
			>
				<text class="font-md text-main">{{ item.name }}:</text>
				<text class="font-md text-white">{{ item.content }}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollInToView: '',
			list: []
		};
	},
	mounted() {
		// let id = 1
		// setInterval(()=>{
		// 	this.list.push({
		// 		id:id,
		// 		name:'观众'+id,
		// 		content:'发言_'+id
		// 	})
		// 	this.toBottom()
		// 	id++
		// },2000)
	},
	methods: {
		send(data) {
			this.list.push(data)
			this.toBottom()
		},
		toBottom() {
			setTimeout(() => {
				let len = this.list.length;
				if (len > 0 && this.list[len - 1]) {
					this.scrollInToView = 'danmu' + this.list[len - 1].id
				}
			}, 200)
		}
	}
};
</script>

<style></style>
