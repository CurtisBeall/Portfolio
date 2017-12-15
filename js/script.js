/////////////////////////////////////////
//On Load Tasks
/////////////////////////////////////////
window.onload = function () {
    hideHeader();
    $("main").off("click");
}

/////////////////////////////////////////
//On Orientation Change
/////////////////////////////////////////
$(window).on("orientationchange", function (evt) {
    menuClose();
});

/////////////////////////////////////////
//Hide Header Background When At Top
/////////////////////////////////////////
//Check On Scroll
$(window).scroll(hideHeader);

//Hide Header Background When At Top
function hideHeader() {
    let scrollPos = $(window).scrollTop();
    let windowWidth = $(window).width();

    //Check Window Location and width
    if (scrollPos < 50 && windowWidth > 924) {
        //Hide Background
        $("#navContainer").addClass("clBackground");
    } else {
        //Add Background
        $("#navContainer").removeClass("clBackground");
    }
}

/////////////////////////////////////////
//Nav Selection Based On Scroll Pos
/////////////////////////////////////////
$(window).scroll(scroll);

function scroll() {
    let scrollPos = $(document).scrollTop();

    $(".nav a").removeClass('selected');
    if (scrollPos < 187) {
        $('a[href="#main"]').addClass('selected');
    } else if (scrollPos > 187 && scrollPos < 738) {
        $('a[href="#skills"]').addClass('selected');
    } else if (scrollPos > 738 && scrollPos < 1058) {
        $('a[href="#tools"]').addClass('selected');
    } else if (scrollPos > 1058) {
        $('a[href="#projects"]').addClass('selected');
    }
}



/////////////////////////////////////////
//Section Jump Correctin
/////////////////////////////////////////
//Execute on Nav bUtton click
$(".nav a").click(scrollCorrection);

//Section Pos Jump
function scrollCorrection(evt) {
    let divID;
    let scrollPos;

    //If Reseravation modal is open
    //If the nav links are clicked
    evt.preventDefault();
    $(".nav").removeClass('selected');
    divId = $(this).attr("href").toLowerCase();
    if ($(".navContainer").hasClass("navContainerOpen")) {
        menuClose();
        scrollPos = $(divId).offset().top;
    } else {
        scrollPos = $(divId).offset().top - 100;
    }
    $("html, body").animate({
        scrollTop: scrollPos
    }, 1000);

}



/////////////////////////////////////////
//Open/Close Navigation
/////////////////////////////////////////
//Open Navigation 
$("#open").click(menuOpen);

//Close Navigation
$("#close").click(menuClose);
$("main").click(menuClose);

//Open Navigation Function
function menuOpen() {
    let modalCheck = $("body").hasClass("bgFreeze")

    if (modalCheck === false) {

        $(".navContainer").addClass("navContainerOpen");
        $(".arrows").addClass("arrowsOpen");
        $(".arrowTop").addClass("arrowTopOpen");
        $(".arrowBottom").addClass("arrowBottomOpen");
        $("body").addClass("bgFreeze");
        $("main").addClass("bgDarken");
        $("#open").attr("id", "close");
        $("#open").off("click", menuOpen);
        $("#close").on("click", menuClose);
        $("main").on("click", menuClose);
    }
}

//Close Navigation Function
function menuClose() {
    let menuCheck = $(".navContainer").hasClass("navContainerOpen");

    if (menuCheck === true) {
        $("body").removeClass("bgFreeze");
        $("main").removeClass("bgDarken");
        $(".navContainer").removeClass("navContainerOpen");
        $(".arrows").removeClass("arrowsOpen");
        $(".arrowTop").removeClass("arrowTopOpen");
        $(".arrowBottom").removeClass("arrowBottomOpen");
        $("#close").attr("id", "open");
        $("#close").off("click", menuClose);
        $("#open").on("click", menuOpen);
        $("main").off("click", menuClose);
    }
}

/////////////////////////////////////////
//Open/Close Modal
/////////////////////////////////////////
//Open Modal
$(".projectImgs").click(modalOpen);
$("#hireMe").click(modalOpen);

//Close Project Modal
$("main").click(modalClose);

//Open Project Modal Function
function modalOpen(evt) {
    let projectSelected = $(this).attr("ID");
    let projectSelectedModal = "#" + $(this).attr("ID") + "Modal";
    let projectTitle = $(this).find("h3").text();
    let projectTitleModal = "#" + projectSelected + "TitleModal";
    let projectLinkId = projectSelected + "Link";
    let projectLink = $("#" + projectLinkId).attr("href");
    let projectLinkModal = "#" + projectLinkId + "Modal";

    evt.stopPropagation();
    menuClose()
    $(projectSelectedModal).removeClass("remElement");
    $(projectSelectedModal).addClass("temp");
    $(projectSelectedModal).scrollTop(0);
    $(projectTitleModal).text(projectTitle);
    $(projectLinkModal).attr("href", projectLink);
    $("body").addClass("bgFreeze");
    $("main").addClass("bgDarken");
    $("main").on("click", modalClose);
}

//Close Project Modal Function
function modalClose() {

    $("body").removeClass("bgFreeze");
    $("main").removeClass("bgDarken");
    $(".temp").addClass("remElement");
    $(".remElement").removeClass("temp");
    $("main").off("click", modalClose);
}



/////////////////////////////////////////
//Form Settings
/////////////////////////////////////////
// Keep active text color for form values !== default form values.
function setActiveText(returnedID) {
    const modalSplit = returnedID.split("Modal"); // Check modal version of form ID for the word "Modal" and split from Modal.
    const modalName = modalSplit[0]; // Select just the form ID without the word "Modal".  ID results in true whether "Modal" ever existed or not.  Covers both forms in one go.

    // Check if this request is coming from the modal version of the form or the standard version.
    if (returnedID === modalName + "Modal") {
        $("#" + returnedID).css("color", "darkgray");
    } else {
        $("#" + returnedID).css("color", "darkgray");
    }

}

// Reset inactive text color for form values.
function setInactiveText(returnedID) {
    $("#" + returnedID).css("color", "darkgray");
}

// Clear form name, email and message fields for user inputs or restore defaults if abandoned.
function clearField(returnedID) {
    const modalSplit = returnedID.split("Modal"); // Check modal version of form ID for the word "Modal" and split from Modal.
    const modalName = modalSplit[0]; // Select just the form ID without the word "Modal".  ID results in true whether "Modal" ever existed or not.  Covers both forms in one go.
    const formValue = $("#" + returnedID).val();

    if (formValue === modalName + "*") {
        $("#" + returnedID).val("");
        setActiveText(returnedID);
    } else if (formValue === "") {
        $("#" + returnedID).val(modalName + "*");
        setInactiveText(returnedID);
    } else {
        $("#" + returnedID).val(formValue);
        setActiveText(returnedID);
    }
}

// Clear all form fields of error highlights.
function clearHighlights() {
    $("#Name, #NameModal").css("boxShadow", "none");
    $("#Email, #EmailModal").css("boxShadow", "none");
    $("#Message, #MessageModal").css("boxShadow", "none");

    $("#formMessages, #formMessagesModal").fadeOut("fast");
}

// Form validation and submission for standard form.
function formValidation() {
    const $formName = $("#Name").val();
    const $formEmail = $("#Email").val();
    const $formMessage = $("#Message").val();
    const nameFilter = /^[a-zA-Z0-9- ]*$/;
    const emailFilter = /^\w+([\+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if ($formName.indexOf("Name*") != -1 || $formName === "" || !nameFilter.test($formName)) {
        clearHighlights();
        $("#Name").css("boxShadow", "0 0 5px orange");
        $("#formMessages").html('<p><span>Submit error: </span>&nbsp;Please enter your name using <span class="emphText">alphanumeric</span> characters.</p>');
        $("#formMessages").fadeToggle("fast");
        return false;
    }

    if ($formEmail.indexOf("Email*") != -1 || $formEmail === "" || !emailFilter.test($formEmail)) {
        clearHighlights();
        $("#Email").css("boxShadow", "0 0 5px orange");
        $("#formMessages").html('<p><span>Submit error: </span>&nbsp;Please enter your email using a <span class="emphText">valid email format</span>.</p>');
        $("#formMessages").fadeToggle("fast");
        return false;
    }

    if ($formMessage.indexOf("Message*") != -1 || $formMessage === "") {
        clearHighlights();
        $("#Message").css("boxShadow", "0 0 5px orange");
        $("#formMessages").html('<p><span>Submit error: </span>&nbsp;Please enter a message.</p>');
        $("#formMessages").fadeToggle("fast");
        return false;
    }

    $("form").submit(function (evt) {
        evt.preventDefault();

        function lockForm() {
            $("#submitButton").prop("disabled", true).html("Submitting..."); // Lets user know submission in process.
        }

        function resetForm() {
            $("#submitButton").prop("disabled", false).html("Submit"); // Resets default button value.
            $("#contactForm")[0].reset() // Resets all form fields.
            $("#Name, #Email, #Message").css("color", "darkgray"); // Resets inactive color states for default values.
        }

        lockForm();

        const settings = {
            url: $(this).attr("action"),
            data: $(this).serialize(), // Creates a text string with standard ULR-encoded notation of fields in an HTML form.,
            type: "POST",
            success: function (response) {
                $("#formMessages").html('<p><span class="formSuccess boldText">Success! </span>&nbsp;Your message has been sent.</p>');
                $("#formMessages").fadeIn("fast");
                resetForm();
            },
            error: function (xhr) {
                clearHighlights();
                $("#formMessages").html('<p><span class="formError boldText">Something went wrong! </span>&nbsp;Unable to send your message: ' + xhr.status + ", " + xhr.statusText + '</p>');
                $("#formMessages").fadeToggle("fast");
                resetForm();
            }

        }

        $.ajax(settings);
    });

}

// Form validation and submission for modal form.
function formValidationModal() {
    const $formNameModal = $("#NameModal").val();
    const $formEmailModal = $("#EmailModal").val();
    const $formMessageModal = $("#MessageModal").val();
    const nameFilter = /^[a-zA-Z0-9- ]*$/;
    const emailFilter = /^\w+([\+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if ($formNameModal.indexOf("Name*") != -1 || $formNameModal === "" || !nameFilter.test($formNameModal)) {
        clearHighlights();
        $("#NameModal").css("boxShadow", "0 0 5px orange");
        $("#formMessagesModal").html('<p><span>Submit error: </span>&nbsp;Please enter your name using <span class="emphText">alphanumeric</span> characters.</p>');
        $("#formMessagesModal").fadeToggle("fast");
        return false;
    }

    if ($formEmailModal.indexOf("Email*") != -1 || $formEmailModal === "" || !emailFilter.test($formEmailModal)) {
        clearHighlights();
        $("#EmailModal").css("boxShadow", "0 0 5px orange");
        $("#formMessagesModal").html('<p><span>Submit error: </span>&nbsp;Please enter your email using a <span class="emphText">valid email format</span>.</p>');
        $("#formMessagesModal").fadeToggle("fast");
        return false;
    }

    if ($formMessageModal.indexOf("Message*") != -1 || $formMessageModal === "") {
        clearHighlights();
        $("#MessageModal").css("boxShadow", "0 0 5px orange");
        $("#formMessagesModal").html('<p><span>Submit error: </span>&nbsp;Please enter a message.</p>');
        $("#formMessagesModal").fadeToggle("fast");
        return false;
    }

    $("form").submit(function (evt) {
        evt.preventDefault();

        function lockForm() {
            $("#submitButtonFormModal").prop("disabled", true).html("Submitting..."); // Lets user know submission in process.
        }

        function resetForm() {
            $("#submitButtonFormModal").prop("disabled", false).html("Submit"); // Resets default button value.
            $("#contactFormModal")[0].reset() // Resets all form fields.
            $("#NameModal, #EmailModal, #MessageModal").css("color", "darkgray"); // Resets inactive color states for default values.
        }

        lockForm();

        const settings = {
            url: $(this).attr("action"),
            data: $(this).serialize(), // Creates a text string with standard ULR-encoded notation of fields in an HTML form.,
            type: "POST",
            success: function (response) {
                $("#formMessagesModal").html('<p><span class="formSuccess boldText">Success! </span>&nbsp;Your message has been sent.</p>');
                $("#formMessagesModal").fadeIn("fast");
                resetForm();
            },
            error: function (xhr) {
                clearHighlights();
                $("#formMessagesModal").html('<p><span class="formError boldText">Something went wrong! </span>&nbsp;Unable to send your message: ' + xhr.status + ", " + xhr.statusText + '</p>');
                $("#formMessagesModal").fadeToggle("fast");
                resetForm();
            }

        }

        $.ajax(settings);
    });

}