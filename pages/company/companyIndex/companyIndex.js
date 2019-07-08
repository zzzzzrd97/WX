// pages/company/companyIndex/companyIndex.js
const app=getApp();
const url = app.globalData.baseURL;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    name: "",
    password: "",
    category: 1,
    itemState:["未受理","已受理","处理中","待补充","修改成功","通过"],
    data1:{},
    data3:{},
    data4:{},
    data5:{},
    data5_my:{},
    data6:{},
    page:1,
    total:0,
    data5_my_show:false
  },
  /* 处理用户名 */
  handleName: function (e) {
    let value=e.detail.value;
    this.setData({
      name:value
    })
  },

  /* 处理密码 */
  handlePassword:function(e){
    let value=e.detail.value;
    this.setData({
      password:value
    })
  },

  /* 点击登录 */

  handleSubmit:function(){
    let data=this.data;
    if(data.name===""){
      wx.showToast({
        title: '请输入用户名',
        icon:"none"
      });
      return;
    }
    if(data.password===""){
      wx.showToast({
        title: '请输入密码',
        icon:"none"
      });
      return;
    }
    wx.showLoading({
      title: '正在登录',
      mask:true
    })
    wx.request({
      url:url+"/company/company/xcxcheckLogin",
      method:"post",
      data:{
        name:data.name,
        password:data.password
      },
      success:(res)=>{
        if(res.data.code===200){
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          });
          wx.setStorageSync("cid", res.data.data.cid);
          wx.setStorageSync("token", res.data.data.token);
          this.setData({
            login:true
          });
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
        }
      },
      file:()=>{
        wx.showToast({
          title: '请求失败',
          icon:"none"
        })
      },
      complete:()=>{
        wx.hideLoading()
      }
    })
  },

  /**
   * 点击切换分类
   */

  bigClick:function(e){
    if (e.target.dataset.id){
      let id = e.target.dataset.id;
      this.setData({
        category: id,
      })
      this.getContentData();
    }else{
      return;
    }
  },

  /**
   * 获取内容信息
   */

  getContentData:function(){
    if(this.data.category!==2){
    wx.showLoading({
      title: '正在加载',
      mask:true
    })
    }
    if(this.data.category===1){
      wx.request({
        url: url+'/api/company/company',
        data:{
          id:wx.getStorageSync("cid"),
          token:wx.getStorageSync("token")
        },
        success:res=>{
          if(res.data.code===200){
            wx.showToast({
              title: '获取成功',
            });
            this.setData({
              data1:res.data.data
            })
          }else{
            wx.showToast({
              title: '获取失败',
              icon:'none'
            })
          }
        },
        file:()=>{
          wx.showToast({
            title: '请求失败',
            icon:"none"
          })
        },
        complete:()=>{
          wx.hideLoading();
        }
      })
    }else if(this.data.category===3){
      wx.request({
        url: url+'api/projectBid/projectBid',
        data:{
          cid:wx.getStorageSync("cid"),
          token:wx.getStorageSync("token"),
          type:1
        },
        success:(res)=>{;
          if(res.data.code===200){
            this.setData({
              data3:res.data.data
            })
          }
        },
        file:()=>{
          wx.showToast({
            title: "请求失败",
            icon:"none"
          })
        },
        complete:()=>{
          wx.hideLoading()
        }
      })
    }else if(this.data.category===4){
      wx.request({
        url: url + 'api/projectBid/projectBid',
        data: {
          cid: wx.getStorageSync("cid"),
          token: wx.getStorageSync("token"),
          type: 2
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.setData({
              data4: res.data.data
            })
          }
        },
        file: () => {
          wx.showToast({
            title: "请求失败",
            icon: "none"
          })
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    }else if(this.data.category===5){
      wx.request({
        url: url + 'api/demand/demand',
        data: {
          cid: wx.getStorageSync("cid"),
          token: wx.getStorageSync("token"),
          page:this.data.page,
          pageSize:8
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.setData({
              data5:[...this.data.data5,...res.data.data.filter(v=>v.cid!=wx.getStorageSync("cid"))],
              data5_my:[...this.data.data5_my,...res.data.data.filter(v=>v.cid==wx.getStorageSync("cid"))]
            })
          }
        },
        file: () => {
          wx.showToast({
            title: "请求失败",
            icon: "none"
          })
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    }else if(this.data.category===6){
      wx.request({
        url: url + 'api/projectBid/projectBid',
        data: {
          cid: wx.getStorageSync("cid"),
          token: wx.getStorageSync("token"),
          type: 4
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.setData({
              data6: res.data.data,
              total:res.data.total
            })
          }
        },
        file: () => {
          wx.showToast({
            title: "请求失败",
            icon: "none"
          })
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    }
  },

  /**
   * 点击跳转到详情页面
   */
  toDetailPage:function(e){
    const id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../planShow/planShow?id='+id,
    })
  },

  /**
   * 点击显示本公司技术需求
   */
  handleMyComShow:function(){
    this.setData({
      data5_my_show:!this.data.data5_my_show
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync("cid")){
      this.setData({
        login:true
      });
    }
    this.getContentData();
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
      data5:{},
      page:1
    })
    this.getContentData();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.page*8>this.data.total){
      wx.showToast({
        title: '无更多数据',
        icon: "none"
      })
    }else{
      this.setData({
        page:this.data.page++,
      })
      this.getContentData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})