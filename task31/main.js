(function main() {
    var addEvent = function (ele, type, func) {
        if (ele.addEventListener) {
            ele.addEventListener(type, func);
        } else if (ele.attachEvent) {
            ele.attachEvent("on"+type, func);
        } else {
            ele["on"+ type]=func;
        }
    };

    var $ = function (selectors) {
        return document.querySelector(selectors);
    }

    var universityInfo = {
        "北京":["北京大学","清华大学","北京科技大学"],
        "上海":["复旦大学","上海交通大学","上海理工大学"],
        "南京":["南京大学","东南大学","南京航空航天大学"]
    };

    var selectcity = $("select[name='city']");
    var universities = $("select[name='university']");
    for (city in universityInfo) {
        var option = new Option(city, city)
        selectcity.add(option, undefined);
        }
    selectcity.onchange = function () {
        for(var i=0, len = universities.options.length;i < len; i++) {
            universities.remove(0);
        }
        universityInfo[selectcity.options[selectcity.selectedIndex].value].forEach( function(university, index) {
            var option = new Option(university, university)
            universities.add(option, undefined);
        });
    }

    var init = function (){
     $("input[value='student']").checked = true;
     selectcity.selectedIndex = 0;
     universityInfo[selectcity.options[selectcity.selectedIndex].value].forEach( function(university, index) {
            var option = new Option(university, university)
            universities.add(option, undefined);
        });
    }
    

    addEvent($("#career"), "click", function(e) {
        if (e.target === $("input[value='student']")) {
              $("#university").style.display = "block";  
              $("#company").style.display = "none";
            } else if (e.target === $("input[value='none-student']")) {
                $("#university").style.display = "none";  
                $("#company").style.display = "block";
            }
        });

    init();
})();
