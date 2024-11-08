document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    const welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.textContent = `Welcome, ${username}!`;


    let githubUsers = [];

    async function fetchdata() {
        try {
            let response = await fetch("https://api.github.com/users?per_page=10");
            let data = await response.json();


            githubUsers = data;


            displayUsers(githubUsers);
        } catch (error) {
            console.log(error);
        }
    }


    function displayUsers(users) {
        const topDiv = document.getElementById('top');
        topDiv.innerHTML = ''; 

        users.forEach((user) => {
            let h1 = document.createElement("h1");
            h1.textContent = user.login;
            let a = document.createElement("a");
            a.textContent = user.html_url;
            a.setAttribute("href", user.html_url);
            a.setAttribute("target", "_blank"); 
            topDiv.appendChild(h1);
            topDiv.appendChild(a);
        });
    }

//sorting the users
    function sortUsers() {
        const sortOption = document.getElementById("sortOptions").value;

        if (sortOption === "asc") {
            // Sort users alphabetically in ascending order (A-Z)
            githubUsers.sort((a, b) => a.login.localeCompare(b.login));
        } else if (sortOption === "desc") {
            // Sort users alphabetically in descending order (Z-A)
            githubUsers.sort((a, b) => b.login.localeCompare(a.login));
        }

        // Display the sorted list
        displayUsers(githubUsers);
    }

    // Dark mode toggle
    let modeButton = document.getElementById("mode");
    modeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        modeButton.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
    });

    // Logout function
    function logout() {
        localStorage.removeItem("username");
        window.location.href = "index.html";
    }

    // Expose functions to global scope
    window.fetchdata = fetchdata;
    window.sortUsers = sortUsers;
    window.logout = logout;
});
