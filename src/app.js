const path = require ('path')
const express = require('express')
const hbs = require('hbs')
const geoLocation = require('./utils/geoLocation')
const weather = require('./utils/weather')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath)) 

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'John Michael'
    }) 
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'John Michael'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helpful text!',
        title: 'Weather App Help',
        name: 'John Michael'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.cityName) { 
        return res.send({
            error: 'Please provide an address!'
        })
    }

    
    geoLocation(req.query.cityName, (error, { longitude, latitude, location } = { }) => {
        if (error) {
            return res.send({ error })
        } 

        weather( longitude, latitude, (error, weatherData) => {
            if (error) {
                return res.send({ error })
            }
            
        res.send({
        weather : weatherData,
        location,
        cityName: req.query.cityName 
             })
        })
    })
}) 


app.get('/products', (req, res) => { 
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'John Michael',
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'John Michael',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})