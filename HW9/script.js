(function($) {
    $.fn.displayCrew = function(data) {
        this.empty();

        console.log("Displaying crew members...");

        $.each(data.people, function(i, person) {
            let crewMember = $("<div>").addClass("crew-member").html(
                "<strong>" + person.name + "</strong><br>" +
                "Craft: " + person.craft
            );

            $("#crew-list").append(crewMember); 
        });

        return this;
    };
})(jQuery);

$("button").click(function() {
    $.getJSON("ajax.json", function(result) {
        console.log("Data received:", result);  
        $("#crew-list").displayCrew(result);
        
    }).fail(function(jqxhr, textStatus, error) {
        console.log("Request failed: " + textStatus + ", " + error);
    });
});
