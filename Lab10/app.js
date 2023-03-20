const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const configRoutes = require("./routes");
const session = require("express-session");
const exphbs = require("express-handlebars");

app.use(cookieParser());
const static = express.static(__dirname + "/public");
app.use(cookieParser());
app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
	session({
		name: "AuthCookie",
		secret: "some secret string!",
		resave: false,
		saveUninitialized: true,
	})
);

app.use("/private", (req, res, next) => {
	console.log(req.session.id);
	if (!req.session.user) {
		return res.status(403).json(" User is not logged in ");
	} else {
		next();
	}
});

app.use(function (req, res, next) {
	console.log("Timestamp " + new Date().toUTCString());
	console.log("Request Method: " + req.method);
	console.log("Request Routes: " + req.originalUrl);
	next();
	if (req.session) {
		if (!req.session.AuthCookie) {
			console.log("User is not Authenticated yet!");
		} else {
			console.log("User is Authenticated!");
		}
	} else {
		if (req.originalUrl == "/logout") console.log("User has been logged out!");
		else console.log("User is not Authenticated yet!");
	}
	console.log("---------------------------------------------------");
});

async function authentication(req, res, next) {
	if (req.session.user) {
		console.log("Authentication User");
	} else {
		console.log("Non-Authenticated User");
	}
	next();
}
app.use(authentication);
configRoutes(app);
app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log("Your routes will be running on http://localhost:3000");
});
