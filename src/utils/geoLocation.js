const request = require('request')

const geoLocation = (cityName, callback) => {
    const units ='metric';
    const apiKey = 'efa9c41d7648efafcca0ad3360c43225';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=`+ encodeURIComponent(cityName)+`&appid=${apiKey}&units=${units}`;

    
    request({ url, json:true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined) 
        } else if (body.name === false) {
            callback('Try another search!', undefined) 
        } else {
            callback(undefined, {
                latitude : body.coord.lat,
                longitude : body.coord.lon,
                location : body.name
            })
        }
    })
}

module.exports=geoLocation