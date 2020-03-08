
let id = window.location.hash.slice(1)

let restName = document.getElementById('name')
let restAdd = document.getElementById('address')
let restPhone = document.getElementById('phone')
let restWeb = document.getElementById('website')
let restHours = document.getElementById('hours')
let restNotes = document.getElementById('notes')



fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${id}`)
.then((response) => {
    return response.json()
})
.then((restInfo) => {
    restName.textContent = restInfo.name
    restAdd.textContent = restInfo.address
    restPhone.textContent = restInfo.phone
    restWeb.textContent = restInfo.website
    restHours.textContent = restInfo.hours
    restNotes.textContent = restInfo.notes
    placeMark(restInfo.address, restInfo.name)
    
})

function placeMark(address, restName) {
	
	fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
		.then((data) => {
			return data.json()
		})
		.then((locInfo) => {
			let info = locInfo[0]
			let lat = info.lat
            let lon = info.lon
            let restMap = L.map('rest-map').setView([lat, lon], 16);

            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
            }).addTo(restMap);

			let thisMarker = L.marker([lat, lon]).addTo(restMap).bindPopup(restName)
			thisMarker.on('mouseover', () => {
				thisMarker.openPopup() 
			})
		})

}




