const API_URL = "http://localhost:3000";


// ---------------- LOGIN ----------------

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;

        // Login API will be added later

        window.location.href = "dashboard.html";

    });

}


// ---------------- REGISTER ----------------

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const full_name = document.getElementById("name").value;

        const roll_number = document.getElementById("roll").value;

        const email = document.getElementById("regEmail").value;

        const password = document.getElementById("regPassword").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        try {

            const response = await fetch(`${API_URL}/register`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    full_name,

                    roll_number,

                    email,

                    password

                })

            });

            const data = await response.json();

            alert(data.message);

            if (response.ok) {

                registerForm.reset();

                window.location.href = "index.html";

            }

        }

        catch (error) {

            console.error(error);

            alert("Unable to connect to the server.");

        }

    });

}