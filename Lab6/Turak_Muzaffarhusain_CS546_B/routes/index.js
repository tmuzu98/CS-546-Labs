const RestaurantRoutes = require("./restaurants");
const ReviewsRoutes = require("./reviews");

const constructorMethod = (app) => {
	app.use("/restaurants", RestaurantRoutes);
	app.use("/reviews", ReviewsRoutes);

	app.use("*", (req, res) => {
		res.status(404).json({ error: "Not found" });
	});
};

module.exports = constructorMethod;
