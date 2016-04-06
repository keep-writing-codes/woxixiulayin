/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};


// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

var can = document.getElementById("aqi-canvas");
var cxt = can.getContext("2d");

function draw_rect(middle_x, width, height) {
  cxt.fillStyle("#FF00FF");
  cxt.fillRect(middle_x-width/2,height,middle_x+width/2,0);
}

/**
 * 渲染图表
 */
function renderChart(chardata) {

draw_rect(200,10,100);
}

function getDatabyCity(city) {
  var citys = [];
  var data = {};
  citys = Object.keys(aqiSourceData);
  if(citys.indexOf(city) == -1){
    console.log(city + 'is not included');
    return;
  }
  data = aqiSourceData[city];
  console.log(data);
  return data;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
  var radio = document.getElementsByName('gra-time');
  var graTime = e.target.value;
  var charData = {}
  // 确定是否选项发生了变化 
  if(graTime == pageState.nowGraTime)
    return;
  // 设置对应数据
  pageState.nowGraTime = graTime;
  charData = initAqiChartData(getDatabyCity(pageState.nowSelectCity),graTime);
  console.log(charData);
  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
  // 确定是否选项发生了变化 
  var radio = document.getElementsByName("gra-time");
  console.log(e);
  // 设置对应数据
  // var charData = initAqiChartData(,);
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radio = document.getElementsByName("gra-time");
  for(var i=0;i<radio.length;i++) {
    radio[i].onclick = graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var opt;
  var sel = document.getElementById("city-select");
  var citys = Object.keys(aqiSourceData);
  for(var i in citys){
    opt = document.createElement("option");
    opt.innerHTML = citys[i];
    sel.appendChild(opt);
  }

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData(data, period) {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var charData = {};
  var dates = Object.keys(data);
  var values = [];
  var count = 0;
  var temp = [];

  for (var i = 0; i < dates.length; i++) {
    values.push(data[dates[i]]);
  }

  if (period == '天') {
    charData = data;
  } else if (period == '周') {
    while (values.length != 0) {
      count++;
      temp = [];
      for (var i = 0; i < 7; i++) {
        var v = values.shift();
        if (isNaN(v)) break;
        temp.push(v);
      }
      charData['第' + count + '周'] = Math.round(eval(temp.join('+')) / temp.length);
    }
  } else if (period == '月') {
    var tempday = "2016-01-01";
    while (values.length != 0) {
      count++;
      temp = [];
      while (true) {
        if (!isNaN(values[0]) && dates[0].split('-')[1] == tempday.split('-')[1]) {
          temp.push(values.shift());
          dates.shift();
        } else {
          if(!isNaN(values[0])) {
            tempday = dates[0];
          }
          charData['第' + count + '月'] = Math.round(eval(temp.join('+')) / temp.length);
          break;
        }
      }
    }

  } else {
    alert('输入天、周或者月');
  }
  console.log(charData);
  return charData;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  // initAqiChartData();
}

var test = false;
console.log("************test mode on?:" + test);
if (!test) {
  init();
} else {
  var main = {
    initAqiChartData: initAqiChartData

  }
  module.exports = main;
}