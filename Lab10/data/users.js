const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
let { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const saltRounds = 16;

function isString(str) {
	if (typeof str != "string") throw "Enter a string value";
}
function isEmpty(str) {
	if (str.match(/^ *$/) !== null) throw "Empty spaces ";
}

module.exports = {
	async createUser(username, password) {
		if (!username && !password) throw "All fields need to have valid values";
		//username and only alphanumeric characters) and should be at least 4 characters long.
		isString(username);
		isEmpty(username);
		isEmpty(password);
		//For the password, it must be a valid string (no empty spaces and no spaces
		//but can be any other character including special characters) and should be
		//at least 6 characters long. If it fails any of those conditions, you will throw an error.
		const usersCollection = await users();
		var usernameLowerCase = username.toLowerCase();
		const hash = await bcrypt.hash(password, saltRounds);
		let newUser = {
			usernameme: usernameLowerCase,
			password: hash,
		};
		const userExists = await usersCollection.findOne({
			usernameme: usernameLowerCase,
		});
		if (userExists) throw "Username already in use";
		const insertInfo = await usersCollection.insertOne(newUser);
		if (insertInfo.insertedCount === 0) throw "Could not add user";

		return { userInserted: true };
	},
	async checkUser(username, password) {
		if (!username && !password) throw "All fields need to have valid values";
		isString(username);
		isEmpty(username);
		isEmpty(password);
		//username and only alphanumeric characters) and should be at least 4 characters long.
		//For the password, it must be a valid string (no empty spaces and no spaces
		//but can be any other character including special characters) and should be
		//at least 6 characters long. If it fails any of those conditions, you will throw an error.
		const usersCollection = await users();
		var usernameLowerCase = username.toLowerCase();
		const userExists = await usersCollection.findOne({
			usernameme: usernameLowerCase,
		});
		console.log(userExists);
		let compareToMatch = false;
		if (userExists) {
			compareToMatch = await bcrypt.compare(password, userExists.password);
		}
		if (compareToMatch === true) {
			return { authenticated: true };
		} else {
			return "Either the username or password is invalid";
		}
	},
};
