// var Spider = require('./spider').Spider;

//使用jsonp的方式来获取shuju
Spider.prototype.getBody = function (url) {
    var promise = new Promise(function (resolved, rejected) {
        var script = document.createElement('script');
        script.src = url;
        resolved(script.text);
    });
    return promise;
};

function CityJobcount (city, job) {
    this.city = city;
    this.job = job;
    this.jobcount = 0;
};

function LagouSpider (jds) {
    Spider.call(this);
    this.jds = jds;
    this.results = [];//返回最终取到的结果
    this.parseBody = this.getJdinfo;
}
LagouSpider.prototype = Object.create(Spider.prototype);
LagouSpider.prototype.constructor = LagouSpider;
LagouSpider.prototype.createUrl = function(jd){
    var urlOrigin = "http://www.lagou.com/jobs/positionAjax.json?city="+jd.city+"&kd="+jd.job;
    var url = encodeURI(urlOrigin);
    return url;
};
LagouSpider.prototype.createUrls = function () {
    if(!(this.jds instanceof Array)) return [];
    var that = this;
    return this.jds.map((jd) => {//生产所有的url
        return that.createUrl(jd);
    });
}
LagouSpider.prototype.getJdinfo = function (body) {//url处理函数
    var that = this;
    var worker = new Promise(function(resolved, reject) {
        var cityinfo = JSON.parse(body);
        var city = cityinfo.content.positionResult.locationInfo.city;
        var jobcount = cityinfo.content.positionResult.totalCount;
        var cityjobcount = new CityJobcount(city, that.jds[0].job);
        cityjobcount.jobcount = jobcount;
        that.results.push(cityjobcount);
        resolved(cityjobcount);
    });
    return worker;
}

LagouSpider.prototype.end = function () {
    var promises = [];
    var that = this;
    this.createUrls().forEach(function(url, index) {
        promises.push(that.addUrl.call(that, url));//组合多个处理url的promise
    });
    return Promise.all(promises);//包装所有promise为一个新的promise
}

// module.exports.LagouSpider = LagouSpider;
// module.exports.CityJobcount = CityJobcount;