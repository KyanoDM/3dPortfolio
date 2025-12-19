function copyToClipboard(text) {
    // Create a temporary input element
    var tempInput = document.createElement("input");
    tempInput.value = text;

    // Append the input element to the body
    document.body.appendChild(tempInput);

    // Select the input's text
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);
    alert("Discord Username copied!");
}