// pages/policy/policyList/policyList.js
const app=getApp();
const url=app.globalData.baseURL;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pid:1,
    policyList:[],
    url,
    page:1,
    total:0
  },
  /* 监听分类切换*/
  handleTypeChange:function(e){
    let pid=e.currentTarget.dataset.pid;
    this.setData({
      pid:pid,
      page:1,
      policyList:[]
    });
    this.getPolicyList();
  },

/*获取政策信息*/
getPolicyList:function(){
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  wx.request({
    url: url+'api/policy/policy',
    data:{
      pid:this.data.pid,
      page:this.data.page,
      pageSize:6
    },
    success:(res)=>{
      if(res.data.code===200){
        wx.showToast({
          title: '获取成功',
        });
        this.setData({
          policyList:[...this.data.policyList,...res.data.data],
          total: res.data.total,
        })
      }else{
        wx.showToast({
          title: '获取失败',
          icon:"none"
        })
      }
    },
    fail:function(){
      wx.showToast({
        title: '连接失败',
        icon: "none"
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
    this.getPolicyList();
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
      policyList:[],
      page:1
    });
    this.getPolicyList();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let p = this.data.page;
    if(p*6>this.data.total){
      wx.showToast({
        title: '无更多数据',
        icon: "none"
      })
    }else{
      this.setData({
        page : ++this.data.page
      })
      this.getPolicyList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})