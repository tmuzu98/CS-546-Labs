const express = require("express");
const router = express.Router();
const data = require("../data");
const reviewData = data.reviews;

router.get("/:id", async (req, res) => {
	if (!req.params.id) {
		res.status(400).json({ error: "You must Supply RestaurantId" });
		return;
	}
	try {
		const restaurants = await reviewData.getAll(req.params.id);
		res.sendStatus(200);
		res.json(restaurants);
	} catch (e) {
		res.status(404).json({ message: "No Restaurant with that Id" });
	}
});

router.post("/:id", async (req, res) => {
	const reviewData = req.body;
	if (!reviewData.title) {
		res.status(400).json({ error: "You must provide title for the review" });
		return;
	}
	if (!reviewData.reviewer) {
		res
			.status(400)
			.json({ error: "You must provide location for the restaurant " });
		return;
	}
	if (!reviewData.rating && !reviewData.dateOfReview && !reviewData.review) {
		res
			.status(400)
			.json({ error: "You must provide the reuired data for ther review" });
		return;
	}

	try {
		const { title, reviewer, rating, dateOfReview, review } = reviewData;
		const newReview = await reviewData.create(
			title,
			reviewer,
			rating,
			dateOfReview,
			review
		);
		res.sendStatus(200);
		res.json(newReview);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.get("/review/:id", async (req, res) => {
	if (!req.params.id) {
		res.status(400).json({ error: "You must Supply ReiewId" });
		return;
	}
	try {
		const rev = await reviewData.get(req.params.id);
		res.sendStatus(200);
		res.json(rev);
	} catch (e) {
		res.status(404).json({ message: "No Review with that Id" });
	}
});

router.delete("/:id", async (req, res) => {
	if (!req.params.id) {
		res.status(400).json({ error: "You must Supply and ID to delete" });
		return;
	}
	try {
		await reviewData.get(req.params.id);
	} catch (e) {
		res.status(404).json({ error: "Restaurant not found" });
		return;
	}
	try {
		await reviewData.remove(req.params.id);

		res.sendStatus(200);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

module.exports = router;
