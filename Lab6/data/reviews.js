const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require("mongodb");

function isString(str) {
	if (typeof str != "string") throw "Enter a string value";
}
function isEmpty(str) {
	if (str.match(/^ *$/) !== null) throw "Empty spaces ";
}

module.exports = {
	async create(restaurantId, title, reviewer, rating, dateOfReview, review) {
		if (
			!restaurantId &&
			!title &&
			!reviewer &&
			!rating &&
			!dateOfReview &&
			!review
		)
			throw "All fields need to have valid values";
		isString(restaurantId);
		isString(title);
		isString(reviewer);
		isString(dateOfReview);
		isString(review);
		isEmpty(restaurantId);
		isEmpty(title);
		isEmpty(reviewer);
		isEmpty(dateOfReview);
		isEmpty(review);
		if (typeof rating != "number") throw "Enter proper rating";
		if (rating > 5) throw "Invalid Rating";
		const restaurantCollection = await restaurants();
		let parsedId = ObjectId(restaurantId);
		const restauranttoaddreview = await restaurantCollection.findOne({
			_id: parsedId,
		});
		let newReview = {
			id: ObjectId(),
			title: title,
			reviewer: reviewer,
			rating: rating,
			dateOfReview: dateOfReview,
			review: review,
		};
		const insertInfo = await restaurantCollection.updateOne(
			{ _id: parsedId },
			{
				$addToSet: {
					reviews: newReview,
				},
			}
		);
		return await restaurantCollection.findOne({ _id: parsedId });
	},

	async getAll(restaurantId) {
		if (arguments.length > 1) {
			throw "Only 1 parameter is required here.";
		}

		const allRestaurants = await restaurants();
		let parsedId = ObjectId(restaurantId);
		let allReviews = [p];
		for (i in allRestaurants) {
			if (parsedId == allRestaurants[i]._id) {
				allReviews = allRestaurants[i].parsedId.reviews;
			} else {
				throw "No reviews for the given restaurantId";
			}
		}
		return allReviews;
	},

	async get(reviewId) {
		if (!reviewId) throw "You must provide an id to search for";
		isString(reviewId);
		let parsedId = ObjectId(reviewId);
		const allRestaurants = await restaurants();
		let reviewtodisplay = {};
		for (i in allRestaurants) {
			for (j in allRestaurants[i].review) {
				if (allRestaurants[i].review[j]._id === parsedId)
					reviewtodisplay = allRestaurants[i].review[i];
			}
		}
		if (reviewtodisplay === null) throw "No review with that id";
		reviewtodisplay._id = reviewtodisplay._id.toString();
		return reviewtodisplay;
	},

	async remove(reviewId) {
		if (!reviewId) throw "You must provide an id to search for";
		isString(reviewId);
		const restaurantCollection = await restaurants();
		let parsedId = ObjectId(id);
		let restauranttoremove = {};
		for (i in restaurantCollection) {
			for (j in allRestaurants[i].review) {
				if (allRestaurants[i].review[j]._id === parsedId)
					restauranttoremove = allRestaurants[i].review[j];
			}
		}
		const deletionInfo = await restauranttoremove.removeOne({
			_id: parsedId,
		});
		if (deletionInfo.deletedCount === 0) {
			throw `Could not remove review with id of ${reviewId}`;
		}
		return { reviewId: reviewId, deleted: true };
	},
};
