$(function(){
	console.log("voting!");


	$("#T1").hide();
	$("#T2").hide();
	$("#T3").hide();
	$("#T4").hide();
	$("#T5").hide();
	$('#switch').hide();//temporary hide the switch toggle
	$("#image_location").hide();


	getData();
	set_fancy_option();

	
});
var selected = Array(40); //need modified;







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
	document.getElementById('limit').innerHTML = /*"最多能投"+limit+"票 / "+*/limit+" votes at most";

	console.log($(document).width());
	for(step = 0; step < data.length; step++)
	{
		var fileurl = "upload_images/"+data[step].file_name;

		var newvote = document.createElement('a');
		newvote.setAttribute("class","preview");
		newvote.setAttribute("data-fancybox", "gallery");
		newvote.setAttribute("href", fileurl);
		var voting_btn = '<button id=b'+step+' class="fancy_btn" style="background-color:Green;">Vote!</button>';
		newvote.setAttribute('data-caption',voting_btn+'<br>'+data[step].picture_name+'<br>'+data[step].picture_description);
		newvote.setAttribute('data-thumb', fileurl);
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

	// Custom options
	$( '[data-fancybox="gallery"]' ).fancybox({

		caption : function( instance, item ) {
			var caption = $(this).data('caption') || '';
			//console.log(selected[0]);
			//console.log(caption);
			return ( caption.length ? caption + '<br />' : '' )/* + 'Image <span data-fancybox-index></span> of <span data-fancybox-count></span>'*/;
		  },

	beforeShow: function() {
        $('.caption--image').remove();
		
    },
    afterShow: function() {
		
		//$('.fancybox-caption__body').remove();
        var caption = $(".fancybox-caption");
		var innerCaption = caption.clone().addClass('caption--image');
        $(".fancybox-slide--current .fancybox-content").append(innerCaption);
        caption.not('.caption--image').addClass('caption--bottom');

		$(".fancy_btn").on('click', function(event){
			console.log(event);
			console.log("click!");
			var id = this.id;

			
			console.log("a user click "+id);

			//shoud dark out the voted pics
			var parent = document.getElementById($.fancybox.getInstance().current.index+1 );
			var child = parent.children[0];

			console.log("clicking button index "+$.fancybox.getInstance().current.index);
			console.log("get child:"+child.innerHTML);

			//trigger vote button to unvote
			var src = $('.fancybox-slide--current .fancybox-image').attr('src');
			var idx = $('a[href="'+src+'"]')[0];
			console.log("get src:"+src);
			console.log("get idx.children.id="+idx.children[0].id);
			console.log("checck if this is selected:"+selected[idx.children[0].id]);
			if(selected[idx.children[0].id]=="N") 
			{
				if(current_votes>=limit)
				{
					alert("you cannot vote greaters than "+limit);
				}
				else
				{
					current_votes++;
					document.getElementById(id).innerHTML ="Unvote!";
					document.getElementById(id).style.backgroundColor = "Red";
					console.log("vote this!"); 
					selected[idx.children[0].id]="Y";

					//update the fancybox caption "button change!"
					var newbtn = '<button id=b'+$.fancybox.getInstance().current.index+' class="fancy_btn" style="background-color:Red;">Unvote!</button>';
					var newcaption = newbtn+'<br>'+
									data[$.fancybox.getInstance().current.index].picture_name+'<br>'+
									data[$.fancybox.getInstance().current.index].picture_description;
					parent.style.opacity = 0.3;
					child.style.backgroundColor = "black";
					child.style.color = "white"
					child.innerHTML = "V";
				}
			}
			else 
			{
				current_votes--;
				document.getElementById(id).innerHTML ="Vote!";
				document.getElementById(id).style.backgroundColor = "Green";
				console.log("unvote this!"); 
				selected[idx.children[0].id]="N";

				//update the fancybox caption "button change!"
				var newbtn = '<button id=b'+$.fancybox.getInstance().current.index+' class="fancy_btn" style="background-color:Green;">Vote!</button>';
				var newcaption =newbtn+'<br>'+ 
								data[$.fancybox.getInstance().current.index].picture_name+'<br>'+
								data[$.fancybox.getInstance().current.index].picture_description;
				parent.style.opacity = 1.0;
				child.style.backgroundColor = "#ffc107";
				child.style.color = "black";
				child.innerHTML = $.fancybox.getInstance().current.index+1;					

			} 


			

			var instance = $.fancybox.getInstance();
			//console.log(instance);

			//update the fancy box caption
			console.log($.fancybox.getInstance().group[ $.fancybox.getInstance().current.index ].opts.caption);
			console.log($.fancybox.getInstance().current.opts.caption);
			
			
			$.fancybox.getInstance().current.opts.$orig.data('caption', newcaption);
			$.fancybox.getInstance().group[ $.fancybox.getInstance().current.index ].opts.caption = newcaption;
			$.fancybox.getInstance().current.opts.caption = newcaption;
			$.fancybox.getInstance().updateControls();

			console.log($.fancybox.getInstance().group[ $.fancybox.getInstance().current.index ].opts.caption);
			console.log($.fancybox.getInstance().current.opts.caption);
			//end of updating
			

			document.getElementById('sum').innerHTML = document.getElementById('sum').innerHTML+idx.children[0].id;
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
		
    },
		buttons : [
		// 'fb',
		// 'tw',
		// 'share',
		'fullScreen',
		'thumbs',
		'close'
		],
		helpers: {
            thumbs: {
                width: 50,
                height: 50,
                source: function (current) {
                    return $(current.element).data('thumbnail');
                },
            },
            title: {
                type: 'outside'

            }
        }

		
		});
		
	/*
	for(s=0; s<data.length;s++)
	{
		document.getElementsByClassName('preview')[s].setAttribute('data-fancybox','gallery1');
		document.getElementsByClassName('preview')[s].setAttribute('data-caption',data[s].picture_name);
		document.getElementsByClassName('preview')[s].setAttribute('href', "upload_images/"+data[s].file_name);
		
	}*/

	
	var isselect = true;
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

				/*for(s=0; s<data.length;s++)
				{
					document.getElementsByClassName('preview')[s].removeAttribute('data-fancybox');
					document.getElementsByClassName('preview')[s].removeAttribute('href');
					document.getElementsByClassName('preview')[s].removeAttribute('data-caption');
				}*/
				
				

				//document.getElementById('f1').remove();
			}
			else
			{
				console.log("select");

				/*for(s=0; s<data.length;s++)
				{
					document.getElementsByClassName('preview')[s].setAttribute('data-fancybox','gallery1');
					document.getElementsByClassName('preview')[s].setAttribute('data-caption',data[s].picture_name);
					document.getElementsByClassName('preview')[s].setAttribute('href', "upload_images/"+data[s].file_name);
					
				}*/
				
			}
		});
	
	
	
	
		

	//we need to count how many votes
	//after create new vote, we can start counting votes
	/*$(".main.grid .pics >.preview .img").on('click', function(event){
		
		console.log("click on img");		
	
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
		
		
	});*/
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
	document.getElementById('switch').style.display= "none";
	document.getElementById('pics').style.display = "none";
	document.getElementById('limit').style.display = "none";
	document.getElementById('sum').innerHTML = "Voting Rank";
	getResult();
	

});


//todo preview select : out
//todo  circle: select img: preview
function set_fancy_option()
{
		// Create templates for buttons
	$.fancybox.defaults.btnTpl.fb = '<button data-fancybox-fb class="fancybox-button fancybox-button--fb" title="Facebook">' +
	'<svg viewBox="0 0 24 24">' +
	'<path d="M22.676 0H1.324C.594 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294h-3.13v-3.62h3.13V8.41c0-3.1 1.894-4.785 4.66-4.785 1.324 0 2.463.097 2.795.14v3.24h-1.92c-1.5 0-1.793.722-1.793 1.772v2.31h3.584l-.465 3.63h-3.12V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .594 23.408 0 22.676 0"/>' +
	'</svg>' +
	'</button>';

	$.fancybox.defaults.btnTpl.tw = '<button data-fancybox-tw class="fancybox-button fancybox-button--tw" title="Twitter">' +
	'<svg viewBox="0 0 24 24">' +
	'<path d="M23.954 4.57c-.885.388-1.83.653-2.825.774 1.013-.61 1.793-1.574 2.162-2.723-.95.556-2.005.96-3.127 1.185-.896-.96-2.173-1.56-3.59-1.56-2.718 0-4.92 2.204-4.92 4.918 0 .39.044.765.126 1.124C7.69 8.094 4.067 6.13 1.64 3.16c-.427.723-.666 1.562-.666 2.476 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.06c0 2.386 1.693 4.375 3.946 4.828-.413.11-.85.17-1.296.17-.314 0-.615-.03-.916-.085.63 1.952 2.445 3.376 4.604 3.416-1.68 1.32-3.81 2.105-6.102 2.105-.39 0-.78-.022-1.17-.066 2.19 1.394 4.768 2.21 7.557 2.21 9.054 0 14-7.497 14-13.987 0-.21 0-.42-.016-.63.962-.69 1.8-1.56 2.46-2.548l-.046-.02z"/>' +
	'</svg>' +
	'</button>';

	// Make buttons clickable using event delegation
	$('body').on('click', '[data-fancybox-fb]', function() {
	window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href)+"&t="+encodeURIComponent(document.title), '','left=0,top=0,width=600,height=300,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
	});

	$('body').on('click', '[data-fancybox-tw]', function() {
	window.open('http://twitter.com/share?url='+encodeURIComponent(window.location.href)+'&text='+encodeURIComponent(document.title), '', 'left=0,top=0,width=600,height=300,menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
	});


	// Custom options
	$( '[data-fancybox="gallery"]' ).fancybox({
	buttons : [
	'fb',
	'tw',
	'close',
	'share'
	]
	});
}

function click_events()
{
	
}