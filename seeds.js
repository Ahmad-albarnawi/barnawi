const mongoose =require("mongoose");
const Campground =require("./models/campground")
const Comment = require("./models/comment")


var data = [
	{
		img: "https://i.pinimg.com/474x/85/24/d0/8524d0fbecba9e074d5c5aba73a81582.jpg",
		name: "ahmad",
		des: "i likt the pic"
	},{
		img: "https://i.pinimg.com/474x/85/24/d0/8524d0fbecba9e074d5c5aba73a81582.jpg",
		name: "ahmad",
		des: "i likt the pic"
		
	},{
		img: "https://i.pinimg.com/474x/85/24/d0/8524d0fbecba9e074d5c5aba73a81582.jpg",
		name: "ahmad",
		des: "i likt the pic"
	},{
		img: "https://i.pinimg.com/474x/85/24/d0/8524d0fbecba9e074d5c5aba73a81582.jpg",
		name: "ahmad",
		des: "i likt the pic"
	}
]

function seedDB(){
	
Campground.remove({}, (err) => {
	if(err){
		console.log(err)
	}
	console.log("removed campground")
	Comment.remove({}, (err) => {
	if(err){
		console.log(err)
	} 
		console.log("removed comment")
		data.forEach(function(seed){
		Campground.create(seed, (err, campground) => {
			if(err){
				console.log(err)
			} else {
				Comment.create({
					text: "hi every one",
					author: "ahmad"
				}, (err, comment) => {
					if(err){
						console.log(err)
					}else{
						campground.comments.push(comment)
						campground.save()
						console.log("created campground")
					}
				})
			}
		})	
		})
	})	
})
}


	
module.exports = seedDB



