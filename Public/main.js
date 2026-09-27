const signinForm = document.querySelector(".form.signin");
const signupForm = document.querySelector(".form.signup");

const cardBg1 = document.querySelector(".card-bg-1");
const cardBg2 = document.querySelector(".card-bg-2");

const signinFormElement = document.getElementById("signinForm");
const signupFormElement = document.getElementById("signupForm");

const signinMessage = document.getElementById("signinMessage");
const signupMessage = document.getElementById("signupMessage");


// ===============================
// TOGGLE SIGN IN / SIGN UP
// ===============================

function toggleView() {

    const signinActive = signinForm.classList.contains("active");

    signinForm.classList.toggle("active", !signinActive);
    signupForm.classList.toggle("active", signinActive);

    cardBg1.classList.toggle("signin", signinActive);
    cardBg2.classList.toggle("signin", signinActive);

    cardBg1.classList.toggle("signup", !signinActive);
    cardBg2.classList.toggle("signup", !signinActive);

    signinMessage.textContent = "";
    signupMessage.textContent = "";
}


// ===============================
// REGISTER
// ===============================

signupFormElement.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    signupMessage.textContent = "Creating account...";

    try {

        const response = await fetch("/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        if (!response.ok) {
            signupMessage.textContent = data.message || "Registration failed.";
            return;
        }

        signupMessage.textContent = "Account created successfully!";

        signupFormElement.reset();

        setTimeout(() => {
            toggleView();
        }, 1000);

    } catch (error) {

        console.error(error);

        signupMessage.textContent =
            "Unable to connect to the server.";

    }

});


// ===============================
// LOGIN
// ===============================

signinFormElement.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value;

    signinMessage.textContent = "Signing in...";

    try {

        const response = await fetch("/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (!response.ok) {
            signinMessage.textContent = data.message || "Login failed.";
            return;
        }

        localStorage.setItem("token", data.token);

        signinMessage.textContent = "Login successful!";

        console.log("Logged in user:", data.user);

        // Later we can redirect to your dashboard here.
        // window.location.href = "/dashboard.html";

    } catch (error) {

        console.error(error);

        signinMessage.textContent =
            "Unable to connect to the server.";

    }

});
