const request = require('request')

const weather = (latitude, longitude, callback) => {
    const units ='metric';
    const apiKey = 'efa9c41d7648efafcca0ad3360c43225';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=` + latitude + `&lon=` + longitude + `&appid=${apiKey}&units=${units}`;
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
          callback('Unable to connect to the weather service!', undefined);
        } else if (body.cod !== 200) {
          callback('Unable to find location!', undefined);
        } else {
          callback(undefined, body.wind.deg + ' is the wind speed.');
        }
      });
}

module.exports=weather
