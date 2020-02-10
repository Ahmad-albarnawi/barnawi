const mongoose = require("mongoose"),
	  express	=require("express"),
	  router   = express.Router(),
	  passport = require("passport"),
	  User	 	=require("../models/user")

router.get("/", (req, res) => {
	res.render("landing")
});


router.get("/login", (req, res) => {
	res.render("login")
})

router.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), (req, res) => {
})

router.get("/register", (req, res) => {
	res.render("register")
})

router.post("/register", (req, res) => {
	var newuser = new User({username: req.body.username})
	User.register(newuser, req.body.password, (err, user) => {
		if(err){
			console.log(err)
			req.flash("error", err.message)
			return res.redirect("/register")
		} else{
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "you register corrctuly")
				res.redirect("/campgrounds")
				
			}) 
		}
	})
})

router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "you logged out")
	res.redirect("/campgrounds")
})


module.exports = router;