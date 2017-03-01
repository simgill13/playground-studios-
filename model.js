const mongoose = require('mongoose');




const blogPostSchema = mongoose.Schema ({
	name: String,
	email: String,
	subject: String,
	message: String
});

const blogPost = mongoose.model("Post", blogPostSchema);

module.exports = {blogPost};


