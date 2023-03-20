
const objects = {
    time: document.getElementById('time'),
    icon: document.getElementById('icon'),
    day: document.getElementById('day'),
    temp: document.getElementById('temp'),
    mo_date: document.getElementById('mo_date')
}

const state = {
    unixTime: 0,
    localTime: 0,
    weather: null
}

const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function render() {
    const currLocalTime = new Date().getTime()
    const d = new Date(state.unixTime + currLocalTime - state.localTime)
    const suffix = d.getHours() < 12 ? 'AM' : 'PM';
    const fixedHrs = (d.getHours() + 11) % 12 + 1;
    const fixedMins = (d.getMinutes() + '').padStart(2, '0')
    objects.time.innerHTML = `${fixedHrs}:${fixedMins} ${suffix}`

    objects.day.innerHTML = `Day: ${dayNames[d.getDay()]}`

    objects.mo_date.innerHTML = `${monthNames[d.getMonth()]} ${d.getDate()}`

    if (!state.weather) return;

    objects.temp.innerHTML = `${state.weather.temperature} F`

    objects.icon.innerHTML = `Skycode: ${state.weather.skycode}`
}


function fetchTime() {
    api.get('/time').then(t => {
        const { time } = t;
        state.unixTime = time * 1000;
        state.localTime = new Date().getTime()
        render()
    })
}

function fetchWeather(){
    api.get('/weather').then(w => {
        state.weather = w;
        render();
    })
}

fetchTime()
setInterval(fetchTime, 5 * 60 * 1000)

fetchWeather()
setInterval(fetchWeather, 5 * 60 * 1000)

setInterval(render, 1000)