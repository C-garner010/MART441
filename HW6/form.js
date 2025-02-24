document.getElementById("playerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const playerData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value,
        attempts: 0
    };

    localStorage.setItem("playerData", JSON.stringify(playerData));

    window.location.href = "game.html";

});








