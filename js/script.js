const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event){

        event.preventDefault();

        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;

        window.location.href = "dashboard.html";

    });

}

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event){

        event.preventDefault();

        const password =
            document.getElementById("regPassword").value;

        const confirm =
            document.getElementById("confirmPassword").value;

        if(password !== confirm){

            alert("Passwords do not match.");

            return;

        }

        alert("Registration Successful!");

    });

}