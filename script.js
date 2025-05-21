const zip = document.getElementById("zip");
let ResultContainer = document.getElementById("SearchResult");
async function getArea() {
    ResultContainer.classList.remove("errorBox")
    const zipInput = zip.value;
    const url = `https://api.zippopotam.us/in/${zipInput}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Invalid ZIP Code or not found!");
        }
        const data = await response.json();
        const pincode = data["post code"];
        ResultContainer.innerHTML = '';
        const place = data.places;

        place.forEach(place => {
            const placeResult = place["place name"];
            const stateResult = place["state"];
            const ResultBox = document.createElement("div");
            ResultBox.className = "resultBox";
            ResultBox.innerHTML = `<p>${placeResult}</p>
            <p>${stateResult},${pincode}</p>`;
            ResultContainer.appendChild(ResultBox);
        });

    } catch (error) {
    ResultContainer.classList.add("errorBox");
        ResultContainer.innerHTML = `Error: ${error.message}`;
    }
}