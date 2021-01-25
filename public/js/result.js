$(function(){
	console.log("Result!");
	getResultData();
});

async function getResultData(){
	console.log("get data here");
	const response = await fetch('/get_result');
    const data = await response.json();
    console.log("data at backend", data);


    var picsrc = document.getElementsByClassName("img"); //0~4
    var pictitle = document.getElementsByClassName("title");
    var picvote = document.getElementsByClassName("vote");
    console.log(picsrc);
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