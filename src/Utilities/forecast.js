const request= require('request');



const forecast = (lat , long, callback) =>{
    
    const url='https://api.darksky.net/forecast/99e9e20f12795593d97a48410fb57625/'+lat+','+long+'?units=si';

    request( {url , json: true} , (error , {body}) =>{

        if(error){
                   callback('Cant connect to server', undefined);
        }
        else if(body.error){
                  callback('unable to find desire location', undefined);
        }
        else{
            callback(undefined , 'the current temprature is '+body.currently.temperature);
        }
       
    });
}

module.exports = forecast;
