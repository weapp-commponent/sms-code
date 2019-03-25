Page({
  data: {
    code: '',
    isAuto: false
  },
  /**
   * 监听验证码输入值
   * @param e 组件传递过来的对象
   */
  changeCode(e) {
    console.log(e.detail.value)
    // TODO 输入验证码的业务逻辑
    if (e.detail.value.length === 6) {
      wx.showToast({
        title: 'code:' + e.detail.value,
        icon: 'none'
      })
    }
  }
})
