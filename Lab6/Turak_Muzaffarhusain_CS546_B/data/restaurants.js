const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require("mongodb");
//const { UPDATE } = require("mongodb/lib/bulk/common");

function isString(str) {
	if (typeof str != "string") throw "Enter a string value";
}
function isEmpty(str) {
	if (str.match(/^ *$/) !== null) throw "Empty spaces ";
}

module.exports = {
	async create(
		name,
		location,
		phoneNumber,
		website,
		priceRange,
		cuisines,
		serviceOptions
	) {
		if (
			!name &&
			!location &&
			!phoneNumber &&
			!website &&
			!priceRange &&
			!cuisines &&
			!serviceOptions
		)
			throw "All fields need to have valid values";
		isString(name);
		isString(location);
		isString(phoneNumber);
		isString(website);
		isString(priceRange);
		isEmpty(name);
		isEmpty(location);
		isEmpty(phoneNumber);
		isEmpty(website);
		isEmpty(priceRange);
		if (!Array.isArray(cuisines)) {
			throw "Cuisines should be an array";
		}
		let h = typeof cuisines;
		//console.log(h);
		let z = priceRange.length;
		if (z > 4) throw "Invalid Price Range";
		const regexPhoneNumber =
			/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
		if (!phoneNumber.match(regexPhoneNumber)) throw "Error in Mobile number";
		const regex2 = /^(http|https):\//;
		var match = regex2.test(website);
		if (match === false) {
			throw "Enter proper website";
		}
		let p = website.endsWith(".com");
		if (p == false) throw "Enter proper website";
		//console.log(match);

		if (typeof serviceOptions != "object") throw "Invalid service Options";
		if (
			typeof serviceOptions.dineIn != "boolean" ||
			typeof serviceOptions.takeOut != "boolean" ||
			typeof serviceOptions.delivery != "boolean"
		)
			throw "Invalid Entries for service Options";

		const restaurantCollection = await restaurants();

		let newRestaurant = {
			name: name,
			location: location,
			phoneNumber: phoneNumber,
			website: website,
			priceRange: priceRange,
			cuisines: cuisines,
			overallRating: 0,
			serviceOptions: serviceOptions,
			reviews: [],
		};

		const insertInfo = await restaurantCollection.insertOne(newRestaurant);
		if (insertInfo.insertedCount === 0) throw "Could not add restaurant";

		const newId = insertInfo.insertedId;
		const restaurant = await this.get(newId);
		//let x=typeof(newId);
		//console.log(x);
		return restaurant;
	},

	async getAll() {
		if (arguments.length > 0) {
			throw "No parameter is required here.";
		}
		const restaurantCollection = await restaurants();
		let allrestaurants = await restaurantCollection.find({}).toArray();
		for (i in allrestaurants) {
			allrestaurants[i]._id = allrestaurants[i]._id.toString();
		}

		return allrestaurants;
	},
	async get(id) {
		if (!id) throw "You must provide an id to search for";
		//isString(id);
		const restaurantCollection = await restaurants();
		let parsedId = ObjectId(id);
		let restaurant = await restaurantCollection.findOne({ _id: parsedId });
		if (restaurant === null) throw "No restaurant with that id";
		restaurant._id = restaurant._id.toString();
		return restaurant;
	},
	async remove(id) {
		if (!id) throw "You must provide an id to search for";
		isString(id);
		const restaurantCollection = await restaurants();
		let parsedId = ObjectId(id);
		const deletionInfo = await restaurantCollection.removeOne({
			_id: parsedId,
		});

		if (deletionInfo.deletedCount === 0) {
			throw `Could not remove restaurant with id of ${id}`;
		}
		return { restaurantId: id, deleted: true };
	},

	async update(
		id,
		name,
		location,
		phoneNumber,
		website,
		priceRange,
		cuisines,
		serviceOptions
	) {
		if (
			!id &&
			!name &&
			!location &&
			!phoneNumber &&
			!website &&
			!priceRange &&
			!cuisines &&
			!serviceOptions
		)
			throw "All fields need to have valid values. ";
		isString(name);
		isString(location);
		isString(phoneNumber);
		isString(website);
		isString(priceRange);
		isEmpty(name);
		isEmpty(location);
		isEmpty(phoneNumber);
		isEmpty(website);
		isEmpty(priceRange);
		if (!Array.isArray(cuisines)) {
			throw "Cuisines should be an array";
		}
		let h = typeof cuisines;
		//console.log(h);
		let z = priceRange.length;
		if (z > 4) throw "Invalid Price Range";
		const regexPhoneNumber =
			/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
		if (!phoneNumber.match(regexPhoneNumber)) throw "Error in Mobile number";
		const regex2 = /^(http|https):\//;
		var match = regex2.test(website);
		if (match === false) {
			throw "Enter proper website";
		}
		let p = website.endsWith(".com");
		if (p == false) throw "Enter proper website";

		if (typeof serviceOptions != "object") throw "Invalid service Options";
		if (
			typeof serviceOptions.dineIn != "boolean" ||
			typeof serviceOptions.takeOut != "boolean" ||
			typeof serviceOptions.delivery != "boolean"
		)
			throw "Invalid Entries for service Options";
		const restaurantCollection = await restaurants();
		let parsedId = ObjectId(id);
		let updatedRestaurant = {
			name: name,
			location: location,
			phoneNumber: phoneNumber,
			website: website,
			priceRange: priceRange,
			cuisines: [cuisines],
			serviceOptions: { serviceOptions },
		};
		const updatedInfo = restaurantCollection.updateOne(
			{ _id: parsedId },
			{
				$set: updatedRestaurant,
			}
		);

		if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount)
			throw "Update failed";

		return await restaurantCollection.findOne({ _id: parsedId });
	},
};
