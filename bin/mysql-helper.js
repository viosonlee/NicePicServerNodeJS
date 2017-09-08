var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
})
connection.connect()

exports.saveOne = function saveOne(data) {
    var sql = 'INSERT INTO nice_pic(id,title,url,img) VALUES(0,?,?,?)'
    var params = [data.title, data.link, data.image]
    connection.query(sql, params, function (error, result) {
        if (error) {
            console.log('fail insert data:' + data + error.stack + '\n')
            return
        }
        console.log('insert success')
    })
}