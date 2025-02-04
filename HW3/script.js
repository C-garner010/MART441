function storyFunction(choice) {
    var answer1 = document.getElementById("choice1").innerHTML;
    var answer2 = document.getElementById("choice2").innerHTML;
    if (choice == 1 && answer1 == "Move forward") {
        document.getElementById("story").innerHTML = "You and your magic decide to continue on. Do you follow the unusual path, or create your own?";
        document.getElementById("choice1").innerHTML = "Follow unusual path";
        document.getElementById("choice2").innerHTML = "Create your own";
    } else if (choice == 2 && answer2 == "Stop") {
        document.getElementById("story").innerHTML = "You pace." + " The fog grows and night descends.";
        document.getElementById("choice1").innerHTML = "Push against the fear and continue deeper into the forrest";
        document.getElementById("choice2").innerHTML = "Wait a bit longer to see if the fog clears";
    } else if (choice == 1 && answer1 == "Follow unusual path") {
        document.getElementById("story").innerHTML = "Darkness falls" + " and so does your sense of safety.";
        document.getElementById("choice1").innerHTML = "Stop for the night";
        document.getElementById("choice2").innerHTML = "Blindly follow the path";
    } else if (choice == 2 && answer2 == "Create your own") {
        document.getElementById("story").innerHTML = "You've stumbled across a grove." + " At it's center is a pool of water reflecting the darkening sky.";
        document.getElementById("choice1").innerHTML = "Sit silently and reflect";
        document.getElementById("choice2").innerHTML = "Fall asleep";
    } else if (choice == 1 && answer1 == "Push against the fear and continue deeper into the forrest") {
        document.getElementById("story").innerHTML = "Your magic swells with pride." + " A light appears in the distance, echoing your own.";
        document.getElementById("choice1").innerHTML = "Immediately follow the light";
        document.getElementById("choice2").innerHTML = "Stand in shock and awe";
    } else if (choice == 2 && answer2 == "Wait a bit longer to see if the fog clears") {
        document.getElementById("story").innerHTML = "It's almost night time," + "what will you do?";
        document.getElementById("choice1").innerHTML = "Continue deeper into the forrest anyways";
        document.getElementById("choice2").innerHTML = "Decide it's no longer worth it";
    } else if (choice == 1 && answer1 == "Stop for the night") {
        document.getElementById("story").innerHTML = "It's just you and your intuition now." + " " + "What do you do?";
        document.getElementById("choice1").innerHTML = "Continue deeper into the forrest";
        document.getElementById("choice2").innerHTML = "Pause in propensity";
    } else if (choice == 2 && answer2 == "Blindly follow the path") {
        document.getElementById("story").innerHTML = "You're capable of handling more than you think." + " " + "What next?";
        document.getElementById("choice1").innerHTML = "Continue deeper into the forrest";
        document.getElementById("choice2").innerHTML = "Pause in propensity";
    } else if (choice == 1 && answer1 == "Sit silently and reflect") {
        document.getElementById("story").innerHTML = "You've been here for longer than you'd normally allow. " + "What next?";
        document.getElementById("choice1").innerHTML = "Continue deeper into the forrest";
        document.getElementById("choice2").innerHTML = "Pause in propensity";
    } else if (choice == 2 && answer2 == "Fall asleep") {
        document.getElementById("story").innerHTML = "You wake with a start, not knowing how long you've been asleep. " + "Now you...";
        document.getElementById("choice1").innerHTML = "Continue deeper into the forrest";
        document.getElementById("choice2").innerHTML = "Pause in propensity";
    }  else if (choice == 1 && answer1 == "Immediately follow the light") {
        document.getElementById("story").innerHTML = "You must be moving quicker than the light because as you continue forward, it grows bigger and brighter";
        document.getElementById("choice1").innerHTML = "Continue deeper into the forrest";
        document.getElementById("choice2").innerHTML = "Pause in propensity";
    } else if (choice == 2 && answer2 == "Stand in shock and awe") {
        document.getElementById("story").innerHTML = "The light is quickly fading," + " do you...";
        document.getElementById("choice1").innerHTML = "Continue deeper into the forrest";
        document.getElementById("choice2").innerHTML = "Pause in propensity";
    } else if (choice == 1 && answer1 == "Continue deeper into the forrest anyways") {
        document.getElementById("story").innerHTML = "You've surpassed your fears, now the real journey begins.";
        document.getElementById("choice1").innerHTML = "Continue deeper into the forrest";
        document.getElementById("choice2").innerHTML = "Pause in propensity";
    } else if (choice == 2 && answer2 == "Decide it's no longer worth it") {
        document.getElementById("story").innerHTML = "Are you truly unwilling to follow your fate?";
        document.getElementById("choice1").innerHTML = "Continue deeper into the forrest";
        document.getElementById("choice2").innerHTML = "Pause in propensity";
    } else if (choice == 1 && answer1 == "Continue deeper into the forrest") {
        document.getElementById("story").innerHTML = "You're a wizard braving the enchanted forrest. With heavy fog, what do you dare?";
        document.getElementById("choice1").innerHTML = "Move forward";
        document.getElementById("choice2").innerHTML = "Stop";
    } else if (choice == 2 && answer2 == "Pause in propensity") {
        document.getElementById("story").innerHTML = "Trust your magic, for it is yours and yours alone.";
    } 
}