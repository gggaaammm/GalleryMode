
$(function(){
    console.log("carousel");
    $(document).on("submit", "#upload-photos", function(event){ uplaod_demo_handler(event); });
    
    
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

        console.log(data.length);
        var time = data.length*2+2;
        
        document.querySelector('meta[http-equiv="refresh"]').setAttribute("content", time+"; url=http://0.0.0.0:8051/Result")
    }


