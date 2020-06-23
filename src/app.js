 const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./util/geocode');
const forecast=require('./util/forecast');

const app=express();
const port=process.env.PORT||3000;
//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectory=path.join(__dirname,'../template/views');
const partialsPath=path.join(__dirname,'../template/header');

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup Handlebars engine and views Location
app.set('view engine','hbs');
app.set('views',viewsDirectory);
hbs.registerPartials(partialsPath);



app.get('',function(req,res){
    res.render('index',{
        name:'Raghav Popli',
        title:" Express App"
    })
})

app.get('/about',function(req,res){
    res.render('about',{
        title:'About Me',
        name:'Raghav Popli'
    })
})
app.get('/help',function(req,res){
    res.render('help',{
        message:"Hello to All....",
        title:"Help Page",
        name:'Raghav Popli'
    })
})

app.get('/weather',function(req,res){
    if(!req.query.address)
    {
         return  res.send({
               error:'Please Provide the address'
           })
    }
    geocode(req.query.address,function(error,geocodeData){
         if(error)
         {
            return  res.send({
                 error:error
             })
         }
         forecast(geocodeData.latitude,geocodeData.longitude,function(error,forecastData){
                 if(error)
                 {
                     return res.send({
                         error:error
                     })
                 }
                 res.send({
                     location:geocodeData.Location,
                     forecastData:forecastData,
                     address:req.query.address
                 })
         })

        

    });
   
});

app.get('/help/*',function(req,res){
        
       res.render('404Page',{
           message:"Help article Not Found",
           title:'Error Page',
           name:"Raghav Popli"
       })
})

app.get('*',function(req,res){
        
    res.render('404Page',{
        message:"Page not Found",
        title:'Error Page',
        name:"Raghav Popli"
    })
})




app.listen(port,function(){
    console.log("Server is running on port "+port);
})


/************************************extra content*************************** */

// app.get('',function(req,res){
//         res.send("<h1>Weather</h1>");
            
           
   

// });

// app.get('/help',function(req,res){
//     res.send("<h1>Help Page</h1>");
// });

// app.get('/about',function(req,res){
//     res.send("<h1>About</h1>");
// });