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

if (!isTestMode()) {
var can = document.getElementById("aqi-canvas");
var cxt = can.getContext("2d");
} else {
  var can = document.createElement("canvas");
  var cxt = can.getContext("2d");
}
function draw_rect(col) {
  var width = col.width;
  var height = col.height;
  var middle_x = col.time;
  cxt.fillStyle = "#333333";
  cxt.fillRect(Math.round(middle_x-width/2),can.height-height,width, height);
}

function colum(time, height, width){
  this.time = time;
  this.height = height;
  this.width = width;
}

function refresg_can(){
  cxt.fillStyle = "#FFFFFF";
  cxt.fillRect(0, 0, can.width, can.height);
}
function colum_arry(chardata) {
  var cols = [];
  var times = Object.keys(chardata);
  var base_width = Math.ceil(can.width/100);
  var width;
  var x_start;
  if(pageState.nowGraTime == "day") {
    width = base_width;
    x_start = Math.ceil(width/2);
  } else if (pageState.nowGraTime == "week") {
    width = base_width * 2;
    x_start = Math.ceil(can.width*5/7/2);
  } else {
    width = base_width * 4;
    x_start = Math.ceil(can.width*26/30/2);
  }
  refresg_can();
  for(var i in times) {
    cols.push(new colum(x_start, chardata[times[i]], width-1));
    x_start += width;
  }
  return cols;
}
/**
 * 渲染图表
 */
function renderChart(chardata) {
  var cols = colum_arry(chardata);
  console.log(cols);
  var width = can.width/cols.length;
  for(var i in cols) {
    draw_rect(cols[i]);
  }
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
  renderChart(charData);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
  // 确定是否选项发生了变化 
  var sel = document.getElementById("city-select");
  var city;
  console.log(sel)
  for(var i in sel.getElementsByTagName("option")) {
    if(sel[i].selected == true) {
      city = sel[i].value;
    }
  }
  if(city == pageState.nowSelectCity) {
    return;
  }
  pageState.nowSelectCity = city;
  console.log(city);
  // 设置对应数据
  charData = initAqiChartData(getDatabyCity(city),pageState.nowGraTime);
  // 调用图表渲染函数
  renderChart(charData);
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
  pageState.nowSelectCity = citys[1];
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  sel.onchange = citySelectChange;
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

  if (period == 'day') {
    charData = data;
  } else if (period == 'week') {
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
  } else if (period == 'month') {
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
    alert('please input day/week/month');
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
  initAqiChartData(getDatabyCity(pageState.nowSelectCity),pageState.nowGraTime);
}

//console.log(navigator.userAgent);  
//如果在jest中会显示”Node.js (darwin; U; rv:v5.3.0)“
function isTestMode() {
    return (navigator.userAgent.indexOf("Node") != -1) ;
}

if (!isTestMode()) {
  init();
} else {
  module.exports = {
    initAqiChartData: initAqiChartData
  }
}