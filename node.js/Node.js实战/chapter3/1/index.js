var http = require('http')
var fs = require('fs')

http.createServer((req,res)=> {
  if(req.url === '/') {
    fs.readFile('./1.html', (err, data1)=> {
      if(!err) {
        fs.readFile('./title.json', (err, data2)=> {
          if(!err) {            
            var titles = JSON.parse(data2.toString())
            
            var html = data1.toString().replace('%', titles.map((content)=> `<li>${content}</li>`).join(''))
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(html)
          }
        })
      }
    })

  }
}).listen(3000, ()=> {
  console.log('服务已经运行在3000端口')
})