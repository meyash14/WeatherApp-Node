const express = require ('express')
const app = express()
const path = require('path') //for mainpulation the file path
console.log(__dirname)
const publicDir = path.join(__dirname,'../public')
app.set('view engine','hbs') //it is not a varibale needs to be same as it is predefined settings for express
app.use(express.static(publicDir)) //used for customization of server.Here we use it to direct it to static content of our app present in public dire
//console.log(__filename)
const weather = require('/Users/Yashaswi Bhardwaj/Desktop/Node/WeatherApp/utils/weather')
// app.com
//app.com/help
//app.com/about
//get first argumnet takes partial url eg: /help.get has second argument as a fn which describes what to do when someone visits
//the fn inside get has 2 args : req(short for request) contains info for the incoming request.another is response
//req and res are both objects containing bunch of methods
app.get('',(req,res)=>{   //IT WONT BE USED IF app.use is used as then index.html will be fetched
    res.send('<h1>Hello Express</h1>') //sending html  
})
//second call or route
app.get('/help',(req,res)=>{     //sending JSON example :we passed an object send method(OF EXPRESS) stringifies(CHANGES THE OBJECT PROVIDED TO json) it and sends it as JSON
   // res.send('Hello help')     // array or array of objects can also be sent
   res.send({
       name: 'Yash',
       age: 26
   })
})

//weather route
app.get('/weather',(req,res)=>{
    res.send({
        
        forecast : 'forecast',
        location : 'location'
        
    })
})

//about route
app.get('/about',(req,res)=>{
    res.send('Hello about')
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
}) //starts the server by listening on specific port.common dev port is 3000.It has a callback fn that runs when server is up and running
//node file name with listen to start server.shut down using ctrl c in cmd
