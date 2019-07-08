// pages/science/scienceIndex/scienceIndex.js
const app = getApp();
const url = app.globalData.baseURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url,
    state:1,
    scienceData:{},
    personMessData:{},
    projectPersonData:{},
    realVideoData:{}
  },

  getScienceData:function(){
    wx.showLoading({
      title: '加载中',
    })
    if(this.data.state===1){
      wx.request({
        url: url +'api/result/result',
        data:{
          cid: wx.getStorageSync("cid"),
          token: wx.getStorageSync("token"),
          state: this.data.state
        },
        success:(res)=>{
          if(res.data.code===200){
            this.setData({
              scienceData:res.data.data
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '连接失败',
            icon: "none"
          })
        },
        complete: () => {
          wx.hideLoading();
        }
      })
    } else if (this.data.state === 2){
      wx.request({
        url: url + 'api/expert/expert',
        data: {
          cid: wx.getStorageSync("cid"),
          token: wx.getStorageSync("token"),
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.setData({
              personMessData: res.data.data
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '连接失败',
            icon: "none"
          })
        },
        complete: () => {
          wx.hideLoading();
        }
      })
    }
    wx.hideLoading();
  },

  /**
   * 状态的改变
   */
  changeState:function(e){
    let newState=e.currentTarget.dataset.id;
    this.setData({
      state:newState
    })
    this.getScienceData();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScienceData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})