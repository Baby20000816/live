<template>
	<view>
      <button type="default" open-type="getAuthorize" @getAuthorize="getPhoneNumber" @error="onAuthError" scope='phoneNumber'>授权手机号</button>
	</view>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getPhoneNumber() {
      this.onGetAuthorize()
        .then(res => {
          // console.log(res)
          var resData = JSON.parse(res.response);
          // console.log(resData);
          // 重新赋值方便后台获取
          var params = {
            phoneNumber: resData.response,
            sign: resData.sign
          };
          console.log(params);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onGetAuthorize() {
      return new Promise((resolve, reject) => {
        my.getPhoneNumber({
          scopes: "auth_user",
          success: res => {
            resolve(res);
          },
          fail: res => {
            reject(res);
          }
        });
      });
    },
    onAuthError() {
      console.log("123321");
    }
  }
};
</script>
<style>

</style>
