const mongoose   = require("mongoose"),
	  express = require("express"),
	  router = express.Router(),
	  Campground = require("../models/campground"),
	  Comment = require("../models/comment"),
	  middlewareObj = require("../middleware/index")

router.get("/", (req, res) => {
	Campground.find({}, (err, campgrounds) => {
		if(err){
			console.log(err)
			console.log("err in the finding the page")
		}else {
	res.render("campground/campgrounds", {campgrounds: campgrounds})
			
		}
	})
});



router.get("/add",middlewareObj.isloggedin, (req, res) => {
	res.render("campground/new")
})

router.post("/",middlewareObj.isloggedin, (req, res) => {
	var name = req.body.name;
	var img = req.body.img;
	var des = req.body.des;
	var author = {
		id:req.user._id,
		username:req.user.username
	}
	var price = req.body.price;
	var newcampground = {img: img, name: name, des: des, author:author, price: price}
	
Campground.create(newcampground, (err, campground) => {
	if(err){
		console.log(err)
	} else {
	req.flash("success", "you add campgrund successfly")
	res.redirect("/campgrounds")
	}
})	
});

router.get("/:id", (req, res) => { 
	Campground.findById(req.params.id).populate("comments").exec((err, foundcampground) => {
		if(err){
			console.log(err)
			console.log("somthing wrong")
		} else {
	res.render("campground/show", {campground: foundcampground})
		}
	})
})

router.get("/:id/edit",middlewareObj.checkcampownership, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err)
		} else{
			
	res.render("campground/edit", {campground: campground})
		}
	})
})

router.put("/:id/edit",middlewareObj.checkcampownership, (req, res) => {
Campground.findByIdAndUpdate(req.params.id,req.body.campground , (err, campground) => {
	if(err){
		console.log(err)
	} else {
	req.flash("success", "you changed campgrund successfly")
	res.redirect("/campgrounds/" + campground._id)
	}
})		
})

router.delete("/:id/delete",middlewareObj.checkcampownership, (req, res) => {
	Campground.findByIdAndDelete(req.params.id,req.body.campground, (err, campground) => {
		if(err){
			res.redirect("/campgrounds/" + campground._id)
		} else{
			res.redirect("/campgrounds")
		}
	})
})

module.exports = router;
