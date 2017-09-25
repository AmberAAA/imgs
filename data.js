/**
 * Created by Amber on 2017/9/25.
 */
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/img';
var db = null;


function Db() {
    this.insertOne = function(data,callback) {
        if(db===null){
            console.log('尚未链接到数据库');
            return false;
        }
        //使用part1_title表
        var collection = db.collection('part1_title');
        //插入数据
        collection.insertOne(data, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    };

    this.insertMany = function(data,callback) {
        if(db===null){
            console.log('尚未链接到数据库');
            return false;
        }
        var collection = db.collection('part1_title');
        //插入数据
        collection.insertMany(data, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    };


    this.find = function (data,callback) {
        if(db===null){
            console.log('尚未链接到数据库');
            return false;
        }
        var collection = db.collection('part1_title');
        //插入数据
        collection.findOne(data, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    };
    
    this.save = function (data,callback) {
        if(db===null){
            console.log('尚未链接到数据库');
            return false;
        }
        var collection = db.collection('part1_title');
        //插入数据
        collection.save(data, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, dbs) {
        db = dbs;
        console.log("连接成功！");
    });
}

module.exports  =  new Db();



