
$(function(){
    console.log("upload");
    
    $(document).on("submit", "#upload-photos", function(event){ uplaod_demo_handler(event); });
    $(document).on("submit", "#uploadForm", function(event){ uplaod_demo_handler(event); });
    //$(document).on("submit", "#upload-photos", function(event){ uplaod_btn_handler(event); });

});

//todo: check the pixel of the picture



$("form").submit(function(event){
    //alert("uploading!");
    document.getElementById("submit").disabled = true;
})


function checkFileDetails() {
    
    var fi = document.getElementById('upload_file');
    if (fi.files.length > 0) {      // FIRST CHECK IF ANY FILE IS SELECTED.
       
        for (var i = 0; i <= fi.files.length - 1; i++) {
            var fileName, fileExtension, fileSize, fileType, dateModified;

            // FILE NAME AND EXTENSION.
            fileName = fi.files.item(i).name;
            fileExtension = fileName.replace(/^.*\./, '');

            // CHECK IF ITS AN IMAGE FILE.
            // TO GET THE IMAGE WIDTH AND HEIGHT, WE'LL USE fileReader().
            if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' ||fileExtension =='bmp'||fileExtension=='gif') {
               readImageFile(fi.files.item(i));             // GET IMAGE INFO USING fileReader().
            }
            else {
                // IF THE FILE IS NOT AN IMAGE.
                    
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

                    if(w>800 && h>600){
                        document.getElementById('fileInfo').innerHTML = document.getElementById('fileInfo').innerHTML+
                        'Permission: <span style="color: green;font-size:24px"><b> Permitted</b></span>';
                        document.getElementById("submit").disabled = false;
                    }
                    else{
                        document.getElementById('fileInfo').innerHTML = document.getElementById('fileInfo').innerHTML+
                        'Permission:<span style="color: red;font-size:24px"><b> Denied</b></span><br/> ' +
                        '<span style="font-size:20px"><b>  請選擇解析度大於 800x600 之作品 </b></span>'
                        document.getElementById("submit").disabled = true;
                    }
                }
                img_preview.setAttribute('style','width:200px');
                $('#img').empty();
                $('#img').append(img_preview);
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
        picture_description = $('#description').val();
        file_name = files[0].name
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
        alert("系統訊息:請簡述這張圖片");
        return false;
        
    }
    if(files.length < 1){ //check file input
        alert("系統訊息: 上傳 1 張圖片");
        return false;
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
                
    //send
    const response1 = fetch('/upload_photos', options1);
    console.log(options1);
    alert("file upload completed!");
    const res_data =await response;
    console.log(res_data);
}

