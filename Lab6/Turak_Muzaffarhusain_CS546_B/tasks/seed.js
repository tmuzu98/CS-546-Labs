const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const restaurants = data.restaurants;
const review = data.reviews;

async function main() {
	const db = await dbConnection();
	const newrestaurant = await restaurants.create(
		"The Saffron Lounge",
		"New York City, New York",
		"123-456-7890",
		"https://www.saffronlounge.com",
		"$",
		["Cuban", "Indian"],
		{ dineIn: true, takeOut: true, delivery: false }
	);
	console.log("Restaurant has been added");
	try {
		const updatedrestaurant = await restaurants.update(
			"6174496e65bad92564d20318",
			"New Restaurant",
			"Meraghar",
			"123-456-7899",
			"https://www.newsaffronlounge.com",
			"$$",
			["Indian"],
			{ dineIn: false, takeOut: false, delivery: true }
		);
		console.log(updatedrestaurant);
		console.log("Restaurant has been updated succcessfully");
	} catch (e) {
		console.log("Error thrown with bad input parameters");
		console.log(e);
	}

	const newrestaurant1 = await restaurants.create(
		"Pizza Lounge",
		"New York City, New York",
		"999-999-9999",
		"http://www.pizzalounge.com",
		"$",
		["Italian"],
		{ dineIn: true, takeOut: true, delivery: false }
	);
	console.log(" Second Restaurant has been added");

	const newrestaurant2 = await restaurants.create(
		"Black Bear",
		"Hoboken, New Jersey",
		"456-789-0123",
		"http://www.blackbear.com",
		"$$",
		["Cuban", "American"],
		{ dineIn: true, takeOut: true, delivery: true }
	);
	console.log("Third Restaurant has been added");
	try {
		const reviewtoadd = await review.create(
			"6174b31f2dfd2633beb07b2e",
			"A good Retaurant to eat thai!",
			"Aniket",
			1,
			"10/19/2021",
			"This place was really good!"
		);
		console.log("Review Added to first restaurant");
		console.log(reviewtoadd);
	} catch (e) {
		console.log("Error caught");
		console.log(e);
	}
	/* await restaurants.remove("6173484ede9d46197e0b7a2e");
	console.log("Restaurant removed"); */
}

main();
