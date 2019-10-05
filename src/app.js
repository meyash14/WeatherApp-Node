//BUILDING TEMPLATE ENGINE PREV CODE COPIED TO APP1.JS
//express only looks for directory named views so its name has to remain views
const express = require ('express')
const app = express()
const port = process.env.PORT || 3000 //PORT dfined for running on heroku.given or for running on local if heroku not there
const path = require('path')
const hbs = require('hbs')
const test = process.cwd()
const publicDir = path.join(__dirname,'../public') //paths defined for express config
const partialsPath = path.join(__dirname,'../templates/partials') 
//customising views directory
const viewsPath = path.join(__dirname,'../templates/views')

// integrating external geocode and forecast files
const request = require('request')
const geoCode = require('../src/utils/geocode.js')
const weather = require('../src/utils/weather.js')

//setup handlebars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs') //setting name of view engine for express.
//customising views directory
hbs.registerPartials(partialsPath)
// setup static directory to server
app.use(express.static(publicDir)) //setting the path to public dir ie it will be accessible from outside for browser




//handlebars are suppsed to be in views folder in your root directory

//if we delete index.html from public we can use index.hbs using get method of express

app.get('',(req,res)=>{     
    
    res.render('index',{
        title:'Weather App',
        name : 'Yash'
    }) //render fn is to be used for templates instead of send
})
// views folder is inside src of our app
//call to app.com/about
app.get('/about',(req,res)=>{     
    
    res.render('about.hbs',{
        title:'About me',
        name : 'Yash'
    }) //render fn is to be used for templates instead of send
})

//call to app/weather
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error : 'Address is mandatory'
        })

    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{ // default parameter set
        if(error){
            return res.send({error})
            console.log(error) //if we use return here fn will stop ergo no use of else both ways are fine
        }
        else{
            //const {latitude,longitude} = data //es6 object destructuring one way other wayis to directly remove data varaibele and do it as done in real prog
        weather(latitude,longitude,(error,forecastData)=> //es6 done with data1 also
        {
            if(error)
            {
                res.send(error)
                //console.log(error)
            }
            else{
                res.send({
                        forecast : forecastData,
                        location,
                        address: req.query.address
                        })
                console.log(forecastData)
            //console.log("Temp is" + ' ' + temp)
            }
        })
    }
    })
    
})

//dummy call to product
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({                      //return is used so that code finishes here
            error: 'Search term is Mandatory'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
//help call
app.get('/help',(req,res)=>{     
    
    res.render('help.hbs',{
        helpText:"This is Help Section",
        title: 'Help',
        name: 'Yash'
    }) //render fn is to be used for templates instead of send
})
app.get('/help/*',(req,res)=>
{
    res.send('Help Article not found')
})

// error 404 not found call-> has to come last as if it finds matching argument above it stops and doesnt look any furthur
app.get('*',(req,res)=>{     // * is the wild charactar
    
    res.render('404.hbs',{
        title: 'Error 404',
        name:'yash',
        errorMessage : 'Page not found'
    }) //render fn is to be used for templates instead of send
})


 //all things that will be exposed to browser need to be in public folder :HTML,CSS,JS
app.listen(port,()=>{
    console.log('Server is up on port '+ port)
}) 

