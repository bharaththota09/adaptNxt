const express = require('express');
const app = express();
const API_KEY = 'a27491f2e9f5c72c72a22ab299b11064';

app.get('/weather', async (req, res) => {
    
    const city = req.query.city;
    if (!city) {
        return res.status(400).send({ error: "Please provide a city" });
    }

    try {
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`);
        const data = await response.json();

        if (data.error) {
            return res.status(404).send({ error: data.error.info });
        }

        res.send({
            location: data.location.name,
            temperature: data.current.temperature,
            weather_descriptions: data.current.weather_descriptions[0],
            humidity: data.current.humidity,
            wind_speed: data.current.wind_speed,
        });
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch weather data" });
    }
});

//http://localhost:3000/weather?city=hyderabad

app.listen(3000);
