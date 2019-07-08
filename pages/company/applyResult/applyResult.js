// pages/company/applyResult/applyResult.js
const app=new getApp();
const url=app.globalData.baseURL;
const time = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:1,
    url,
    applyList:[]
  },
  /**
   * 处理分类切换
   */
  changeState:function(e){
    let id=e.currentTarget.dataset.id;
    this.setData({
      state:id
    })
  },
  /**
   * 获取当前企业的申请信息
   */
  getApplyData:function(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.request({
      url: url +'api/knowledgebid/knowledgebid',
      data:{
        cid : wx.getStorageSync("cid"),
        token : wx.getStorageSync("token"),
        type:1
      },
      success:res=>{
        if(res.data.code===200){
          let val=res.data.data;
          val.forEach((v)=>{
            let data=new Date();
            data.setTime(v.time*1000);
            let timeStr=time.formatTime(data);
            v.time=timeStr;
            switch(v.state){
              case 0:v.msg='未受理';break;
              case 1:v.msg='审核中';break;
              case 2:v.msg='通过';break;
              case 3:v.msg='失败';break;
            }            
          })
          this.setData({
            applyList:res.data.data
          })
        }else{
          wx.showToast({
            title: '获取失败',
          })
        }
      },
      file:()=>{
        wx.showToast({
          title: '加载失败',
        })
      },
      complete:()=>{
       wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApplyData();
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