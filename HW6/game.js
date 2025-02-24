document.addEventListener("DOMContentLoaded", () => {
    console.log("Game script loaded!");

    const playerData = JSON.parse(localStorage.getItem("playerData"));

    if (!playerData) {
        window.location.href = "index.html";
    } else {
        document.getElementById("playerInfo").textContent =
        `Player: ${playerData.firstName} ${playerData.lastName}, Age: ${playerData.age}`;
    }

    let attempts = 0;
    let matchesFound = 0;
    let firstSelection = null; 
    let secondSelection = null; 
    let canClick = true;

    const uniqueImages = [

        "imgs/temple.jpg", "imgs/beach.jpg",
        //"imgs/camp.jpg", "imgs/cave.jpg",
        //"imgs/crystal.jpg", "imgs/img1.jpg",
        "imgs/mountains.jpg", "imgs/mountains2.jpg",
        //"imgs/mountains3.jpg", "imgs/ancienttemple.jpg",
        "imgs/shore.jpg", "imgs/sleep.jpg",

    ];


    const actualImages = [...uniqueImages, ...uniqueImages];
    shuffle(actualImages);

    const blankImage ="imgs/ocean.jpg"; 
    //const displayArray = Array(12).fill(blankImage);

    const gridContainer = document.getElementById("imageGrid");

   if (!gridContainer) {
        console.error("Grid container not found! Check if 'game.html' has <div id='imageGrid'>");
        return;
    }
    console.log("Started. Container found."); 



    //const images = [];
    for (let i = 0; i < actualImages.length; i++) {
        const img = document.createElement("img");
        img.src = blankImage;
        img.dataset.index = i;
        img.dataset.image = actualImages[i];
        gridContainer.appendChild(img);
        console.log(`Created img ${i}`);

        img.onclick = function () {
            console.log(`Image clicked: Index ${i}, Current Source: ${this.src}`);

            if (!canClick || this.getAttribute("src") !== blankImage) {
                console.log("Blocked click: canClick =", canClick, ", Current src =", this.src);
                return;
            }

            console.log("Flipping image to:", actualImages[i]);

            this.setAttribute("src", actualImages[i] + "?v=" + new Date().getTime());

            if (firstSelection === null) {
                firstSelection = this;
                //this.src = actualImages[i];
                console.log("First Selection:", firstSelection.dataset.index);

            } else if (secondSelection === null) {
                secondSelection = this;
                console.log("Second Selection:", secondSelection.dataset.index);
                canClick = false;
                //this.src = actualImages[i];
                attempts++;

                document.getElementById("attemptCount").textContent = attempts;
                playerData.attempts = attempts;
                localStorage.setItem("playerData", JSON.stringify(playerData));

                if (firstSelection.dataset.image === secondSelection.dataset.image) {
                    console.log("Match found!");
                    matchesFound++;

                    firstSelection.onclick = null;
                    secondSelection.onclick = null; 
                    
                    firstSelection = null;
                    secondSelection = null;
                    canClick = true;

                    if (matchesFound === uniqueImages.length) {
                        console.log("Game Complete! Redirecting to gameover...");
                        setTimeout(() => {
                            localStorage.setItem("playerData", JSON.stringify(playerData));
                            window.location.href = "gameover.html";
                        }, 1000);
                    }
                } else {
                    console.log("No match, flipping back...");

                    canClick = false;
                    setTimeout(() => {
                        firstSelection.src = blankImage;
                        secondSelection.src = blankImage;

                        firstSelection = null;
                        secondSelection = null;
                        canClick = true;
                    }, 1000);
                }
            }
        };
    }
    console.log("All images added:", document.querySelectorAll("img"));
});

function shuffle(array) {
    return array.sort(() => Math.random() - .5 );
}
