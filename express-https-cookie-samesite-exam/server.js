var fs = require('fs')
var https = require('https')
var express = require('express')
var cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser())

app.get('/test',function(req,res){
  var cookie = req.cookies.cookieName
  var message
  if(cookie === undefined){
    var random = Math.random().toString(36).slice(2)
    res.cookie('cookieName',random,{maxAge:90000, httpOnly:true})
    message = 'cookie created successfully! ' + random
    console.log(message)
  }else{
    message = 'cookie exists ' + cookie
    console.log(message)
  }
  res.send(message)
})

app.use(express.static(__dirname + '/'))

https.createServer({
  //key: fs.readFileSync('test.mgtv.com-key.pem'),
  //cert: fs.readFileSync('test.mgtv.com.pem')
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
},app).listen(5555,()=>{
  console.log('listening...')
})
