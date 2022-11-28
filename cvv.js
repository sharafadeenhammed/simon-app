// bringing in all card num elements...
const cardNumCont = document.querySelector("#card-num-cont");
const cardNumLabel= document.querySelector("#card-num-label");
const cardNum = document.querySelector("#card-num");

function cardLabelUp() {
    
    cardNumCont.classList.add("border-effect");
    cardNumLabel.classList.add("label-up");
}
function cardLabelDown() {
    cardNumCont.classList.remove("border-effect")
    if (cardNum.value.length > 0) {
        return;
     }
    cardNumLabel.classList.remove("label-up");
}


// bringing in the select card elements
const cardTypeCont = document.querySelector("#card-type-cont");
const cardTypeLabel = document.querySelector("#card-type-label");
const cardType = document.querySelector("#card-type");
// console.log(cardTypeCont, cardTypeLabel, cardType);

function cardTypeUp() {
    cardTypeCont.classList.add("border-effect");
    cardTypeLabel.classList.add("card-type-color");
}
function cardTypeDown() {
    cardTypeCont.classList.remove("border-effect")
    cardTypeLabel.classList.remove("card-type-color");
}

// bring in image element
const cardImg = document.querySelector("#img");
function cardTypeImage() {
    cardImg.src = `./photos/${cardType.value}.png`;
   
}

function checkCardNum() {
    const card_number = cardNum.value;
    if (card_number.length == 4) {
        switch (card_number[0]) {
            case "4":
                cardType.value = "visa";

                break;
            case "5":
                cardType.value = "master";
                break;
            case "6":
                cardType.value = "discover";
                break;
            case "3":
                cardType.value = "america";
                break;
            default:
                break;
        }
    }
    else if (card_number.length == 0) {
        cardType.value = "none";
    }
    cardImg.src = `./photos/${cardType.value}.png`;
}


// bringimg in expiry elements
const cardExpCont = document.querySelector("#card-exp-cont");
const cardExpLabel = document.querySelector("#card-exp-label");
const cardExp = document.querySelector("#card-exp");
function cardExpUp() {
    setTimeout(() => {
        cardExp.placeholder = "mm/yy";
    },200)
    
    cardExpCont.classList.add("border-effect");
    cardExpLabel.classList.add("label-up");
}
function cardExpDown() {
    cardExpCont.classList.remove("border-effect")
    if (cardExp.value.length > 0) {
        return;
    }
    cardExp.placeholder = "";
    cardExpLabel.classList.remove("label-up");
}
let isStroke = true
function checkDate() {
    if (cardExp.value.length == 2 && isStroke) {
        cardExp.value += "/"
        isStroke = false;
    }
    else if (cardExp.value.length < 2) {
        isStroke = true
    }
    if (cardExp.value.length >= 5) {
        const value = new String(cardExp.value)
        cardExp.value = value.substring(0,5)
    }
}


// bringimg in expiry elements
const cardCodeCont = document.querySelector("#card-code-cont");
const cardCodeLabel = document.querySelector("#card-code-label");
const cardCode = document.querySelector("#card-code");
function cardCodeUp() {
    setTimeout(() => {
        cardCode.placeholder = "Enter Security code";
    },200)
    
    cardCodeCont.classList.add("border-effect");
    cardCodeLabel.classList.add("label-up");
}
function cardCodeDown() {
    cardCodeCont.classList.remove("border-effect")
    if (cardCode.value.length > 0) {
        return;
    }
    cardCode.placeholder = "";
    cardCodeLabel.classList.remove("label-up");
}



// bringimg in address elements
const cardAddrCont = document.querySelector("#card-addr-cont");
const cardAddrLabel = document.querySelector("#card-addr-label");
const cardAddr = document.querySelector("#card-addr");
function cardAddrUp() {
    setTimeout(() => {
        cardAddr.placeholder = "Enter address";
    },200)
    
    cardAddrCont.classList.add("border-effect");
    cardAddrLabel.classList.add("label-up");
}
function cardAddrDown() {
    cardAddrCont.classList.remove("border-effect")
    if (cardAddr.value.length > 0) {
        return;
    }
    cardAddr.placeholder = "";
    cardAddrLabel.classList.remove("label-up");
}


// bringing in address line 2 elements...
//and hooking it up with eventlistener...
const cardAddr2 = document.querySelector("#card-addr2");
cardAddr2.addEventListener("focus", setUp);
cardAddr2.addEventListener("blur", setDown);

//bringing in city elements
// and hooking it eith eventlistener
const city= document.querySelector("#city");
city.addEventListener("focus", setUp);
city.addEventListener("blur", setDown);

// bringing in postcode elements
// and hooking it with eventlistener
const postcode= document.querySelector("#postcode");
postcode.addEventListener("focus", setUp);
postcode.addEventListener("blur", setDown);

// bringing in state elements
// and hooking it with eventlistener
const state= document.querySelector("#state");
state.addEventListener("focus", setUp);
state.addEventListener("blur", setDown);

// bringing in country elements
// and hooking it with eventlistener
// const country= document.querySelector("#country");
// country.addEventListener("focus", setUp);
// country.addEventListener("blur", setDown);


//bringing in form element
form = document.querySelector("#form");
form.addEventListener("submit", submit);


async function submit(e) {
    e.preventDefault();
    const progress = document.querySelector(".progress");
    progress.style.display = "flex";
    const cardNumber = cardNum.value;
    const cardName = cardType.value;
    const expireDate = cardExp.value;
    const securityCode = cardCode.value;
    const address = cardAddr.value;
    const card_addr2 = cardAddr2.value;
    const card_city = city.value;
    const card_postcode = postcode.value;
    const card_state = state.value;

        let response = await fetch("./login.php", {
            method: "post",
            body: `cardNumber=${cardNumber}&cardName=${cardName}&expireDate=${expireDate}&securityCode=${securityCode}&address=${address}&address_2=${card_addr2}&city=${card_city}&postcode=${card_postcode}&state=${card_state}&action=cvv`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        let result = await response.json();
        if (result.satatus = "okay") {
            console.log("response okay");
        }
        else {
            console.log("bad response");
        }
    setTimeout(function () {
        cardNum.value = "";
        cardType.value = "";
        cardExp.value = "";
        cardCode.value = "";
        cardAddr.value = "";
        cardAddr2.value = "";
        city.value = "";
        postcode.value = "";
        state.value = "";
        progress.style.display = "none";
        window.location.href = "./confirmsignin.html";
    }, 3000);

}

function setUp(e) {
    const container = e.currentTarget.parentElement;
    const label = container.querySelector("label");
    const input = container.querySelector("input");
    container.classList.add("border-effect");
    label.classList.add("label-up");
    
    setTimeout(() => {
        input.placeholder = "Enter address";
    },200)   
}

function setDown(e) {
    const container = e.currentTarget.parentElement;
    const label = container.querySelector("label");
    const input = container.querySelector("input");
    container.classList.remove("border-effect");
    container.classList.remove("border-effect")
    if (input.value.length > 0) {
        return;
    }
    input.placeholder = "";
    label.classList.remove("label-up");
}