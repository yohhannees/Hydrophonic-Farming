

// Replace 'YOUR_UNSPLASH_API_KEY' with your actual Unsplash API key
const unsplashApiKey = "IDnu3i8yDUSiH70Fj7qtIxAkp7yEOL4XeO7IjWfRBuI";

// Predefined query for fetching an image
const plantName = "potato"; // You can change this to any other query you'd like

function fetchImage() {
    const url = `https://api.unsplash.com/photos/random?query=${plantName}&client_id=${unsplashApiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.urls.regular;
            displayImage(imageUrl);
        })
        .catch(error => {
            console.error("Error fetching image from Unsplash:", error);
        });
}

function displayImage(imageUrl) {
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="Unsplash" style="width: 400px; height: auto;" />`;
}
fetchImage();
