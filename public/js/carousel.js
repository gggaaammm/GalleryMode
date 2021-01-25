
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
        //console.log(data.length);
        //console.log(data);
        //console.log(data[0].file_name);
        //here, we get the info & pth of the picture
        //change_img(data);
        

        //todo: create a new slide 
        // var newslide = document.createElement('div');
        // var newimg = document.createElement('img');
        // var newintro = document.createElement('div');
        // var newQR = document.createElement('div');
        // var newQRimg = document.createElement('img');
        // newQRimg.src = "images/qrcode-sample.png";
        // newQR.setAttribute("class", "qrcode");
        // newQR.setAttribute("id", "q2");

        // var newtitle = document.createElement('h4');
        // newtitle.setAttribute("class", "title");
        // newtitle.textContent = "Picture name";
        // var linebreak = document.createElement('br');
        // newintro.setAttribute("class", "intro");
        // newintro.setAttribute("class", "i2");

        // newimg.src = "images/photo_11.jpeg";
        // newslide.setAttribute("id", "s2");
        
        // newintro.classList.add("intro");
        // newimg.classList.add("img");
        // newQR.classList.add("qrcode");

        // newQR.appendChild(newQRimg);//smallest div
        
        // newintro.appendChild(newtitle);
        // newintro.appendChild(linebreak);
        // newintro.appendChild(newQR);
        
        
        // newslide.append(newimg);
        // newslide.append(newintro);

        //newslide.style.cssText = "display: flex;justify-content: center;align-items: center;flex-direction: column;height: calc(100vh - 30px);"
        //newslide.classList.add("slide");
        //var t3 = document.getElementById("wrapper");
        //t3.appendChild(newslide);

        
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

    }


