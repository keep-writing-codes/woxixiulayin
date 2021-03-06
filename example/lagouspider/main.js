// function $ (id) {
//     return document.getElementById(id);
// }

function CityJobcount (city, jobcount) {
    this.city = city;
    this.jobcount = jobcount;
};

var jsonp = document.getElementById("jsonp");
// console.log(Spider);
//使用jsonp的方式来获取shuju
Spider.prototype.getBody = function (url) {
    var promise = new Promise(function (resolved, rejected) {
        var iframe = document.createElement('iframe');
        iframe.src= url;
        jsonp.appendChild(iframe);
        resolved(iframe.innerHTML);
    });
    return promise;
}

var testSpider = new Spider();
testSpider.setWorker((body) => {
    console.log(body);
});
testSpider.addUrl("http://www.lagou.com/jobs/positionAjax.json?city=%E4%B8%8A%E6%B5%B7&kd=%E5%89%8D%E7%AB%AF");

var getJSON = function(url) {
    var promise = new Promise(function (resolve, reject) {
        var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = ActiveXObject("MicrosoftAjax");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            resolve(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    });
    return promise;
}

var inputjob = $("job");
var inputsubmit = $("submit");
var jobinfotable = $("jobinfotable");
var submit = $("submit");

function getCityJobcounts() {
    var cityjobcounts = [];
    var job = inputjob.value;
    var url = '/job/'+job;
    return getJSON(url);
}

function diplapyJobinfo(cityjobcounts) {
    jobinfotable.removeAttribute("hidden");
    jobinfotable.innerHTML = "";
    var tr = document.createElement("tr");
    var tdcity = document.createElement("td");
    var tdcounts = document.createElement("td");
        tdcity.innerHTML = "城市";
        tdcounts.innerHTML = "工作数量";
        tr.appendChild(tdcity);
        tr.appendChild(tdcounts);
        jobinfotable.appendChild(tr);
    cityjobcounts.forEach((item, index, array) => {
        var tr = document.createElement("tr");
        var tdcity = document.createElement("td");
        var tdcounts = document.createElement("td");
        tdcity.innerHTML = item.city;
        tdcounts.innerHTML = item.jobcount;
        tr.appendChild(tdcity);
        tr.appendChild(tdcounts);
        jobinfotable.appendChild(tr);
    });
}

inputjob.onkeydown = function (event) {
    if(event.target != this || event.keyCode != 13) return;
    getCityJobcounts().then((res) => {
        var cityjobcounts = JSON.parse(res);
        diplapyJobinfo(cityjobcounts);    
    });
}

submit.onclick = function () {
    getCityJobcounts().then((res) => {
        var cityjobcounts = JSON.parse(res);
        diplapyJobinfo(cityjobcounts);
    });
}
