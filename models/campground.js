const mongoose = require("mongoose")



var campgroundsSchema = new mongoose.Schema({
	img: String,
	name: String,
	des: String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		username:String
	},
	price: String,
	comments: [
		{
			type:mongoose.Schema.Types.ObjectId,
			ref: "comment"
		}
	]
}) 

module.exports = mongoose.model("campground", campgroundsSchema) 