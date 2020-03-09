let homeMap = L.map('map').setView([44.4773, -73.215], 17);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(homeMap);

fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants`)
.then((response) => {
    return response.json()
})
.then((restInfo) => {
    restInfo.forEach((rest) => {
		placeMark(rest.address, rest.name, rest.id)
	})
})

function placeMark(address, restName, restId) {
	
	fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
		.then((data) => {
			return data.json()
		})
		.then((locInfo) => {
			let info = locInfo[0]
			let lat = info.lat
			let lon = info.lon
			let thisMarker = L.marker([lat, lon]).addTo(homeMap).bindPopup(restName)
			thisMarker.on('mouseover', () => {
				thisMarker.openPopup() 
			})
			thisMarker.on('click', () => {
				window.location = `/restPage.html#${restId}`
			})
		})

}


