// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    searchQuery: '酒店'
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
  },

  newMap:function(){
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'ioRBCXtvq2ima9fTdfGAfaGOidG0lTeG'
    });
    var query = that.data.searchQuery;

    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    console.log(query)
    // 发起POI检索请求 
    BMap.search({
      "query": query,
      fail: fail,
      success: success,
      iconPath: '../../img/1.png',
      iconTapPath: '../../img/1.png'
    });
  },

  onLoad: function () {
    var that = this;
    that.newMap();
  },

  formSubmit:function(query){
    var that = this;
    that.setData({
      searchQuery: query.detail.value.query
    })
    that.newMap();
  },

  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      placeData: {
        title: '名称：' + data[i].title + '\n',
        address: '地址：' + data[i].address + '\n',
        telephone: '电话：' + data[i].telephone
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../img/2.png";
      } else {
        data[j].iconPath = "../../img/1.png";
      }
      markers[j] = data[j];
    }
    that.setData({
      markers: markers
    });
  }
})