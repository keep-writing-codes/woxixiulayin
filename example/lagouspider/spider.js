// var request = require('request');

// var headers = {
//             'Accept': '*/*',
//             'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
//             'Cookie': 'ASP.NET_SessionId=zikhfrrprfylac454hgu342u',
//             'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36',
//             'X-MicrosoftAjax': 'Delta=true'
// };

// //getHtml 是一个promise，使用异步操作在promise.then中来处理获得html的body
// var getHtml = function (url) {
//     var options = {
//         url: url,
//         headers: headers
//     };

//     var promise = new Promise(function(resolved, reject) {
//         var reqCallback = function callback(error, response, body) {
//             if (!error && response.statusCode === 200) {
//                 resolved(body);
//             } else {
//                 console.log(error || response.statusCode);
//             }
//         };
//         request(options, reqCallback);
//     });
//     return promise;
// };

function Spider() {
    this.urls = [];
}
function log(data) {
    console.log(data);
}
Spider.prototype.setWorker = function (callback) {//从url获得body文本后调用this.worker进行后续操作
    var that = this;
    this.parseBody = function (body) {
       var promise = new Promise(function(resolved, reject) {
                callback.call(that, body);
            });
        return promise;
    }
};
Spider.prototype.addUrl = function (url) {//每添加一个url，设置一个worker
    this.urls.push(url);
    var that = this;
    return this.getBody(url)
        .then((body) => {
            that.parseBody(body);
        });//解析body
        // .then((res) => {
        //     that.removeUrl(url);//解析后删除url
        // });
};
Spider.prototype.removeUrl = function (url) {
    var index = this.urls.indexOf(url);
    this.urls.splice(index, 1);
};
Spider.prototype.getBody = function (url) {
    // return getHtml(url);
    return null;
};


// module.exports.getHtml = getHtml;
// module.exports.Spider = Spider;