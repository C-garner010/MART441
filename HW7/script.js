class socialJusticeImage {
    constructor(title, imageUrl, description, author, year) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.author = author;
        this.year = year;
    }
}

const images = [
    new socialJusticeImage("Wildfires in Greece", "https://i.guim.co.uk/img/media/7f0619c71a32f34e11dd6dd1432a406008a6637e/0_0_4961_3307/master/4961.jpg?width=1900&dpr=2&s=none&crop=none", "After wildfires raged across the Mediterranean, this 81-year-old woman is bathed in the orange light of flames.", "Konstantinos Tsakalidis, World Press Photo", 2021),
    new socialJusticeImage("A Handmaid's Tale of Protest", "https://static01.nyt.com/images/2017/06/30/us/30handmaids1_xp/30handmaids1_xp-videoSixteenByNineJumbo1600.jpg", "Women dressed as characters from the Handmaid's Tale in National Protest","NYT", 2017),
    new socialJusticeImage("Refugee Crisis is a Crisis of Humanity, Not Migration", "https://impakter.com/wp-content/uploads/2021/10/50937978773_42a4edb2b4_b.jpg", "Many refugee's getting off a boat in Turkey.","Zalmaï for Human Rights Watch", 2015 ),
    new socialJusticeImage("Icelandic Women Strike for Gender Pay Equality", "https://i.abcnewsfe.com/a/8fbc0306-10a1-40e1-ae01-18d858b3cf17/iceland-str_hpEmbed_20231025-020007_3x2.jpg", "At least 25,000 women and non-binary people were at a rally in Reykjavík", "Arni Torfason", 2023),
    new socialJusticeImage("Housing is a Human Right", "https://boliveira.weebly.com/uploads/8/3/3/2/8332701/causes-of-homelessness_2.jpg", "An unhoused man asleep next to a sign saying he was once like you", "unknown", 2020),
];

function showRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const imageObj = images[randomIndex];

    document.getElementById("title").innerText = imageObj.title;
    document.getElementById("image").src = imageObj.imageUrl;
    document.getElementById("image").alt = imageObj.title;
    document.getElementById("description").innerText = imageObj.description;
    document.getElementById("author").innerText = imageObj.author;
    document.getElementById("year").innerText = imageObj.year;
}