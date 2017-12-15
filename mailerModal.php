<?php

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $formNameModal = strip_tags(trim($_POST["Name"]));
		$formNameModal = str_replace(array("\r","\n"),array(" "," "),$formNameModal);
        $formEmailModal = filter_var(trim($_POST["Email"]), FILTER_SANITIZE_EMAIL);
        $formMessageModal = trim($_POST["Message"]);
        $spamBlockModal = trim($_POST[""]);

        // Check that data was sent to the mailer.
        if ( !empty($spamBlockModal) OR empty($formNameModal) OR empty($formMessageModal) OR !filter_var($formEmailModal, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        $recipient = "curtis@curtisbeall.com";

        // Set the email subject.
        $subject = "New message from $formNameModal";

        // Build the email content.
        $email_content = "Name: $formNameModal\n";
        $email_content .= "Email: $formEmailModal\n\n";
        $email_content .= "Message:\n$formMessageModal\n";

        // Build the email headers.
        $email_headers = "From: $formNameModal <$formEmailModal>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Success! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>
