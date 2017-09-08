var dataHelper = require('./mysql-helper')
exports.getUserInfo =function (name) {
    dataHelper.getUserInfo(name)
}
