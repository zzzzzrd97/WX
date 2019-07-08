// pages/active/activeList/activeList.js
const app=getApp();
const url=app.globalData.baseURL;
const time=require("../../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    category:1,
    page:1,
    total:0,
    activeList:[],
    url,
    time:""
  },
  /**
   * 头部点击
   */
  handleChange:function(e){
    let id=e.currentTarget.dataset.id;
    this.setData({
      category:id
    })
  },

  /**
   * 请求数据
   */

  renderData:function(){
    wx.showLoading({
      title: '连接中',
      icon:'none'
    })
    wx.request({
      url: url+'api/Activity/Activity',
      data:{
        page:this.data.page,
        type:0,
        pageSize:6
      },
      success:res=>{
        if(res.data.code===200){
          wx.showToast({
            title: '获取成功',
          });
          let val = res.data.data;
          val.forEach((v) => {
            let data = new Date();
            data.setTime(v.time * 1000);
            let timeStr = time.formatTime(data);
            v.time = timeStr;
          })
        this.setData({
          activeList:[...this.data.activeList,...res.data.data],
          total:res.data.total
        });
        }else{
          wx.showToast({
            title: '获取失败',
            icon:'none'
          })
        }
      },
      fail:()=>{
        wx.showToast({
          title: '连接失败',
          icon:'none'
        })
      }
      // complete:()=>{
      //   wx.hideLoading();
      // }
    }),
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.renderData();
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
    this.setData({
      activeList:[],
      page:1
    })
    this.renderData();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.page*6>this.data.total){
      wx.showToast({
        title: '无更多数据',
        icon:"none"
      })
    }else{
      this.setData({
        page:++this.data.page
      })
      this.renderData();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})