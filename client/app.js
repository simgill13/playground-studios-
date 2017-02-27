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
   	var blog = `<div id=${post._id} class="article-div">
                    	
                      <h2> ${post.name}</h2>
                      <p> Email: ${post.email}</p>
                      <p> Subject: ${post.subject}</p>
                      
                        <p> Message: ${post.message} </p>
                        <button class="delete"> delete </button>
                      <button class="edit"> Edit post </button>
                    </div>`

     $('.oldPosts').append(blog);
   })
}

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


function deletePost() {
	$( ".oldPosts" ).on( "click", ".delete", function( event ) {
    	event.preventDefault();
   		var postId = $(event.currentTarget).closest('.article-div').attr('id');
        $.ajax( {
			type: 'delete',
			url: `http://localhost:8080/post/${postId}`,
			xhrFields: {
				withCredentials: false
			},
			contentType: 'application/json',
			success: function(data) {
				console.log('Success');
				console.log(state.data);
				location.reload();
			},
			error: function() {
				console.log("Our server is down")
			}
		})
	});
}




//step 1 : event listener on the edit post button
// step 2 : append input field to that div (has to append only to that blogpost)
//step 3: caputure that vals from that form and resubmit data 

$(function() {
    getData();
    deletePost();

});




