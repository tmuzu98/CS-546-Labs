const universeRoutes = require("./universe");
const path = require("path");

const constructorMethod = (app) => {
	app.use("/", universeRoutes);

	app.use("*", (req, res) => {
		res.status(404).json({ error: "Not found" });
	});
};

module.exports = constructorMethod;
