const request=require('request');

const forecast=function(latitude,longitude,callback)
{
    const url = 'https://api.darksky.net/forecast/9e5d4804c588efa4a387cebb4aa51b37/'+latitude+','+longitude+'?units=si';
    request({url:url,json:true},function(error,response){
         if(error)
         {
             callback('Unable to connect to services..',undefined);
         }
         else if(response.body.error)
         {
             callback('Unable to find location...',undefined);
         }
         else{
              
             callback(undefined, response.body.daily.summary+" .It is currently " + response.body.currently.temperature + "°C.There is a " + response.body.currently.precipProbability + " % chance of rain.");
         }
         
    
    });

}

module.exports=forecast