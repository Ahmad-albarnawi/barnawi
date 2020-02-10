const express    			= require("express");
const app 		 			= express();
const bodyParser 			= require("body-parser");
const mongoose 	 			= require("mongoose");
const flash					=require("connect-flash")
const passport				=require("passport");
const Campground   			= require("./models/campground")
const Comment    			= require("./models/comment")
const User					= require("./models/user")
const methodOverride 		= require("method-override")
const localStrategy 		= require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose")
const seedDB 				= require("./seeds")

const campgroundRouter  = require("./routes/campground"),
	  commentRouter 	= require("./routes/comment"),
	  indexRouter 		= require("./routes/index");

mongoose.connect(process.env.DATABASEURL) 


// mongoose.connect("mongodb+srv://albarnawi:0503533719@albarnawi-wg0ri.mongodb.net/test?retryWrites=true&w=majority", {
// 	useNewUrlParser: true,
// 	useCreateIndex: true
// }).then(() => {
// 	console.log("conected to DB")
// }).catch( (err) => {
// 	console.log("err", err.message)
// })

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"))
app.use(flash());
// seedDB();seed stopped
app.use(require("express-session")({
	secret: "hi every one",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())


app.use(function(req, res, next){
	res.locals.Currentuser = req.user;
	res.locals.error = req.flash("error")
	res.locals.success = req.flash("success")
	next();
})


app.use("/campgrounds",campgroundRouter);
app.use("/campgrounds/:id/comment",commentRouter);
app.use(indexRouter)

var port = process.env.PORT || 3000
app.listen(port, (req, res) => {
	console.log("server has been startid")
})