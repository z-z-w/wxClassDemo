
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    option: [
      "A", "B", "C", "D", "E", "F", "G"
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let wrongList = app.globalData.wrong;
    this.setData({
      wrongList: wrongList
    })
  },


})