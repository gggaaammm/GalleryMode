
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


async function getResultData(){
	console.log("get data here");
	const response = await fetch('/get_result');
    const data = await response.json();
    console.log("data at backend", data);


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
        var newtitle = document.createElement('h4');
        var newdetail = document.createElement('div');
        var linebreak = document.createElement('br');
        newQRimg.src = "images/qrcode-sample.png";
        newQR.setAttribute("class", "qrcode");
        newtitle.setAttribute("class", "title");
        newintro.setAttribute("class", "intro");
        newdetail.setAttribute("class", "tip");

        //style  rendering
        newintro.classList.add("intro");
        newimg.classList.add("img");
        newQR.classList.add("qrcode");

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
    if (Math.round(currentSlide%9)==0 && currentSlide!=0) {
      console.log("change to result");
      
      $('.carousel-wrapper').slick('slickPause');
      var timeoutID = window.setTimeout(( () => {
          console.log("Hello!");
          $('.clearfix').show();
          $('.carousel').hide();
          $('.carousel-wrapper').slick('slickPlay');

        } ), 2000);
    //$('.carousel-wrapper').show();
      //this will pause current gallery
      
    }
    else{
        $('.clearfix').hide();
        //this does not show up D:
        $('.carousel').show();
        document.getElementById("wrapper").style.display = "block";
    }

    if(slick.$slides.length-1 == currentSlide)
    {
        document.querySelector('meta[http-equiv="refresh"]').setAttribute("content", "4; url=http://0.0.0.0:8051/Gallery")
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
        
        $('.carousel-wrapper').slick({
            accessibility : true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            useCSS: true
          });

        var time = data.length*2+92;
        
        //document.querySelector('meta[http-equiv="refresh"]').setAttribute("content", time+"; url=http://0.0.0.0:8051/Result")
    }


