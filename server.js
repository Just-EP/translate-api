// 导入http模块:
const http = require('http');
const translate = require('google-translate-open-api');
const url = require('url');
// 创建http server，并传入回调函数:
const server = http.createServer(function (request, response) {
    let queryObj = url.parse(request.url,true);
    let word = queryObj.query['word'];
    let to = queryObj.query['to'];
    if (word) {
        if (!to) {
            to = "en";
        }
        translate.default(word, {
            tld: "cn",
            to: to,
        }).then(function (result) {
            // output(result.data[0]);
            let responseResult = {};
            responseResult.result = result.data[0];
            res(response,JSON.stringify(responseResult));
        });
        response.writeHead(200, {'Content-Type': 'text/json'});
    }else{
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('404 Not Found');
    }

    // 将HTTP响应的HTML内容写入response:
    // response.end('Hello world!');
});

// 让服务器监听8080端口:
server.listen(8777);

console.log('Server is running at http://127.0.0.1:8777/');

function output(result){
    console.log(result);
}

function res(response,result){
    response.end(result);
}