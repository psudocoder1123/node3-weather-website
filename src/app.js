//hbs handelbars
//app.set('view engine','hbs')  //setting -name  value:'view engine' 2nd is name of module
//app.use(express.static(pulicDirectoryPath))
//app.get()

const path=require('path')
//setting Basic Server
const express= require('express')
const hbs=require('hbs')  //used to load partrials  
const geocode=require('./utils/geocode')
const forecast =require('./utils/forecast')


console.log( __dirname)
console.log(path.join(__dirname, '../public'))

const app=express()
//paths
const pulicDirectoryPath=path.join(__dirname, '../public');
const viewPath=path.join(__dirname, '../templates/views');
const partrialsPath=path.join(__dirname, '../templates/partials');

//setup hbs handelbars
app.set('view engine','hbs')  //value:'view engine' 2nd is name of module
app.set('views',viewPath)
hbs.registerPartials(partrialsPath)

//explore later
//using express to load static files
app.use(express.static(pulicDirectoryPath)) 

//rendering view using Hbs
app.get('',(req, res)=>{
    res.render('index',{
        title:'weather',
        name:'Tanishq'
    })
    

})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address not provided'
        })

    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error!='undefined'){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error!='undefined'){
                return res.send(error)
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })

        })

    })
    

    // res.send({
    //     forecast:'It is snowing',
    //     location:'India',
    //     address:req.query.address
    // })
    

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products :[]
    })


})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me!!',
        name:'Tanishq'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:' Help Desk Is Here!!!!',
        name:'Tanishq',
        message:'This can be used to solve your errors'
    })

})

app.get('/help/*',(req,res)=>{

    res.render('404',{
       title:'404',
       name:'Tanishq',
       message:' Help article not found'
    })
    

})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Tanishq',
        message:' Page not found'
     })
})

// app.get('',(req,res)=>{
//     //method describe what to send 
//     //sending Html
//     res.send('<h1>Hello Express!!</h1>')
// })
// app.get('/help',(req,res)=>{
//     //SENDING Json
//     res.send({
//         name:'Tanishq',
//         age:22
//     })
// })

app.get('/about',(req,res)=>{
res.send('<h1>you are on  about</h1>')
})



//app.com
//app.com/help
//app.com/about

// //to start server up and listen on specific port
// app.listen(3000,()=>{
// //call back function
//     console.log('Server is up on port 3000')
// })

//set port set by heroku
const port=process.env.PORT  || 3000

app.listen(port,()=>{
    //call back function
        console.log('Server is up on port '+port)
    })
    