

var submit_complete = document.getElementById('submit');
if(submit_complete){
    function setup()
    {
        noCanvas();
        const video = createCapture(VIDEO);
        video.size(320,240);
        console.log("get submit complete");
        submit_complete.addEventListener('click', event =>{
        
            const button = document.getElementById('submit');
            video.loadPixels();
            const image64 = video.canvas.toDataURL();
            if('geolocation' in navigator){
                console.log('geo OK');
                navigator.geolocation.getCurrentPosition(async position=>{
                    console.log(position.coords.latitude);
                    console.log(position.coords.longitude);
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const picture_name = document.getElementById('picture_name').value;
                    const picture_description = document.getElementById('picture_description').value;
                    const user_id = document.getElementById('user_id').value;
                    document.getElementById('latitude').textContent = lat;
                    document.getElementById('longitude').textContent = lon;
                    const data = {lat, lon, picture_name, picture_description, user_id};
                    const options = {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify(data)
                };
                const response = await fetch('/api', options);
                const res_data = await response.json();
                console.log(res_data);
                document.getElementById('recent_id').textContent = res_data.recent_id;
                document.getElementById('recent_upload').textContent = res_data.timestamp;
            });
        }
        else{
            console.log('geo ERROR');
        }
        
    });

    }
}



