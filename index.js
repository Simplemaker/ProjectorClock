
const express = require('express');
const path = require('path');
const fs = require('fs')
const get_time = require('./clock')
const get_weather = require('./weatherwrap')

const config = {
    timeRegion: '',
    weatherRegion: ''
}

if (fs.existsSync('./config.json')) {
    const storedConfig = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
    for (const key in storedConfig) {
        config[key] = storedConfig[key]
    }
}

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.get('/time', async (req, res) => {
    get_time(config.timeRegion)
        .then(t => res.send(t))
        .catch(err => console.log(err));
})

app.get('/weather', async (req, res) => {
    get_weather(config.weatherRegion).then(r => {
        res.send(r)
    }).catch(err => console.log(err))
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});