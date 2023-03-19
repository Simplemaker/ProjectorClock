

const weather = require('weather-js')

function get_weather(location) {
    return new Promise((resolve, reject) => {
        weather.find({ search: location, degreeType: 'F' }, (werr, wres) => {
            if (!wres) {console.log(`No data found for location ${location}`); reject('Server error'); return}
            if (wres.length > 1) console.log(`More than one weather entry available for location "${location}".`)
            const locobj = wres[0]
            const current = locobj['current']
            resolve(current)
        })
    })
}

module.exports = get_weather