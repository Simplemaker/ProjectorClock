
const axios = require('axios')

const time_url = 'http://worldtimeapi.org/api/timezone/'

function get_time(timeRegion) {
    return new Promise((res, rej) => {
        axios.get(time_url + timeRegion).then(r => res(r['unixtime']))
    })
}

module.exports = get_time