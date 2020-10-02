function makeRequest(url, method, formdata, callback) {
    fetch(url, {
        method: method,
        body: formdata
    }).then((data) => {
        return data.json()
    }).then((result) => {
        callback(result)
    }).catch((err) => {
        console.log("Error: ", err)
    })
}
function get() {
    makeRequest("https://api.dryg.net/dagar/v2.1/2020", "GET", null, (result) => {
		let showDays = document.getElementById("days")
		for (let i = 0; i < result.dagar.length; i++) {
			let days = (result.dagar[i].veckodag);
			let date = (result.dagar[i].datum);
			let row = document.createElement("div");
			let dayNameTag = document.createElement("p");
			let datemTag = document.createElement("p");
			dayNameTag.innerText = days;
			datemTag.innerText = date;
			row.appendChild(dayNameTag);
			row.appendChild(datemTag);
			showDays.appendChild(row);
            row.onclick = function () {
             alert("Det kommer")
            }
		}
        console.log(result.dagar);
	})
}
homePage = () => {
    location.href = "../index.html"
}
get();