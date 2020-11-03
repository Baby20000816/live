<template>
	<view class="container">
		<view class="align-center flex ml-3" @click="back"><text class="iconfont iconguanbi"></text></view>
		<view class="flex align-center justify-center" style="height: 300rpx;">
			<text style="font-size: 50rpx;" class="">
				{{ loginType === '手机' ? '手机验证码登录' : '账号密码登录' }}
			</text>
		</view>
		<view class="px-3">
			<view class="flex align-center border-bottom my-1">
				<text v-if="loginType === '手机'" class=" mr-3">+86</text>
				<input
					type="text"
					v-model="from.phone"
					class="font"
					placeholder="请输入手机号"
					style="height: 100rpx;"
					v-if="loginType === '手机'"
				/>
				<input
					type="text"
					v-model="from.username"
					class="font"
					placeholder="昵称/手机/邮箱"
					style="height: 100rpx;"
					v-else
				/>
			</view>
			<view class="flex align-center justify-center border-bottom my-5">
				<input
					type="password"
					v-model="from.code"
					class="font "
					placeholder="请输入验证码"
					style="height: 100rpx;"
					v-if="loginType === '手机'"
				/>
				<input
					type="password"
					v-model="from.password"
					class="font "
					placeholder="请输入密码"
					style="height: 100rpx;"
					v-else
				/>
				<button
					plain
					class="mr-0"
					style="font-size: 30rpx;background-color: #8745ff;color: #FFFFFF;"
					v-if="loginType === '手机'"
					@click="getCode()"
				>
					{{ message}}
				</button>
				<button plain class="mr-0" style="border: none ; font-size: 30rpx;" v-if="loginType === '账密'">
					忘记密码
				</button>
			</view>
		</view>
		<view class="p-3 flex align-center justify-center">
			<view
				class="bg-main rounded-circle p-3 flex align-center justify-center flex-1"
				hover-class="bg-main-hover"
			>
				<text class="text-white font-md" @click="submit">登 录</text>
			</view>
		</view>
		<view class="flex align-center justify-center my-2">
			<text class=" px-1" @click="changeLoginType" style="color: #8745ff;">
				{{ loginType === '手机' ? '账号密码登录' : '验证码登录' }}
			</text>
			<text class=" px-1">|</text>
			<text class=" px-1" style="color: #8745ff;">登录遇到问题</text>
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
				@click="weixin"
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
			<text class="text-primary">《XXX社区协议》</text>
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
				repassword: '',
				code: '',
				phone: ''
			},
			message: '获取验证码',
			isPhoneLogin: true
		};
	},
	mounted() {},
	methods: {
		changeLoginType() {
			this.loginType = this.loginType === '手机' ? '账密' : '手机';
			this.isPhoneLogin = !this.isPhoneLogin;
		},
		changeType() {
			this.type = this.type === 'login' ? 'reg' : 'login';
		},
		back() {
			uni.navigateBack({
				delta: 2
			});
		},

		submit() {
			let msg = this.type === 'login' ? '登录' : '注册';
			console.log(this.type);
			this.type = this.isPhoneLogin ? 'phoneLogin' : 'login';
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
				}
			});
		},
		getCode() {
			this.$H.post('/sendcode', { phone: this.from.username }).then(res => {
				this.message = 60;
				var that = this;
				//这是我的定时器
				var result = setInterval(function() {
					that.message = that.message - 1;
					if (that.message == 0) {
						that.message = '获取验证码';
						clearInterval(result);
					}
				}, 1000);
			});
		},
		weixin() {
			var that = this;
			//判断手机是否安装微信
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					//进行微信授权
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							//获取微信信息
							uni.getUserInfo({
								provider: 'weixin',
								success: function(info) {
									var user = info.userInfo;
									console.log(info.userInfo);
									var param = { avatar: user.avatarUrl, openId: user.openId,username:user.nickName };
									that.$H.post('/wxLogin', param).then(res => {
										uni.showToast({
											title: '登录成功',
											icon: 'none'
										});
										that.$store.dispatch('login', res);
										uni.navigateBack({
											delta: 2
										});
									});
								}
							});
						}
					});
				}
			});
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
	/* background-image: linear-gradient(to bottom, #ba7ace 0%, #8745ff 100%); */
}
</style>
