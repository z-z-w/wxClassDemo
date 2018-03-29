// pages/result/result.js
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function (query) {
    this.checkResult(query.score);
    let wrongNum = app.globalData.wrong.length;
    this.setData({
      wrongNum: wrongNum
    })
  },

  checkResult(score) {
    let rating = '';
    let text = '';
    if (score < 60) {
      rating = '不及格';
      text = '不要灰心， 多加练习';
    } else if (score >= 60 && score < 80) {
      rating = '良好';
      text = '考的不错， 继续加油';
    } else {
      rating = '优秀';
      text = '非常好， 继续保持';
    }
    this.setData({
      score: score,
      rating: rating,
      text: text
    });
  },

  viewWrong() {
    if (app.globalData.wrong.length == 0){
      wx.showModal({
        title: '恭喜',
        content: '您没有错题，继续保持',
        confirmColor: "#fe4030"
      })
    } else {
      wx.redirectTo({
        url: '/pages/wrong/wrong',
      })
    }
    
  },

  reTest(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  }
})