
$(function(){
    $('.clearfix').hide();
    console.log("carousel");
    $(document).on("submit", "#upload-photos", function(event){ uplaod_demo_handler(event); });
    
    getResultData();
    
    //$(document).on("submit", "#upload-photos", function(event){ uplaod_btn_handler(event); });
    $('.carousel-wrapper').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 500,
        arrows: false
      });
      
});

//todo: create progress bar
/*
function createProgressbar(id, duration, callback) {
    // We select the div that we want to turn into a progressbar
    var progressbar = document.getElementById(id);
    progressbar.className = 'progressbar';
  
    // We create the div that changes width to show progress
    var progressbarinner = document.createElement('div');
    progressbarinner.className = 'inner';
  
    // Now we set the animation parameters
    progressbarinner.style.animationDuration = duration;
  
    // Eventually couple a callback
    if (typeof(callback) === 'function') {
      progressbarinner.addEventListener('animationend', callback);
    }
  
    // Append the progressbar to the main progressbardiv
    progressbar.appendChild(progressbarinner);
  
    // When everything is set up we start the animation
    progressbarinner.style.animationPlayState = 'running';
  }
*/
async function getResultData(){
	console.log("get data here");
	const response = await fetch('/get_result');
    const data = await response.json();
    console.log("data at backend", data);

    /*createProgressbar('progressbar1', '7s');*/
    var picsrc = document.getElementsByClassName("img"); //0~4
    var pictitle = document.getElementsByClassName("title");
    var picvote = document.getElementsByClassName("vote");
    
    //use a for loop to finish the task
    for(rk=0 ; rk<Object.keys(data).length; rk++)
    {
        var filepath = "url('/upload_images/"+data[rk].file_name+"')";
        var picture = data[rk].picture_name;
        var result = data[rk].vote + " votes";
        picsrc[rk].style.backgroundImage = filepath;
        pictitle[rk].innerHTML = picture;
        picvote[rk].innerHTML = result;   
    }

}

function create_new_slides(data) //a loop: to create slides from database
{
    
    for(step = 0; step <data.length; step++)
    {
        console.log("on creating new slides");
        var newslide = document.createElement('div');
        var newimg = document.createElement('img');
        var newintro = document.createElement('div');
        var newQR = document.createElement('div');
        var newQRimg = document.createElement('img');
        var newtitle = document.createElement('h1');
        var newdetail = document.createElement('div');
        var linebreak = document.createElement('br');
        newQRimg.src = "images/qrcode-sample.png";
        newQR.setAttribute("class", "qrcode");
        newtitle.setAttribute("class", "title");
        newintro.setAttribute("class", "intro");
        newdetail.setAttribute("class", "tip");
        newdetail.setAttribute("style", "font-size:26px;text-align:justify;word-break:normal");
        //style  rendering
        newintro.classList.add("intro");
        newimg.classList.add("img");
        newQR.classList.add("qrcode");
        newdetail.classList.add("tip");

        //newQR.appendChild(newQRimg);//smallest div    
        newintro.appendChild(newtitle);
        newintro.appendChild(linebreak);
        newintro.appendChild(newdetail);
        newintro.appendChild(newQR);
        
        
        newslide.classList.add("slide");
        console.log("pic name:",data[step].picture_name);
        console.log("find file",data[step].file_name );
        newtitle.textContent = data[step].picture_name;
        newdetail.textContent = data[step].picture_description;
        newimg.src = "upload_images/"+data[step].file_name;
        
        newslide.append(newimg);
        newslide.append(newintro);
        $('.carousel-wrapper').append(newslide);
        console.log("completed");
    }

}

$(this).on('afterChange', function(event, slick, currentSlide) {
    //console.log(slick, currentSlide); //length = slick.$slides.length-1
    if (Math.round(currentSlide%7)==0 && currentSlide!=0) {
      console.log("change to result");
      
      $('.carousel-wrapper').slick('slickPause');
    var timeout1 = window.setTimeout(( () => {
        console.log("start!");
        $('.clearfix').show();
        $('.carousel').hide();

    } ), 2000);
    // the time from new pictures to result show

    var timeout2 = window.setTimeout(( () => {
        console.log("end");
        $('.carousel-wrapper').slick('slickPlay');

    } ), 6000);
    // the time to playing the result
    
        /// to 5 seconds
      //$('.carousel-wrapper').show();
      //this will pause current gallery
      
    }
    else{
        $('.clearfix').hide(); //hide the result
        //this does not show up D:
        $('.carousel').show(); //show the gallery
        document.getElementById("wrapper").style.display = "block";
    }

    if(slick.$slides.length-1 == currentSlide)
    {
        document.querySelector('meta[http-equiv="refresh"]').setAttribute("content", "4; url=/Gallery")
    }
  })

//get the db's image path dynamically
getData();
    async function getData(){
        
        const response = await fetch('/carousel');
        const data = await response.json();
       

        
        if ($('.carousel-wrapper').hasClass('slick-initialized')) {
            $('.carousel-wrapper').slick('destroy');
        }

        create_new_slides(data);

        //$('.carousel-wrapper').slick('unslick');
        //$('.carousel-wrapper').slick('reinit');    
        // var t4 = document.querySelector(".carousel-wrapper");
        // t4.appendChild(newslide);
        //$('.carousel-wrapper').append(newslide);
        

        //todo: speed progress bar 
        $('.carousel-wrapper').slick({
            accessibility : true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 7000,
            arrows: false,
            useCSS: true
          });

        var time = data.length*2+92;
        // 7 seconds
        
        //document.querySelector('meta[http-equiv="refresh"]').setAttribute("content", time+"; url=http://0.0.0.0:8051/Result")
    }


