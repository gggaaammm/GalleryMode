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