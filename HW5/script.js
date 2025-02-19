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


function shuffle(array) {
    return array.sort(() => Math.random() - .5 );
}


const blankImage ="imgs/ocean.jpg"; 
const displayArray = Array(12).fill(blankImage);


const gridContainer = document.getElementById("imageGrid");


for (let i = 0; i < displayArray.length; i++) {
    const img = document.createElement("img");
    img.src = displayArray[i];
    img.dataset.index = i;
    img.onclick = function () {
        this.src = actualImages[i];
    };
    gridContainer.appendChild(img);
}