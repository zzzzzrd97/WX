// pages/policy/policyShow/policyShow.js
const app=getApp();
const url=app.globalData.baseURL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    policyData:{},
    url
  },
  /*
    获取政策信息 
   */
  getPolicyData:function(){
    wx.showLoading({
      title: '加载中'
    });
    wx.request({
      url: url+'api/policy/policy',
      data:{
        id:this.data.id
      },
      success:(res)=>{
        if(res.data.code===200){
          this.setData({
            policyData:res.data.data[0]
          })
        }else{
          wx.showToast({
            title: '获取失败',
            icon:'none'
          })
        }
      },
      file:function(){
        wx.showToast({
          title: '连接失败',
          icon:'none'
        })
      },
      complete:function(){
        wx.showToast({
          title: '连接完成',
          icon:'none'
        });
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    });
    this.getPolicyData();
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