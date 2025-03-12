$(document).ready(function () {
    let images = $("#image-container img");
    let texts = $("#text-container p");
    let index = 0;
    let textIndex = 0;

    $(images[index]).fadeIn(0);
    $(texts[textIndex]).fadeIn(0);
    moveText($(texts[textIndex]));

    function rotateImages() {
        $(images[index]).fadeOut(1000, function() {
            index = (index + 1) % images.length;
            $(images[index]).fadeIn(1000);
        });
    }

    function rotateTexts() {
        $(texts[textIndex]).stop(true, true).fadeOut(1000, function() {
            textIndex = (textIndex + 1) % texts.length;
            $(texts[textIndex]).fadeIn(1000, function () {
                moveText($(texts[textIndex]));
            });
        });
    }
    
    function moveText(textElement) {
        const windowWidth = $(window).width();

        textElement.stop(true, true).css({ left: windowWidth + 'px' }).animate({
            left: '-100%'
        }, 10000, 'linear'); 
    }

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.5)`; 
    }

    function createMovingShape() {
        let shape = $('<div class="shape"></div>');
        $('body').append(shape);

        const shapeSize = 50;
        const width = $(window).width() - shapeSize;
        const height = $(window).height() - shapeSize;

        shape.css({
            top: 0,
            left: 0,
            backgroundColor: getRandomColor()
        });

        shape.animate({ left: width }, 2000) 
            .animate({ top: height }, 2000)
            .animate({ left: 0 }, 2000)
            .animate({ top: 0 }, 2000, function () { 
                shape.fadeOut(1000, function () {
                    shape.remove(); 
                });
            });
    }

    setInterval(rotateImages, 5000);
    setInterval(rotateTexts, 10000);
    setInterval(createMovingShape, 2000);
});