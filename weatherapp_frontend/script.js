let latitude = 0; // Create the variable for latitude
let longitude = 0; // Create the variable for longitude

window.onload = function() { // when website loads run this function (this is called an anonymous function)
    const date = new Date(); // use built in JS func to getcurrent date
    // parse date into a nice string
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    document.getElementById('date').innerHTML = dateString; // set the .date HTML text to our dateString
    if ("geolocation" in navigator) { // if browser supports location
		navigator.geolocation.getCurrentPosition(success); // call 'success' function
	} else { // if location does not exist
	  console.log("Geolocation is not available in your browser."); // print message to user
	}
}

function success(position) { // position contains all the geolocation info we retrieved
	latitude = position.coords.latitude; 
	longitude = position.coords.longitude;
}

//Write the code that sets const btn to our #getWeatherBtn ID
const btn = document.getElementById('getWeatherBtn');

// Add an event listener to btn
btn.addEventListener('click', () => {
    const xhr1 = new XMLHttpRequest();
    xhr1.open("GET", `http://localhost:3000/weather/${latitude}/${longitude}`);
    xhr1.send();

    xhr1.onload = function() {
      //What’s wrong w/ this (Think about the format responseText is in and what format we need it in (stringify/parse)
      const body = JSON.parse(xhr1.responseText);

      var temperature = body.temperature; // create var to store temperature from response
      var weatherStatus = body.weatherStatus; // create var to store temperature from response

	    document.getElementById("temperature").innerHTML = `Temperature: ${temperature}°F`;
      document.getElementById("weatherStatus").innerHTML = `Weather Status: ${weatherStatus}`;
    }

    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", `http://localhost:3000/5day/${latitude}/${longitude}`);
    xhr2.send();

    xhr2.onload = function() {
      const body = JSON.parse(xhr2.responseText); // parse ressponse with JSON and store in body
      var forecast = body; //Remember: this is a list
      var forecastElements = document.getElementsByClassName("forecast");
	    for (var i = 0; i < forecast.length; i++) {
		    forecastElements[i].innerHTML = `${forecast[i].dayName}: ${forecast[i].temp}°F`;
      }
    }
});