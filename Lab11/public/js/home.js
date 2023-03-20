//Endpoint to be used: http://api.tvmaze.com/shows
$(document).ready(function () {
	var requestConfig = {
		method: "GET",
		url: "http://api.tvmaze.com/shows",
	};

	$(document).on("click", ".shows-id", function (event) {
		event.preventDefault();
		$("#showList").hide();
		$("#show").empty();

		let currentLink = $(this);
		let currentUrl = currentLink.context.href;

		var requestConfig = {
			method: "GET",
			url: currentUrl,
		};
		//For the image, if there is no image, you can load a generic "no image" image that is
		//served from your public directory.  You can save this one (right click and save the image):
		$.ajax(requestConfig).then(function (resMessage) {
			let h1 = `<h1>${resMessage.name}</h1>`;
			$("#show").append(h1);

			let img;
			if (resMessage.image)
				img = `<img src="${resMessage.image.medium}" alt="${resMessage.name}"/>`;
			else
				img = `<img src="public/img/no_image.jpeg" alt="${resMessage.name}"/>`;
			$("#show").append(img);

			let dl = '<dl id="show-details"> </dl>';
			$("#show").append(dl);

			let lang = "<dt>Language</dt>";
			$("#show-details").append(lang);
			let langValue;
			if (resMessage.language) langValue = `<dd>${resMessage.language}</dd>`;
			else langValue = "<dd>N/A</dd>";
			$("#show-details").append(langValue);

			genre = "<dt>Genres</dt>";
			$("#show-details").append(genre);
			let list;
			if (resMessage.genres.length != 0) {
				genreValue = '<dd><ul id="genre-id"></ul></dd>';
				$("#show-details").append(genreValue);
				for (let arr of resMessage.genres) {
					list = `<li>${arr}</li>`;
					$("#genre-id").append(list);
				}
			} else {
				genreValue = "<dd>N/A</dd>";
				$("#show-details").append(genreValue);
			}

			rating = "<dt>Average Rating</dt>";
			$("#show-details").append(rating);
			if (resMessage.rating.average)
				ratingVal = `<dd>${resMessage.rating.average}</dd>`;
			else ratingVal = "<dd>N/A</dd>";
			$("#show-details").append(ratingVal);

			network = "<dt>Network</dt>";
			$("#show-details").append(network);
			if (resMessage.network)
				networkVal = `<dd>${resMessage.network.name}</dd>`;
			else networkVal = "<dd>N/A</dd>";
			$("#show-details").append(networkVal);

			summary = "<dt>Summary</dt>";
			$("#show-details").append(summary);
			if (resMessage.summary) {
				resMessage.summary = resMessage.summary.replace(
					/(&nbsp;|<([^>]+)>)/gi,
					""
				);
				summaryVal = `<dd>${resMessage.summary}</dd>`;
			} else summaryVal = "<dd>N/A</dd>";
			$("#show-details").append(summaryVal);
			$("#show").show();
			$("#homeLink").show();
		});
	});

	$.ajax(requestConfig).then(function (responseMessage) {
		let li;
		for (let arr of responseMessage) {
			li = `<li> <a class="shows-id" href="${arr._links.self.href}"> ${arr.name} </a></li>`;
			$("#showList").append(li);
		}
		$("#showList").show();
	});
});

$("#searchForm").submit(function (event) {
	event.preventDefault();
	$("p").empty();
	$("#show").hide();
	$("#showList").hide();
	$("#homeLink").show();
	$("#showList").empty();
	let searchTerm = $("#search_term").val();
	if (!searchTerm.trim()) {
		let p = "<p>You must provide value to search</p>";
		$("#searchForm").append(p);
		$("#search_term").val("");
	}
	if (searchTerm.length == 0) {
		let p = "<p>Not found text </p>";
		$("#searchForm").append(p);
		$("#search_term").val(" ");
	}
	//Endpoint to be used: http://api.tvmaze.com/search/shows?q=search_term_here
	else {
		let requestConfig = {
			method: "GET",
			url: "http://api.tvmaze.com/search/shows?q=" + searchTerm,
		};

		$.ajax(requestConfig).then(function (result) {
			let li;
			let x = 0;
			for (let arr of result) {
				li = `<li> <a class="shows-id" href="${arr.show._links.self.href}"> ${arr.show.name} </a></li>`;
				$("#showList").append(li);
				x = 1;
			}
			if (x == 0) {
				let p = "<p>Enter Valid show name </p>";
				$("#showList").append(p);
				$("#showLists").val(" ");
			}
			$("#showList").show();
			$("#search_term").val("");
		});
	}
});
