

var c4 = $('.demo');
console.log(c4);

$('.demo').circleProgress({
startAngle: -Math.PI / 4 * 3,
size:80,
value: 1.0,
lineCap: 'butt',
thickness:11,
animation:{duration:5000, easing:"circleProgressEasing"},
fill: {
        gradient:["orange", "green"] 
    }
}).on('circle-animation-end', function(event, progress, stepValue) {
    console.log("its done!");
    
   
});
timeout();
function timeout(){
    
    setTimeout(function() { 
       
        
        console.log("[Progress bar] start");
        $('.demo').circleProgress('redraw'); // use current configuration and redraw
        //console.log($('.ui-state-default')[0].innerHTML);
        timeout();
    }, 5000);

}
// sortable moving jquery ui
$( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  } );

$('input:radio[name="pagenum"]').change(
    function(){
        if ($(this).is(':checked') && $(this).val() == 'one') {
            // append goes here
            console.log("one is selected");
            document.getElementById("disp").innerHTML = "One";
        }
        else
        {
            document.getElementById("disp").innerHTML = "Multiple";
        }
    });
// getData();
//     async function getData(){
//         const response = await fetch('/app');
//         const data = await response.json();
//         console.log(data);
//         for(item of data){
//             const root = document.createElement('div');
//             const user_id = document.createElement('div');
//             const img = document.createElement('div');
//             const date = document.createElement('div');
                
//             user_id.textContent =`user id: ${item.user_id}`
//             img.textContent =`about picture: ${item.picture_name}, ${item.picture_description}`
//             date.textContent = `${item.datetime}`

//             root.append(user_id, img, date);
//             document.body.append(root);
//         }
//     }

// const handleImageUpload = event => {
//   const files = event.target.files
//   const formData = new FormData()
//   formData.append('myFile', files[0])

//   fetch('/saveImage', {
//     method: 'POST',
//     body: formData
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data.path)
//   })
//   .catch(error => {
//     console.error(error)
//   })
// }

// document.querySelector('#imageform').addEventListener('submit', event => {
    
//     handleImageUpload(event)
// })
