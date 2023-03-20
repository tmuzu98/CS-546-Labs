const express = require("express");
const router = express.Router();
const data = require("../data/");
const users = data.users;

router.get("/", async (req, res) => {
	if (!req.session.AuthCookie)
		res.render("users/login", { title: "Login", heading: "Login" });
	else res.redirect("/private");
});

router.get("/signup", async (req, res) => {
	if (!req.session.AuthCookie)
		res.render("users/signup", { title: "Signup", heading: "Signup" });
	else res.redirect("/private");
});

router.post("/login", async (req, res) => {
	console.log(req.body);
	if (!req.body.username) throw "You must provide a name for users";
	if (!req.body.password) throw "You must provide a password for user";

	if (req.body.username.length == 0) {
		throw "Name cannot be null or empty";
	}
	if (typeof req.body.username != "string") {
		throw "The entered name must be a string";
	}
	var regex = /^[a-zA-Z0-9.\-]{4,30}$/;
	if (!req.body.username.match(regex)) {
		throw "Enter username which contains alphanumeric values, without spaces and should be greater than 4";
	}

	if (req.body.password.length == 0) {
		throw "password cannot be null or empty";
	}

	if (typeof req.body.password != "string") {
		throw "The entered password must be a string";
	}
	var len;
	for (var i = 0, len = req.body.password.length; i < len; ++i) {
		if (req.body.password.charAt(i) === " ") {
			throw "Name cannot have spaces!";
		}
	}
	if (req.body.password.length < 6) {
		throw "Password should be greater than 6 characters";
	}
	if (req.body.username.trim().length == 0) {
		throw "username cannot have spaces";
	}
	if (req.body.password.trim().length == 0) {
		throw "password cannot have spaces";
	}

	const userData = req.body;
	console.log("userData", userData);
	try {
		const user = await users.checkUser(userData.username, userData.password);
		console.log(userData.username);
		console.log("user**", user);
		if (user) {
			req.session.AuthCookie = userData.username;
			console.log("req.session.AuthCookie", req.session.AuthCookie);
			console.log("userdata****", userData);
			req.session.user = {
				Username: userData.username,
				Password: userData.password,
			};
			console.log(req.session.user, "req.session.user");
			res.status(200).render("users/private", {
				username: userData.username,
				title: "Login",
				heading: "Login",
			});
		} else {
			res.status(400);
			res.render("users/login", {
				error: "Invalid Password or USername",
				title: "Login",
				heading: "Login",
			});
		}
	} catch (error) {
		res.status(400);
		res.render("users/login", {
			error: "Invalid Password or USername",
			title: "Login",
			heading: "Login",
		});
	}
});

router.post("/signup", async (req, res) => {
	console.log(req.body);
	let havingErrors = false;
	const errors = [];
	if (!req.body.username) {
		havingErrors = true;
		res.status(401);
		return res.render("users/signup", {
			havingErrors: havingErrors,
			errors: errors,
			msg: "You must provide a name for users",
		});
	}
	if (!req.body.password) {
		havingErrors = true;
		res.status(401);
		return res.render("users/signup", {
			havingErrors: havingErrors,
			errors: errors,
			msg: "You must provide a password for user",
		});
	}

	if (req.body.username.length == 0) {
		//errors.push("Name cannot be null or empty");
		res.render("users/signup", {
			errors: errors,
			havingErrors: true,
			message: "Name cannot be null or empty",
			msg: "Name cannot be null or empty",
		});
	}
	if (typeof req.body.username != "string") {
		//errors.push("The entered name must be a string");
		res.render("users/signup", {
			errors: errors,
			havingErrors: true,
			message: "The entered name must be a string",
			msg: "The entered name must be a string",
		});
	}
	var regex = /^[a-zA-Z0-9.\-]{4,30}$/;
	if (!req.body.username.match(regex)) {
		errors.push(
			"Enter username which contains alphanumeric values, without spaces and should be greater than 4"
		);
	}

	if (req.body.password.length == 0) {
		errors.push("password cannot be null or empty");
	}
	if (typeof req.body.password != "string") {
		errors.push("The entered password must be a string");
	}
	let len;
	for (let i = 0, len = req.body.password.length; i < len; ++i) {
		if (req.body.password.charAt(i) === " ") {
			errors.push("Name cannot have spaces!");
		}
	}
	if (req.body.password.length < 6) {
		errors.push("Password should be greater than 6 characters");
	}
	if (req.body.username.trim().length == 0) {
		errors.push("username cannot have spaces");
	}
	if (req.body.password.trim().length == 0) {
		errors.push("password cannot have spaces");
	}

	if (errors.length > 0) {
		res.render("users/signup", {
			errors: errors,
			havingErrors: true,
		});
		return;
	}

	const userData = req.body;
	console.log("userData", userData);
	try {
		const user = await users.createUser(userData.username, userData.password);
		console.log(user);
		console.log("user**", user);
		if (user) {
			res.status(200);
			res.render("users/login", {
				msg: "You have successfully signed up",
				title: "Login",
				heading: "Login",
			});
		} else {
			res.status(400);
			res.render("users/signup", {
				msg: "error",
				error: "Invalid Password or USername. Please signup again",
				title: "Signup",
				heading: "Signup",
			});
		}
	} catch (error) {
		res.status(500);
		res.render("users/error", {
			error: "Internal server error",
			title: "Login",
			heading: "Login",
		});
	}
});
router.get("/private", (req, res) => {
	console.log("req.body", req.session.user);
	let userObject = req.session.user.find((obj) => {
		return obj.username === req.session.user.username;
	});
	console.log("userObject", userObject);
	var objectDetails = {
		user: userObject,
		title: "User Details",
		heading: "User Details",
	};
	console.log("objectDetails", objectDetails);
	res.render("user/private", objectDetails);
});

router.get("/logout", async (req, res) => {
	if (!req.session.AuthCookie) res.redirect("/");
	else {
		req.session.destroy();
		res.render("users/logout", {
			title: "Logout",
			heading: "Logout",
			message: "USer has been successfullt logged out",
			msg: true,
		});
	}
});

module.exports = router;
