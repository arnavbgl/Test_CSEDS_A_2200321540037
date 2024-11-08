function validateForm() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    if (username === "" || password === "") {
        errorMessage.textContent = "Both fields are required!";
        return false;
    }


    localStorage.setItem("username", username);
    window.location.href = "dash.html"; 
    return false; 
}
