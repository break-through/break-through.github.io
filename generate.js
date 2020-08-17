$(document).ready(function(){

    myData = JSON.parse(sessionStorage.getItem("myData"));
    score = parseInt(JSON.parse(sessionStorage.getItem("score"), 10));
    total_question_count = parseInt(JSON.parse(sessionStorage.getItem("totalQuestionCount")));
    sessionStorage.clear(); //to clear it afterwards till the new session
    console.log(score);
    console.log(total_question_count);

    generateBadge(myData, score, total_question_count); //for readability, even if global in scope

function generateBadge(myData, score, total_question_count){
    var badgeHTML = $('#createBadge').html();
    var badgeTemplate = Handlebars.compile(badgeHTML);
    var badgeData = badgeTemplate(myData);
    console.log(myData, score, total_question_count);
    //for the bg image
    $('.bg-image').addClass('score-bg-img');
    $('.content').css('background-color', 'transparent');
    console.log("HERE?");
    $.when($('#quiz-content').html(badgeData)).done(function(){
        //add events on click
        $("#tracker-section").hide();
        $('#user-score').text(score);
        $('#total-ques').text(total_question_count);
        console.log("HEREdfdfd25WTFdfdd?");
        $("#share-button").on('click', function(event) {
            runTemporaryWorkaround(myData);
        });
    });
}

/**
	 * The Facebook API has gotten very strict. Adding images
	 * can only be done via metadata hardcoded in the source file.
	 * This might be dynamically injectible via prerendering, which will
	 * communicate with any crawler only after statically bound. For now,
	 * we use Hashtags, and quotes, with creative usage of metadata, to
	 * get near what we want.
	 * 
	 * @param {badge} myData is a hashmap/enumlike object with badge data 
	 */
	function runTemporaryWorkaround(myData){
        console.log("We are about to use this url " + myData.character);
        FB.ui({
			method: 'share',
			href: "https://break-through.github.io/badges/"+myData.character+".html",
			hashtag: "#"+myData.character,
			quote: "That quiz told me I'mmmmm a " + myData.character + "!. It describes me as follows: " + myData.description,
		  }, function(response){});
	}

});