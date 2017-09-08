var formidable = require('formidable')
var util = require('util')
var fs = require('fs')
var path = require('path');
exports.saveAvatar = function saveAvatar(req, res) {
    var form = new formidable.IncomingForm()
    form.uploadDir = '../public/avatar'
    form.maxFieldsSize = 100 * 1024 * 1024
    form.keepExtensions = true//保持原有的扩展名
    form.parse(req, function (err, fields, file) {
        if (err) {
            res.writeHead(-1, {'Content-Type': 'text/json'})
            res.end({code: -1, message: '接收错误'})
            return
        }

        var filePath = ''
        //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。
        if (file.tmpFile) {
            filePath = file.tmpFile.path
        } else {
            for (var key in file) {
                if (file[key].path && filePath === '') {
                    filePath = file[key].path
                    break
                }
            }
        }
        var fileExt = filePath.substring(filePath.lastIndexOf('.'))
        var fileName = new Date().getTime() + fileExt;
        var targetDir = '../public/avatar'
        fs.rename(filePath, path.join(targetDir, fileName), function (e) {
            if (e) {
                console.log(e.stack)
                res.json({code: -1, message: '操作失败'})
            } else {
                var fileUrl = '/avatar/' + fileName
                res.json({code: 0, fileUrl: fileUrl})
            }
        })

        //     //文件移动的目录文件夹，不存在时创建目标文件夹
        //     var targetDir = path.join(__dirname, 'upload')
        //     if (!fs.existsSync(targetDir)) {
        //         fs.mkdir(targetDir)
        //     }
        //     var fileExt = filePath.substring(filePath.lastIndexOf('.'))
        //     //判断文件类型是否允许上传
        //     if (('.jpg.png.jpeg.gif').indexOf(fileExt) === -1) {
        //         var err = new Error('不支持文件格式')
        //         res.json({code: -1, message: '不支持文件格式'})
        //     } else {
        //         //以当前时间戳对上传文件进行重命名
        //         var fileName = new Date().getTime() + fileExt
        //         var targetFile = path.join(targetDir, fileName)
        //         fs.rename(filePath, targetFile, function (e) {
        //             if (e) {
        //                 console.log(e.stack)
        //                 res.json({code: -1, message: '操作失败'})
        //             } else {
        //                 var fileUrl = '/upload/' + fileName
        //                 res.json({code: 0, fileUrl: fileUrl})
        //             }
        //         })
        //     }
    })
}