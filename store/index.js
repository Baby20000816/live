import Vue from 'vue'
import Vuex from 'vuex'

import $H from '../common/request.js';
import $C from '../common/config.js';
import io from '../common/uni-socket.io.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    socket: null
  },
  actions: {
    //连接socket
    connectSocket({
      state,
      dispatch
    }) {
      const S = io($C.socketUrl, {
        query: {},
        transports: ['websocket'],
        timeout: 5000
      })
		let onlineEvent = (e) =>{
			uni.$emit('live',{
				type:"online",
				data:e
			})
		}
      //监听连接
      S.on('connect', () => {
        console.log('socket已连接')
		state.socket = S
		const{
			id
		} = S
		S.on(id,(e)=>{
			let d = e.data
			if(d.action === 'error'){
				let msg = d.payload
				if(e.meta.notoast){
					return
				}
				return uni.showToast({
					title:msg,
					icon:'none'
				});
			}
		})
		S.on('online',onlineEvent)
      })
	  const removeListner=()=>{
		  if(S){
			  S.removeListener('online',onlineEvent)
		  }
	  }·
      //监听失败
      S.on('error', () => {
		  removeListner()
		  state.socket = null
        console.log('连接失败')
      })
      //监听断开
      S.on('disconnect', () => {
		  removeListner()
		  state.socket = null
        console.log('已断开')
      })
    },
		authMethod({
			state
		}, callback){
			if(!state.token){
				uni.showToast({
					title:'请先登录',
					icon:'none'
				});
				return uni.navigateTo({
					url:'/pages/login/login'
				});
			}
			callback()
		},
		login({
			state
		}, user) {
			state.user = user
			state.token = user.token
		
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		getUserInfo({
			state
		}) {
			$H.get('/user/info', {
				token: true,
				noJump: true,
				toast: false
			}).then(res => {
				state.user = res
				uni.setStorage({
					key: "user",
					data: bJSON.stringify(state.user)
				})
			})
		},
		initUser({
			state
		}) {
			let u = uni.getStorageSync('user')
			let t = uni.getStorageSync('token')
			if (u) {
				state.user = JSON.parse(u)
				state.token = t
			}
		},
		logout({
			state
		}) {
			$H.post('/logout', {}, {
				token: true,
				toast: false
			})
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		}
	}
})
