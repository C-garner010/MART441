function getChoice1() {
    let myChoice = document.getElementById("choice1").value.toLowerCase().trim();
    let myQuestion = document.getElementById("story");
    let storyImage = document.getElementById("storyImage");

    console.log("Setting image source to:", storyImage.src); 


    if (myChoice === "beach") {
        document.getElementById("choice1").style.display = "none";
        document.getElementById("btnSubmit1").style.display = "none";

        document.getElementById("choice2").style.display = "block";
        document.getElementById("btnSubmit2").style.display = "block";

        myQuestion.innerHTML = "You arrive at a splendidly peaceful beach. Do you want to explore a mysterious <u>cave</u> or relax by the <u>shore</u>?";
        storyImage.src = "imgs/beach.jpg"; 
        storyImage.classList.remove("hidden"); 

        console.log("Setting image source to:", storyImage.src); 
    } 
    else if (myChoice === "mountains") {
        document.getElementById("choice1").style.display = "none";
        document.getElementById("btnSubmit1").style.display = "none";

        document.getElementById("choice2").style.display = "block";
        document.getElementById("btnSubmit2").style.display = "block";

        myQuestion.innerHTML = "You climb the mountain and find a peaceful valley. Do you set up <u>camp</u> or <u>explore</u> further?";
        storyImage.src = "imgs/mountains.jpg"; 
        storyImage.classList.remove("hidden");

        console.log("Setting image source to:", storyImage.src); 
    } 
    else {
        myQuestion.innerHTML = "Invalid choice. Please enter <u>beach</u> or <u>mountains</u>.";
        return;
    }

    document.getElementById("choice1").value = "";
}

function getChoice2() {
    let answer = document.getElementById("choice2").value.toLowerCase().trim();
    let myQuestion = document.getElementById("story");
    let storyImage = document.getElementById("storyImage");

    if (answer === "cave") {
        document.getElementById("choice2").style.display = "none";
        document.getElementById("btnSubmit2").style.display = "none";

        document.getElementById("choice3").style.display = "block";
        document.getElementById("btnSubmit3").style.display = "block";

        myQuestion.innerHTML = "You explore the cave and find glowing crystals. Do you <u>take</u> one or <u>leave it</u> alone?";
        storyImage.src = "imgs/cave.jpg"; 
        storyImage.classList.remove("hidden");
    } 
    else if (answer === "shore") {
        document.getElementById("choice2").style.display = "none";
        document.getElementById("btnSubmit2").style.display = "none";

        document.getElementById("choice3").style.display = "block";
        document.getElementById("btnSubmit3").style.display = "block";

        myQuestion.innerHTML = "You relax by the shore, feeling the ocean breeze. Suddenly, friendly dolphins appear. Do you <u>befriend</u> them or <u>ignore</u> them?";
        storyImage.src = "imgs/shore.jpg"; 
        storyImage.classList.remove("hidden");

    } else if (answer === "camp") {
        document.getElementById("choice2").style.display = "none";
        document.getElementById("btnSubmit2").style.display = "none";

        document.getElementById("choice3").style.display = "block";
        document.getElementById("btnSubmit3").style.display = "block";

        myQuestion.innerHTML = "You set up camp and start a fire. The stars shine brightly above you. Do you <u>sleep</u> or <u>continue</u> exploring?";
        storyImage.src = "imgs/camp.jpg"; 
        storyImage.classList.remove("hidden");

    }  else if (answer === "explore") {
        document.getElementById("choice2").style.display = "none";
        document.getElementById("btnSubmit2").style.display = "none";

        document.getElementById("choice3").style.display = "block";
        document.getElementById("btnSubmit3").style.display = "block";

        myQuestion.innerHTML = "You've come across an ancient temple with glowing runes. A secret passage opens before you. Do you <u>enter</u> or <u>leave</u>?";
        storyImage.src = "imgs/temple.jpg"; 
        storyImage.classList.remove("hidden");

    } else {
        myQuestion.innerHTML = "Invalid choice. Please choose from the given options.";
        return;
    }

    document.getElementById("choice2").value = "";
}

function getChoice3() {
    let answer = document.getElementById("choice3").value.toLowerCase().trim();
    let myQuestion = document.getElementById("story");
    let storyImage = document.getElementById("storyImage");

    const endings = {
        "take": { text: "You've taken a crystal and feel a surge of magical power.", image: "imgs/crystal.jpg" },
        "leave it": { text: "You left the crystals untouched, respecting their mystery.", image: "imgs/cave.jpg" },
        "befriend": { text: "You've befriended wonderful dolphins! Perhaps a lifelong relationship begins here.", image: "imgs/dolphins.jpg" },
        "ignore": { text: "You ignore the dolphins, but they splash you playfully before swimming away.", image: "imgs/ocean.jpg" },
        "sleep": { text: "You quickly fall into a peaceful sleep under the stars, dreaming of your journey.", image: "imgs/sleep.jpg" },
        "continue": { text: "You explore deeper until exhaustion overtakes you. Now you must rest.", image: "imgs/mountains2.jpg" },
        "enter": { text: "You delve into the temple, discovering passages that could take years to explore.", image: "imgs/ancienttemple.jpg" },
        "leave": { text: "The temple's magic felt overwhelming. You decide to return after resting.", image: "imgs/mountains3.jpg" }
    };

    if (endings.hasOwnProperty(answer)) {
        myQuestion.innerHTML = endings[answer].text;
        storyImage.src = endings[answer].image; 
        storyImage.classList.remove("hidden");

        setTimeout(() => {
            myQuestion.innerHTML += "<br><br>Your adventure has come to an end. Restarting in 3 seconds...";
        }, 2000);

        setTimeout(restart, 5000);
    } else {
        myQuestion.innerHTML = "Invalid choice. Please choose from the given options.";
        return;
    }

    document.getElementById("choice3").value = "";
}

function restart() {
    let storyText = document.getElementById("story");

    storyText.innerHTML = "You're a wizard who just finished braving the enchanted forest. <br> You get to rest now. <br> Would you prefer to rest on the beach or in the mountains?";

    document.getElementById("choice1").style.display = "block";
    document.getElementById("btnSubmit1").style.display = "block";
    document.getElementById("choice1").value = "";

    document.getElementById("choice2").style.display = "none";
    document.getElementById("btnSubmit2").style.display = "none";
    document.getElementById("choice2").value = "";

    document.getElementById("choice3").style.display = "none";
    document.getElementById("btnSubmit3").style.display = "none";
    document.getElementById("choice3").value = "";

    storyImage.src = "imgs/img1.jpg"; 
    storyImage.classList.remove("hidden");  
}