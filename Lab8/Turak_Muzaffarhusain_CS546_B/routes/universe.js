const express = require("express");
const router = express.Router();
const axios = require("axios");

const md5 = require("blueimp-md5");
const publickey = "ae7e4559bb151a2ad13cbb3e63845765";
const privatekey = "a78dcc46bce4bfaec8094e1e7ba7174aea1f7bf8";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

router.get("/", async (req, res) => {
	const { data } = await axios.get(url);
	console.log("data", data.data.results);
	res.render("universe/new", { data: data });
});

router.post("/search", async (req, res) => {
	try {
		const demo = req.body;
		if (demo.title == null || demo.length == 0) {
			errorDescription = {
				className: "No Title given",
				message: `No title was given`,
				hasErrors: "Error",
				title: "Character Finder",
			};
			res.status(400).render("universe/error", errorDescription);
			return;
		}
		const searchURL =
			baseUrl +
			"?nameStartsWith=" +
			demo.title +
			"&ts=" +
			ts +
			"&apikey=" +
			publickey +
			"&hash=" +
			hash;
		const { data } = await axios.get(searchURL);
		//console.log(data);
		res.render("universe/searchterm", { data: data.data.results, demo });
	} catch (error) {
		res.status(400).render("universe/error", errorDescription);
	}
});

router.get("/characters/:id", async (req, res) => {
	let count = 0;
	if (!req.params.id) {
		errorDescription = {
			className: "No search id  given",
			message: `No search Id was given`,
			hasErrors: "Error",
			title: "Character Finder",
		};
		res.status(404).render("universe/error", errorDescription);
		return;
	}
	let allComics = [];
	let comicsTest = {};
	const searchURL =
		baseUrl +
		"/" +
		req.params.id +
		"?ts=" +
		ts +
		"&apikey=" +
		publickey +
		"&hash=" +
		hash;
	const { data } = await axios.get(searchURL);
	console.log(data);
	if (!data) {
		errorDescription = {
			className: "No search id given",
			message: `Not Found`,
			hasErrors: "Error",
			title: "Character Finder",
		};
		res.status(404).render("universe/error", errorDescription);
	}
	let rendername, renderdescription, path, comics;
	data.data.results.forEach((element) => {
		rendername = element.name;
		renderdescription = element.description;
		path = element.thumbnail.path + "/portrait_incredible.jpg";
		comics = element.comics.items;
	});

	res.render("universe/universebyid", {
		name: rendername,
		title: rendername,
		description: renderdescription,
		path: path,
		comics: comics,
	});
});
module.exports = router;
