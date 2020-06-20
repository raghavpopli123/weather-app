const request=require('request');

const geocode=function(address,callback){

    const geocodeURL=" https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address)+ ".json?access_token=pk.eyJ1IjoicmFnaGF2cG9wbGkxMjMiLCJhIjoiY2tiOThiaDVtMGJxZDJxbzhsY3drNTFzdCJ9.F1gwiD1Ngrgaac5Ux0pICA&limit=1";
    
      request({url:geocodeURL,json:true},function(error,response){
           if(error)
           {
               callback('Unable to connect to internet',undefined);
           }
           else if(response.body.features.length==0)
           {  
                 callback('Unable to find the location..',undefined);
           }
           else{
               const data={
                   latitude:response.body.features[0].center[1],
                   longitude:response.body.features[0].center[0],
                   Location:response.body.features[0].place_name
    
               }
               callback(undefined,data);
           }
       
      });
     }

module.exports=geocode