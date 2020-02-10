const mongoose   = require("mongoose"),
	  express    = require("express"),
	  router 	 = express.Router({mergeParams: true}),
	  Campground = require("../models/campground"),
	  Comment    = require("../models/comment"),
	  middlewareObj = require("../middleware/index")




router.get("/new",middlewareObj.isloggedin, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err)
		}else{
			res.render("comment/new", {campground: campground})
		}
	})
})

router.post("/",middlewareObj.isloggedin, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err)
		}else{
		Comment.create(req.body.comment, (err, comment) => {
			if(err){
				console.log(err)
				res.redirect("/campgrounds");
			}else{
				comment.author.id = req.user._id;
				comment.author.username = req.user.username
				comment.save()
			campground.comments.push(comment)
				campground.save();
				res.redirect("/campgrounds/" + campground._id)
			}
		})
		}
	})
	
})

router.get("/:comment_id/edit",middlewareObj.checkcommentownership, (req, res) => {
	Comment.findById(req.params.comment_id, (err, comment) => {
		if(err){
			res.redirect("back")
		}else{
	res.render("comment/edit", {campground_id: req.params.id, comment: comment})
		}
	})
})

router.put("/:comment_id",middlewareObj.checkcommentownership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
		if(err){
			res.redirect("back")
			console.log(err)
		}else{
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

router.delete("/:comment_id",middlewareObj.checkcommentownership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if(err){
			res.redirect("back")
		}else{
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

module.exports = router