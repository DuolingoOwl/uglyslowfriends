const usf = document.getElementById('usf');
let uploadedSkin = "none";

document.getElementById('fileInput').addEventListener('change', function() {changeImage(this)});

function changeImage(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(event) {
			uploadedSkin = event.target.result;
			localStorage.setItem("uploadedSkin", uploadedSkin);
			updateDisplay();
		};
		reader.readAsDataURL(input.files[0]);
	}
}
uploadedSkin = localStorage.getItem("uploadedSkin") || "none";
const updateDisplay = () => {

	if (uploadedSkin === "none") {
		usf.src = 'images/uglyslowfriend.png';
	} else {
		usf.src = uploadedSkin;
		style.width = '256px';
		style.height = '256px';
	}
};

var game = {
	score: 0,
	totalScore: 0,
	totalClicks: 0,
	clickValue: 0,
	version: 0.0,

	addToScore: function(amount) {
		this.score += amount;
		this.totalScore += amount;
		display.updateScore();
	},

	getScorePerSecond: function() {
		var scorePerSecond = 0;
		for (var i = 0; i < building.name.length; i++) {
			scorePerSecond += building.income[i] * building.count[i];
		}
		return scorePerSecond;
	}
};
var time = {
	interval: 1000,
	run: setInterval(this.request, this.interval),
	request: function() {
		console.log(this.interval);
		clearInterval(this.run); // stop the setInterval()
		game.score += 1;
		document.getElementById("score").innerHTML = game.score;
		document.title = game.score + " friends";
		this.run = setInterval(this.request, this.interval); // start the setInterval()
	
		// dynamically change the run interval
	}
};

var building = {
	name: ["cursor"],
	image: [],
	count: [0],
	income: [1],
	cost: [15],
	purchase: function(index) {
		if (game.score >= this.cost[index]) {
			game.score -= this.cost[index];
			this.count[index]++;
			this.cost[index] = Math.round(this.cost[index] * 1.15);
			time.interval = 1000/(this.count[index]);
			
			display.updateScore();
		}
	}
};

function loadGame() {
	var savedGame = JSON.parse(localStorage.getItem("gameSave"));
	if(typeof savedGame.score !== "undefined") score = savedGame.score;
	if(typeof savedGame.cursorCost !== "undefined") cursorCost = savedGame.cursorCost;
	if(typeof savedGame.cursors !== "undefined") cursors = savedGame.cursors;
	if(typeof savedGame.interval !== "undefined") interval = savedGame.interval;
}

function saveGame() {
	var gameSave = {
		score: score,
		cursorCost: cursorCost,
		cursors: cursors,
		interval:interval
	};
	localStorage.setItem("gameSave", JSON.stringify(gameSave));
	
}

function resetGame() {
	if(confirm("are you sure that you want to reset the game?")) {
		var gameSave = {};
		localStorage.setItem("gameSave", JSON.stringify(gameSave));
		location.reload();
	}
}

window.onload = function() {
	loadGame();
	updateScorePerSecond();
	document.getElementById("score").innerHTML = score;
	document.getElementById("cursorCost").innerHTML = cursorCost;
	document.getElementById("cursors").innerHTML = cursors;
	document.getElementById("interval").innerHTML = interval;
	document.getElementById("run").innerHTML = run;
};

document.addEventListener("keydown", function(event) {
	if(event.metaKey && event.which == 83) {
		event.preventDefault();
		saveGame();
	}
}, false);

/*function game() {	
	const usf = document.getElementById('usf');
	// skins
	document.getElementById("files").addEventListener("change", function() {changeImage(this)});

	function changeImage(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				uploadedSkin = e.target.result;
				localStorage.setItem("uploadedSkin", uploadedSkin);
				updateDisplay();
			};
			reader.readAsDataURL(input.files[0]);
		}
	}

	defaultskin.addEventListener('click', () => {
		localStorage.setItem("uploadedSkin", "none");
		uploadedSkin = "none";
		updateDisplay();
	})

	uploadedSkin = localStorage.getItem("uploadedSkin") || "none";

	const updateDisplay = () => {

		if (uploadedSkin === "none") {
			ugs.src = 'images/uglyslowfriend.png';
		} else {
			ugs.src = uploadedSkin;
		}
	};
}*/

//setInterval(function() {
//	score += 1;
//	document.getElementById("score").innerHTML = score;

//	document.title = score + " friends";
//}, 1000/(cursors + 1));
