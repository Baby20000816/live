<template>
	<view class="container">
		<view class="flex align-center justify-center" style="height: 300rpx;">
			<text style="font-size: 50rpx;" class="text-light">
				{{ loginType === '手机' ? '手机验证码登录' : '账号密码登录' }}
			</text>
		</view>
		<view class="px-3">
			<view class="flex align-center border-bottom my-1">
				<text v-if="loginType === '手机'" class="text-white mr-3">+86</text>
				<input
					type="text"
					v-model="from.username"
					class="font text-white"
					:placeholder="loginType === '手机' ? '请输入手机号' : '昵称/手机/邮箱'"
					placeholder-style="color: #ffffff;"
					style="height: 100rpx;"
					value=""
				/>
			</view>
			<view class="flex align-center justify-center border-bottom my-5">
				<input
					type="password"
					v-model="from.password"
					class="font text-white"
					:placeholder="loginType === '手机' ? '请输入验证码' : '请输入密码'"
					placeholder-style="color: #ffffff;"
					style="height: 100rpx;"
					value=""
				/>
				<button
					plain
					class="mr-0"
					style="border: none ;color: #eaeaea; font-size: 30rpx;"
					v-if="loginType === '手机'&&flag===1"
					@click="countDown()"
				>
					{{codeText }}
				</button>
				<button
					plain
					class="mr-0"
					style="border: none ;color: #eaeaea; font-size: 30rpx;"
					v-if="loginType === '手机'&&flag!=1"
				>
					{{ codeText }}
				</button>
				<button plain class="mr-0" style="border: none ;color: #eaeaea; font-size: 30rpx;" v-if="loginType === '账密'">
					忘记密码
				</button>
			</view>
		</view>
		<view class="p-3 flex align-center justify-center">
			<view class="bg-main rounded p-3 flex align-center justify-center flex-1" hover-class="bg-main-hover">
				<text class="text-white font-md" @click="submit">登 录</text>
			</view>
		</view>
		<view class="flex align-center justify-center my-2">
			<text class="text-white px-1" @click="changeLoginType">
				{{ loginType === '手机' ? '账号密码登录' : '验证码登录' }}
			</text>
			<text class="text-white px-1">|</text>
			<text class="text-white px-1">登录遇到问题</text>
		</view>
		<view class="flex align-center justify-center my-5">
			<text class="text-light-muted">————社交账号登录————</text>
		</view>

		<view class="flex align-center justify-center " style="width: 750rpx; height: 120rpx;">
			<image
				src="../../static/weixin.png"
				style="width: 100rpx; height: 100rpx;"
				class="rounded-circle px-5"
				mode=""
			></image>
			<image
				src="../../static/QQ.png"
				style="width: 100rpx; height: 100rpx;"
				class="rounded-circle px-5"
				mode=""
			></image>
			<image
				src="../../static/weibo.png"
				style="width: 100rpx; height: 100rpx;"
				class="rounded-circle px-5"
				mode=""
			></image>
		</view>
		<view class="flex align-center justify-center my-5">
			<text class="text-light-muted">注册代表您同意</text>
			<text class="text-white">《XXX社区协议》</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loginType: '手机',
			type: 'login',
			from: {
				username: '',
				password: '',
				repassword: ''
			},
			oldMobile: '',
			flag: 1,
			time: 60,
			codeText: '获取验证码'
		};
	},
	mounted() {
		this.timedown(60); // this.timedown(60)
	},
	methods: {
		changeLoginType() {
			this.loginType = this.loginType === '手机' ? '账密' : '手机';
		},
		changeType() {
			this.type = this.type === 'login' ? 'reg' : 'login';
		},
		submit() {
			let msg = this.type === 'login' ? '登录' : '注册';
			this.$H.post('/' + this.type, this.from).then(res => {
				uni.showToast({
					title: msg + '成功',
					icon: 'none'
				});
				if (this.type === 'reg') {
					this.changeType();
					this.form = {
						username: '',
						password: '',
						repassword: ''
					};
				} else {
					this.$store.dispatch('login', res);
					uni.navigateBack({
						delta: 1
					});
					// uni.switchTab({
					// 	url: '../index/index'
					// });
				}
			});
		},
		countDown() {
			let that = this;
			this.time = this.time - 1;
			this.flag = 0
			console.log(this.time);
			this.codeText = this.time + '秒后重新发送';
			if (this.time == 0) {
				this.codeText = '重新发送';
				this.flag = 1;
				this.time = 60;
				return;
			}
			setTimeout(function() {
				that.countDown();
			}, 1000);
		}
	}
};
</script>

<style>
.container {
	width: 750rpx;
	/* height: 100%; */
	height: 100vh;
	margin: 0;
	padding: 100rpx 0 0 0;
	background-size: cover;
	background-image: linear-gradient(to bottom, #ba7ace 0%, #8745ff 100%);
}
</style>
