var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号\n比如：node server.js 8888')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('收到一个请求，路径（带查询参数）为：' + pathWithQuery)

    /*
        if (path === '/index') {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html;charset=utf-8')
            let string = fs.readFileSync('src/index.html').toString()
            const page1 = fs.readFileSync('db/page1.json').toString()
            const array = JSON.parse(page1)
            const result = array.map(item => `<li>${item.id}</li>`).join('')
            string = string.replace('{{page1}}', `<ul id="xxx">${result}</ul>`)
            response.write(string)
            response.end()
        }
    */

    /* JSONP
    if (path === '/pageJS') {
        if (request.headers["referer"].indexOf("http://zxy.com:9999") === 0) {
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
            const string = `window['{{xxx}}']({{data}})`
            const data = fs.readFileSync('./db/page2.json').toString()
            const string2 = string.replace("{{data}}", data).replace("{{xxx}}", query.callback)
            response.write(string2)
            response.end()
        } else {
            response.statusCode = 404;
            response.end()
        }
    }
    */

    response.statusCode = 200
    const filePath = path === '/' ? '/index.html' : path
    const index = filePath.lastIndexOf('.')
    const suffix = filePath.substring(index) // 后缀
    const fileType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.xml': 'text/xml',
        '.json': 'text/json'
    }
    response.setHeader('Content-Type', `${fileType[suffix] || 'text/html'};charset=utf-8`)
    let content
    try {
        content = fs.readFileSync(`./src${filePath}`)
    } catch (error) {
        content = '文件不存在'
        response.statusCode = 404
    }
    response.write(content)
    response.end()

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请在空中转体720度然后用电饭煲打开 http://localhost:' + port)