
$(function(){
    console.log("upload");
    $('.ui-state-default').hide();
    $(document).on("submit", "#upload-photos", function(event){ uplaod_demo_handler(event); });
    //$(document).on("submit", "#uploadForm", function(event){ uplaod_demo_handler(event); });
    //$(document).on("submit", "#upload-photos", function(event){ uplaod_btn_handler(event); });

});

//todo: multiple handling
$('input:radio[name="mode"]').change(
    
    function(){
        let toggle = document.querySelector('#upload_file');
        if ($(this).is(':checked') && $(this).val() == 'single_img') {
            // append goes here
            console.log("one is selected");
            //document.getElementById("disp").innerHTML = "One";
            if(toggle){
                toggle.removeAttribute('multiple');
            }

        }
        else
        {
            //document.getElementById("disp").innerHTML = "Multiple";
            if(toggle){
                toggle.setAttribute('multiple', 'multiple');
            }
        }
    });


$("form").submit(function(event){
    //alert("uploading!");
    document.getElementById("submit").disabled = true;
})

var textarea = document.querySelector("textarea");

textarea.addEventListener("input", function(){

    //todo: english words counter
    var maxlength = this.getAttribute("maxlength");
    var currentLength = this.value.length;
    // console.log(this.value.trim().split(/\s+/).length);

    if( currentLength >= maxlength ){
        console.log("You have reached the maximum number of characters.");
    }else{
        //console.log(maxlength - currentLength + " chars left");
    }
    document.getElementById('limit').innerHTML = currentLength + "/100 字 ";/* + this.value.trim().split(/\s+/).length + "/50 words";*/
    
});


function checkFileDetails() {
    
    var fi = document.getElementById('upload_file');
    
    if (fi.files.length > 0) {      // FIRST CHECK IF ANY FILE IS SELECTED.
       
        const besingle = fi.files.length;

        for (var i = 0; i <= fi.files.length - 1; i++) {
            var fileName, fileExtension, fileSize, fileType, dateModified;
            
            // FILE NAME AND EXTENSION.
            
            fileName = fi.files.item(i).name;
            fileExtension = fileName.replace(/^.*\./, '');
            console.log("file name is"+fileName);
            // CHECK IF ITS AN IMAGE FILE.
            // TO GET THE IMAGE WIDTH AND HEIGHT, WE'LL USE fileReader().
            if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' ||fileExtension =='bmp'||fileExtension=='gif') {
               // on dev
                if(besingle==1){
                    readImageFile(fi.files.item(i));
                }
                else
                {
                    readMultiFiles(fi.files.item(i), i);    
                }
                         // GET IMAGE INFO USING fileReader().
            }
            else {
                // IF THE FILE IS NOT AN IMAGE.
                // however, file is always an image    
                fileSize = fi.files.item(i).size;  // FILE SIZE.
                fileType = fi.files.item(i).type;  // FILE TYPE.
                dateModified = fi.files.item(i).lastModifiedDate;  // FILE LAST MODIFIED.

                document.getElementById('fileInfo').innerHTML =
                    document.getElementById('fileInfo').innerHTML + '<br /> ' +
                        'Name: <b>' + fileName + '</b> <br />' +
                        'File Extension: <b>' + fileExtension + '</b> <br />' +
                        'Size: <b>' + Math.round((fileSize / 1024)) + '</b> KB <br />' +
                        'Type: <b>' + fileType + '</b> <br />' +
                        'Last Modified: <b>' + dateModified + '</b> <br />';
            }

            if(besingle!=1 && i ==fi.files.length -1 )
            {
                console.log("last pic of gif");
                //create a preview of gif
                //createGIF();
            }
        }

        // GET THE IMAGE WIDTH AND HEIGHT USING fileReader() API.
        function readImageFile(file) {
            var reader = new FileReader(); // CREATE AN NEW INSTANCE.

            reader.onload = function (e) {
                var img = new Image();      
                img.src = e.target.result;
                var img_preview = new Image();      
                img_preview.src = e.target.result;
                 

                img.onload = function () {
                    var w = this.width;
                    var h = this.height;

                    document.getElementById('fileInfo').innerHTML =
                            'Name: <b>' + file.name + '</b> <br />' +
                            'File Extension: <b>' + fileExtension + '</b> <br />' +
                            'Size: <b>' + Math.round((file.size / 1024)) + '</b> KB <br />' +
                            'Resolution: <b>' + w + 'x' + h + ' pixels </b> <br />'
                            /*'Width: <b>' + w + '</b> <br />' +
                            'Height: <b>' + h + '</b> <br />' +
                            'Type: <b>' + file.type + '</b> <br />' +
                            'Last Modified: <b>' + file.lastModifiedDate + '</b> <br />';*/

                    if(w>600 && h>600){
                        document.getElementById('fileInfo').innerHTML = document.getElementById('fileInfo').innerHTML+
                        'Permission: <span style="color: green;font-size:24px"><b> Permitted</b></span>';
                        document.getElementById("submit").disabled = false;
                    }
                    else{
                        document.getElementById('fileInfo').innerHTML = document.getElementById('fileInfo').innerHTML+
                        'Permission:<span style="color: red;font-size:24px"><b> Denied</b></span><br/> ' +
                        '<span style="font-size:20px"><b>  請選擇解析度大於 600x600 之作品 </b></span>'
                        document.getElementById("submit").disabled = true;
                    }
                }
                img_preview.setAttribute('style','width:200px');
                $('#img').empty();
                $('#img').append(img_preview);
            };
            
            reader.readAsDataURL(file);
        }

        function readMultiFiles(file, number) {
            var reader = new FileReader(); // CREATE AN NEW INSTANCE.
            
            console.log("id: "+number);

            var imginputform = document.createElement('input');
            imginputform.setAttribute('class', 'image_order');
            imginputform.setAttribute('name', 'img_order');
            imginputform.setAttribute('value', number+1);
            $('.imgform').append(imginputform);
            $('.imgform').hide();

            reader.onload = function (e) {
                var img = new Image();   
                img.src = e.target.result;

                
                var img_preview = new Image();      
                img_preview.src = e.target.result;
                var bgimg = e.target.result;                     
                
                img.onload = function () {
                    var w = this.width;
                    var h = this.height;
                }
                img_preview.setAttribute('style','width:200px');
                //set specific number of images
                $('.ui-state-default')[number].style.display = "block";
                $('.ui-state-default')[number].style.backgroundImage='url('+bgimg+')';
                $('.ui-state-default')[number].style.backgroundSize="100%";
                
                
            };
            reader.readAsDataURL(file);
        }

        
    }
}


async function uplaod_demo_handler(event){
 console.log("???");
 const info = "success";
 const data = {info};
    const options = {
    method:'POST',
    headers:{
        'Content-Type':'application/json'
        },
    body : JSON.stringify(data)
    };
    
    //send
    //const response = fetch('/upload_photos', options);
    console.log(options);



    
    // get the information about files
    let formData = new FormData(),
        files = $('#upload_file').get(0).files,
        picture_name = $('#name').val(),
        picture_description = $('#description').val(),
        file_name = files[0].name,
        vote = 0;
    console.log("btn handler");
    console.log("file :", files); 
    console.log("file name:", file_name);    
    console.log("name:", picture_name);   
    console.log("desc:", picture_description);
    
    

    if(picture_name == ''){
        alert("系統訊息:請填入圖片名稱");
        return false;
    }
    if(picture_description == ''){
        picture_description = '';
        
    }
    if(files.length < 1){ //check file input
        alert("系統訊息: 上傳 1 張圖片");
        return false;
    }

    if(files.length >1) 
    {
        file_name = picture_name+'.gif';
    }

    //save it as json
    const data1 = {picture_name, picture_description, file_name ,vote};
    const options1 = {
    method:'POST',
    headers:{
        'Content-Type':'application/json'
        },
    body : JSON.stringify(data1)
    };   
                
    console.log("database option"+options1);
    
    //send to database
    const response1 = fetch('/upload_photos', options1);
    console.log(options1);
    alert("File upload completed!");
    const res_data =await response;
    console.log(res_data);
}


$( function() {
    $( "#sortable" ).sortable({
        start: function(event, ui) {
            var start_pos = ui.item.index();
            ui.item.data('start_pos', start_pos);
        },
        change: function(event, ui){
            console.log("changing :O");
            var start_pos = ui.item.data('start_pos');
            var index = ui.placeholder.index();
            console.log("this is"+start_pos+"and"+index);

        },
        update: function(event, ui){
            //total solution: when changing, update whole input again
            var numItems = $('.image_order').length;
            console.log("total image num: "+numItems);
            for(i=0; i<numItems; i++)
            {
                $('.image_order')[i].value = $('.ui-state-default')[i].innerHTML;
               
            }
        }
    });
    $( "#sortable" ).disableSelection();
  } );



  //gif preview 
//   var createGIF = function() {
//     gifshot.createGIF({
//       images: [
//         'https://unsplash.it/200/200/?',
//         'https://unsplash.it/200/300/?',
//         'https://unsplash.it/300/200/?'
//       ],
//       interval: .4
//     }, function(obj) {
//       if (!obj.error) {
//         var image = obj.image,
//           animatedImage = document.getElementById('animatedGIF');
//         animatedImage.src = image;
//         //the src is encoded as base64
//       }
//     })
//   };