var express = require('express')
var app = new express()
var router = new express.Router()
var dataHelper = require('./crwer')
var user_avatar = require('./user-avatar')
var queryString = require('querystring')
var userInfo = require('./user-info')
//有顺序的,从上往下遍历
app.use(express.static('../public'))//静态资源系统
app.use(router)

var server = app.listen(9093, 'localhost', function () {
    var host = server.address().address
    var port = server.address().port
    console.log("访问地址为 http://%s:%s", host, port)
})


//接收文件上传
router.post('/file_upload', function (req, res) {
    user_avatar.saveAvatar(req, res)
})

router.get('/', function (req, res) {
    dataHelper.loadData(function (error, resultData) {
        if (error) {
            res.writeHead(403)
            res.end('error')
            return
        }
        res.writeHead(200, {'Content-Type': 'text/json', 'Charset': 'utf-8'})
        res.write(JSON.stringify(resultData))
        res.end()
    })
})

router.post('/userInfo', function (req, res) {
    var body = ''
    req.on('data', function (chunk) {
        body += chunk
    })
    req.on('end', function () {
        console.log('body->' + body + '\n')
        var parse = queryString.parse(body);
        userInfo.getUserInfo(parse.name)
        res.send('ok')
    })
})




