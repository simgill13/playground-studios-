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
                      
                      	<input class='hidden' type="text" id=${post._id} placeholder="Edit Name">
                      
                      <p> Email: ${post.email}</p>
                      <p> Subject: ${post.subject}</p>
                      
                       <p> Message: ${post.message} </p>
                       <button class="delete"> delete </button>
                       <button id=${post._id} class="edit"> Edit post </button>

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

function editPost() {
    $(".oldPosts").on("click", ".edit", function(event) {
        event.preventDefault();
        var postId = $(event.currentTarget).closest('.article-div').attr('id');
        $.getJSON(`http://localhost:8080/post/${postId}`, function(data) {
        })
        .then(function(data) {
            $(event.currentTarget).closest('.article-div')
            .append(`<br><input id="updateName" type="text"  placeholder="edit...${data.name}"> 
					<br>
					<input id="updateEmail" type="text"  placeholder="edit...${data.email}">
					<br>
					<input  id="updateSubject" type="text"  placeholder="edit...${data.subject}">
					<br>
					<input id="updateMessage" type="text"  placeholder="edit...${data.message}"> 
					<br>
					<button class="updateButton"> Update </button>`
			);
        })
        $(".oldPosts").on("click", ".updateButton", function(event) {
        	var updateName = $('#updateName').val();
			var updateEmail = $('#updateEmail').val();
			var updateSubject = $('#updateSubject').val();
			var updateMessage = $('#updateMessage').val();
			var post = {
				name: updateName,
				email: updateEmail,
				subject: updateSubject,
				message: updateMessage
			}
			$.ajax( {
				type: 'put',
				url: `http://localhost:8080/post/${postId}`,
				data: JSON.stringify(post),
				xhrFields: {
					withCredentials: false
				},
				contentType: 'application/json',
				success: function(data) {
					console.log('Your Post has been updated');
					location.reload();
				},
				error: function() {
					console.log("Our server is down.")
				}
			})
        });      
    })
}


$(function() {
    getData();
    deletePost();
    editPost();});




