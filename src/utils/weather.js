const request =require('request')

const weather = (lat,lon,callback)=>
{   
    const url = 'https://api.darksky.net/forecast/a96c05549dd7ddc0ee460a4ccb450208/'+ lat+','+ lon +'?units=auto'
   //request({url:url,json: true},(error,response)=>{ //normal way down is es6 shorthand
   //destructured response as only body is that we are using
    request({url,json: true},(error,{body})=>{
        //console.log(response.body.daily.data[0].temperatureLow)
    
        if(error)
        {
            callback('Error in darksky',undefined)
        }
       else if(error)//  else if(body.daily.data.length===0) //destructuring response
        {
            callback('Darksky array empty',undefined)
        }
        else{
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
            // temp: body.daily.data[0].temperatureLow,
            // forecast : body.currently.summary,
            // icon : body.daily.icon
            //icon : body.minutely.icon
        
    }
    
    })
}
module.exports = weather