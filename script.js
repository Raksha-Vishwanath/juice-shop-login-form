document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let error = document.getElementById("error");

    if(email === "" || password === "") {
        error.innerText = "Fields cannot be empty";
        return;
    }

    if(!email.includes("@")) {
        error.innerText = "Invalid email format";
        return;
    }

    if(password.length < 8) {
        error.innerText = "Password must be at least 8 characters";
        return;
    }

    // Send data to server
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    });
});