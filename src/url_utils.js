/**
 * 提前后端路由
 * @param url 例子：http://localhost:8888/api/v2/23/ab
 * @param params 例子：{shoeid:23,uid:ab}*
 */
module.exports.replaceValue2UrlKey = (url, params, prefix) => {
    url = url.replace(new RegExp(prefix, 'g'), '')
    url = url.split('?')[0]
    for (let k of Object.keys(params)) {
        url = url.replace(new RegExp(params[k]), `:${k}`)
    }
    return url
}