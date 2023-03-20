
api = {
    get: (url)=>new Promise((resolve, reject)=>{
        window.fetch(url).then(r=>r.json()).then(r=>resolve(r))
    })
}