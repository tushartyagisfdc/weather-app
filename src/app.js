const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode=require('./Utilities/geocode');
const forecast = require('./Utilities/forecast');

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req, res) =>{
      res.render('index' , {
          title: 'Weather app',
          name: 'Tushar Tyagi'
      })
})

app.get('/about', (req, res) =>{
     res.render('about', {
         title: 'About me',
         name: 'Tushar Tyagi'
     })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        message: 'How Can I help you ????',
        name: 'Tushar Tyagi'
    })
})



// app.get('', (req, res) =>{
//     res.send('hello express');
// })

// app.get('/help', (req, res) =>{
//     res.send('This is help page');
// })

// app.get('/about', (req, res) =>{
//     res.send('<h1>About</h1>');
// })

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide the address'
        })  
    }

    const address = req.query.address;
       
    geocode(address, (error , {longitude, latitude, location} = {}) =>{
        if(error){
              return res.send({
                  error: error
              });
        }
        
        const lat = latitude;
        const longt = longitude;

        forecast(longt, lat, (error, forecastData) =>{
            if(error){
                  return console.log('error '+error);
            }
       
           res.send({
               forecast: forecastData,
               location: location
           });
       })

    })


    

   // res.send(weatherInfo);
    
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'No help Document',
        message: 'No help content is found',
        name: 'Tushar Tyagi' 
    })
})

app.get('*',(req, res) =>{
    res.render('error', {
        title: 'No document found',
        message: '404 not Found',
        name: 'Tushar Tyagi'
    })
})



app.listen(3000, () =>{
    console.log('server is up on port 3000');
})