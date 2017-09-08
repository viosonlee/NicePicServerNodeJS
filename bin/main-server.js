var express = require('express')
var app = new express()
var router = new express.Router()
var dataHelper = require('./crwer')
var user_avatar = require('./user-avatar')

//有顺序的,从上往下遍历
app.use(express.static('../public'))//静态资源系统
app.use(router)

var server = app.listen(9094, 'localhost', function () {
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


