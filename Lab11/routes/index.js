const path = require("path");

const constructorMethod = (app) => {
	app.get("/", (req, res) => {
		res.sendFile(path.resolve("static/page.html"));
	});

	app.use("*", (req, res) => {
		res.redirect("/");
	});
};

module.exports = constructorMethod;
