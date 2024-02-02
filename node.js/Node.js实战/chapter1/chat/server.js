var http = require('http')
var fs = require('fs')
var path = require('path')
var mime = require('mime')
var socketio = require('socket.io')

// var io
// var guestNumber = 1
// var nickNames = {}
// var namesUsed = {}
// var currentRoom = {}
// exports.listen = function(server) {
//   io = socketio.listen(server)
//   io.set('log level' ,1)
//   io.sockets.on('connection', function(socket) {
//     guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed)

//     joinRoom(socket, 'Lobby')

//     handleMessageBroadcasting(socket, nickNames)
//     handleNameChangeAttempts(socket, nickNames, namesUsed)
//     handleRoomJoinging(socket)

//     socket.on('rooms', function() {
//       socket.emit('rooms', io.sockets.manager.rooms)
//     })

//     handleClientDisconnection(socket, nickNames, namesUsed)
//   })
// }

const cache = {}

var server = http.createServer((req,res)=> {
  var filePath = false
  // console.log('');
  if(req.url === '/') {
    filePath = 'public/index.html'
  } else {
    filePath = 'public' + req.url
  }
  var absPath = './' + filePath
  serveStatic(res, cache, absPath)
})
server.listen(3000, ()=> {
  console.log('Server listening on port 3000');
})

var chatServer = require('./lib/chat_server')
chatServer.listen(server)


function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'})
  response.write('Error 404: resource not found')
  response.end()
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200,
    {"content-type": mime.getType(path.basename(filePath)) }
  )
  response.end(fileContents)
}

function serveStatic(response, cache, absPath) {
  if(cache[absPath]) {
    sendFile(response, absPath, cache[absPath])
  } else {
    console.log('p', absPath);
    var exists = fs.existsSync(absPath)
    if(exists) {
      fs.readFile(absPath, (err,data)=> {
        if(err) {
          send404(response)
        } else {
          cache[absPath] = data
          sendFile(response, absPath, data)
        }
      })
    } else {
      send404(response)
    }
  }
}










