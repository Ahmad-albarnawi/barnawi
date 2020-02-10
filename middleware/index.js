const Campground = require("../models/campground"),
	  Comment = require("../models/comment")
var middlewareObj = {}

middlewareObj.checkcampownership = function(req, res, next){
	if(req.isAuthenticated()){
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			res.redirect("back")
		} else{
			if(campground.author.id.equals(req.user._id)){
			next()
			}else{
				   res.redirect("back")
			  }
		
		}
	})
	}else{
		req.flash("error", "you have no permision to do that")
		res.redirect("back")
	}
}

middlewareObj.checkcommentownership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err, comment) => {
		if(err){
			res.redirect("back")
		}else{
			if(comment.author.id.equals(req.user.id)){
				next()
			}else{
				res.redirect("back")
			}
		}
			
		})
	} else{
		req.flash("error", "you have no permision to do that")
		res.redirect("back")
	}
	
}

middlewareObj.isloggedin = function(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}else {
		req.flash("error", "you must login")
		res.redirect("/login")
	}
}

module.exports = middlewareObj;
