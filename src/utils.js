const Crypto = require('crypto')

/**
 * 数据库查询出来的对象转换为JSON
 * @param dbObj 数据库对象
 */
module.exports.dbObj2Json = (dbObj) => {
    return JSON.parse(JSON.stringify(dbObj))
}

module.exports.encryptPasswod