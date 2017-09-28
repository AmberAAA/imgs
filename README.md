# imgs
最近不是很忙，因此编写一个node爬虫，一方面学习一下node在后端的知识，一方面也不能闲着让自己生锈，不是吗？

## 目标
1. 使用node爬虫获取目标网站图片的src 以及title
2. 保存在MongoDB数据库中

## 所使用的包
1. mongodb;
2. fs;
3. request;
4. cheerio;

## 前期准备

### window下适配MongoDB

#### 启动数据库
在数据库目录下cmd运行，启动数据库
```shell
#启动数据库
mongod --dbpath d:/imgs/data/db
#适配数据库

```


## 后期补充
最后成功用次爬虫检索了目标网页的全部图片信息，并储存在了Mongdb中，大概生成了4900多条数据。

downLoad.js用来将图片下载之本地，当下载之50G左右时，怀疑目标网站修改了反爬虫策略，无法下载正确的文件之本地。
