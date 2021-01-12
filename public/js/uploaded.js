
$(function(){
    console.log("upload");
    
    $(document).on("submit", "#upload-photos", function(event){ uplaod_demo_handler(event); });
    $(document).on("submit", "#uploadForm", function(event){ uplaod_demo_handler(event); });
    //$(document).on("submit", "#upload-photos", function(event){ uplaod_btn_handler(event); });

});

//todo: check the pixel of the picture



$("form").submit(function(event){
    //alert("uploading!");
})





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

