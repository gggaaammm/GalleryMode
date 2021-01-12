$(".btn.btn-warning.btn-lg.btn-block").click(function(){
    var id = this.id;
    alert("you click " +  id);
    console.log("a user click");

});


$(document).ready(function() {

	//$('form').on('submit', function(event) {
    $(".btn.btn-warning.btn-lg.btn-block").click(function(){
		$.ajax({
			data : {
				//name : $('#nameInput').val(),
				//email : $('#emailInput').val()
				name : 'aabbcc',
			},
			type : 'POST',
			url : '/process'
		})
		


	});

});
