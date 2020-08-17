$(document).ready(function(){

    myData = JSON.parse(sessionStorage.getItem("myData"));
    score = parseInt(JSON.parse(sessionStorage.getItem("score"), 10));
    total_question_count = parseInt(JSON.parse(sessionStorage.getItem("totalQuestionCount")));

    automaticallyRerouteNew(score);

    sessionStorage.clear(); //to clear it afterwards till the new session

    generateBadge(myData, score, total_question_count); //for readability, even if global in scope

    /**
     * The purpose of this is to reroute any new user who clicks on our link but has no score yet to go back
     * to the main page so that a quiz can be taken. This is a safety incase someone goes to this page
     * without any result yet.
     */
    function automaticallyRerouteNew(score){
        if(isNaN(score)){
            document.location = "../index.html";
        }
    }

    /**
     * Using the data passed in from the quiz, we generate a page
     * which presents the HTML in the desired way.
     * @param {badge object} myData contains information passed in from other source 
     * @param {int} score the score passed in from other quiz source
     * @param {int} total_question_count passed in from quiz source
     */
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