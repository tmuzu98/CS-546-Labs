const palindromeRoutes = require("./palindrome");

const constructorMethod = (app) => {
	app.use("/", palindromeRoutes);

	app.use("*", (req, res) => {
		res.status(404).json({ error: "Route Not Found" });
	});
};

module.exports = constructorMethod;
