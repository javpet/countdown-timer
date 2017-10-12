let countDown; // We need a variable to store the countDown timer
const endTime = document.querySelector(".display__end-time");
const timerDisplay = document.querySelector(".display__time-left");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
	// We can't just use setinterval for this since it's not running when the user is leaving to another tab for instance

	// We need to clear any existing timers at start
	clearInterval(countDown);
	const now = Date.now();
	const then = now + seconds * 1000; // now is in milliseconds so we have to multiply the seconds to match format
	displayTimeLeft(seconds);
	displayEndTime(then);

	countDown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);

		if (secondsLeft < 0) {
			clearInterval(countDown);
			return;
		}

		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`; //We want to put a 0 in front fro styling
	document.title = display;
	timerDisplay.textContent = display; // We can update the title of the document with actually the time of the display
	console.log(seconds);
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hours = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Be back at ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time); //this will give us the seconds related to the button
	timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));

document.customForm.minutes.addEventListener("submit", function(e) {
	e.preventDefault();
	const mins = this.minutes.value; //the form element where we give the input
	timer(mins * 60);
	this.reset();
});
