// pages/company/planShow/planShow.js
const app = getApp();
const url = app.globalData.baseURL;
const time = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailMessage:{}
  },

  /**
   *  获取当前id的内容 地址 api/projectBid/projectBid  参数通过options
   */
  getDetailPlan:function(id){
    wx.request({
      url: url+'api/projectBid/projectBid',
      data:{
        id,
        token:wx.getStorageSync("token")
      },
      success:res=>{
       if(res.data.code===200){
         let date=new Date();
         date.setTime(res.data.data.time*1000);
         let timeStr = time.formatTime(date);
         res.data.data.time = timeStr;
         this.setData({
           detailMessage:res.data.data
         })
       }else{
         wx.showToast({
           title: '获取失败',
           icon:'none'
         })
       }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetailPlan(options.id);
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