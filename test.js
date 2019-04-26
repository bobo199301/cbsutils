const utils=require('./index')

const test=async ()=>{
    try{
        let a= await utils.postXmlToWX('https://api.mch.weixin.qq.com/pay/unifiedorder',JSON.stringify({aa:'bb'}))
        console.error(a)
    }catch (e){
        console.error(e)
    }
}
test()