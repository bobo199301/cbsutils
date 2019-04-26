const crypto = require('crypto');
const request = require('request')
Date.prototype.format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 *创建订单
 */
module.exports.createOrderNo = (businessType, payWay) => {
    let now = new Date().format("yyMMddhhmm");
    let randNum = `${Math.ceil(Math.random() * 9)}${Math.ceil(Math.random() * 9)}`;
    return `${businessType}${payWay}${now}${randNum}`
};
/**
 *获取支付类型
 */
module.exports.getPayWay = orderNo => {
    return parseInt(orderNo[1])
};
/**
 *获取业务类型
 */
module.exports.getBusinessType = orderNo => {
    return parseInt(orderNo[0])
};
/**
 * 微信支付，pc二维码生产签名工具类
 * @param paramsObj 支付所需参数
 * @param wxpayKey 微信密钥
 */
module.exports.getSign = (paramsObj, wxpayKey) => {
    // 参数字典排序
    let sortObj = {};
    for (let eachKey of Object.keys(paramsObj).sort()) {
        sortObj[eachKey] = paramsObj[eachKey];
    }

    // 拼接字符串
    let stringA = '';
    for (let [key, value] of Object.entries(sortObj)) {
        stringA += key + '=' + value + '&';
    }
    let stringSignTemp = stringA + "key=" + wxpayKey;

    // 生成签名
    return crypto.createHash('md5').update(stringSignTemp, 'utf8').digest('hex').toUpperCase();
};
/**
 * 向微信发送xml
 * @param url 网站
 * @param data xml转成的字符串
 * @returns {Promise}
 */
module.exports.postXmlToWX = (url, data) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'POST',
            url: url,
            headers:
                {
                    'cache-control': 'no-cache',
                    'content-type': 'application/xml'
                },
            body: data
        };

        request(options, async (error, response, body) => {
            if (error) reject(error);
            resolve(body);
        });
    });
};

