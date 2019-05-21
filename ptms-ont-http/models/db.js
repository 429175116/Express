var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var db = {};
var rows;

//数据库连接配置
const dbConfig = {
  userName: 'sa',
  password: '000000',
  server: '10.110.30.8',
  options: {
    database: 'JZZN'
  }
}

db.sql = function (sql, callBack) {
  //初始化数据集
  rows = [];
  let connection = new Connection(dbConfig);
  connection.on('connect', function(err) {
    if (err) {
      console.log(err);
      return;
    }
    let request = new Request(sql, function(err) {
      if (err) {
        console.log(err);
        callBack(err, null);
        return;
      } else {
        callBack(err, rows);
      }
    });
    request.on('row', function(columns) {
      let row = {};
      columns.forEach(function(column) {
        row[column.metadata.colName] = column.value;
      });
      rows.push(row);
    });
    connection.execSql(request);
  });
}

module.exports = db;
