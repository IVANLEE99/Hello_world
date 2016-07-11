var fs = require('fs');
var cache = {};

/**
 * 读文件操作
 * @param    filename [文件名]
 * @param   callback(data)
 * @return  
 */
function reFile(filename, callback) {
  if (cache[filename]) {
    callback(cache[filename]);
  }else{
    fs.exists(filename, function (exists) {
      if (exists) {
        fs.readFile(filename, function (err, data) {
          if (err) {
            console.log(err);
            throw err;
          }else{
            cache[filename] = JSON.parse(data);
            callback(cache[filename]);
          }
        });
      }else{
        console.log('文件不存在，正在新建文件');
        fs.writeFile(filename, '', function (err) {
          if (err) {throw err;}
          console.log('已经创建空文件。');
          fs.readFile(filename, function (err, data) {
            if (err) {console.log(err);}else{
              cache[filename] = JSON.parse(data);
              callback(cache[filename]);
            }
          })
        });
      }
    });
  }
}

/**
 * 写文件方法
 * @param   filename [文件名]
 * @param   data     [写入的数据]
 * @param   callback [description]
 * @return 
 */
function wriFile(filename, data, callback) {
  if (cache[filename]) {
    if (data) {cache[filename]=data;}else{}
    
    fs.writeFile(__dirname+filename, JSON.stringify(cache[filename]), function (err) {
      if (err) {throw err;}
      callback(cache[filename]);
      console.log('文件已经写入成功'+__dirname);
    });
  }else{
    if (data) {cache[filename]=data;}else{throw err;}
    fs.writeFile(__dirname+filename, JSON.stringify(data), function (err) {
      callback(cache[filename]);
      if (err) {
        console.log('文件写入失败。');
      }
    })
  }
}

/**
 * 添加数据
 * @param     filename [文件名]
 * @param     data     [要插入的数据-对象]
 * @param     callback(data) [插入数据后返回的数据]
 * @return 
 */
function appendData(filename, data, callback) {
  if (cache[filename]) {
    cache[filename].push(data);
    // cache[filename].push(data);
    console.log('appendData:'+cache[filename]);
    wriFile(filename);
    callback(cache[filename]);
  }else{
    reFile(filename, function (body) {
      // cache[filename]=body+data;
      cache[filename]=body;
      cache[filename].push(data);
      wriFile(filename);
      callback(cache[filename]);
    })
  }
}
// reFile('./LEE/lee2.json', function (data) {
//   console.log('refile data:'+data);
// });
var lee = {'lee':'ivan'};
appendData('lee3.json', lee, function (data) {
  console.log('append:'+(data[0].name));
});
// wriFile('lee.json');
module.exports={
  read:reFile,
  write:wriFile,
  append:appendData
}