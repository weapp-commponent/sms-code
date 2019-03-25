Component({
  /**
   * 允许外部类名，开发者通过设置 sms-class 设置自己的样式覆盖组件默认样式
   */
  externalClasses: ['active-class', 'unactive-class'],
  /**
   * 父组件传入的值
   */
  properties: {
    // 短信验证码类型，数字or字母or...
    codeType: {
      type: String,
      value: 'number'
    },
    // 短信验证码长度
    codeCount: {
      type: Number,
      value: 6
    },
    // 是否自动拉起输入框
    isAuto: {
      type: Boolean,
      value: false
    }
  },
  data: {
    inputTop: '0rpx',
    valueItem: [],
    currentIndex: 0,
    isShowActive: false
  },
  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      const itemTemp = []
      for (let i = 0; i < this.data.codeCount; i++) {
        itemTemp.push({
          key: i,
          value: ''
        })
      }
      this.setData({
        valueItem: itemTemp,
        isShowActive: !!this.data.isAuto
      })
    }
  },
  methods: {
    /**
     * 输入验证码
     */
    input(e) {
      const valueArr = e.detail.value.split('')
      this.triggerEvent('changeCode', {
        value: e.detail.value
      }) // 触发父页面的事件，
      this.setData({
        currentIndex: valueArr.length
      })
      for (let i = valueArr.length; i < this.data.codeCount; i++) {
        const keyName = 'valueItem[' + i + '].value'
        this.setData({
          [keyName]: ''
        })
      }
      valueArr.forEach((value, index) => {
        const keyName = 'valueItem[' + index + '].value'
        this.setData({
          [keyName]: value
        })
      })
    },
    /**
     * code输入框获得焦点
     * 将输入框移动到屏幕以外，用户不可见
     */
    focus() {
      this.setData({
        inputTop: '-9999rpx',
        isShowActive: true
      })
    },
    /**
     * code输入框失去焦点
     * 将输入框移动到原来的位置，用户下次点击时触发获得焦点事件
     */
    blur() {
      this.setData({
        inputTop: '0rpx',
        isShowActive: false
      })
    }
  }
})
