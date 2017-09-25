/**
 * Created by Amber on 2017/9/25
 * 爬取简要数据
 */
var data = require('./data');
var cheerio = require('cheerio');
const https = require('https');

var root_URL = 'https://www.24meinv.me/meinv_';
var page = 1;
var footer = '.html';


var request = require('request');

var options = {
    url: 'https://www.24meinv.me/meinv_1.html',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
    }
};

var id = 0;
var id_header = 'part1_title_';
var root_url = 'https://www.24meinv.me';
function callback(error, response) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(response.body, {decodeEntities: false});
        $('.tps .hdl li').each(function (index, element) {
            var mod = {
                page: page,
                id: id_header + id,
                title: $(element).find('img').attr('alt'),
                title_img: $(element).find('img').attr('src'),
                link_url: root_url + $(element).find('a:first-child').attr('href'),
                date: $(element).find('span').text()
            };
            id++;
            console.log('第'+page+'页；第：'+id+'个');
            data.insertOne(mod, function () {
            });
        });
        page++;
        options.url = root_URL + page + footer;
        request(options, callback)
    } else {
        console.log(page,error,response.statusCode);
    }
}

setTimeout(function () {
    request(options, callback);
}, 15000);