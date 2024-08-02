const form = document.querySelector("form");
const btn = document.getElementById("rooms");

let token = {}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const formJSON = {}

    for(const [key, value] of formData.entries()) {
        formJSON[key] = value;
    }

    fetch("https://olqdivqcuh.execute-api.eu-west-3.amazonaws.com/dev/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formJSON)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        token = data.token;
    })
    .catch(error => {
        console.error("Error:", error);
    });
})

btn.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("clicked")

    fetch("https://olqdivqcuh.execute-api.eu-west-3.amazonaws.com/dev/rooms", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization" : `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
})