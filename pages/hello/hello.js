var bmap = require('../../libs/bmap-wx.js');
var order = ['green', 'blue', 'green', 'blue']

Page({

  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'pages/hello/hello/scroll-view'
    }
  },

  data: {
    currentWeatherData: '',
    futureWeatherData: '',
    toView: 'green'
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  //获取天气信息
  onLoad: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'ioRBCXtvq2ima9fTdfGAfaGOidG0lTeG'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var currentWeatherData = data.currentWeather[0];
      var futureWeatherData = data.originalData.results[0].weather_data
      console.log(futureWeatherData);
      that.setData({
        currentWeatherData: currentWeatherData,
        futureWeatherData: futureWeatherData
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  }
})