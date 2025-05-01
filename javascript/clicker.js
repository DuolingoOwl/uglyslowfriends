	document.getElementById('fileInput').addEventListener('change', function(event) {
    var files = event.target.files;
    var preview = document.getElementById('preview');
let uploadedSkin = "none"; // current skin uploaded
    
    // Clear any existing content
    preview.innerHTML = '';

    // Loop through all selected files
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // Only process image files
      if (!file.type.match('image.*')) {
        continue;
      }

      var imgContainer = document.createElement('div');
      imgContainer.style.marginBottom = '20px'; // Spacing between each image container
	    
	uploadedSkin = event.target.result;
	localStorage.setItem("uploadedSkin", uploadedSkin);

      var img = document.createElement('img');
	if (img.src == null) {
		img.src = "images/uglyslowfriend.png";
	}
      else {
	      img.src = URL.createObjectURL(file);
      }
      img.style.height = '256px';
      img.style.display = 'block'; // Ensure the image is displayed in a block to put it on a new line
      img.style.marginBottom = '10px';

      // Append the image and file info to the container
      imgContainer.appendChild(img);

      // Append the container to the preview div
      preview.appendChild(imgContainer);
    }
  });

var score = 0;

var cursorCost = 15;
var cursors = 0;
var interval = 1000;
let run = setInterval(request, interval); // start setInterval as "run"

function buyCursor(argument) {
	if (score >= cursorCost) {
		score -= cursorCost;
		cursors += 1;
		cursorCost = Math.round(cursorCost * 1.15);
		interval = 1000/(cursors);

		document.getElementById("score").innerHTML = score;
		document.getElementById("cursorCost").innerHTML = cursorCost;
		document.getElementById("cursors").innerHTML = cursors;
		
		updateScorePerSecond();
	}
}

function addToScore(amount) {
	score += amount;
	document.getElementById("score").innerHTML = score;
}

function updateScorePerSecond() {
	scorePerSecond = cursors;
	document.getElementById("scorePerSecond").innerHTML = scorePerSecond;
}

function request() {
	console.log(interval);
	clearInterval(run); // stop the setInterval()
		score += 1;
	document.getElementById("score").innerHTML = score;
	document.title = score + " friends";
	run = setInterval(request, interval); // start the setInterval()

	// dynamically change the run interval

}

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
