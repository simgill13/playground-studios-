console.log('test');

var state = {
	data: []
}






function getData() {

	$.getJSON("http://localhost:8080/post", function(data) {
		state.data = data;
		console.log(state.data);
		renderData(state);
	})

}

function renderData(state) {
   
   state.data.forEach(function(post) {
   	var blog = `<div class="article-div">
                    
                      <h2> ${post.name}</h2>
                      <p> Email: ${post.email}</p>
                      <p> Subject: ${post.subject}</p>
                      <div class="inner">
                        <p> Message: ${post.message} </p>
                        <button class="delete"> delete </button>
                      </div>
                    </div>`

     $('.oldPosts').append(blog);
   })

}

getData();



function postingData (Bname, Bemail, Bsubject, Bmessage) {
	var post = {
		name: Bname,
		email: Bemail,
		subject: Bsubject,
		message: Bmessage
	}
$.ajax( {
	type: 'post',
	url: "http://localhost:8080/post",
	data: JSON.stringify(post),
	xhrFields: {
		withCredentials: false
	},
	contentType: 'application/json',
	success: function(data) {
		console.log('Success');
		console.log(data);
	},
	error: function() {
		console.log("Our server is down")
	}
})
}

$('#input-submit').click(function() {
var Bname = $('#input-name').val();
var Bemail = $('#input-email').val();
var Bsubject = $('#input-subject').val();
var Bmessage = $('#input-message').val();
postingData(Bname,Bemail,Bsubject,Bmessage);
});





$('.delete').click(function() {

$(event.currentTarget)



});









