/**
 * Created by Amber on 2017/9/25.
 * 爬取详细数据
 */
var data = require('./data');
var cheerio = require('cheerio');
const https = require('https');
var request = require('request');

var all_page = null;
var root_url = 'https://www.24meinv.me';
var id_root = 'part1_title_';
var id = 0;
var urls = [];
var imgs = [];

var modele = {};

function start() {
    if(urls.length == 0){
        if(id !== 0){
            modele.imgs = imgs;
            console.log(modele);
            data.save(modele,function () {
                console.log('第'+id +'条数据更新成功');
            })
        }
        data.find({id:id_root+id},function (res) {
            modele = res;
            console.log('成功加载'+ modele.id);
            options.url = modele['link_url'];
            id ++;
            imgs = [];
            request(options, callback);
        });

    }else{
        options.url = urls.shift();
        request(options, callback);
    }
}


var options = {
    url: '',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
    }
};

function callback(error, response) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(response.body, {decodeEntities: false});
        //获取页面总数
        if(imgs.length === 0){
            if ($('.page a').length === 0){
                all_page = 1;
            }else{
                all_page = $('.page a').length - 4;
            }
            for(var i=1;i<all_page;i++){
                urls.push(root_url+$('.page a:nth-child('+(i+3)+')').attr('href'))
            }
        }
        $('.gtps>ul>li>a>img').each(function (i, e) {
            var a = $(e).attr('src').replace('pic','img');
            imgs.push({
                img_b:a.substring(0,a.lastIndexOf('/m')) + '/' + a.substring(a.lastIndexOf('/m')+2),
                img_s:$(e).attr('src')
            })
        });
        start();
    } else {
        console.log(error,response);
    }
}

setTimeout(function () {
    start();
}, 5000);

