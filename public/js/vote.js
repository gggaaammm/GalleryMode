$(function(){
	console.log("voting!");
	
	getData();
});
var selected = Array(20); //need modified;

function create_new_votes(data){
	// document.getElementById('0').style.display= "none";
	console.log("create new votee");
	console.log(data);
	//create an array to detect if it was selected

	//we can get total pics by data.length
	console.log(data.length);
	var limit = Math.floor(data.length*0.3);
	var current_votes=0;
	console.log(limit);
	document.getElementById('limit').innerHTML = limit+" votes at most";
	for(step = 0; step < data.length; step++)
	{
		var newimg = document.createElement('div');
		newimg.setAttribute("class","img");
		newimg.setAttribute("id", step+1); //need modified
		var newcircle = document.createElement('div');
		newcircle.setAttribute("class", "circle");
		newcircle.textContent = step+1; //need modified
		var url = "url('/upload_images/"+data[step].file_name+"')";
		var newpath ="background-image: "+url;
		newimg.setAttribute("style", newpath);
		newimg.appendChild(newcircle);
		$('.clearfix').append(newimg);
		selected[step+1] = "N"; //need modified
	}
	for(i=0;i<data.length+1;i++)//need modified
	{	selected[i] = "N";}

	// $(".main.grid .pics > .background .img").on('click', function(event){
	// 	var id = this.id;
	// 	var parent = document.getElementById(id);
	// 	var child = parent.children[0];
	// 	parent.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
	// 	//child.style.opcaity =0.2;
		
	// });

	//we need to count how many votes
	//after create new vote, we can start counting votes
	$(".main.grid .pics > .img").on('click', function(event){
		var id = this.id;
		
		console.log("a user click");
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
	});
}


async function getData(){
	console.log("get data here");
	const response = await fetch('/carousel');
	const data = await response.json();
	create_new_votes(data);
}


$("#submitvote").click(function(){
	var id = this.id;
    console.log("you click " +  this.id);
	alert("submit completed");
	//send voting result to backend
	
	const resultid = selected;
 	const data = {resultid};
    const options = {
    method:'POST',
    headers:{
        'Content-Type':'application/json'
        },
    body : JSON.stringify(data)
	};
	
	const response = fetch('/vote_result', options);
	document.getElementById('sum').innerHTML = "Voting completed";
	document.getElementById('submitvote').style.display= "none";

});


