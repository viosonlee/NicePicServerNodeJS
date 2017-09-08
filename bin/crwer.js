var http = require("http");
var cheerio = require("cheerio");
var url = "http://www.xmeim.com";

function filterData(html) {
    var $ = cheerio.load(html);
    var bodyWrap = $(".gallary_wrap");
    var item = bodyWrap.find('.item');
    console.log('item->' + item + '\n');
    var result = [];
    item.each(function () {
        var box = $(this).find('.pic_box');
        var box_a = box.find('a');
        var url = box_a.attr('href');
        console.log('url->' + url + '\n');
        var a_img = box_a.find('img');
        var imgUrl = a_img.attr('data-original');
        console.log('imgUrl->' + imgUrl + '\n');
        var imgTitle = a_img.attr('alt');
        console.log('title->' + imgTitle + '\n\n');
        var resultData = {
            title: imgTitle,
            image: imgUrl,
            link: url
        };
        result.push(resultData);
    })
    return result;
}

exports.loadData = function (callback) {
    http.get(url, function (res) {
        var html = "";
        res.on("data", function (data) {
            html += data;
        });
        res.on("end", function () {
            console.log(html);
            var resultData = filterData(html);
            callback(false, resultData)
        })
    }).on("error", function () {
        console.log("获取页面数据出错")
        callback(true, null)
    });
}
