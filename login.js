const signUpBtn = document.getElementById("signMeUp");

signUpBtn.addEventListener("click", flip);

function flip (event) {
    event.preventDefault();

    const divWrapper = this.parentElement.parentElement.parentElement.parentElement;
    divWrapper.classList.toggle("flip");
}