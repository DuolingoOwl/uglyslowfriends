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
	clickValue: 1,
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
			if (this.count[index] > 0) {
				interval = 1000/(this.count[index]);
			} else {
				interval = 0;
			}
			
			display.updateScore();
			display.updateShop();
		}
	}
};

var display = {
	updateScore: function() {
		document.getElementById("score").innerHTML = game.score;
		document.getElementById("scorePerSecond").innerHTML = game.getScorePerSecond();
		document.title = game.score + " friends";
	},

	updateShop: function() {
		document.getElementById("shopContainer").innerHTML = "";
		for (i = 0; i < building.name.length; i++) {
			document.getElementById("shopContainer").innerHTML += '<table class = "shopButton unselectable" onclick = "building.purchase('+i+')"><tr><td id="nameAndCost"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span></p></td><td id="amount"><span id="cursors">'+building.count[i]+'</span></td></tr></table>';
		}
	}
};

function saveGame() {
	var gameSave = {
		score: game.score,
		totalScore: game.totalScore,
		totalClicks: game.totalClicks,
		clickValue: game.clickValue,
		version: game.version,
		buildingCount: building.count,
		buildingIncome: building.income,
		buildingCost: building.cost,
		interval: interval
	};
	localStorage.setItem("gameSave", JSON.stringify(gameSave));
	
}

function loadGame() {
	var savedGame = JSON.parse(localStorage.getItem("gameSave"));
	if (localStorage.getItem("gameSave") !== null) {
		if(typeof savedGame.score !== "undefined") game.score = savedGame.score;
		if(typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
		if(typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
		if(typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
		if(typeof savedGame.interval !== "undefined") interval = savedGame.interval;
		if(typeof savedGame.buildingCount !== "undefined") {
			for (i = 0; i < savedGame.buildingCount.length; i++) {
				building.count[i] = savedGame.buildingCount[i];
			}
		}
		if(typeof savedGame.buildingIncome !== "undefined") {
			for (i = 0; i < savedGame.buildingIncome.length; i++) {
				building.income[i] = savedGame.buildingIncome[i];
			}
		}
		if(typeof savedGame.buildingCost !== "undefined") {
			for (i = 0; i < savedGame.buildingCost.length; i++) {
				building.cost[i] = savedGame.buildingCost[i];
			}
		}
	}
}


var interval = 1000;
let run = setInterval(request, interval);
function request() {
	clearInterval(run); // stop the setInterval()
	game.score += 1;
	game.totalScore += 1;
	document.getElementById("score").innerHTML = game.score;
	//document.getElementById("totalScore").innerHTML = game.totalScore;
	document.title = game.score + " friends";
	run = setInterval(request, interval); // start the setInterval()

	// dynamically change the run interval
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
	display.updateScore();
	display.updateShop();
	document.getElementById("run").innerHTML = run;
}; 

document.addEventListener("keydown", function(event) {
	if(event.metaKey && event.which == 83) {
		event.preventDefault();
		saveGame();
	}
}, false);

/*
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
*/

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
