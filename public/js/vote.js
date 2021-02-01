$(function(){
	console.log("voting!");

	$("#T1").hide();
	$("#T2").hide();
	$("#T3").hide();
	$("#T4").hide();
	$("#T5").hide();
	$("#image_location").hide();


	getData();
	
});
var selected = Array(20); //need modified;


function get_uid()
{
	var navigator_info = window.navigator;
	var screen_info = window.screen;
	var uid = navigator_info.mimeTypes.length;
	uid += navigator_info.userAgent.replace(/\D+/g, '');
	uid += navigator_info.plugins.length;
	uid += screen_info.height || '';
	uid += screen_info.width || '';
	uid += screen_info.pixelDepth || '';
	//console.log(uid);
	return uid;
}

/*$(document).ready(function() {
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});
});*/

function create_new_votes(data){
	// document.getElementById('0').style.display= "none";
	console.log("create new votee");
	console.log(data);
	//create an array to detect if it was selected

	//we can get total pics by data.length
	console.log(data.length);
	var limit = Math.floor(data.length*0.3);
	var current_votes=0;
	if(data.length>30) limit = 10; //if more than 30 pics, give 10 votes
	document.getElementById('limit').innerHTML = "最多能投"+limit+"票 / "+limit+" votes at most";

	console.log($(document).width());
	for(step = 0; step < data.length; step++)
	{
		var fileurl = "upload_images/"+data[step].file_name;

		var newvote = document.createElement('a');
		newvote.setAttribute("class","preview");
		newvote.setAttribute("data-fancybox", "gallery1");
		newvote.setAttribute("href", fileurl);
		newvote.setAttribute('data-caption',data[step].picture_name);
		var newimg = document.createElement('div');
		
		newimg.setAttribute("class","img");
		newimg.setAttribute("id", step+1); //need modified
		var newcircle = document.createElement('div');
		newcircle.setAttribute("class", "circle");
		newcircle.textContent = step+1; //need modified
		var url = "url('/upload_images/"+data[step].file_name+"')";
		var newpath ="background-image: "+url;
		var resolution = ";width:"+($(document).width()/3)+"px;height:"+($(document).width()/3)+"px";
		newimg.setAttribute("style", newpath+resolution);
		newimg.appendChild(newcircle);
		newvote.appendChild(newimg);
		$('.clearfix').append(newvote);
		selected[step+1] = "N"; //need modified
	}
	for(i=0;i<data.length+1;i++)//need modified
	{	selected[i] = "N";}

	var isselect = false;
	$('input:checkbox').change(
		function(){
			if ($(this).is(':checked')) {
				isselect = true;
			}
			else {
				isselect = false;
			}
			if(isselect == true){
				console.log("show big image");

				for(s=0; s<data.length;s++)
				{
					document.getElementsByClassName('preview')[s].removeAttribute('data-fancybox');
					document.getElementsByClassName('preview')[s].removeAttribute('href');
					document.getElementsByClassName('preview')[s].removeAttribute('data-caption');
				}
				
				

				//document.getElementById('f1').remove();
			}
			else
			{
				console.log("select");

				for(s=0; s<data.length;s++)
				{
					document.getElementsByClassName('preview')[s].setAttribute('data-fancybox','gallery1');
					document.getElementsByClassName('preview')[s].setAttribute('data-caption',data[s].picture_name);
					document.getElementsByClassName('preview')[s].setAttribute('href', "upload_images/"+data[s].file_name);
					
				}
				
			}
		});
	
	
	


	//we need to count how many votes
	//after create new vote, we can start counting votes
	$(".main.grid .pics >.preview .img").on('click', function(event){
		
		
		//todo check if toggle is select or preview

		

		if(isselect == true){
			console.log("select image");

			var id = this.id;
		
			console.log("a user click "+id);
			var parent = document.getElementById(id);
			var child = parent.children[0];

			//todo, check if this image has already selected;
			if(selected[id]=="N"){ //not selected
				
				if(current_votes >= limit) //check if currents votes is greater than limit
				{
					alert("you cannot vote greaters than "+limit);
				}
				else
				{
					current_votes++;
					parent.style.opacity = 0.3;
					child.style.backgroundColor = "black";
					child.style.color = "white"
					child.innerHTML = "V";
					selected[id]="Y";
				}
				console.log("i now voted "+current_votes);
			}
			else{ //have selected before
				current_votes--;
				document.getElementById(id).style.opacity = 1.0;
				child.style.backgroundColor = "#ffc107";
				child.style.color = "black";
				child.innerHTML = id;
				selected[id]="N";
			}
			var voteid="";
			for(y=0; y<data.length+1;y++) //need modified
			{
				if(selected[y]=="Y")//
				{
					console.log(y);
					voteid = voteid+" "+y;
				}
			}
			document.getElementById('sum').innerHTML = "You vote:"+voteid;






		}
		else{
			console.log("preview image");
		}
		

		
		
	});
}


async function getData(){
	console.log("get data here");
	const response = await fetch('/carousel');
	const data = await response.json();
	create_new_votes(data);
	
}

async function getResult(){
	console.log("get Result here");
	const response = await fetch('/get_result');
	const data = await response.json();
	console.log("new");
	console.log(data);
	// create 5 buttons as well as images(will be hided)
	
	
	$("#T1").html(data[0].picture_name);
	var Did=0;
	for(Did=1; Did<data.length+1; Did++)
	{
		$("#T"+Did).show();
		$("#T"+Did).html(Did+". "+data[Did-1].picture_name + ": "+ data[Did-1].vote+"票");
		//the picture name will show at html

	}


	$(".btn.btn-warning.btn-lg.btn-block").click(function(){
		
		console.log(this.id);
		var n = this.id.indexOf("T");
		var rk = parseInt( this.id.substring(1,2));
		console.log(rk);

		
		$("#image_location").fadeIn('slow');
		$("#image_location").attr("width","100");
		$("#image_location").attr("height","100");
		$("#image_location").attr("src","/upload_images/"+data[rk-1].file_name);
		
		
		//when button is clicked, show image
	})
	
}



$("#submitvote").click(function(){
	var id = this.id;
    console.log("you click " +  this.id);
	alert("submit completed");
	//send voting result to backend
	
	const userid = get_uid();
	console.log("user: "+ userid);
	const resultid = selected;
 	const data = {resultid,userid};
    const options = {
    method:'POST',
    headers:{
        'Content-Type':'application/json'
        },
    body : JSON.stringify(data)
	};
	
	const response = fetch('/vote_result', options);
	document.getElementById('title').setAttribute('style', 'font-size:40px');
	document.getElementById('title').innerHTML = "Voting completed";
	document.getElementById('submitvote').style.display= "none";
	document.getElementById('pics').style.display = "none";
	document.getElementById('limit').style.display = "none";
	document.getElementById('sum').innerHTML = "Voting Rank";
	getResult();
	

});


