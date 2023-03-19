
const axios = require('axios')

const time_url = 'http://worldtimeapi.org/api/timezone/'

function get_time(timeRegion) {
    return new Promise((resolve, reject) => {
        axios.get(time_url + timeRegion).then(r => {
            const time = r.data['unixtime']
            resolve(time)
        }
        )
    })
}

module.exports = get_time