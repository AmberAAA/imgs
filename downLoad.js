/**
 * Created by Amber on 2017/9/26.
 * 用于将数据库中的url下载到本地
 */

var data = require('./data');
var request = require('request');
var fs = require('fs');


var id = 3420   ;
var id_header = 'part1_title_';

var load_path = 'j:/图片/';

var options = {
    url: 'http://img.diercun.com/hd1/Ugirls/APP2017%20No.793/0022.jpg',
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=1',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Cache-Control': 'max-age=0',
        'Proxy-Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': 0.8,
        'Host': 'img.diercun.com',
        "X-Forwarded-For": "67.218.144.37",
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3112.113 Safari/537.36'
    }
};

var downLoad_urls = [];

function downLoad(filename,callback) {
    request(options)
        .on('error', function (err) {
            console.log(err);
            console.log('管出现异常，对应属性为为' +JSON.stringify(options));
            return false;

        })
        .pipe(fs.createWriteStream(filename).on('error', function (err) {
            console.log(err);
            console.log('管出现异常，对应属性为为' +JSON.stringify(options));
            return false;
        }))
        .on('close', callback)
}

function downs() {
    if(downLoad_urls.length>0){
        var obj = downLoad_urls.shift();
        options.url = obj.url;
        //options.headers['X-Forwarded-For'] = Math.floor(Math.random() * 254) + '.' + Math.floor(Math.random() * 254) + '.' + Math.floor(Math.random() * 254) + '.' + Math.floor(Math.random() * 254);
        //options.headers['X-Forwarded-For'] = '113.139.211.141';
        setTimeout(function () {
            console.log(id,downLoad_urls.length);
            downLoad(obj.name,downs);
        },3000)
    }else{
        start();
    }
}



function start() {
    data.find({id: id_header + id}, function (res) {
        var name = res['title'].replace(/[\\\\/:*?\"<>|]/ig,'');
        fs.mkdir(load_path + name + '/', function (err) {
            if (err) {
                console.log(err);
            }
            res.imgs.map(function (e) {
                var a = e['img_b'].split('/');
                downLoad_urls.push({name:load_path + name + '/' + a[a.length - 1],url:e['img_b']});
            });
            id++;
            downs();
        });
    })
}


setTimeout(function () {
    start()
}, 5000);