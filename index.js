
const express = require('express');
const path = require('path');
const fs = require('fs')
const get_time = require('./clock')

const config = {
    timeRegion: '',
    weatherRegion: ''
}

if(fs.existsSync('./config.js')){
    const storedConfig = JSON.parse(fs.readFileSync('./config.js', 'utf-8'))
    for(const key in storedConfig){
        config[key] = storedConfig[key]
    }
}

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.get('/time', async (req, res)=>{
    const time = await get_time(config.timeRegion);
    res.send(time)
})

app.get('/weather', async (req, res)=>{

})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});