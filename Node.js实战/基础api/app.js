const fs = require('fs')


// async function readResource() {
//   try {
//     return await fs.readFile('./resource.json', 'utf-8')

//   } catch (error) {
//     console.log("🚀 ~ readResource ~ error:", error)
//   }
// }

// async function main() {
//   const data = await readResource()
//   console.log("🚀 ~ main ~ data:", data)
// }

// main()

const http = require('http')

http.createServer(function(req, res) {
  // res.writeHead(200, { 'Content-Type': 'text/plain' })
  fs.createReadStream('./dog2.jpg').pipe(res)
  // res.end('Hello World\n')

}).listen(3000)


// const stream = fs.createReadStream('./resource.js')
// stream.on('data', (chunk)=> {
//   console.log("🚀 ~ stream.on ~ chunk:", chunk)
  
// })
// stream.on('end', () => {
//   console.log('finished')
// })