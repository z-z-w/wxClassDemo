// pages/home/home.js
const app = getApp();
const question = require('../../datas/question.js');

Page({
  data: {
    i: 1,
    right: 0,
    wrong: 0,
    questionArr: [],
    question: {},
    answer: [],
  },
  onLoad: function () {
    this.getData();
    app.globalData.wrong = [];
  },
  OptionSort(arr) {
    return arr.sort(function () { return Math.random() > 0.5 ? -1 : 1 });
  },

  getData(){
    var that = this;
    wx.request({
      url: 'http://47.106.84.130:8080/wechat/list',
      method: 'GET',
      header: 'json',
      success(res) {
        that.init(res.data);
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  init(data){
    var quesArr = this.OptionSort(data);
    var ques = quesArr[0];
    this.setData({
      questionArr: quesArr,
      question: ques,
      answer: this.OptionSort(ques.option)
    });
  },

  // checkSelected(e) {
  //   console.log(e.target);
  //   if (e.target.dataset.select === this.data.question.right){

  //   }
  // }

  nextQues: function (e) {
    let select = e.currentTarget.dataset.select;
    if (select == this.data.question.rightAnswer) {
      var right = this.data.right + 1;
      this.setData({
        right: right
      });
    } else {
      let wrong = this.data.question;
      wrong.error = select ;
      app.globalData.wrong.push(wrong);
      let num = this.data.wrong + 1;
      this.setData({
        wrong: num
      });
    }

    if (this.data.i < this.data.questionArr.length) {
      this.data.i++;
      let ques = this.data.questionArr[this.data.i - 1];
      setTimeout(() => {
        this.setData({
          i: this.data.i,
          question: ques,
          answer: this.OptionSort(ques.option)
        })
      }, 500);
    } else {
      let questionNum = this.data.questionArr.length;
      let score = Math.round(this.data.right / questionNum * 100);
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/result/result?score=' + score,
        })
      }, 300);
    }
  },

  submitTap() {
    if (this.data.i <= this.data.questionArr.length){
      wx.showToast({
        title: '不能提前交卷',
        icon: 'none',
        duration: 1000
      })
    }
  }
})