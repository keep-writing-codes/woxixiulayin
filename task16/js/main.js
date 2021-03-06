/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityData = [];
    var city = document.getElementById('aqi-city-input').value;

    var value = document.getElementById('aqi-value-input').value;
    city = refineCity(city);
    if(!city){
      alert("输入正确的城市名字");
      return;
    }
    value = refineValue(value);
    if(!value){
      alert("输入正确的空气指数");
      return;
    }
    aqiData[city] = value;
    console.log(aqiData);
}

function refineCity(city) {
   var _city = city.trim();
  for(var i =0;i<_city.length;i++){
    if(!isNaN(_city.charAt(i)))
      return false;
  }
  return _city;
}

function refineValue(value) {
  var _value = value.trim();
  for(var i =0;i<_value.length;i++){
    if(isNaN(_value.charAt(i)))
      return false;
  }
  return _value;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var table = document.getElementById('aqi-table');
  table.innerHTML = "<tr><td>城市<\/td><td>空气质量<\/td><td>操作<\/td><\/tr>";
  for(var cityData in aqiData){
    var tr = document.createElement("tr");
    tr.innerHTML = "<td>"+cityData+"<\/td><td>"+aqiData[cityData]+"<\/td><td><button id='del-btn'>删除</button><\/td>";
    table.appendChild(tr);
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(ele) {
  // do sth.
  var td = ele.parentNode.parentNode.firstChild;
  delete aqiData[td.innerHTML];
  renderAqiList();
}

function delegate(action, tag, callback){
  document.addEventListener(action, function(e){
      if(tag == e.target.id.toLowerCase()){
        callback(e.target);
      }
  });
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn = document.getElementById('add-btn');
  btn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  delegate('click', 'del-btn', delBtnHandle);

}

window.onload = init;