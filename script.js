let latitude = 0; // Create the variable for latitude
let longitude = 0; // Create the variable for longitude

window.onload = function() { // when website loads run this function (this is called an anonymous function)
    const date = new Date(); // use built in JS func to getcurrent date
    // parse date into a nice string
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    document.getElementById('date').innerHTML = dateString; // set the .date HTML text to our dateString
    if ("geolocation" in navigator) { // if browser supports location
		navigator.geolocation.getCurrentPosition(success) // call 'success' function
	} else { // if location does not exist
	  console.log("Geolocation is not available in your browser."); // print message to user
	}
}

function success(position) { // position contains all the geolocation info we retrieved
	latitude = position.coords.latitude; // 
	longitude = position.coords.longitude;
}