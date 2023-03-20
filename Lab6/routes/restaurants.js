const express = require("express");
const router = express.Router();
const data = require("../data");
const restaurantData = data.restaurants;

router.get("/", async (req, res) => {
	try {
		let restaurantlist = await restaurantData.getAll();
		restaurantlist = restaurantlist
			.find(
				{},
				{
					projection: {
						_id: 1,
						name: 1,
					},
				}
			)
			.toArray();
		for (i in restaurantlist) {
			restaurantlist[i]._id = restaurantlist[i]._id.toString();
		}

		res.json(restaurantlist);
	} catch (e) {
		res.sendStatus(500);
	}
});

router.get("/:id", async (req, res) => {
	if (!req.params.id) {
		res.status(400).json({ error: "You must Supply an ID" });
		return;
	}
	try {
		const restaurant = await restaurantData.get(req.params.id);
		res.json(restaurant);
	} catch (e) {
		res.status(404).json({ message: "No Restaurant with that Id" });
	}
});

router.delete("/:id", async (req, res) => {
	if (!req.params.id) {
		res.status(400).json({ error: "You must Supply and ID to delete" });
		return;
	}
	try {
		await restaurantData.get(req.params.id);
	} catch (e) {
		res.status(404).json({ error: "Restaurant not found" });
		return;
	}
	try {
		await restaurantData.remove(req.params.id);
		res.sendStatus(200);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.post("/", async (req, res) => {
	const restaurantData = req.body;
	if (!restaurantData.name) {
		res.status(400).json({ error: "You must provide name for the restaurant" });
		return;
	}
	if (!restaurantData.location) {
		res
			.status(400)
			.json({ error: "You must provide location for the restaurant " });
		return;
	}
	if (
		!restaurantData.phoneNumber &&
		!restaurantData.website &&
		!restaurantData.priceRange &&
		!restaurantData.cuisines &&
		!restaurantData.serviceOptions
	) {
		res
			.status(400)
			.json({ error: "You must provide the reuired data for ther restaurant" });
		return;
	}

	try {
		const {
			name,
			location,
			phoneNumber,
			website,
			priceRange,
			cuisines,
			serviceOptions,
		} = restaurantData;
		const newRestaurant = await restaurantData.create(
			name,
			location,
			phoneNumber,
			website,
			priceRange,
			cuisines,
			serviceOptions
		);
		res.json(newRestaurant);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.put("/:id", async (req, res) => {
	const updatedData = req.body;
	if (
		!updatedData.name ||
		!updatedData.location ||
		!updatedData.phoneNumber ||
		!updatedData.website ||
		!updatedData.priceRange ||
		!updatedData.cuisines ||
		!updatedData.serviceOptions
	) {
		res.status(400).json({ error: "You must Supply All fields" });
		return;
	}
	try {
		await restaurantData.get(req.params.id);
	} catch (e) {
		res.status(404).json({ error: "Restaurant not found" });
		return;
	}

	try {
		const updatedRestaurant = await restaurantData.update(
			req.params.id,
			updatedData
		);
		res.json(updatedRestaurant);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});
module.exports = router;
