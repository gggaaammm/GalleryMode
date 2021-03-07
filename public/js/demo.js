

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
        $('.ui-state-default')[0].innerHTML="38";
        $('.ui-state-default')[0].style.backgroundImage="url('/images/photo_1.jpeg')";
        $('.ui-state-default')[0].style.backgroundSize="100%";
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


createGIF('/images/')

function createGIF(path){
    gifshot.createGIF({
        images: [
          path+'photo_1.jpeg',
          path+'photo_2.jpeg'  
          // 'https://unsplash.it/200/200/?',
          // 'https://unsplash.it/200/300/?',
          // 'https://unsplash.it/300/200/?'
        ],
        interval: .4
      }, function(obj) {
        if (!obj.error) {
          var image = obj.image,
            animatedImage = document.getElementById('animatedGIF');
          animatedImage.src = image;
          //the src is encoded as data 64
        }
      })
}


    // var createGIF = function() {
    //     gifshot.createGIF({
    //       images: [
    //         '/images/photo_1.jpeg',
    //         '/images/photo_2.jpeg'  
    //         // 'https://unsplash.it/200/200/?',
    //         // 'https://unsplash.it/200/300/?',
    //         // 'https://unsplash.it/300/200/?'
    //       ],
    //       interval: .4
    //     }, function(obj) {
    //       if (!obj.error) {
    //         var image = obj.image,
    //           animatedImage = document.getElementById('animatedGIF');
    //         animatedImage.src = image;
    //         //the src is encoded as data 64
    //       }
    //     })
    //   };
      
      
    //   createGIF();
