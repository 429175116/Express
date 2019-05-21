var express = require('express');
var db = require('../models/db');
var router = express.Router();

var welcomeInfo = {
    title: '极众BOB生产测试接口平台',
    apis: [
        {
            name: '获取Bosa信息接口',
            url: 'http://localhost:3000/api/v1/bosaInfo/:bsn',
            desc: '通过bosa条码(sn)获取bosa出厂信息',
            params: 'bsn(bosa的SN),形如:"0SLKAWIXMWM1"',
            result: '"0SLKAWIXMWM1":{ name: "bosa_001", sn: "0SLKAWIXMWM1", price: 12.12}'
        },
        {
            name: '获取产品条码信息接口',
            url: 'http://localhost:3000/api/v1/productTagInfo',
            desc: '通过产品条码(psn,bsn)获取产品标签信息，客户端请求接口时必须指定请求头类型为Content-Type=application/json',
            params: 'psn,bsn(产品sn,bosasn),形如：{psn: "0SLKAWIXMWM1", bsn: "0SLKAWIXMWM2"}',
            result: '"0SLKAWIXMWM1":{ name: "bosa_001", sn: "0SLKAWIXMWM1", price: 12.12}'
        }
]};
// //数据类型整理集合,和数据库的表映射
// var dateTypeJson = {
//     //string字符串;int整型;float浮点;boolean布尔
//     //bosaInfo
//     "bosasn":"string",
//     "condition":"int",
//     "ith":"float",
//     "se":"float",
//     "po":"float",
//     "vf":"float",
//     "imod":"float",
//     "vbr":"float",
//     "sensitivity":"float",
//     "rxpow":"float",
//     "ddmirxpow":"float",
//     "txpow":"float",
//     "ddmitxpow":"float",
//     "er":"float",
//     "loslevel":"int",
//     "apd":"int",
//     "temp":"float",
//     "supplyvolt":"float",
//     "ibias":"float",
//     "devrxpow":"float",
//     "devtxpow":"float",
//     //deviceInfo
//     "boardsn":"string",
//     "ponmac":"string",
//     "gponsn":"string",
//     "devsn":"string",
//     "oui":"string",
//     "webusr":"string",
//     "webpwd":"string",
//     "ssid":"string",
//     "ssidpwd":"string",
//     "biperr":"int",
//     "wifirxpow":"float",
//     "throughout":"float",
//     "wifitxpow":"float",
//     "productdate":"string",
//     "joborder":"string",
//     "scanresult":"boolean",
//     "bobcalresult":"boolean",
//     "devtestresult":"boolean"
// }

//数据类型整理集合,和数据库的表映射
var dateTypeJson = {
    //string字符串;int整型;float浮点;boolean布尔
    "boardsn":"string",
    "bosasn":"string",
    "devsn":"string",
    "biperr":"int",
    "wifirxpow":"float",
    "wifiyxpow":"float",
    "throughout":"float",
    "scanresult":"boolean",
    "bobcalresult":"boolean",
    "devtestresult":"boolean",
    "buttontestresult":"boolean",
    "lantestresult":"boolean",
    "joborder":"string",
    "productdate":"string",
    "rxpow":"float",
    "txpow":"float",
    "ddmirxpow":"float",
    "ddmitxpow":"float",
    "er":"float",
    "loslevel":"int",
    "apd":"int"
}

function dateTime() {
    var time = new Date();
    var year = time.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = tieme.getMonth(); //获取当前月份(0-11,0代表1月)
    month += 1;
    var date = time.getDate(); //获取当前日(1-31)
    var hours = time.getHours(); //获取当前小时数(0-23)
    hours += 1;
    var minutes = time.getMinutes();//获取当前分钟数(0-59)
    minutes += 1;
    var seconds = time.getSeconds();//获取当前秒数(0-59)
    seconds += 1;
    time = year + "-" + month + "-" + date + "-" + hours + ":" + minutes + ":" + seconds;
    // yyyy-MM-dd HH:MM:SS
    return time;
}


//根据数据库的数据格式对获取到的参数进行数据类型转换
function dateType(dateTypeJson, valueKey, value) {
    for(var Tempkey in dateTypeJson) {
        if (Tempkey == valueKey) {
            if (dateTypeJson[Tempkey] == "string") {
                return "\'" + value + "\'";
            } else if(dateTypeJson[Tempkey] == "int") {
                return parseInt(value);
            } else if(dateTypeJson[Tempkey] == "float") {
                return parseFloat(value);
            } else if(dateTypeJson[Tempkey] == "boolean") {
                if (value == "false") {
                    value = 0;
                } else if (value == "true") {
                    value = 1;
                }
                return value;
            }
            //还存在布尔类型，因数据不明确，暂未确定
        } 
    }
}
/* 平台首页接口介绍 */
router.get('/', function(req, res, next) {
    // console.log(req[0] + "__" + res[0] + "__" + next + "__/");
    res.render('index', welcomeInfo);
});

router.get('/api', function(req, res, next) {
    res.render('index', welcomeInfo);
});

router.get('/api/v1', function(req, res, next) {
    res.render('index', welcomeInfo);
});

var bosaInfo = {
    '0SLKAWIXMWM1':{ name: 'bosa_001', sn: '0SLKAWIXMWM1', price: 12.12},
    '0SLKAWIXMWM2':{ name: 'bosa_002', sn: '0SLKAWIXMWM2', price: 15.11}
};
function extend(des, src, override){
    if(src instanceof Array){
        for(var i = 0, len = src.length; i < len; i++)
             extend(des, src[i], override);
    }
    for( var i in src){
        if(override || !(i in des)){
            des[i] = src[i];
        }
    } 
    return des;
}

/**
*http://localhost:3000/api/v1/bosaInfo/get?params={"bosasn":"bosa000000000001"}
*/
var requestFail = {"result":"fail"};
var requestSuccess = {"result":"success"};
//通过bosa条码(bsn)获取bosa出厂信息
// bosaInfo-get
router.get('/api/v1/bosaInfo/get*', function(req, res) {
    var systemDate = dateTime();
    var reqBosaSn = req.query.params;
    reqBosaSn = JSON.parse(reqBosaSn);
    var findIndexValue = reqBosaSn.bosasn;
    var baseCommand = "select * from BosaInfo where bosasn='" + findIndexValue + "'";
    console.log(systemDate + "*****查询数据命令*****");
    console.log("*****" + baseCommand + "*****");
    db.sql(baseCommand, function(err, result) {
        systemDate = dateTime();
        console.log(systemDate + "查询数据:::::" + result.length + "行");
        if (result.length == 0) {
            res.json(requestFail);
            systemDate = dateTime();
            console.log(systemDate + "*****查询数据失败-----请检查bosasn是否有效*****");
            return;
        } else {
            result = result[0];
            for(var key in result) {
                result[key] = String(result[key]);
            }
            result["result"] = "success";
            res.json(result);
            systemDate = dateTime();
            console.log(systemDate + "*****查询数据成功*****");
        }
    });
});
// bosaInfo-set
// http://localhost:3001/api/v1/bosaInfo/set?params={"bosasn":"bosa000000000001","ith":"3"}
router.get('/api/v1/bosaInfo/set*', function(req, res) {
    var systemDate = dateTime();
    var reqBosaSn = req.query.params;
    reqBosaSn = JSON.parse(reqBosaSn);
    var findIndexValue = reqBosaSn.bosasn;
    var setKeyVal = "";
    for(var key in reqBosaSn) {
        if (key != "bosasn") {
            setKeyVal += key + "=" + dateType(dateTypeJson, key, reqBosaSn[key]) + ","
        }
    }
    var successFailCheck;
    var baseCommandCheck = "select * from bosaInfo where bosasn='" + findIndexValue + "'";
    db.sql(baseCommandCheck, function(err, result) {
        systemDate = dateTime();
        console.log(systemDate + "*****数据校验命令*****" + baseCommandCheck);
        console.log(systemDate + "*****查询数据:::::" + result.length + "行");
        if (result.length == 0) {
            successFailCheck = false;
            res.json(requestFail);
            console.log(systemDate + "*****数据校验---失败------表中无当前数据*****");
        } else {
            successFailCheck = true;
            console.log(systemDate + "*****数据校验---成功*****");
        }
        setKeyVal = setKeyVal.substring(0,setKeyVal.length - 1);
        if (successFailCheck) {
            var baseCommand = "update bosaInfo set " + setKeyVal + " where bosasn = '" + findIndexValue + "'";
            console.log(systemDate + "*****数据校验成功后--写入数据命令*****");
            console.log("*****" + baseCommand + "*****");
            db.sql(baseCommand, function(err, result) {
                systemDate = dateTime();
                if (err) {
                    res.json(requestFail);
                    console.log(systemDate + "*****写入数据失败*****");
                    return;
                } else {
                    console.log(systemDate + "*****写入数据成功*****");
                    res.json(requestSuccess);
                    return;
                }
            });
        }
    });
});
// bosaInfo-new
// router.get('/api/v1/bosaInfo/new*', function(req, res) {
//     var reqBoardsn = req.query.params;
//     reqBoardsn = JSON.parse(reqBoardsn);
//     var findIndexValue = reqBoardsn.boardsn;
//     var setKey = "";
//     var setVal = "";
//     for(var key in reqBoardsn) {
//         setKey += key + ","
//         setVal += dateType(dateTypeJson, key, reqBoardsn[key]) + ","
//     }
//     setKey = setKey.substring(0,setKey.length-1);
//     setVal = setVal.substring(0,setVal.length-1);
//     var baseCommand = "insert into bosaInfo (" + setKey + ") values (" + setVal + ")";
//     db.sql(baseCommand, function(err, result) {
//         if (err) {
//             res.json(requestFail);
//             return;
//         } else {
//             res.json(requestSuccess);
//         }
//     });
// });
// bosaInfo-delete
// router.get('/api/v1/bosaInfo/delete*', function(req, res) {
//     var reqBosaSn = req.query.params;
//     reqBosaSn = JSON.parse(reqBosaSn);
//     var findIndexValue = reqBosaSn.bosasn;
//     var baseCommand = "delete * from BosaInfo where bosasn='" + findIndexValue + "'";
//     db.sql(baseCommand, function(err, result) {
//         if (err) {
//             res.json(requestFail);
//             return;
//         } else {
//             res.json(requestSuccess);
//         }
//     });
// });






// deviceList-get
// http://localhost:3001/api/v1/deviceInfo/get?params={"boardsn":"board00000000001"}    20170213(时间) 01(计划单号) 01(设备型号) 0001(流水单号) 
router.get('/api/v1/deviceInfo/get*', function(req, res) {
    var systemDate = dateTime();
    var reqBoardsn = req.query.params;
    reqBoardsn = JSON.parse(reqBoardsn);
    var findIndexValue = reqBoardsn.boardsn;
    var baseCommand = "select * from DeviceInfo where boardsn='" + findIndexValue + "'";
    console.log(systemDate + "*****查询数据命令*****");
    console.log("*****" + baseCommand + "*****");
    db.sql(baseCommand, function(err, result) {
        systemDate = dateTime();
        console.log(systemDate + "*****查询数据:::::" + result.length + "行");
        if (result.length == 0) {
            res.json(requestFail);
            console.log(systemDate + "*****查询数据失败-----请检查boardsn是否有效*****");
            return;
        } else {
            result = result[0];
            for(var key in result) {
                result[key] = String(result[key]);
            }
            result["result"] = "success";
            res.json(result);
            console.log(systemDate + "*****查询数据成功*****");
        }
    });
});

// deviceList-set
// http://localhost:3001/api/v1/deviceInfo/get?params={"boardsn":"board00000000001","ponmac": "b8b868000002"}
router.get('/api/v1/deviceInfo/set*', function(req, res) {
    var systemDate = dateTime();
    var reqBoardsn = req.query.params;
    reqBoardsn = JSON.parse(reqBoardsn);
    var findIndexValue = reqBoardsn.boardsn;
    var setKeyVal = "";
    var productdate = undefined;
    var productdateKey
    for(var key in reqBoardsn) {
        if (key != "boardsn") {
            setKeyVal += key + "=" + dateType(dateTypeJson, key, reqBoardsn[key]) + ","
        }
        if (key == "productdate") {
            productdate = dateType(dateTypeJson, productdateKey, reqBoardsn[productdateKey]) + ","
        }
    }
    if (productdate == undefined) {
        productdate = dateTime();
        setKeyVal += productdateKey + "=" + productdate + ",";
    }
    var successFailCheck;
    var baseCommandCheck = "select * from deviceInfo where boardsn='" + findIndexValue + "'";
    db.sql(baseCommandCheck, function(err, result) {
        systemDate = dateTime();
        console.log(systemDate + "*****数据校验命令*****" + baseCommandCheck);
        console.log(systemDate + "*****查询数据:::::" + result.length + "行");
        if (result.length == 0) {
            successFailCheck = false;
            res.json(requestFail);
            console.log(systemDate + "*****数据校验---失败------表中无当前数据*****");
        } else {
            successFailCheck = true;
            console.log(systemDate + "*****数据校验---成功*****");
        }
        if (successFailCheck) {
            setKeyVal = setKeyVal.substring(0,setKeyVal.length - 1);
            var baseCommand = "update deviceInfo set " + setKeyVal + " where boardsn = '" + findIndexValue + "'";
            console.log(systemDate + "*****数据校验成功后--写入数据命令*****");
            console.log(systemDate + "*****" + baseCommand + "*****");
            db.sql(baseCommand, function(err, result) {
                if (err) {
                    res.json(requestFail);
                    console.log(systemDate + "*****写入数据失败*****");
                    return;
                } else {
                    console.log(systemDate + "*****写入数据成功*****");
                    res.json(requestSuccess);
                    return;
                }
            });
        }
    });
        
});

// deviceList-new
// http://localhost:3001/api/v1/deviceInfo/get?params={"boardsn":"board00000000001","biperr": "6",}
// router.get('/api/v1/deviceInfo/new*', function(req, res) {
//     var reqBoardsn = req.query.params;
//     reqBoardsn = JSON.parse(reqBoardsn);
//     // var findIndexValue = reqBoardsn.boardsn;
//     var setKey = "";
//     var setVal = "";
//     for(var key in reqBoardsn) {
//         setKey += key + ","
//         setVal += dateType(dateTypeJson, key, reqBoardsn[key]) + ","
//     }
//     setKey = setKey.substring(0,setKey.length-1);
//     setVal = setVal.substring(0,setVal.length-1);
//     var baseCommand = "insert into deviceInfo (" + setKey + ") values (" + setVal + ")";
//     db.sql(baseCommand, function(err, result) {
//         if (err) {
//             res.json(requestFail);
//             return;
//         } else {
//             res.json(requestSuccess);
//         }
//     });
// });
// deviceList-delete
// router.get('/api/v1/deviceInfo/delete*', function(req, res) {
//     var reqBosaSn = req.query.params;
//     reqBosaSn = JSON.parse(reqBosaSn);
//     var findIndexValue = reqBosaSn.bosasn;
//     var baseCommand = "delete * from deviceInfo where boardsn='" + findIndexValue + "'";
//     db.sql(baseCommand, function(err, result) {
//         if (err) {
//             res.json(requestFail);
//             return;
//         } else {
//             res.json(requestSuccess);
//         }
//     });
// });
//通过产品条码(psn,bsn)获取产品标签信息,并将bsn和psn建立关联
//客户端请求接口时必须指定请求头类型为Content-Type=application/json
router.post('/api/v1/productTagInfo', function(req, res) {
    if (req.body.data) {
        //能正确解析json格式的post参数
        res.json(bosaInfo);
    } else {
        //不能正确解析json格式的post参数
        var body = '', jsonStr;
        req.on('data', function(chunk) {
            body += chunk; //读取参数流转化为字符串
        });
        req.on('end', function() {
            try {
                jsonStr = JSON.parse(body);
            } catch (err) {
                jsonStr = null;
            }
            jsonStr ? res.json(bosaInfo) : res.json({status: "error"});
        });
    }
});
module.exports = router;